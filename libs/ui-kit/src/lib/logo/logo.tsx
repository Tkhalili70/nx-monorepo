import styled from "styled-components";

const StyledLogo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`;

const Img = styled.img`
  height: 3rem;
  width: auto;
    @media (max-width: 680px) {
        height: 4rem;
        margin-bottom: 15px;
    }
`;

function Logo() {
      return (
    <StyledLogo>
      <Img src={'pic of logo'} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
