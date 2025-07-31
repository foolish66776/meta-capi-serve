import React from 'react';

export default function TrackPurchase() {
  const handlePurchase = async () => {
    const eventData = {
      event_name: "Purchase",
      event_time: Math.floor(Date.now() / 1000),
      user_data: {
        em: "test@example.com"
      },
      custom_data: {
        currency: "EUR",
        value: 49.99
      }
    };

    try {
      const res = await fetch('/api/conversions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });

      const json = await res.json();
      console.log('Conversion API response:', json);
    } catch (error) {
      console.error('Errore invio evento conversione:', error);
    }
  };

  return (
    <button onClick={handlePurchase}>
      Simula Acquisto (Test)
    </button>
  );
}
