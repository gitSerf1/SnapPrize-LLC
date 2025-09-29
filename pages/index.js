// pages/index.js
import { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  useEffect(() => {
    const stripeJs = document.createElement("script");
    stripeJs.src = "https://js.stripe.com/v3/";
    document.body.appendChild(stripeJs);
  }, []);

  const handleCheckout = async () => {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
    });
    const session = await response.json();

    const stripe = window.Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) alert(result.error.message);
  };

  return (
    <>
      <Head>
        <title>Sweepstakes</title>
      </Head>
      <main style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>🎉 Enter the Sweepstakes 🎉</h1>
        <p>Pay $1 for an entry or submit a free entry via mail.</p>
        <button 
          onClick={handleCheckout} 
          style={{ padding: "12px 24px", fontSize: "18px", cursor: "pointer", borderRadius: "8px", background: "#635BFF", color: "white", border: "none" }}
        >
          Pay $1 to Enter
        </button>
      </main>
    </>
  );
}
