export default async function handler(req, res) {
  const token = "7294591412:AAH5ikzT-_ksf5LXb-v7sBnM7iY8ovjXumQ";
  const chat_id = req.query.chat_id || "@HACir";
  const text = req.query.text || "No message";
  const photo = req.query.photo;

  const apiUrl = photo
    ? `https://api.telegram.org/bot${token}/sendPhoto`
    : `https://api.telegram.org/bot${token}/sendMessage`;

  const payload = {
    chat_id,
    parse_mode: "HTML",
  };

  if (photo) {
    payload.photo = photo;
    payload.caption = text;
  } else {
    payload.text = text;
  }

  const telegram = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await telegram.json();
  res.status(200).json(result);
}
