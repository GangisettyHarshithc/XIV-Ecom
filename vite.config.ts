import { defineConfig } from 'vite';
import { angularBuilder } from '@angular/build';

export default defineConfig({
  build: {
    target: ['es2020'],
  },
  plugins: [
    angularBuilder(),
  ],
});
