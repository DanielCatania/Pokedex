import styled from "styled-components";

export const Box = styled.section`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  gap: 1em;
  padding: 1em;

  position: relative;
  margin-bottom: 120px;
  #sentry {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -120px;
  }

  #sentry.invisible {
    display: none;
  }
`;
