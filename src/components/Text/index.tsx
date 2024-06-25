import styled from "styled-components";

interface IText {
  size?: "heading1" | "heading2" | "heading3" | "body1" | "body2" | "base";
  color?: "primary" | "secondary" | "background" | "text" | "error";
}

const Text = styled.p.withConfig({
  shouldForwardProp: (props) => !["size"].includes(props),
})<IText>`
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme, size = "base" }) => theme.fonts.size[size]};
  font-weight: ${({ size = "base" }) => {
    if (size === "heading1" || size === "heading2" || size === "heading3") {
      return "bold";
    }
  }};

  color: ${({ theme, color = "text" }) => theme.colors[color]};
`;

export default Text;
