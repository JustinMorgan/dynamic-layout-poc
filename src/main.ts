import "@angular/compiler";
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import './polyfills';



platformBrowser().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));