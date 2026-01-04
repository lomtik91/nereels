import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    server: {
      host: true
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @use "@/scss/variables/sizes.scss" as *;
                    @use "@/scss/variables/colors.scss" as *;
                `
            },
        },
    }
});