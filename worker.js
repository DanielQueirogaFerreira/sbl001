import html from './dist/index.html';

export default {
  async fetch(request, env, ctx) {
    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': 'public, max-age=60, s-maxage=60'
      }
    });
  }
};
