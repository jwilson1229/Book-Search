# Book Search Engine

## Description
This project is a refactored version of a fully functional Google Books API search engine. Originally built with a RESTful API, it has been converted to use a GraphQL API with Apollo Server. The application is built using the MERN stack, featuring a React frontend, a MongoDB database, and a Node.js/Express.js backend.

## Features
- Search for books using the Google Books API
- User authentication with signup and login functionality
- Save books to a personal list
- View saved books
- Remove books from the saved list
- Uses GraphQL queries and mutations to fetch and modify data

## Technologies Used
- MongoDB Atlas
- Express.js
- React
- Node.js
- GraphQL & Apollo Server
- Mongoose
- JWT for authentication

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd book-search-engine
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run develop
   ```
4. Access the application at `http://localhost:3000`

## GraphQL API
### Queries
- `me`: Returns the authenticated user's details

### Mutations
- `login(email, password)`: Authenticates a user
- `addUser(username, email, password)`: Creates a new user
- `saveBook(bookData)`: Saves a book to the user's list
- `removeBook(bookId)`: Removes a book from the user's list

## Deployment
This application is deployed using Render with a MongoDB Atlas database.

## License
This project is licensed under the MIT License.

## Contact
For any questions, feel free to reach out!