// https://developers.cloudflare.com/pages/platform/functions
export async function onRequestGet({ params }) {
  return new Response(JSON.stringify({params, msg: "Hello, world!"}), { status: 200, headers: {"Content-Type": "application/json"}});
}

