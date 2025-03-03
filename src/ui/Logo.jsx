import styled from "styled-components";
import { useTheme } from "../context/ThemeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useTheme();

  const src = isDarkMode ? "/logo-light.png" : "/logo-dark.png";
  return (
    <StyledLogo>
      <Img src={src} alt='Logo' />
    </StyledLogo>
  );
}

export default Logo;
