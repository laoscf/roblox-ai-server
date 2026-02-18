import express from "express";

const app = express();
app.use(express.json());

app.post("/ask", async (req, res) => {
  res.json({ reply: "서버 연결 성공" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));

