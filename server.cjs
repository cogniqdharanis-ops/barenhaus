const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `You are a warm assistant for Bären Haus, an authentic Bavarian restaurant at 901 Front Street, Leavenworth, WA 98826.
Hours: Sun–Thu 11AM–10PM, Fri–Sat 11AM–11PM.
Live music every Fri & Sat 8–11PM. No cover charge.
Phone: (509) 548-4535. Email: Greg@barenhaus.com.
Signature dishes: Jaeger Schnitzel $22, Beef Rouladen $24, Bratwurst Platter $18, Famous Reuben $16, Haus Steak $28.
Fresh-baked bread daily. House-made sauces. Gluten-free and vegetarian options.
Large group reservations: call (509) 548-4535 on non-festival weekends.
Walk-ins always welcome.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data });
    res.json({ reply: data.choices?.[0]?.message?.content || 'Try again!' });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Bären Haus chat server running on port ${PORT}`);
  console.log(`   Groq key: ${process.env.GROQ_API_KEY ? '✓ Loaded' : '✗ MISSING'}`);
});
