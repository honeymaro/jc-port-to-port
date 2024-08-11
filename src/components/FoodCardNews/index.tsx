import { css } from "@emotion/react";
import styled from "@emotion/styled";
import api from "api";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";
import AIImage from "./AIImage";
import { LightbulbIcon } from "lucide-react";
import imgSampleGalbi from "assets/images/samples/galbi.png";
import imgSampleVitamin from "assets/images/samples/vitamin.png";

const samples = {
  galbi: {
    url: "https://mommytalk.onelink.me/CgfW/t7991919?deep_link_value=mmtalk-kr-app://shopping/detail/120623654/0",
    imageUrl: imgSampleGalbi,
  },
  vitamin: {
    url: "https://mommytalk.onelink.me/CgfW/t7991919?deep_link_value=mmtalk-kr-app://shopping/detail/115335377/0",
    imageUrl: imgSampleVitamin,
  },
};

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
  const sample = useMemo(() => {
    const keyword = searchKeyword?.split(" ").pop()?.toLowerCase();
    if (keyword) {
      if (["galbi", "갈비", "고기", "food"].includes(keyword)) {
        return samples.galbi;
      }
      if (["vitamin", "비타민", "영양제", "supplements"].includes(keyword)) {
        return samples.vitamin;
      }
    }
    return samples.galbi;
  }, [searchKeyword]);
  return (
    <Wrapper>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 4px;
          max-width: 512px;
          margin: 0 auto;
          animation: shadows 2s infinite;
          @keyframes shadows {
            0% {
              text-shadow: #48abe0 0 0 10px;
            }
            50% {
              text-shadow: blueviolet 0 0 10px;
            }
            75% {
              text-shadow: rebeccapurple 0 0 10px;
            }
            100% {
              text-shadow: #48abe0 0 0 10px;
            }
          }
        `}
      >
        <LightbulbIcon />
        Mommytalk AI
      </div>
      {isLoading ? (
        <div
          css={css`
            width: 100%;
            max-width: 512px;
            margin: 0 auto;
          `}
        >
          <Skeleton
            width="100%"
            style={{
              height: 0,
              paddingTop: "100%",
            }}
          />
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
            {sample && (
              <div>
                <div
                  css={css`
                    width: 100%;
                    height: 0;
                    position: relative;
                    padding-bottom: 100%;
                  `}
                >
                  <div
                    css={css`
                      width: 100%;
                      height: 100%;
                      position: absolute;

                      left: 0;
                      top: 0;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                    `}
                  >
                    <div>We recommend this product!</div>
                    <br />
                    <a
                      href={sample.url}
                      css={css`
                        display: inline-block;
                        margin: 0 auto;
                        width: 80%;
                      `}
                    >
                      <img src={sample.imageUrl} width="100%" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </Slider>
        </div>
      )}
    </Wrapper>
  );
}

export default FoodCardNews;
