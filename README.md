# Simple Studio Blog

**AI-Powered Blog Content Creation**: This project automates the process of generating blog content using AI (ChatGPT) and streamlines uploading it to a WordPress site.

It's an instruction-based JavaScript application designed for local use, with a clear file/folder structure designed for easy understanding and modification.

## Features

- **AI-powered content creation:** Generate blog posts using prompts and OpenAI's ChatGPT.
- **WordPress Integration:** Upload generated content to a WordPress site.
- **Organized File Structure:** Modular design for easy understanding and maintenance.
- **Logging and User Input:** Includes a logger for debugging and a readline interface for user interaction.

## File Structure Highlights

- **`topics/:`** Contains lists of topics for blog post generation.
- **`prompts/:`** Contains prompt templates for generating blog content.
- **`simple-studio/:`** Core application logic for content creation and WordPress interaction.
- **`singletons/:`** Houses utility modules.
- **`index.js:`** Main entry point of the application, handles user input and workflow.

## Installation

1. **Clone the repository:** `git clone <repository_url>`
2. **Navigate to the project directory:** `cd <repository_name>`
3. **Install dependencies:** `npm install`
4. **Configure environment variables:** Create a `.env` file based on the `.env.example`.
5. **Run the application:** `node index.js`
6. **Follow the interactive prompts:** Select an action.

## Usage

This tool provides a command-line interface to interact with the application.

**Once running, you will be presented with the following options:**

| number | action                  | remark   |
| ------ | ----------------------- | -------- |
| 1      | bulk-create             |          |
| 2      | bulk-get                |          |
| 3      | single-create           |          |
| 4      | single-get              | not done |
| 5      | single-create-with-json |          |

Here's a breakdown of each action:

- **1 (bulk-create):** Creates multiple posts using AI, based on topics in an input file you provide. Refer to files in `/topics`
- **3 (single-create):** Creates a single post using AI, based on a topic you provide.
- **5 (single-create-with-json):** Creates a single post using a custom JSON object you provide.
- **2 (bulk-get):** Retrieves multiple posts from your WordPress site.

## Future Enhancements

- **Algorithm Optimization:** Explore more sophisticated algorithms and techniques for generating higher-quality and more diverse blog content. This may include fine-tuning prompts, experimenting with different AI models, or incorporating natural language processing techniques.
- **Content Personalization:** Develop features to allow tailoring the generated content to specific audiences or niches. This could involve analyzing existing blog content or incorporating user preferences.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License
