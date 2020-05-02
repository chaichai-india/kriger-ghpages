// These are important and needed before anything else
import "zone.js/dist/zone-node";
import "reflect-metadata";

import { enableProdMode } from "@angular/core";
import { ngExpressEngine } from "@nguniversal/express-engine";
import { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader";

import * as express from "express";
import { join } from "path";
import { readFileSync } from "fs";

import * as compression from "compression";

import * as domino from "domino";

// Polyfills required for Firebase
(global as any).WebSocket = require("ws");
(global as any).XMLHttpRequest = require("xhr2");

// gtag not defined workaround

// @ts-ignore
global.gtag = () => {};
// Faster renders in prod mode
enableProdMode();

// Export our express server
export const app = express();
app.use(compression());

const DIST_FOLDER = join(process.cwd(), "dist");
const APP_NAME = "kriger-campus-website";

const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP,
} = require(`./dist/${APP_NAME}-server/main`);

// index.html template
const template = readFileSync(
  join(DIST_FOLDER, APP_NAME, "index.html")
).toString();

const win = domino.createWindow(template);

global["window"] = win;
global["document"] = win.document;

// import { renderModuleFactory } from "@angular/platform-server";
// app.engine("html", (_, options, callback) => {
//   renderModuleFactory(AppServerModuleNgFactory, {
//     // Our index.html
//     document: template,
//     url: options.req.url,
//     // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
//     extraProviders: [provideModuleMap(LAZY_MODULE_MAP)],
//   }).then((html) => {
//     callback(null, html);
//   });
// });

app.engine(
  "html",
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)],
  })
);

app.set("view engine", "html");
app.set("views", join(DIST_FOLDER, APP_NAME));

// Serve static files
app.get("*.*", express.static(join(DIST_FOLDER, APP_NAME)));

// All regular routes use the Universal engine
app.get("*", (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  res.render(join(DIST_FOLDER, APP_NAME, "index.html"), { req });
});

// spin up a Node server

const PORT = process.env.PORT || 8500;
app.listen(PORT, () => {
  console.log(`Angular Node server listening on ${PORT}`);
});
