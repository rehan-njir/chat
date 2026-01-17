const axios = require('axios');

module.exports = async (req, res) => {
  // ambil parameter ?pesan=...
  const { pesan } = req.query;
  
  // ini key yang lu kasih tadi
  const apiKey = "AIzaSyDKW5jmTCvv90fG-Of-Ofmt1yAC5KxgeGA";

  if (!pesan) {
    return res.status(400).json({ error: 'mana pesannya njir, isi dulu lah' });
  }

  try {
    // nembak server gemini 1.5 flash biar kenceng (aman di limit 10 detik vercel)
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [{ 
          parts: [{ 
            text: "jawab pake bahasa indonesia yang santai dan asik kayak temen nongkrong: " + pesan 
          }] 
        }]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    // ambil teks responnya
    const hasilAi = response.data.candidates[0].content.parts[0].text;

    // kirim output teks polos biar enak dibaca di terminal lu
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(hasilAi);

  } catch (error) {
    res.status(500).json({ 
      error: 'api gemini lagi error atau key lu limit, han',
      detail: error.message 
    });
  }
};
