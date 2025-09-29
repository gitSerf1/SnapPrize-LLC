import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const stripeJs = document.createElement("script");
    stripeJs.src = "https://js.stripe.com/v3/";
    document.body.appendChild(stripeJs);
  }, []);

  const handleCheckout = async () => {
    const response = await fetch('/api/create-checkout-session', { method: 'POST' });
    const session = await response.json();

    if (session.error) { alert(session.error); return; }

    const stripe = window.Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) alert(result.error.message);
  };

  return (
    <>
      <Head>
        <title>MN Sweepstakes Giveaway</title>
      </Head>
      <header style={{ background: 'linear-gradient(90deg, #635BFF, #FF6EC7)', color: 'white', padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎉 Minnesota Sweepstakes Giveaway 🎉</h1>
        <p style={{ fontSize: '1.2rem' }}>Enter now for your chance to win exciting prizes! No purchase necessary.</p>
      </header>
      <main style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
        <section style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)', marginBottom: '2rem', border: '1px solid #ddd' }}>
          <h2 style={{ color: '#635BFF', fontSize: '1.8rem', marginBottom: '1rem' }}>🎁 Current Prize</h2>
          <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f" alt="Prize" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '15px', marginBottom: '1rem' }} />
          <p>Win a <strong>$50 Amazon Gift Card</strong>! Open to Minnesota residents 18+. Sweepstakes ends <strong>December 31, 2025</strong>.</p>
        </section>
        <section style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)', marginBottom: '2rem', border: '1px solid #ddd' }}>
          <h2 style={{ color: '#FF6EC7', fontSize: '1.8rem', marginBottom: '1rem' }}>💳 Pay to Enter</h2>
          <button onClick={handleCheckout} style={{ padding: '1rem 2rem', fontSize: '1.2rem', borderRadius: '15px', background: '#FFCA28', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Pay $1 to Enter</button>
          <p style={{ marginTop: '1rem', color: '#555' }}>No purchase necessary. Enter for free by submitting the free entry form.</p>
        </section>
        <section style={{ background: 'linear-gradient(90deg,#f3e5f5,#ffe6f0)', padding: '2rem', borderRadius: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)', border: '1px solid #f0c0e0' }}>
          <h2 style={{ color: '#FF6EC7', fontSize: '1.8rem', marginBottom: '1rem' }}>📝 Free Entry Form</h2>
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSf1kWZ-YqRnfNZ3qLI_P7zteIu2PwHx6GJgiGYIaSAIJrc/viewform?embedded=true" width="100%" height="600" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
        </section>
      </main>
      <footer style={{ background: 'linear-gradient(90deg, #635BFF, #FF6EC7)', color: 'white', padding: '2rem', textAlign: 'center', marginTop: '2rem' }}>
        <p>© 2025 Your Company Name. All Rights Reserved.</p>
        <p style={{ fontSize: '0.9rem' }}>Contact: info@yourcompany.com</p>
      </footer>
    </>
  );
}