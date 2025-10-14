export default async (request, context) => {
  const userAgent = request.headers.get("user-agent") || "";
  const isBot = /bot|crawl|spider|slurp|facebook|twitter|linkedin/i.test(userAgent);

  if (isBot) {
    const prerenderToken = "E6NaeZO2m1ZukS5C2P0R"; // replace with your actual token
    const prerenderUrl = "https://service.prerender.io/" + request.url;
    const response = await fetch(prerenderUrl, {
      headers: { "X-Prerender-Token": prerenderToken },
    });
    return response;
  }

  return context.next();
};
