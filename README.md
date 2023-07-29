# Node App to test valid credit card number

Project Description: This project contains two folders: UI and server. The UI folder contains a React app, while the server folder contains an Express Node.js app. The purpose of the project is to test valid credit card numbers.

## Running the Server

1) Open your terminal and navigate to the server folder using the command:
 `cd server` 

2) Install the dependencies by running:
`yarn install`

3) Start the Express service by running:
`node index.js`

5) The server will now run on port 3001. If you want to change the port, modify the following line in index.js:
`const port = 3001;`

NOTE: If you change the port, don't forget to update it in `UI/src/App.js` as well.

## Running the UI

1) Open another terminal window and navigate to the UI folder using the command:
`cd UI`

2) Use the same package manager you used for the server (either npm or yarn) and start the development server:
```
npm start
# or
yarn start
```

3) The React app will now run on http://localhost:3000 in your browser.

Important Note:

If the UI makes requests to the server running on a different port (e.g., UI on port 3000, server on port 3001), you may need to handle CORS. Consider using the cors package in Express to allow cross-origin requests from the UI.
