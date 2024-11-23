# CampusCabs

CampusCabs is a web application designed to streamline transportation services within a college campus. The app allows students to book rides with auto rickshaws, coordinate shared rides with others, and access important ride details such as driver information, pickup time, and fare.

## Features

- **Ride Booking**: Students can easily book auto rickshaws by selecting pickup and drop-off locations, along with other details like number of people, pickup time, and date.
- **Ride Confirmation**: Once a ride is confirmed, students will receive a summary of the ride details, including driver information, fare, and pickup location.
- **Ride History**: Students can view their ride history, including previous rides and payment details.
- **Authentication**: Users can sign up, log in, and access their personalized dashboard for managing rides and viewing history.

## Tech Stack

- **Frontend**: React, React Router, Axios, Framer Motion, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, JWT (JSON Web Token), bcrypt
- **Authentication**: JWT tokens for user authentication and secure session management
- **Third-Party API**: Twilio (for sending ride details via WhatsApp)
- **State Management**: React Context for managing global state (user information)

## Installation

### Prerequisites

1. Node.js installed on your machine.
2. MongoDB instance (local or remote) to store user and ride data.
3. Twilio account for WhatsApp messaging (optional for full functionality).

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/CampusCabs.git
```

2. Navigate to the backend directory:
  ```bash
  cd CampusCabs/backend
  ```

3. Install the dependencies:
  ```bash
  npm install
  ```

4. Create a .env file in the backend folder and add the following environment variables:

  ```plaintext
  MONGO_URI=your-mongodb-uri
  SID=your-twilio-sid
  AUTH_TOKEN=your-twilio-auth-token
  PHONE_NUMBER=your-twilio-phone-number
  ```

5. Start the backend server:

  ```bash
  npm start
  ```

### Frontend Setup

1. Navigate to the frontend directory:

  ```bash
  cd ../frontend
  ```

2. Install the dependencies:

  ```bash
  npm install
  ```

3. Start the frontend development server:

  ```bash
  npm start
  ```

4. Open your browser and navigate to http://localhost:5173 to access the app.


### Usage

1. Sign Up: Users can sign up by providing their details like name, email, and phone number.
2. Log In: Once signed up, users can log in and access their personalized dashboard.
3. Book a Ride: From the dashboard, users can book a ride by selecting a pickup and drop-off location.
4. Confirm Ride: After booking, users can confirm their ride, view ride details, and get WhatsApp notifications with ride information.
5. View Ride History: Users can view their ride history, including past rides and fare details.


### API Endpoints

-POST /signup: Register a new user.
-POST /login: Authenticate and log in a user.
-POST /send-whatsapp: Send ride details via WhatsApp to the driver (requires Twilio setup).
-POST /save-ride-history: Save the ride details to the user's history.
-GET /ride-history/:email: Fetch the ride history for a specific user.
-GET /logout: Log out the user and clear the session.


### Contributing

1. Fork the repository.
2. Create a new branch (git checkout -b feature-name).
3. Make your changes and commit (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature-name).
5. Create a new Pull Request.
