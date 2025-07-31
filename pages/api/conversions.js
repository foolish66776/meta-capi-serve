export default function handler(req, res) {
  if (req.method === 'POST') {
    res.status(200).json({ message: 'Evento ricevuto con successo' });
  } else {
    res.status(405).json({ message: 'Solo POST accettato' });
  }
}
