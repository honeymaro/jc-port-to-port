import NavBar from "components/NavBar";
import { css, Global } from "@emotion/react";
import { normalize } from "polished";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & > div {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
  }

  & > nav {
  }
`;

function App() {
  return (
    <Wrapper
      onClick={() => {
        document.body.requestFullscreen();
      }}
    >
      <Global
        styles={css`
          ${normalize()}
          html,body {
            background-color: #ffffff;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
          }
          * {
            box-sizing: border-box;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
          }
        `}
      />
      <div>
        <Outlet />
      </div>
      <NavBar />
    </Wrapper>
  );
}

export default App;
