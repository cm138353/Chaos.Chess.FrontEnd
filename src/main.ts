import Aurelia from 'aurelia';
import { RouterConfiguration } from '@aurelia/router';
import { MyApp } from './my-app';
import { MissingPage } from './NotFound/missingPage';

Aurelia
  .register(RouterConfiguration.customize({
    useUrlFragmentHash: true,
    fallback: MissingPage,
  }))
  .app(MyApp)
  .start();
