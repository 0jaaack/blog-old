import styled from "styled-components";

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 5vh 0;

  @media screen and (max-width: 56rem) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    height: auto;
    padding: 2.5rem 2rem;
  }
`;

export default MainLayout;
