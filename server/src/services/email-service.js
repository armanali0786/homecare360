const emailjs = require("@emailjs/nodejs");

// EmailJS free tier: 200 emails/month, no credit card required
// Env vars: EMAILJS_SERVICE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY
// Template vars each template receives: to_email, to_name, subject, message (customize in dashboard)
// Templates: EMAILJS_TEMPLATE_BOOKING  / EMAILJS_TEMPLATE_CANCEL / EMAILJS_TEMPLATE_REVIEW

function getKeys() {
  return {
    publicKey:  process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
  };
}

function isConfigured() {
  return !!(
    process.env.EMAILJS_SERVICE_ID &&
    process.env.EMAILJS_PUBLIC_KEY &&
    process.env.EMAILJS_PRIVATE_KEY
  );
}

async function send(templateId, params) {
  if (!isConfigured() || !templateId) return;
  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      templateId,
      params,
      getKeys()
    );
  } catch (err) {
    console.error("[EmailJS]", err?.text || err?.message || err);
  }
}

// ── Booking confirmed ─────────────────────────────────────────────────────────
exports.bookingConfirmed = (toEmail, d) =>
  send(process.env.EMAILJS_TEMPLATE_BOOKING || "template_booking", {
    to_email:   toEmail,
    to_name:    d.name  || "Customer",
    booking_ref: d.ref,
    service:    d.service,
    date:       d.date,
    time:       d.time,
    address:    d.address,
    total:      `${d.currency || "AED"} ${d.total}`,
    message:
      `Your booking ${d.ref} is confirmed!\n` +
      `Service: ${d.service}\nDate: ${d.date} at ${d.time}\nAddress: ${d.address}\nTotal: ${d.currency || "AED"} ${d.total}\n\n` +
      `Provider will call 30 minutes before arrival. Free cancellation before 24h.`,
  });

// ── Booking cancelled ─────────────────────────────────────────────────────────
exports.bookingCancelled = (toEmail, d) =>
  send(process.env.EMAILJS_TEMPLATE_CANCEL || "template_cancel", {
    to_email:    toEmail,
    to_name:     d.name || "Customer",
    booking_ref: d.ref,
    cancelled_by: d.cancelledBy || "customer",
    refund_note: d.refundNote || "",
    message:
      `Your booking ${d.ref} has been cancelled.\n` +
      (d.cancelledBy === "provider" ? "Your assigned provider cancelled this booking.\n" : "") +
      (d.refundNote ? `Refund: ${d.refundNote}` : ""),
  });

// ── Review reminder ───────────────────────────────────────────────────────────
exports.reviewReminder = (toEmail, d) =>
  send(process.env.EMAILJS_TEMPLATE_REVIEW || "template_review", {
    to_email:   toEmail,
    to_name:    d.name || "Customer",
    service:    d.service,
    provider:   d.provider,
    message:
      `Your ${d.service} service with ${d.provider} is complete!\n` +
      `Please take a moment to rate your experience on HomeCare360.`,
  });
