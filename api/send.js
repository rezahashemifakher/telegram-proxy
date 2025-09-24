import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const { chat_id, text, photo, link } = req.query;

    if (!chat_id || !text) {
      return res.status(400).json({ ok: false, error: 'chat_id و text اجباری هستند' });
    }

    const token = '459983979:AAEOMagW83pDDcU__tVMyIZqXlw5P58uiOI';

    const keyboard = {
      inline_keyboard: [
        [
          { text: 'مشاهده محصول', url: link || 'https://hac.ir' }
        ]
      ]
    };

    let telegramUrl = '';
    let body = null;

    if (photo) {
      telegramUrl = `https://api.telegram.org/bot${token}/sendPhoto`;
      const params = new URLSearchParams();
      params.append('chat_id', chat_id);
      params.append('photo', photo);
      params.append('caption', text);
      params.append('parse_mode', 'HTML');
      params.append('reply_markup', JSON.stringify(keyboard));
      body = params;
    } else {
      telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
      const params = new URLSearchParams();
      params.append('chat_id', chat_id);
      params.append('text', text);
      params.append('parse_mode', 'HTML');
      params.append('reply_markup', JSON.stringify(keyboard));
      body = params;
    }

    const response = await fetch(telegramUrl, {
      method: 'POST',
      body: body
    });

    const data = await response.json();

    if (!data.ok) {
      return res.status(500).json({ ok: false, error: data.description });
    }

    res.status(200).json({ ok: true, result: data.result });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}
