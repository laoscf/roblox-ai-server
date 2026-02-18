const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Render의 Environment 메뉴에 등록한 키를 가져옵니다.
const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post('/ask', async (req, res) => {
    try {
        const { message } = req.body;
        
        // Groq API 호출
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: "llama-3.3-70b-versatile",
            messages: [
                { 
                    role: "system", 
                    content: "당신은 로블록스 NPC 봇입니다. 한국어로 짧게 답하세요. 유저가 '점프'라고 하면 반드시 답변에 {\"action\": \"jump\"}를 포함하세요." 
                },
                { role: "user", content: message }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const replyText = response.data.choices[0].message.content;
        res.json({ reply: replyText });
        
    } catch (e) {
        console.error("에러 발생:", e.message);
        res.status(500).json({ reply: "AI 서버에 문제가 생겼어요." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Groq AI Server running on " + PORT));
