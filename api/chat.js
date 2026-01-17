const axios = require('axios');

module.exports = async (req, res) => {
  const { pesan } = req.query;
  
  // key lu yang tadi
  const apiKey = "AIzaSyDKW5jmTCvv90fG-Of-Ofmt1yAC5KxgeGA";

  if (!pesan) {
    return res.status(400).json({ error: 'isi pesan dulu han' });
  }

  try {
    // kita coba pake endpoint v1 (lebih stabil) 
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [{ 
          parts: [{ 
            text: "jawab pake bahasa indonesia yang santai dan asik: " + pesan 
          }] 
        }]
      }
    );

    const hasilAi = response.data.candidates[0].content.parts[0].text;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(hasilAi);

  } catch (error) {
    // biar lu tau error aslinya dari mana
    const status = error.response ? error.response.status : 500;
    const data = error.response ? error.response.data : error.message;

    res.status(status).json({ 
      error: 'gagal nembak google han',
      status_code: status,
      detail: data 
    });
  }
};
