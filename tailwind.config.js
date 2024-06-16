/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        border: "var(--border)",
        "destructive-foreground": "var(--destructive-foreground)",
        destructive: "var(--destructive)",

        purple: "var(--purple)",
        "light-purple": "var(--light-purple)",
        green: "var(--green)",
        "light-green": "var(--light-green)",
        red: "var(--red)",
        "light-red": "var(--light-red)",
        blue: "var(--blue)",
        "light-blue": "var(--light-blue)",
        orange: "var(--orange)",
        "light-orange": "var(--light-orange)",
        yellow: "var(--yellow)",
        "light-yellow": "var(--light-yellow)",
        pink: "var(--pink)",
        "light-pink": "var(--light-pink)",
      },
    },
  },
  plugins: [],
};
