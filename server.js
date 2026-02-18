import express from "express";

const app = express();
app.use(express.json());

app.post("/ask", async (req, res) => {
  res.json({ reply: "서버 연결 성공" });
});

app.listen(3000, () => console.log("Server running"));
