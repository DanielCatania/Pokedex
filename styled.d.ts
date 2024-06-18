import "styled-components";

type color = {
  "050": string;
  "100": string;
  "150": string;
  "200": string;
  "250": string;
};

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: color;
      neutral: color;
    };
    font: {
      family: string;
    };
  }
}
