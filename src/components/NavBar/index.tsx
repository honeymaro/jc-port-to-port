import styled from "@emotion/styled";
import { useState } from "react";
import { Link } from "react-router-dom";

const icons = Object.values(
  import.meta.glob("/src/assets/icons/icon-nav-*.png", {
    eager: true,
    as: "url",
  })
);
const Wrapper = styled.nav`
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 9999;

  & > a {
    flex: 1;
    height: 100%;
    filter: grayscale();
    position: relative;
    display: block;

    & > div {
      width: 100%;
      height: 100%;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
`;

const links = ["/register", "#", "/shopping", "#", "#"];

function NavBar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Wrapper>
      {icons.map((icon, index) => (
        <Link to={links[index]} key={icon}>
          <div
            style={{
              backgroundImage: `url(${icon})`,
              filter: index === selectedIndex ? "none" : "grayscale()",
            }}
            onClick={() => setSelectedIndex(index)}
          />
        </Link>
      ))}
    </Wrapper>
  );
}

export default NavBar;
