const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { appendEntry } = require("./log-entry");

exports.handler = async (event) => {
  const sig = event.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, endpointSecret);
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;

    await appendEntry({
      name: session.customer_details?.name || "",
      email: session.customer_details?.email || "",
      entryType: "Paid",
      notes: "Stripe ID: " + session.id
    });
  }

  return { statusCode: 200, body: "Success" };
};
