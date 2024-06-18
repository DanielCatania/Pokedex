import styled from "styled-components";

const Text = styled.p`
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.colors.neutral["250"]};
`;

export default Text;
