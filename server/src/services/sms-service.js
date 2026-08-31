const twilio = require("twilio");

let client = null;

function getClient() {
  if (client) return client;
  const sid   = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) return null;
  try {
    client = twilio(sid, token);
    return client;
  } catch (err) {
    // Misconfigured/placeholder credentials must not crash the request — SMS
    // is a best-effort notification, never a booking-blocking dependency.
    console.error("[Twilio] Failed to initialize client:", err.message);
    return null;
  }
}

// National number length -> default GCC/India country code, used only when
// the number has no explicit "+" prefix already.
const COUNTRY_CODE_BY_LENGTH = {
  9:  process.env.DEFAULT_COUNTRY_CODE || "+971", // UAE / Saudi mobile numbers (without leading 0)
  8:  "+974",                                     // Qatar
  10: "+91",                                      // India
};

async function sendSMS(to, body) {
  const c    = getClient();
  const from = process.env.TWILIO_PHONE_NUMBER;
  if (!c || !from) return;

  // E.164 format: infer the country code from national number length when none is given.
  let formatted = to.replace(/\D/g, "");
  if (!to.startsWith("+")) {
    const countryCode = COUNTRY_CODE_BY_LENGTH[formatted.length] || process.env.DEFAULT_COUNTRY_CODE || "+971";
    formatted = `${countryCode}${formatted}`;
  } else {
    formatted = `+${formatted}`;
  }

  try {
    await c.messages.create({ from, to: formatted, body });
  } catch (err) {
    console.error("[Twilio]", err.message);
  }
}

exports.bookingConfirmed = (phone, d) =>
  sendSMS(
    phone,
    `HomeCare360: Booking ${d.ref} confirmed! ${d.service} on ${d.date} at ${d.time}. Total: ${d.currency || "AED"} ${d.total}. Cancel free before 24h.`
  );

exports.bookingCancelled = (phone, d) =>
  sendSMS(
    phone,
    `HomeCare360: Booking ${d.ref} has been cancelled. ${d.refundNote || "Contact support for queries."}`
  );

exports.providerAssigned = (phone, d) =>
  sendSMS(
    phone,
    `HomeCare360: New booking ${d.ref} assigned to you — ${d.service} on ${d.date} at ${d.time}. Address: ${d.address}`
  );
