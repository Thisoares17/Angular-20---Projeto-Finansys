import { bootstrapApplication } from '@angular/platform-browser';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'toastr/build/toastr.min.js';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
  
