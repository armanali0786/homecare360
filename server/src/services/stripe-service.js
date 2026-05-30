const Stripe = require("stripe");

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  return Stripe(process.env.STRIPE_SECRET_KEY);
}

exports.createCheckoutSession = async (booking, providerName) => {
  const stripe = getStripe();
  if (!stripe) throw new Error("Stripe not configured");

  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

  // Indian export regulations require customer name and billing address
  let customerId;
  if (booking.userEmail) {
    const customer = await stripe.customers.create({
      name:  booking.userName || undefined,
      email: booking.userEmail,
    });
    customerId = customer.id;
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    ...(customerId ? { customer: customerId } : {}),
    billing_address_collection: "required",
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `${booking.serviceCategory} — HomeCare360`,
            description: `Provider: ${providerName} · ${booking.date} at ${booking.time}`,
          },
          unit_amount: Math.round(booking.totalAmount * 100),
        },
        quantity: 1,
      },
    ],
    metadata: {
      bookingId: booking._id.toString(),
    },
    success_url: `${clientUrl}/booking-success?bookingId=${booking._id}&paid=1`,
    cancel_url:  `${clientUrl}/booking/${booking.provider}`,
  });

  return session;
};

exports.constructWebhookEvent = (payload, sig) => {
  const stripe = getStripe();
  if (!stripe) throw new Error("Stripe not configured");
  return stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
};
