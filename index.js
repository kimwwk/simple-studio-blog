// index.js

// Import required modules
import readline from "readline";
import "./config.js";

import { createNewPost } from "./lib-wordpress.js";
import { generatePostByOpenai } from "./lib-openai.js";
import { readFileAndPutLinesInArray, readFileContent } from "./lib-fs.js";
import logger from "./logger.js";

// env variables
const TOPIC_FILE_PATH = process.env.TOPIC_FILE_PATH;
const PROMPT_FILE_PATH = process.env.PROMPT_FILE_PATH;

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

// Function to welcome user and start asking questions
async function main() {
  try {
    const inputFileName = await question("Welcome! Please enter input file: ");

    const inputFile = TOPIC_FILE_PATH + inputFileName;

    logger.info("Input file:", inputFile);

    const prompt = await readFileContent(PROMPT_FILE_PATH);

    logger.info("Target prompt:", prompt);

    const lines = await readFileAndPutLinesInArray(inputFile);

    logger.info("Target lines length:", lines.length);
    logger.info("Target lines result:", lines);

    for (const line of lines) {
      const item = await generatePostByOpenai(prompt, line);
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
