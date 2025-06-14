/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './common/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    './hocs/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        tablet: '640px',
        desktop: '1280px',
      },
      spacing: {
        p0: 'var(--paddings-p0)',
        p1: 'var(--paddings-p1)',
        p2: 'var(--paddings-p2)',
        p3: 'var(--paddings-p3)',
        p4: 'var(--paddings-p4)',
        p5: 'var(--paddings-p5)',
        p6: 'var(--paddings-p6)',
        p7: 'var(--paddings-p7)',
        p8: 'var(--paddings-p8)',
      },
      borderRadius: {
        b0: 'var(--paddings-p0)',
        b1: 'var(--paddings-p1)',
        b2: 'var(--paddings-p2)',
        b3: 'var(--paddings-p3)',
        b4: 'var(--paddings-p4)',
        b5: 'var(--paddings-p5)',
        b6: 'var(--paddings-p6)',
        b7: 'var(--paddings-p7)',
        b8: 'var(--paddings-p8)',
      },
      colors: {
        // Configure your custom color variables for tailwind here.
        table: '#f0f0f0',
        n0: 'var(--colors-neutrals-n0)',
        n1: 'var(--colors-neutrals-n1)',
        n2: 'var(--colors-neutrals-n2)',
        n3: 'var(--colors-neutrals-n3)',
        n4: 'var(--colors-neutrals-n4)',
        n5: 'var(--colors-neutrals-n5)',
        n6: 'var(--colors-neutrals-n6)',
        n7: '#595959',
        n8: '#222222',
        p1: 'var(--colors-primary-p1)',
        p2: 'var(--colors-primary-p2)',
        s1: 'var(--colors-secondary-s1)',
        s2: 'var(--colors-secondary-s1-2)',

        egreso: 'var(--colors-status-status-egreso)',
        error1: 'var(--colors-status-status-error1)',
        exito1: 'var(--colors-status-status-exito1)',
        ingreso: 'var(--colors-status-status-ingreso)',
      },

      padding: {
        xs: 'var(--paddings-p1)',
        s: 'var(--paddings-p2)',
        m: 'var(--paddings-p3)',
        l: 'var(--paddings-p4)',
        xl: 'var(--paddings-p5)',
        xxl: 'var(--paddings-p6)',
        super: 'var(--paddings-p7)',
        giga: 'var(--paddings-p8)',
      },
      gap: {
        xs: '0.4rem',
        s: '0.625rem',
        m: '0.83rem',
        l: '1.15rem',
        xl: '2.5rem',
        xxl: '3.125rem',
        super: '5rem',
      },
      fontSize: {
        small: 'var(--typography-small)',
        p: 'var(--typography-p)',
        h6: 'var(--typography-h6)',
        h5: 'var(--typography-h5)',
        h4: 'var(--typography-h4)',
        h3: 'var(--typography-h3)',
        h2: 'var(--typography-h2)',
        h1: 'var(--typography-h1)',
      },
      boxShadow: {
        customShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.25)', /// Check
        Elevation1: '0px 1px 3px 0px rgba(0, 0, 0, 0.30)', /// Check
        Elevation2: '0px 2px 5px 0px rgba(0, 0, 0, 0.20)',
        Elevation3: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        Elevation4: '0px 0px 15px 0px rgba(0, 0, 0, 0.30)', /// Check
        Elevation5: '0px 1px 4px 0px rgba(0, 0, 0, 0.15)',
        't-lg': '0 -2px 4px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
