export const colors = {
  light: {
    background: "hsl(60 4% 95%)", // app background color
    foreground: "hsl(20 14% 4%)", // app foreground color
    popover: "hsl(0 0% 100%)",
    popoverForeground: "hsl(240 10% 3.9%)",
    primary: "hsl(25 95% 53%)", // primary color used for buttons, links and other elements
    primaryForeground: "hsl(60 9% 97%)", // text color for primary elements (in buttons)
    secondary: "hsl(0 0% 100%)",
    secondaryForeground: "hsl(24 9% 10%)",
    muted: "hsl(60 4% 95%)",
    mutedForeground: "hsl(25 5% 44%)",
    accent: "hsl(60 4% 95%)",
    accentForeground: "hsl(24 9% 10%)",
    border: "hsl(20 5% 80%)",
    destructive: "hsl(0 83% 50%)",
    destructiveForeground: "hsl(0 0% 98%)",
  },
  dark: {
    background: "hsl(240 10% 3.9%)",
    foreground: "hsl(0 0% 98%)",
    popover: "hsl(240 3.7% 15.9%)",
    popoverForeground: "hsl(0 0% 98%)",
    primary: "hsl(25 95% 53%)",
    primaryForeground: "hsl(0 0% 98%)",
    secondary: "hsl(240 3.7% 15.9%)",
    secondaryForeground: "hsl(0 0% 98%)",
    muted: "hsl(240 3.7% 15.9%)",
    mutedForeground: "hsl(240 5% 64.9%)",
    accent: "hsl(240 3.7% 15.9%)",
    accentForeground: "hsl(0 0% 98%)",
    border: "hsl(240 5% 65%)",
    destructive: "hsl(0 72.2% 35%)",
    destructiveForeground: "hsl(60 9.1% 97.8%)",
  },

  lightPurple: "hsl(280, 78%, 95%)",
  purple: "hsl(280, 93%, 43%)",
  lightOrange: "hsl(31, 78%, 95%)",
  orange: "hsl(31, 93%, 43%)",
  lightGreen: "hsl(137, 78%, 95%)",
  green: "hsl(137, 93%, 43%)",
  lightBlue: "hsl(137, 78%, 95%)",
  blue: "hsl(212, 93%, 43%)",
  lightRed: "hsl(11, 78%, 95%)",
  red: "hsl(11, 93%, 43%)",
  lightYellow: "hsl(54, 78%, 95%)",
  yellow: "hsl(54, 93%, 43%)",
  lightPink: "hsl(302, 78%, 95%)",
  pink: "hsl(302, 93%, 43%)",
};

export type ColorType = keyof typeof colors;
