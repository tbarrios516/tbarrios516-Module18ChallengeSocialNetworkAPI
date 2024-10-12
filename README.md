
# Social Network API

This project is a RESTful API for a social network web application where users can share their thoughts, react to friends' thoughts, and manage a friend list. It utilizes MongoDB for data persistence, Mongoose as an ODM, and Express.js for routing.

## Table of Contents
- [Video Walkthrough](#video-walkthrough)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies](#technologies)
- [License](#license)

## Video Walkthrough

Click this link to view a video walkthrough: https://drive.google.com/drive/folders/1Eyz519TRqFFn5gq32ZBH1sDMj5GNafyI?usp=sharing

## Usage

This API provides endpoints to create, read, update, and delete users, thoughts, reactions, and friends. It can be tested using a tool like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/).

### Seeding the Database
You can manually add users and thoughts using the provided API endpoints (see below for details).

## API Endpoints

### Users

- **GET** \`/api/users\`: Get all users.
- **GET** \`/api/users/:userId\`: Get a single user by ID, along with their thoughts and friends.
- **POST** \`/api/users\`: Create a new user.
    - Request body:
      \`\`\`json
      {
        "username": "exampleUser",
        "email": "user@example.com"
      }
      \`\`\`
- **PUT** \`/api/users/:userId\`: Update a user by ID.
- **DELETE** \`/api/users/:userId\`: Delete a user by ID.
- **POST** \`/api/users/:userId/friends/:friendId\`: Add a friend to a user's friend list.
- **DELETE** \`/api/users/:userId/friends/:friendId\`: Remove a friend from a user's friend list.

### Thoughts

- **GET** \`/api/thoughts\`: Get all thoughts.
- **GET** \`/api/thoughts/:thoughtId\`: Get a single thought by ID.
- **POST** \`/api/thoughts\`: Create a new thought.
    - Request body:
      \`\`\`json
      {
        "thoughtText": "Here's a cool thought",
        "username": "exampleUser",
        "userId": "60b641e48cd1a4b5044235ab"
      }
      \`\`\`
- **PUT** \`/api/thoughts/:thoughtId\`: Update a thought by ID.
- **DELETE** \`/api/thoughts/:thoughtId\`: Delete a thought by ID.

### Reactions (subdocument of thoughts)

- **POST** \`/api/thoughts/:thoughtId/reactions\`: Add a reaction to a thought.
    - Request body:
      \`\`\`json
      {
        "reactionBody": "Nice thought!",
        "username": "exampleUser"
      }
      \`\`\`
- **DELETE** \`/api/thoughts/:thoughtId/reactions/:reactionId\`: Delete a reaction by ID from a thought.

## Technologies

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for creating RESTful APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Insomnia/Postman**: API testing tools.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
