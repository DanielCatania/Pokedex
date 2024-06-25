import { DefaultTheme } from "styled-components/dist/types";

const theme: DefaultTheme = {
  colors: {
    primary: "#dc3545",
    secondary: "#ffc107",
    background: "#fff",
    text: "#212529",
    error: "#8B0000",
  },
  fonts: {
    family: '"Open Sans", sans-serif',
    size: {
      base: "1rem",
      heading1: "clamp(2.8rem, 3.2rem, 4rem)",
      heading2: "clamp(2.2rem, 2.8rem, 3rem)",
      heading3: "clamp(1.6rem, 2.2rem, 2.4rem)",
      body1: "1.6rem",
      body2: "1.4rem",
    },
  },
};

export default theme;
