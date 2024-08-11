import styled from "@emotion/styled";
import Header from "./Header";
import imgCategories from "assets/images/header/categories.png";
import { css } from "@emotion/react";
import { Link, Outlet } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`;

const Categories = styled.div`
  width: 100%;
  height: 36px;
  overflow-x: auto;
  position: sticky;
  top: 0;
  z-index: 30;

  & > img {
    height: 100%;
    width: auto;
    position: relative;
    object-fit: contain;
  }
`;

function ShoppingPage() {
  return (
    <Wrapper>
      <Header />
      <div
        css={css`
          width: 100%;
          height: 36px;
          position: relative;
        `}
      />
      <Link to="/shopping">
        <Categories>
          <img src={imgCategories} alt="categories" />
        </Categories>
      </Link>
      <Outlet />
    </Wrapper>
  );
}

export default ShoppingPage;
