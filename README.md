# React Native Expo App

This is a React Native application developed using Expo and Firebase for authentication and database.

## Features

- User Authentication with Firebase
- Data Storage with Firebase Database
- Character Listing from ThronesAPI
- User Profile Screen
- Dark Theme Styling

## Work in Progress

- Redux for State Management
- Voice-to-Text Feature
- Firebase Analytics Integration

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/).
- You have installed [Expo CLI](https://docs.expo.dev/get-started/installation/).
- You have a Firebase project set up with Authentication and Database enabled.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Install the Expo CLI if you haven't already:

    ```sh
    npm install -g expo-cli
    ```

## Setup

1. Create a `.env` file in the root of your project and add your Firebase configuration:

    ```env
    FIREBASE_API_KEY=your-api-key
    FIREBASE_AUTH_DOMAIN=your-auth-domain
    FIREBASE_PROJECT_ID=your-project-id
    FIREBASE_STORAGE_BUCKET=your-storage-bucket
    FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    FIREBASE_APP_ID=your-app-id
    ```

2. Update `firebaseConfig.js` with your Firebase configuration (if necessary).

3. Start the development server:

    ```sh
    expo start
    ```

4. Use the Expo app on your phone to scan the QR code provided by the Expo CLI.

## Usage

- **Authentication**: Users can sign up and log in using Firebase Authentication.
- **Character Listing**: View a list of characters fetched from ThronesAPI.
- **Profile**: Users can view and edit their profile information.
- **Dark Theme**: Experience the app with dark theme styling.

## Technologies Used

- React Native
- Expo
- Firebase Authentication
- Firebase Database
- ThronesAPI

## Contributing

If you want to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add feature-name'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License.
