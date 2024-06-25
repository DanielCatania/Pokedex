import styled from "styled-components";

export const Box = styled.header`
  background-color: ${({ theme }) => theme.colors["secondary"]};
  margin-bottom: 1em;

  display: flex;
  justify-content: center;
  align-content: center;
`;
