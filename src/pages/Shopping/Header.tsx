import styled from "@emotion/styled";
import imgLeft from "assets/images/header/left.png";
import imgRight from "assets/images/header/right.png";
import ImageRow from "components/ImageRow";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 36px;
  background-color: #ffffff;
  z-index: 10;
`;

const DemoButton = styled.button`
  background-color: red;
  width: 36px;
  height: 36px;
  position: absolute;
  right: 60px;
  top: 0;
  z-index: 100;
  opacity: 0;
  padding: 0;
  border: none;
  cursor: pointer;
  margin: 0;
`;

function Header() {
  return (
    <Wrapper>
      <ImageRow
        images={[
          {
            url: imgLeft,
            backgroundPositionX: "0%",
          },
          {
            url: imgRight,
            backgroundPositionX: "100%",
          },
        ]}
      />
      <Link to="search">
        <DemoButton />
      </Link>
    </Wrapper>
  );
}

export default Header;
