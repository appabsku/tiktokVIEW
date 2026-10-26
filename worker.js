// Cloudflare Worker: perantara CORS untuk Profile Player
export default {
  async fetch(req) {
    const cors = {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET,OPTIONS',
      'access-control-allow-headers': '*'
    };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });

    const u = new URL(req.url);
    const target = 'https://www.tikwm.com/api/user/posts' + u.search;
    try {
      const r = await fetch(target, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36',
          'Accept': 'application/json'
        }
      });
      return new Response(r.body, {
        status: r.status,
        headers: { ...cors, 'content-type': 'application/json' }
      });
    } catch (e) {
      return new Response(JSON.stringify({ code: -1, msg: String(e) }), {
        status: 502,
        headers: { ...cors, 'content-type': 'application/json' }
      });
    }
  }
};
