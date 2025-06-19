/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './common/**/*.{js,ts,jsx,tsx,mdx}',
    './views/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      tablet: '640px',
      desktop: '900px',
    },
    extend: {
      backgroundImage: {
        'sharp-gradient':
          "linear-gradient(to bottom, var(--colors-neutrals-n1) 0%, var(--colors-neutrals-n1) 50%, var(--colors-palette-p1) 51%, var(--colors-palette-p1) 100%), url('/textures/noise.svg')",
      },
      backgroundBlendMode: {
        overlay: 'overlay',
      },
      colors: {
        fe1: 'var(--colors-feedback-fe1)',
        fe2: 'var(--colors-feedback-fe2)',
        fi1: 'var(--colors-feedback-fi1)',
        fi2: 'var(--colors-feedback-fi2)',
        fs1: 'var(--colors-feedback-fs1)',
        fs2: 'var(--colors-feedback-fs2)',
        fw1: 'var(--colors-feedback-fw1)',
        fw2: 'var(--colors-feedback-fw2)',

        n0: 'var(--colors-neutrals-n0)',
        n1: 'var(--colors-neutrals-n1)',
        'n1-2-bamba': 'var(--colors-neutrals-n1-2-bamba)',
        n10: 'var(--colors-neutrals-n10)',
        n2: 'var(--colors-neutrals-n2)',
        n3: 'var(--colors-neutrals-n3)',
        n4: 'var(--colors-neutrals-n4)',

        p1: 'var(--colors-palette-p1)',
        'p1-25': 'var(--colors-palette-p1-25)',
        'p1-50': 'var(--colors-palette-p1-50)',
        p2: 'var(--colors-palette-p2)',
        p3: 'var(--colors-palette-p3)',
        'p1-soft': 'var(--colors-palette-p1-soft)',
        ct: 'var(--colors-palette-complement)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        rs: 'var(--radius-sm)',
        rm: 'var(--radius-md)',
        rl: 'var(--radius-lg)',
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        s: 'var(--spacing-sm)',
        sm: 'var(--spacing-sm)',
        m: 'var(--spacing-md)',
        md: 'var(--spacing-md)',
        l: 'var(--spacing-l)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
      },
      boxShadow: {
        e1: 'var(--elevation-e1)',
        e2: 'var(--elevation-e2)',
        e3: 'var(--elevation-e3)',
        e4: 'var(--elevation-e4)',
        colored: 'var(--elevation-colored)',
        'inset-strong': 'var(--elavation-inset)',
      },
      zIndex: {
        modal: 1000,
        tooltip: 2000,
      },
      fontSize: {
        h1: 'var(--text-h1-r)',
        h2: 'var(--text-h2-r)',
        h3: 'var(--text-h3-r)',
        h4: 'var(--text-h4-r)',
        h5: 'var(--text-h5-r)',
        h6: 'var(--text-h6-r)',
        p: 'var(--text-p-r)',
        s: 'var(--text-s-r)',
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [lineClamp],
};
