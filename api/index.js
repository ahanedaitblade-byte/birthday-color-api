import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  const { month, day } = req.query;

  if (!month || !day) {
    return res.status(400).json({ error: "month と day を指定してください" });
  }

  try {
    // api/colors.json を読み込む
    const filePath = path.join(process.cwd(), "api", "colors.json");
    const jsonData = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(jsonData);

    const key = `${month}-${day}`;

    if (!data[key]) {
      return res.status(404).json({ error: "該当する誕生日カラーがありません" });
    }

    return res.status(200).json(data[key]);
  } catch (e) {
    return res.status(500).json({ error: "サーバーエラー", detail: e.message });
  }
}
