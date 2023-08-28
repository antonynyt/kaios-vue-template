import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { babel, getBabelOutputPlugin } from '@rollup/plugin-babel'
import { resolve } from 'path'
import css from 'rollup-plugin-css-only'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // we'll extract any component CSS out into
        // a separate file - better for performance
        css({ output: 'bundle.css' }),
        babel({
            extensions: ['.js', '.ts', '.html', '.svelte'],
            babelHelpers: 'runtime',
            exclude: ['node_modules/@babel/**'],
            plugins: [
                '@babel/plugin-syntax-dynamic-import',
                [
                    '@babel/plugin-transform-runtime',
                    {
                        useESModules: true,
                        regenerator: false,
                    },
                ],
            ],
        }),
        // vite transpilee to es5:
        // https://github.com/vitejs/vite/issues/10981#issuecomment-1321383114
        getBabelOutputPlugin({
            allowAllFormats: true,
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: { firefox: '48' },
                        exclude: ['@babel/plugin-transform-regenerator'],
                    },
                ],
            ],
        }),
    ],
    build: {
        target: 'es2015',
        rollupOptions: {
            input: 'src/main.js',
            output: {
                name: 'app',
                format: 'iife',
                dir: resolve(__dirname, 'dist'),
                entryFileNames: `bundle.js`,
                chunkFileNames: `bundle.js`,
                assetFileNames: `bundle.[ext]`,
            },
            context: 'window',
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    server: {
        port: 5173,
    },
    css: {
        postcss: true,
    }
})
