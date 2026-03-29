export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { month, day } = req.query;

  if (!month || !day) {
    return res.status(400).json({ error: "month と day を指定してください" });
  }

  try {
    const filePath = path.join(process.cwd(), "api", "colors.json");
    const jsonData = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(jsonData);

    const result = data.find(
      (item) => item.month == month && item.day == day
    );

    if (!result) {
      return res.status(404).json({ error: "該当する誕生日カラーがありません" });
    }

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ error: "サーバーエラー", detail: e.message });
  }
}
