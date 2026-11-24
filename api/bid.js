export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({});
  try {
    const { query, response } = req.body;
    const r = await fetch('https://api.tryagentads.com/v1/bid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.AGENTADS_PUBLISHER_KEY
      },
      body: JSON.stringify({
        publisherApiKey: process.env.AGENTADS_PUBLISHER_KEY,
        query: query || '',
        response: (response || '').slice(0, 500)
      })
    });
    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({});
  }
}
