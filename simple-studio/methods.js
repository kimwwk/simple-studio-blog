import { createNewPost, getPostList } from "../lib-wordpress.js";
import { generatePostByOpenai } from "../lib-openai.js";
import { readFileAndPutLinesInArray, readFileContent } from "../lib-fs.js";

import logger from "../singletons/logger.js";

const TOPIC_FILE_PATH = process.env.TOPIC_FILE_PATH;
const PROMPT_FILE_PATH = process.env.PROMPT_FILE_PATH;

async function createNewPostToWordPress(json) {
  const results = await createNewPost(
    json.title,
    json.content,
    json.meta,
    [5, 4]
  );
  logger.info("Fetched createNewPost results id:", results.id);

  logger.info("Successfully created 1 new post");
}

const createPostsByAi = async (inputFileName) => {
  const inputFile = TOPIC_FILE_PATH + inputFileName;

  logger.info("Input file:", inputFile);

  const prompt = await readFileContent(PROMPT_FILE_PATH);

  logger.info("Target prompt:", prompt);

  const lines = await readFileAndPutLinesInArray(inputFile);

  logger.info("Target lines length:", lines.length);
  logger.info("Target lines result:", JSON.stringify(lines));

  for (const line of lines) {
    const item = await generatePostByOpenai(prompt, line);
    await createNewPostToWordPress(item);
  }
};

const getPosts = async () => {
  const results = await getPostList();

  logger.info("Post results length:", results.length);
  logger.info("Post results result:", JSON.stringify(results));

  return results;
};

export { createPostsByAi, getPosts };
