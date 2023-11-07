import { AppBar, Toolbar, styled } from "@mui/material";
import logos from "../assets/codepen-ar21-removebg-preview.png";
const Container = styled(AppBar)`
  background: #0ff;
  height: 9vh;
`;

const Header = () => {
  return (
    <Container position="static">
      <Toolbar>
        <img src={logos} alt="logo" style={{ width: 180, height: 100 }} />
      </Toolbar>
    </Container>
  );
};

export default Header;
