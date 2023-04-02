import fs from "fs";

const readFileAndPutLinesInArray = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const lines = data.split("\n").filter((line) => line.trim() !== "");
    return lines;
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    return [];
  }
};

export { readFileAndPutLinesInArray };
