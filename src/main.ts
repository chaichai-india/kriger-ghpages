import "hammerjs";
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
  if (window) {
    window.console.log = function () {};
  } else {
    console.log = function () {};
  }
}

document.addEventListener("DOMContentLoaded", () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});

// document.addEventListener("DOMContentLoaded", () => {
//   setTimeout(
//     () =>
//       platformBrowserDynamic()
//         .bootstrapModule(AppModule)
//         .catch(err => console.log(err)),
//     10
//   );
// });
