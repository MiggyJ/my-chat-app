# My Chat App
This is a simple chat application built with ReactJS, Material UI 6, and Socket.IO.

## Prerequisites
Before running the application, you will need to have the following:

- Node.js (at least version 14.x or higher) installed on your machine
- An API backend running at REACT_APP_API_URL (which should be defined in the .env file)

The API backend for this application can be found at https://github.com/MiggyJ/my-chat-app-api.

## Installation
Clone this repository to your local machine using the following command:

```git clone https://github.com/your-username/my-chat-app.git```

Navigate to the root directory of the project and run the following command to install the required dependencies:

```npm install```

## Usage
To start the application, run the following command:

```npm start```

This will start a local development server and open the application in your default browser. You should be able to see the chat interface and start chatting with other users.

## Environment Variables
In order for the application to run correctly, you must define the following environment variable in a .env file at the root of your project:

```REACT_APP_API_URL=http://localhost:5000```

This should point to the URL of the API backend for this application.

## Deployment
To build the application for deployment, run the following command:

```npm run build```

This will create a production-ready build of the application in the build directory. You can then deploy this directory to your chosen hosting service.

## Credits
This application was built by Jairus Miguel Montante as part of a coding assessment.

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit/).