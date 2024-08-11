export const generateImage = async (messages: string[]) => {
  const promises = messages.map(async (message) => {
    const res = await fetch("/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        prompt: message,
        image: {
          size: "square",
        },
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await res.json();
    return `data:image/jpeg;base64,${data?.data?.[0]?.base64}`;
  });
  return Promise.all(promises);
};
