export default {
  async fetch(request) {
    const url = "https://raw.githubusercontent.com/thalamus-live/thalamus-live/main/index.html";
    const response = await fetch(url, {
      cf: { cacheEverything: false },
      headers: { "Cache-Control": "no-cache", "Pragma": "no-cache" }
    });
    const html = await response.text();
    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "X-Deploy": Date.now().toString()
      }
    });
  }
};
