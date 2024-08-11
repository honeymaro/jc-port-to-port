import styled from "@emotion/styled";
import { CSSProperties } from "react";

interface ImageRowProps {
  images?: {
    url?: string;
    backgroundPositionX?: CSSProperties["backgroundPositionX"];
  }[];
  justifyContent?: CSSProperties["justifyContent"];
}

const Wrapper = styled.div<ImageRowProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
  width: 100%;
  height: 100%;

  & > div {
    height: 100%;
    flex: 1;
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: center;
  }
`;

function ImageRow({ images, justifyContent = "space-between" }: ImageRowProps) {
  return (
    <Wrapper justifyContent={justifyContent}>
      {images?.map(({ url, backgroundPositionX = "0%" }) => (
        <div
          key={url}
          style={{ backgroundImage: `url(${url})`, backgroundPositionX }}
        />
      ))}
    </Wrapper>
  );
}

export default ImageRow;
