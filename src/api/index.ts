import { generateImage } from "./cardnews";
import { checkFoodSafety, isFoodName } from "./food";

const api = {
  isFoodName,
  checkFoodSafety,
  generateImage,
};

export default api;
