// https://developers.cloudflare.com/pages/platform/functions
export async function onRequestGet({ params, request }) {
  return new Response(JSON.stringify({params, request, msg: "Hello, world!"}), { status: 200, headers: {"Content-Type": "application/json"}});
}
