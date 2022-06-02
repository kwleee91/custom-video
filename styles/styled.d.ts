import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      red: string;
      blue: string;
      sky: string;
      white: string;
      gray: string;
      lightgray: string;
      darkgray: string;
      black: string;
    };
  }
}
