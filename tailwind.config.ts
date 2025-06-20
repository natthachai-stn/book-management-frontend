import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/components/**/*.{vue,js,ts,tsx}',
        './src/layouts/**/*.vue',
        './src/pages/**/*.vue',
        './src/app.vue',
        './src/plugins/**/*.{js,ts,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
export default config