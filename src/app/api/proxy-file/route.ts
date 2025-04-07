// app/api/proxy/route.ts
import { NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response(JSON.stringify({ error: 'Missing URL' }), { status: 400 });
  }

  // Optional: Batasi domain yang boleh diakses
  if (!url.startsWith(process.env.NEXT_PUBLIC_API_URL || "https://api-risk.alus.com")) {
    return new Response(JSON.stringify({ error: 'URL not allowed' }), { status: 403 });
  }

  try {
    const fileResponse = await axios.get(url, {
      responseType: 'arraybuffer',
    });

    return new Response(fileResponse.data, {
      headers: {
        'Content-Type': fileResponse.headers['content-type'] || 'application/octet-stream',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch file' }), { status: 500 });
  }
}
