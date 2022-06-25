const { Nuxt, Builder } = require('nuxt');
const config = require('../example/nuxt.config.js');
const request = require('request-promise-native');

const url = path => `http://localhost:3000${path}`;
const get = path => request(url(path));

describe('nuxtjs-ghost', () => {
  let nuxt;
  let addTemplate;

  beforeAll(async () => {
    nuxt = new Nuxt(config);

    addTemplate = nuxt.moduleContainer.addTemplate = jest.fn(nuxt.moduleContainer.addTemplate);

    await new Builder(nuxt).build();
    await nuxt.listen(3000);
  }, 60000);

  afterAll(async () => {
    await nuxt.close();
  });

  test('SSR mode', async () => {
    const html = await get('/');
    expect(html).toContain('Works!');
  });

  test('SPA mode', async () => {
    const window = await nuxt.renderAndGetWindow(url('/'));

    window.onNuxtReady(() => {
      const html = window.document.body.innerHTML;
      expect(html).toContain('Works!');
    });
  });
})
