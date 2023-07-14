import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
/*export default defineConfig({
  plugins: [react()],
})*/

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],

    define: {
      "process.env": mode === "production" ? '"production"' : '"development"',
    },

    //other configs...
  };
});
