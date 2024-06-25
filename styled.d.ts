import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      error: string;
    };
    fonts: {
      family: string;
      size: {
        base: string;
        heading1: string;
        heading2: string;
        heading3: string;
        body1: string;
        body2: string;
      };
    };
  }
}
