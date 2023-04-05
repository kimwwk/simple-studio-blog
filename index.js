// index.js

import "./config.js";

import { createPostsByAi, getPosts } from "./simple-studio/methods.js";

import logger from "./singletons/logger.js";
import readliner from "./singletons/readliner.js";

// Function to welcome user and start asking questions
async function main() {
  try {
    const actionName = await readliner.question(
      "Welcome! Please select your action: "
    );

    switch (actionName) {
      case "bulk-create":
        const inputFileName = await question("Please enter input file: ");
        await createPostsByAi(inputFileName);

        logger.info("Successfully created everything :)");

        break;
      case "bulk-get":
        await getPosts();

        logger.info("Successfully got everything :)");
        break;
      case "single-create":
        // update the post object manually
        const singleJsonObject = {};
        await createNewPostToWordPress(singleJsonObject);

        logger.info("Successfully created one :)");

        break;
      default:
        logger.info("No action has been made :)");
    }
  } catch (error) {
    // Handle the error and terminate the process
    logger.error("An error occurred:", error);
  }

  // Don't forget to close the readline interface when you're done with all the questions
  readliner.close();
}

main();
