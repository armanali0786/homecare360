const http    = require("http");
const express = require("express");
const cors    = require("cors");
const cron    = require("node-cron");
const { Server } = require("socket.io");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const connectDB = require("./config/db");

const app    = express();
const server = http.createServer(app);

const ALLOWED_ORIGINS = [
  "https://homecare360.netlify.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps, curl, Postman) or any localhost/netlify origin
    if (
      !origin ||
      ALLOWED_ORIGINS.includes(origin) ||
      /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
    ) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => callback(null, true),
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight for all routes
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", apiRoutes);

// ── Socket.io real-time chat ──────────────────────────────────────────────────
const chatService = require("./services/chat-service");
const Booking     = require("./models/booking");
const ProviderApplication = require("./models/provider-application");
const jwt = require("jsonwebtoken");

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("No token"));
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = payload.id;
    socket.userFullName = payload.fullName || "";
    next();
  } catch {
    next(new Error("Invalid token"));
  }
});

io.on("connection", (socket) => {
  socket.on("join-room", async ({ bookingId }) => {
    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) return;

      let role = null;
      if (booking.user.toString() === socket.userId) {
        role = "customer";
      } else {
        const pApp = await ProviderApplication.findOne({ user: socket.userId });
        if (pApp && booking.provider.toString() === pApp._id.toString()) role = "provider";
      }
      if (!role) return;

      socket.join(`booking-${bookingId}`);
      socket.bookingId = bookingId;
      socket.chatRole  = role;
    } catch {}
  });

  socket.on("send-message", async ({ bookingId, text }) => {
    if (!text?.trim() || !bookingId) return;
    try {
      const msg = await chatService.saveMessage({
        bookingId,
        senderId:   socket.userId,
        senderRole: socket.chatRole,
        senderName: socket.userFullName,
        text:       text.trim(),
      });
      io.to(`booking-${bookingId}`).emit("new-message", msg);
    } catch {}
  });
});

// ─────────────────────────────────────────────────────────────────────────────

connectDB();

// ── Recurring bookings ────────────────────────────────────────────────────────
// Generates real Booking documents for any active recurring plan whose next
// occurrence is due. Runs hourly so a plan fires the same calendar day it's
// due without needing a precise midnight cron; also exposed as an
// admin-triggerable endpoint (POST /api/v1/recurring-bookings/run-due) for
// ops and demo purposes.
const recurringBookingService = require("./services/recurring-booking-service");
cron.schedule("0 * * * *", async () => {
  try {
    const results = await recurringBookingService.runDueRecurringBookings();
    if (results.generated || results.failed) {
      console.log(`[recurring-bookings] generated=${results.generated} failed=${results.failed}`);
    }
  } catch (err) {
    console.error("[recurring-bookings] cron run failed:", err.message);
  }
});

// ── Emergency/SOS response guarantee ──────────────────────────────────────────
// Checks every 10 minutes (the guarantee window is 60 minutes, so hourly would
// let a breach sit undetected for up to an hour) for emergency bookings a
// provider failed to accept in time, and enforces the "free if late" promise.
const emergencyService = require("./services/emergency-service");
cron.schedule("*/10 * * * *", async () => {
  try {
    const result = await emergencyService.checkSlaBreaches();
    if (result.breached) {
      console.log(`[emergency] SLA breaches detected: ${result.breached}`);
    }
  } catch (err) {
    console.error("[emergency] SLA check failed:", err.message);
  }
});

server.listen(ServerConfig.PORT, () => {
  console.log(`Server started on PORT ${ServerConfig.PORT}`);
});
