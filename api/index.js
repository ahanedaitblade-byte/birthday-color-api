export default function handler(req, res) {
  const { month, day } = req.query;

  if (!month || !day) {
    return res.status(400).json({ error: "month と day を指定してください" });
  }

  try {
    const data = require("../../colors.json");
    const key = `${month}-${day}`;

    if (!data[key]) {
      return res.status(404).json({ error: "該当する誕生日カラーがありません" });
    }

    return res.status(200).json(data[key]);
  } catch (e) {
    return res.status(500).json({ error: "サーバーエラー" });
  }
}
