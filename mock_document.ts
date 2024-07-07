import { parseHTML } from "linkedom";

globalThis.document = parseHTML(`
  <!doctype html>
  <html lang="en">
    <head></head>
    <body></body>
  </html>
`).document;
