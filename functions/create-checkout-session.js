// Make sure you have set the live secret key in Netlify env: STRIPE_SECRET_KEY
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Sweepstakes Entry" },
            unit_amount: 100, // $1
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.SITE_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/index.html`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
