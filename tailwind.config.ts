import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        myprimary: {
          50: '#fef9e8',
          100: '#fcf1c7',
          200: '#f8de92',
          300: '#f5c653',
          400: '#f1af0f', // base
          500: '#df9c0b',
          600: '#b87607',
          700: '#935509',
          800: '#7a440e',
          900: '#653811',
          950: '#3a1c06',
        },
        error: {
          50: '#fdf3f2',
          100: '#fbe5e3',
          200: '#f5c8c4',
          300: '#eea099',
          400: '#e46c61',
          500: '#cc2514', // base error
          600: '#b01c0c',
          700: '#931509',
          800: '#7a140b',
          900: '#65170f',
          950: '#370805',
        },
        alternate: {
          empty: '',
          DEFAULT: '#fef6f0',
          dark: '#212529',
          light: '#fef6f0'
        },
        customtext: {
          empty: '',
          DEFAULT: '#212529',
          dark: '#fef6f0',
          light: '#212529'
        }
      }
    }
  }
}
