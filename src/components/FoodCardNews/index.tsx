import { css } from "@emotion/react";
import styled from "@emotion/styled";
import api from "api";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";
import AIImage from "./AIImage";

interface FoodCardNewsProps {
  messages: string[];
  score?: number;
  searchKeyword?: string;
  isLoading?: boolean;
}

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

function FoodCardNews({
  messages,
  score,
  searchKeyword,
  isLoading,
}: FoodCardNewsProps) {
  return (
    <Wrapper>
      {isLoading ? (
        <div
          css={css`
            max-width: 512px;
            margin: 0 auto;
          `}
        >
          <Skeleton height={200} />
          <Skeleton count={2} />
        </div>
      ) : (
        <div
          css={css`
            padding-bottom: 20px;
          `}
        >
          <Slider
            infinite={false}
            dots
            speed={1000}
            slidesToScroll={1}
            slidesToShow={1}
            lazyLoad="ondemand"
          >
            {messages.map((message) => (
              <div
                key={message}
                css={css`
                  padding: 8px;
                `}
              >
                <div
                  css={css`
                    max-width: 512px;
                    margin: 0 auto;
                  `}
                >
                  <div
                    css={css`
                      margin-bottom: 8px;
                    `}
                  >
                    <AIImage message={message} />
                  </div>
                  <div>{message}</div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </Wrapper>
  );
}

export default FoodCardNews;
