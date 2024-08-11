import OpenAI from "openai";

const url = new URL(window.location.href);
url.pathname = "/ai";

const openai = new OpenAI({
  baseURL: url.href,
  dangerouslyAllowBrowser: true,
  apiKey: "-",
});

export default openai;
