import { css } from "@emotion/react";
import styled from "@emotion/styled";
import ImageRow from "components/ImageRow";
import imgExpandLeft from "assets/images/expand/left.png";
import imgExpandRight from "assets/images/expand/right.png";

import imgRankingsLeft from "assets/images/rankings/left.png";
import imgRankingsRight from "assets/images/rankings/right.png";

import imgSearchContent from "assets/images/search/content.jpg";
import { SearchIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import api from "api";
import FoodCardNews from "components/FoodCardNews";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
  & > div {
    background-color: #ffffff;
  }
`;

const SearchInputWrapper = styled.form`
  width: 100%;
  height: 36px;

  border: 2px solid #f0f0f0;
  border-radius: 18px;

  display: flex;
  align-items: center;
  overflow: hidden;

  & > input {
    flex: 1;
    height: 100%;
    border: none;
    outline: none;
    padding: 0 16px;
  }
`;

function SearchPage() {
  const [inputValue, setInputValue] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [foodInfoMessages, setFoodInfoMessages] = useState<string[]>([]);
  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (event) => {
      event.preventDefault();
      setSearchKeyword(inputValue);
      setEnglishName("");
      setFoodInfoMessages([]);
      document.querySelector("input")?.blur?.();
    },
    [inputValue]
  );

  useEffect(() => {
    let isAborted = false;
    const search = async () => {
      setIsMessageLoading(false);
      try {
        const { isFood, englishName } = await api.isFoodName(searchKeyword);
        if (isAborted) {
          throw new Error("Aborted");
        }
        if (!isFood) {
          console.log("Not a food");
          return;
        }
        setIsMessageLoading(true);
        setEnglishName(englishName);
        const res = await api.checkFoodSafety(searchKeyword);
        if (isAborted) {
          throw new Error("Aborted");
        }
        if (res?.messages?.length) {
          setFoodInfoMessages(res.messages);
        }
      } catch (error) {
        console.error(error);
      }
      setIsMessageLoading(false);
    };
    if (searchKeyword) {
      search();
    }

    return () => {
      isAborted = true;
    };
  }, [searchKeyword]);
  return (
    <>
      <Wrapper>
        <div
          css={css`
            padding: 16px;
          `}
        >
          <SearchInputWrapper onSubmit={handleSubmit}>
            <input
              value={inputValue}
              type="text"
              placeholder="Search"
              onChange={(event) => setInputValue(event.target.value)}
            />
            <div
              css={css`
                padding: 0 8px;
              `}
            >
              <SearchIcon width={16} />
            </div>
          </SearchInputWrapper>
        </div>
        {!foodInfoMessages?.length && !isMessageLoading && (
          <div>
            <div
              css={css`
                width: 100%;
                height: 36px;
              `}
            >
              <ImageRow
                images={[
                  {
                    url: imgExpandLeft,
                    backgroundPositionX: "0%",
                  },
                  {
                    url: imgExpandRight,
                    backgroundPositionX: "100%",
                  },
                ]}
              />
            </div>
            <div
              css={css`
                width: 100%;
                height: 143px;
              `}
            >
              <ImageRow
                images={[
                  {
                    url: imgRankingsLeft,
                    backgroundPositionX: "0%",
                  },
                  {
                    url: imgRankingsRight,
                    backgroundPositionX: "0%",
                  },
                ]}
              />
            </div>
          </div>
        )}
        {(!!foodInfoMessages?.length || isMessageLoading) && (
          <FoodCardNews
            isLoading={isMessageLoading}
            messages={foodInfoMessages}
            searchKeyword={englishName}
            score={0}
          />
        )}
        {!searchKeyword && (
          <div>
            <div
              css={css`
                max-width: 512px;
                margin: 0 auto;
              `}
            >
              <img src={imgSearchContent} width="100%" />
            </div>
          </div>
        )}
      </Wrapper>
      {searchKeyword && (
        <div
          css={css`
            width: 100%;
            height: 200vh;
            overflow: hidden;
            position: relative;
            margin-top: -393px;
            left: 0;
            z-index: -1;
            & > iframe {
              position: absolute;
              width: 100%;
              height: 100%;
              border: none;
              overflow: hidden;
            }
          `}
        >
          <iframe
            src={`https://m.shoppinghow.kakao.com/m/search/q/${encodeURIComponent(
              `${searchKeyword}`
            )}/tab:total&page:1&sort_type:1&view_type:image&page_size:40&link:0&part:N&image_filter_cnt:200&cc_type:search&recommendSortType:false&lowestSortType:false`}
          />
        </div>
      )}
    </>
  );
}

export default SearchPage;
