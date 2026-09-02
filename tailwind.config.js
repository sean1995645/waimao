/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'hn-primary': '#1b1c19',
        'hn-secondary': '#3f413b',
        'hn-accent': '#d9652d',
        'hn-accent-strong': '#b84d1d',
        'hn-surface': '#f7f5f0',
        'hn-surface-soft': '#eeeae3',
        'hn-text': '#1b1c19',
        'hn-text-muted': '#6f7069',
        'hn-border': '#d9d4ca',
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
        floatSoft: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(95, 167, 212, 0)' },
          '50%': { boxShadow: '0 0 28px rgba(95, 167, 212, 0.22)' },
        },
        driftX: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(10px)' },
        },
      },
      animation: {
        kenburns: 'kenburns 20s ease-in-out infinite',
        scrollDot: 'scrollDot 1.8s ease infinite',
        modalSlideIn: 'modalSlideIn 0.3s ease-out',
        floatSoft: 'floatSoft 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4.5s ease-in-out infinite',
        driftX: 'driftX 12s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
