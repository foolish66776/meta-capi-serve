// pages/api/conversions.js

import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Solo POST accettato' });
  }

  const pixelId = '1197188622445284';
  const accessToken = 'EAAYOCUV60GYBPFEKzXMCfZA2MWaJyn0ZAJnEM712jbuiwWNCkoH32CzaihiTSkduLRQK1FklBmoP2X3b6EtIY3OaS9Ew4k6op2kBmpunCCZBwcwYniiQMtN5ZADQ88vgrQw27Ujdc0LzH2KdowQuLslS7so2Mjue7sWaZCIZAioTpxq2trHwEcjopDofNUTAZDZD';

  try {
    const { event_name, event_time, user_data, custom_data } = req.body;

    if (!event_name || !event_time || !user_data || !user_data.em) {
      return res.status(400).json({ error: 'Dati mancanti o incompleti' });
    }

    // Hash SHA-256 email
    const hashedEmail = crypto.createHash('sha256').update(user_data.em.trim().toLowerCase()).digest('hex');

    const eventData = {
      data: [
        {
          event_name,
          event_time,
          action_source: 'website',
          event_source_url: 'https://thefoolishbutcher.com',
          user_data: {
            em: hashedEmail,
            // Puoi aggiungere anche client_ip_address e client_user_agent
          },
          custom_data
        }
      ]
    };

    const response = await fetch(
      `https://graph.facebook.com/v17.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      }
    );

    const json = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: json.error });
    }

    res.status(200).json(json);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
