import axios from "axios";

const OPENAI_ENDPOINT = process.env.OPENAI_ENDPOINT;
// const OPENAI_ORG = process.env.OPENAI_ORG;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function getBlogBasicInfo(topic) {
  const prompts = `Act as a experience blog writer, follow the below requirement and generate a blog

  ---
  
  ultimate goal for the blog
  
  attract visitors, niche blog, undiscovered trends, SEO-friendly for everything included title, content, meta description, and Focus Keyphrases
  
  ---
  
  Topic
  
  ${topic}
  
  ---
  
  additional things to blog content
  
  - put the text in a format that easier for me to copy to Wordpress editor
  - add some sub header
  - use more transition words for improving readability
  - use shorter sentences, using less difficult words to improve readability.
  - use some external reference links (about 1 - 10)
  - only use '<br>' for next line, do not use '\\n'
  
  ---
  
  json format example (dont add a trailing comma for last item)
  
  {
  "title": "",
  "meta": "",
  "keyphrase": "",
  "content": ""
  }
  
  ---
  
  generate below in json format
  
  - title: blog title (less than 60 characters)
  - meta: meta description (less than 160 characters)
  - keyphrase: Focus Keyphrase
  - content: blog content in html, with descriptions and examples (more than 1500 words)
  `;

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
      messages: [{ role: "user", content: prompts }],
      max_tokens: 3000,
    },
  });

  if (response.status != 200) {
    throw new Error("Failed to fetch from OpenAI API");
  }

  const result = response.data;
  console.log(result);

  return result.choices[0]?.message.content;
}

export { getBlogBasicInfo };
