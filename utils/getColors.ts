import Color from "color";

const getColor = (color: string) => {
  const col = Color(color);
  return {
    backgroundColor: col.lighten(0.6).hex(),
    foregroundColor: col.saturate(0.1).darken(0.2).hex(),
  };
};

export default getColor;
