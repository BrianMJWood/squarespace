import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { appReducer } from './state/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { AppEffects } from './state/app.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideStore({ app: appReducer }),
    provideEffects([AppEffects]),
    HttpClient,
  ],
};
