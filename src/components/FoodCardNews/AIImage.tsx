import { css } from "@emotion/react";
import api from "api";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

function AIImage({ message }: { message: string }) {
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    let isAborted = false;
    const fetchImage = async () => {
      try {
        const res = await api.generateImage([message]);
        if (isAborted) {
          throw new Error("Aborted");
        }
        setImage(res[0] || null);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImage();

    return () => {
      isAborted = true;
    };
  }, [message]);

  return image ? (
    <img
      width="100%"
      src={image}
      alt={message}
      css={css`
        border-radius: 16px;
      `}
    />
  ) : (
    <Skeleton
      width="100%"
      style={{
        height: 0,
        paddingTop: "100%",
      }}
      borderRadius={16}
    />
  );
}

export default AIImage;
