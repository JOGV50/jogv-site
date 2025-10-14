// netlify/edge-functions/prerender.js

export default async (request, context) => {
  const ua = request.headers.get("user-agent") || "";
  const isBot = /bot|crawl|spider|slurp|facebook|twitter|linkedin/i.test(ua);

  if (isBot) {
    const prerenderToken = "E6NaeZO2m1ZukS5C2P0R";
    const prerenderUrl = "https://service.prerender.io/" + request.url;

    const response = await fetch(prerenderUrl, {
      headers: {
        "X-Prerender-Token": prerenderToken,
      },
    });

    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  }

  return context.next();
};

export const config = { path: "/*" };
