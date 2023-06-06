// index.js

import "./config.js";

import {
  createPostsByAi,
  createPostByAi,
  getPosts,
} from "./simple-studio/methods.js";

import logger from "./singletons/logger.js";
import readliner from "./singletons/readliner.js";

// Function to welcome user and start asking questions
async function main() {
  try {
    logger.info(`Welcome!

| number | action                  | remark   |
| ------ | ----------------------- | -------- |
| 1      | bulk-create             |
| 2      | bulk-get                |
| 3      | single-create           |
| 4      | single-get              | not done |
| 5      | single-create-with-json |
`);
    const actionName = await readliner.question("Please select your action: ");

    switch (actionName) {
      case "1":
        const inputFileName = await readliner.question(
          "Please enter input file: "
        );
        await createPostsByAi(inputFileName);

        logger.info("Successfully created everything :)");

        break;
      case "2":
        await getPosts();

        logger.info("Successfully got everything :)");
        break;
      case "3":
        const inputTopicName = await readliner.question(
          "Please enter input topic: "
        );
        await createPostByAi(inputTopicName);

        logger.info("Successfully created one :)");
        break;
      case "5":
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
