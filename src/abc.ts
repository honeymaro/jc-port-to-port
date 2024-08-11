import { dot, norm, add, subtract } from "mathjs";
import openai from "./api/openai";

function cosineSimilarity(array1, array2) {
  const dotProduct = dot(array1, array2);
  const normA = norm(array1);
  const normB = norm(array2);
  const cosineSimilarity = dotProduct / (normA * normB);

  return cosineSimilarity;
}

function cosineDifference(array1, array2) {
  return 1 - cosineSimilarity(array1, array2);
}

function sortBySimilarity(embedding, wordsWithEmbeddings) {
  return wordsWithEmbeddings
    .map((wordWithEmbedding) => {
      const similarity = cosineSimilarity(
        embedding,
        wordWithEmbedding.embedding
      );
      return { word: wordWithEmbedding.word, similarity };
    })
    .sort((a, b) => b.similarity - a.similarity);
}

async function main() {
  const words = ["King", "Queen", "man", "woman", "dog", "wolf", "pet"];

  // fetch embeddings for each word
  const wordsWithEmbeddings = await Promise.all(
    words.map(async (word) => {
      const { data } = await openai.embeddings.create({
        model: "text-embedding-3-large",
        input: word,
        encoding_format: "float",
      });
      return { word, embedding: data[0].embedding };
    })
  );

  const embeddingsByWord = wordsWithEmbeddings.reduce(
    (acc, wordWithEmbedding) => {
      acc[wordWithEmbedding.word] = wordWithEmbedding.embedding;
      return acc;
    },
    {}
  );

  const kingMinusManPlusWoman = add(
    subtract(embeddingsByWord["King"], embeddingsByWord["man"]),
    embeddingsByWord["woman"]
  );
  console.log(
    "king + man - woman",
    sortBySimilarity(kingMinusManPlusWoman, wordsWithEmbeddings)
  );

  const wolfPlusPet = add(embeddingsByWord["wolf"], embeddingsByWord["pet"]);
  console.log("wolf + pet", sortBySimilarity(wolfPlusPet, wordsWithEmbeddings));
}

main();
