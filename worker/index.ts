interface AssetsBinding {
  fetch(request: Request): Promise<Response>;
}

interface Env {
  ASSETS: AssetsBinding;
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/inquiry') {
      return Response.json(
        {
          ok: false,
          error: 'Inquiry delivery is not configured. No inquiry has been sent.',
        },
        { status: 503 },
      );
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
