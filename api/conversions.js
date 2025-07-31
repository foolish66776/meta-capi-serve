export default function handler(req, res) {
  if (req.method === 'POST') {
    return res.status(200).json({ message: 'API Conversions endpoint attivo' });
  }
  res.status(405).json({ message: 'Solo POST accettato' });
}
