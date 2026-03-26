/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'hn-primary': '#10233f',
        'hn-secondary': '#244b78',
        'hn-accent': '#0d6fb8',
        'hn-accent-strong': '#0b5fa0',
        'hn-surface': '#f3f6fb',
        'hn-surface-soft': '#e7edf5',
        'hn-text': '#0f172a',
        'hn-text-muted': '#475569',
        'hn-border': '#d5dfeb',
      },
      keyframes: {
        kenburns: {
          '0%, 100%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.1) translate(-2%, -1%)' },
        },
        scrollDot: {
          '0%': { opacity: '1', top: '6px' },
          '100%': { opacity: '0', top: '20px' },
        },
        modalSlideIn: {
          'from': { transform: 'translateY(-50px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        kenburns: 'kenburns 20s ease-in-out infinite',
        scrollDot: 'scrollDot 1.8s ease infinite',
        modalSlideIn: 'modalSlideIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
