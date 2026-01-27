/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#FEF2F2',   // Lightest red tint
                    100: '#FEE2E2',  // Very light red
                    200: '#FECACA',  // Light red
                    300: '#FCA5A5',  // Soft red
                    400: '#F87171',  // Medium red
                    500: '#EF6E76',  // Main coral/pink (#ef6e76)
                    600: '#CE0506',  // Main red (#ce0506)
                    700: '#B91C1C',  // Dark red
                    800: '#991B1B',  // Darker red
                    900: '#7F1D1D',  // Darkest red
                },
                accent: {
                    50: '#FFF5F5',   // Lightest coral
                    100: '#FFE8E9',  // Very light coral
                    200: '#FFD1D3',  // Light coral
                    300: '#FFBABF',  // Soft coral
                    400: '#FF9BA3',  // Medium coral
                    500: '#EF6E76',  // Main coral (#ef6e76)
                    600: '#E94B54',  // Vibrant coral
                    700: '#D32F38',  // Deep coral
                    800: '#B71C1C',  // Dark coral
                    900: '#8B0000',  // Darkest coral
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
