# Chrome Extension Backend Development Project

This project consists of developing a Chrome extension backend API and a basic Chrome extension using the Plasmo Framework. The goal is to provide real-time word translations to users.

## Table of Contents

- [Project Overview](#project-overview)
- [Task 1: Backend API Development for Word Translations](#task-1-backend-api-development-for-word-translations)
- [Task 2: Basic Chrome Extension Development](#task-2-basic-chrome-extension-development)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The project aims to assess proficiency in back-end development for Chrome extensions using the Plasmo Framework. It consists of the following tasks:

### Task 1: Backend API Development for Word Translations

- Develop a backend API that provides word translations.
- Implement endpoints for retrieving, adding, updating, and deleting translations.
- Support at least three languages for translation.
- Implement proper error handling and validation.
- Follow RESTful design principles.
- Include appropriate API documentation.

### Task 2: Basic Chrome Extension Development

- Develop a basic Chrome extension using the Plasmo Framework.
- Allow users to select a word for translation.
- Communicate with the backend API to fetch translations.
- Display the translation to the user.
- Implement basic error handling.

## Installation and Setup

To set up the project locally, follow these steps:

1. Clone the project repository.
2. Install the necessary dependencies for the backend and extension.
3. Configure environment variables for the backend, including database connection details.
4. Start the backend server.
5. Load the extension in your Chrome browser.

## Usage

Once the project is set up, you can use the Chrome extension to select words for translation. The extension will communicate with the backend API to fetch translations in real-time.

## Contributing

Contributions to this project are welcome. You can contribute by:

- Reporting issues or bugs.
- Enhancing existing features.
- Adding new features.
- Improving documentation.

Please follow the [contribution guidelines](CONTRIBUTING.md) for details on how to contribute.

## License

This project is licensed under the [MIT License](LICENSE).

Now, here are the steps to load the extension and run the backend server:

Load the Extension:
Open your Google Chrome browser.
Type chrome://extensions/ in the address bar and press Enter.
Enable "Developer mode" by toggling the switch in the upper-right corner.
Click on the "Load unpacked" button.
Navigate to the directory where your extension code is located (typically the dist or build folder of your extension project).
Select the folder and click "Open."
Your extension should now be loaded and visible in your browser's toolbar.
Run the Backend Server:
Open a terminal.
Navigate to the backend-api directory of your project.
Run the following command to start the backend server:
bash

npm run dev

The server should now be running, and you can access it at the specified port (e.g., http://localhost:3001).
With these steps, you should be able to load the extension and run the backend server locally for testing and development
