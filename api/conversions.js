export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Solo POST accettato' });
  }
  res.status(200).json({ message: 'API Conversions endpoint attivo' });
}
