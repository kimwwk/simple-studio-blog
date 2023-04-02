// index.js

// Import required modules
import readline from "readline";
import "./config.js";

import { createNewPost } from "./lib-wordpress.js";
import { getBlogBasicInfo } from "./lib-openai.js";
import { readFileAndPutLinesInArray } from "./lib-fs.js";
import { parseJSON } from "./util.js";
import logger from "./logger.js";

// Create a readline interface for user input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to wrap rl.question in a Promise
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function generatePostByAi(topic) {
  logger.info("Topic to generate:", topic);

  const getBlogBasicInfoResult = await getBlogBasicInfo(topic);

  logger.info("Fetched getBlogBasicInfo result:", getBlogBasicInfoResult);

  const json = parseJSON(getBlogBasicInfoResult.trim());

  return json;
}

async function createNewPostToWordPress(json) {
  const createNewPostResults = await createNewPost(
    json.title,
    json.content,
    json.meta,
    [5, 4]
  );
  logger.info("Fetched createNewPost id:", createNewPostResults.id);

  logger.info("Successfully created 1 new post");
}

// Function to welcome user and start asking questions
async function main() {
  try {
    const inputFileName = await question("Welcome! Please enter input file: ");

    const inputFile = process.env.TOPIC_FILE_PATH + inputFileName;

    logger.info("InputFile: ", inputFile);

    const lines = await readFileAndPutLinesInArray(inputFile);

    logger.info("Lines length:", lines.length);
    logger.info("Lines result:", lines);

    for (const line of lines) {
      const item = await generatePostByAi(line);
      await createNewPostToWordPress(item);
    }

    logger.info("Successfully created everything :)");
  } catch (error) {
    // Handle the error and terminate the process
    logger.error("An error occurred:", error);
  }

  // Don't forget to close the readline interface when you're done with all the questions
  rl.close();
}

main();

// const singleJsonObject =
// await createNewPostToWordPress(singleJsonObject);
