const crypto = require("crypto");

// Mada (Saudi domestic debit network), Tabby and Tamara (Gulf BNPL) all expose a
// broadly similar "create a checkout session, redirect the customer, confirm on
// return" flow. Each block below is a thin adapter so the rest of the app talks
// to one interface (`createCheckoutSession` / `confirmPayment`) regardless of
// gateway — swapping in real credentials later is a matter of filling in the
// `callRealGateway` branch for that provider, not restructuring callers.
const GATEWAYS = {
  mada: {
    label: "Mada",
    apiKeyEnv: "MADA_MERCHANT_API_KEY",
    currencies: ["SAR"],
  },
  tabby: {
    label: "Tabby",
    apiKeyEnv: "TABBY_SECRET_KEY",
    currencies: ["AED", "SAR", "QAR"],
  },
  tamara: {
    label: "Tamara",
    apiKeyEnv: "TAMARA_API_TOKEN",
    currencies: ["AED", "SAR"],
  },
};

// In-memory store for mock sessions (a real integration wouldn't need this —
// the gateway itself is the source of truth — but it lets the mock "confirm"
// step below look up what it's confirming).
const mockSessions = new Map();

exports.isSupportedGateway = (gateway) => Object.prototype.hasOwnProperty.call(GATEWAYS, gateway);

exports.isCurrencySupported = (gateway, currency) =>
  GATEWAYS[gateway]?.currencies.includes((currency || "").toUpperCase());

function isLiveMode(gateway) {
  return !!process.env[GATEWAYS[gateway].apiKeyEnv];
}

exports.createCheckoutSession = async (gateway, booking, providerName) => {
  if (!exports.isSupportedGateway(gateway)) throw new Error(`Unsupported gateway: ${gateway}`);

  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  const currency = (booking.currency || "AED").toUpperCase();

  if (!exports.isCurrencySupported(gateway, currency)) {
    throw new Error(`${GATEWAYS[gateway].label} does not support ${currency} in this region`);
  }

  if (isLiveMode(gateway)) {
    // Placeholder for the real SDK/REST call once merchant credentials exist —
    // each provider's "create session" request shape goes here, keyed by gateway.
    throw new Error(`${GATEWAYS[gateway].label} live credentials found but the live integration is not wired up yet`);
  }

  // ── Mock mode: simulate what the gateway would return ──────────────────────
  const sessionId = `${gateway}_mock_${crypto.randomBytes(12).toString("hex")}`;
  mockSessions.set(sessionId, {
    gateway,
    bookingId: booking._id.toString(),
    amount: booking.totalAmount,
    currency,
    status: "created",
  });

  return {
    id: sessionId,
    gateway,
    status: "created",
    amount: booking.totalAmount,
    currency,
    // In mock mode we send the customer straight to a page that simulates the
    // gateway's hosted checkout and calls the confirm endpoint on "approval".
    url:
      `${clientUrl}/mock-gateway-checkout?gateway=${gateway}&session=${sessionId}&bookingId=${booking._id}` +
      `&provider=${encodeURIComponent(providerName)}&amount=${booking.totalAmount}&currency=${currency}`,
  };
};

exports.confirmPayment = async (gateway, sessionId) => {
  if (!exports.isSupportedGateway(gateway)) throw new Error(`Unsupported gateway: ${gateway}`);

  if (isLiveMode(gateway)) {
    throw new Error(`${GATEWAYS[gateway].label} live credentials found but the live integration is not wired up yet`);
  }

  const session = mockSessions.get(sessionId);
  if (!session) throw new Error("Unknown or expired checkout session");

  session.status = "paid";
  mockSessions.set(sessionId, session);
  return session;
};

exports.listGateways = () =>
  Object.entries(GATEWAYS).map(([id, cfg]) => ({
    id,
    label: cfg.label,
    currencies: cfg.currencies,
    live: isLiveMode(id),
  }));
