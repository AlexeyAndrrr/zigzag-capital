import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Zigzag Capital landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Zigzag Capital — Capital for the unexpected turn<\/title>/i,
  );
  assert.match(html, /The future/);
  assert.match(html, /never moves/);
  assert.match(html, /Advisory/);
  assert.match(html, /Investment/);
  assert.match(html, /Networking/);
  assert.match(html, /\$TRUMP/);
  assert.match(html, /World Liberty Financial/);
  assert.match(html, /Virtuals ecosystem/);
  assert.match(html, /Peanut the Squirrel/);
  assert.match(html, /DAOS\.FUN/);
  assert.match(html, /Start a conversation/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("ships motion fallbacks, semantics, and local brand assets", async () => {
  const [page, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<main/);
  assert.match(page, /aria-labelledby="hero-title"/);
  assert.match(page, /aria-label="Primary navigation"/);
  assert.match(page, /<SignalCanvas \/>/);
  assert.match(page, /prefers-reduced-motion: reduce/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /a:focus-visible/);
  assert.match(css, /@media \(hover: none\), \(pointer: coarse\)/);
  assert.match(layout, /Zigzag Capital/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await Promise.all(
    [
      "trump.png",
      "wlfi.png",
      "virtuals.svg",
      "pnut.png",
      "daos.png",
    ].map((file) =>
      access(new URL(`../public/portfolio/${file}`, import.meta.url)),
    ),
  );
});
