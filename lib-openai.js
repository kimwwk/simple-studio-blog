import axios from "axios";
import { parseJSON } from "./util.js";

import logger from "./logger.js";

const OPENAI_ENDPOINT = process.env.OPENAI_ENDPOINT;
// const OPENAI_ORG = process.env.OPENAI_ORG;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function getGptChatResponse(prompt) {
  const response = await axios({
    method: "post",
    url: OPENAI_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
      //   "OpenAI-Organization": OPENAI_ORG,
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    data: {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 3000,
    },
  });

  if (response.status != 200) {
    throw new Error("Failed to fetch from OpenAI API");
  }

  const result = response.data;

  return result.choices[0]?.message.content;
}

async function generatePostByOpenai(prompt, topic) {
  logger.info("Target topic:", topic);

  const generatedPrompts = prompt.replace("${topic}", topic);

  const results = await getGptChatResponse(generatedPrompts);

  logger.info("Fetched getGptChatResponse results:", results);

  const json = parseJSON(results.trim());

  return json;
}

export { generatePostByOpenai };
