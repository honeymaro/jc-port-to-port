import openai from "./openai";

export const isFoodName = async (query: string) => {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-2024-08-06",
    messages: [
      {
        role: "system",
        content: `You are an API service.
        You need to provide accurate information.
        In this API, the user will provide a string value. 
        Then you will provide the answer if the string is a food name or not.
        In this service, supplements are also considered as food.
        The response should be formatted in JSON, no sentences before and after the data, only the data. no \`\`\`json\`\`\` or \`\`\`javascript\`\`\` code blocks. The backend system will just parse the JSON data using JSON.parse() function.
        The response has two keys:
        - isFood: a boolean value. true means the string is a food name, false means it's not.
        - englishName: a string value. If the string is a food name, provide the English name of the food. If the string is not a food name, provide an empty string.
        User's input has only one value:
        - query: the string that the user wants to know if it's a food name or not.
        The user's input follows below.
        `,
      },
      {
        role: "user",
        content: JSON.stringify({
          query,
        }),
      },
    ],
  });
  const data = res.choices?.[0]?.message.content;

  if (data) {
    return JSON.parse(data) as { isFood: boolean; englishName: string };
  }

  return {
    isFood: false,
    englishName: "",
  };
};
export const checkFoodSafety = async (food: string) => {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-2024-08-06",
    messages: [
      {
        role: "system",
        content: `
          You are an API service. 
  You need to provide accurate information for patients suffering from infertility.
  
  In this API, the user will provide a name of food. then you will provide the answer if the food is ok to have for infertile patient.
  
  If the food is safe to have, you need to provide the reason as well.
  If the food is not safe to have, you need to tell them why and provide some alternatives.
  
  Before proceeding with food recommendation for woman,  consider the fertility status for woman. Then, if the woman has been identified as "infertile" or "sub-fertile", then please consider the medications for infertility that the woman is currently on. But do not include the medications in the response because it is private information.
  
  The response should be formatted in JSON, no sentences before and after the data, only the data. no \`\`\`json\`\`\` or \`\`\`javascript\`\`\` code blocks. The backend system will just parse the JSON data using JSON.parse() function.

  The response has 2 major keys: 
  - score: a number between 0 to 1. 1 means safe, 0 means unsafe.
  - messages: array of string. provides the information for patients.
  
  User's input has 2 values:
  - Language: the language that the user want to get an answer.
  - Food name: the name of the food that the user want to know if it's safe or not.
  - Fertility status: the fertility status of the user. (optional)
  - Medications: the medications that the user is taking. (optional)
  
  The user's input follows below.
        `,
      },
      {
        role: "user",
        content: JSON.stringify({
          foodName: food,
          language: "en",
          fertilityStatus: "infertile",
          medications: ["clomiphene"],
        }),
      },
    ],
  });

  const data = res.choices?.[0]?.message.content;

  if (data) {
    return JSON.parse(data) as { score: number; messages: string[] };
  }

  return null;
};
