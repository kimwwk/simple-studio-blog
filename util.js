import JSON5 from "json5";
import logger from "./singletons/logger.js";

const parseJSON = (jsonString) => {
  try {
    return JSON5.parse(jsonString);
  } catch (error) {
    if (error instanceof SyntaxError) {
      logger.warn("utils parseJSON met a SyntaxError:", error);

      let updatedJsonString = jsonString.replace(/\\n|\\r|[\n\r]/g, "");

      logger.warn("utils parseJSON updatedJsonString:", updatedJsonString);

      return JSON5.parse(updatedJsonString);
    }

    throw error;
  }
};

export { parseJSON };
