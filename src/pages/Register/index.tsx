import styled from "@emotion/styled";
import imgTitle from "assets/images/register/title.png";
import imgBackground from "assets/images/register/background.png";
import imgLeft from "assets/images/register/left.png";
import imgRight from "assets/images/register/right.png";
import imgCenter from "assets/images/register/center.png";
import { css } from "@emotion/react";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${imgBackground});
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
`;

function RegisterPage() {
  return (
    <Wrapper>
      <img
        src={imgTitle}
        alt="title"
        css={css`
          position: relative;
          top: 8px;
          width: 200px;
        `}
      />
      <img
        src={imgLeft}
        alt="left"
        css={css`
          position: absolute;
          left: 0;
          top: 20%;
          width: 250px;
          height: auto;
        `}
      />
      <img
        src={imgRight}
        alt="right"
        css={css`
          position: absolute;
          right: 0;
          bottom: 20%;
          width: 200px;
          height: auto;
        `}
      />
      <img
        src={imgCenter}
        alt="center"
        css={css`
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
        `}
      />
      {/* <h1>Register</h1> */}
    </Wrapper>
  );
}

export default RegisterPage;
