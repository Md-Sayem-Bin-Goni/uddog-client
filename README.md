# Uddog --- Together We Create Impact

Uddog is a social development events platform where people can discover
community-focused events, create initiatives, and participate in
activities that make a positive impact.

## Features

-   **User authentication** --- Sign up and log in to access protected
    features.
-   **Discover events** --- Browse available events from the events
    page.
-   **Create events** --- Authenticated users can publish events with a
    future event date.
-   **Join events** --- Users can register to participate in an event.
-   **Manage events** --- Organizers can view and manage the events they
    have created.
-   **Joined events** --- Users can keep track of the events they have
    joined.
-   **Protected routes and API requests** --- Authentication is used to
    protect user-specific actions.

## Tech Stack

### Frontend

-   Next.js (App Router)
-   React
-   TypeScript
-   Tailwind CSS
-   shadcn/ui

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Better Auth

## Project Structure

The project is organized into separate frontend and backend
applications.

``` text
uddog/
├── uddog-client/
│   ├── app/
│   │   ├── events/
│   │   ├── create-event/
│   │   ├── manage-events/
│   │   ├── joined-events/
│   │   └── login/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── public/
│
└── uddog-server/
    └── index.js
```

> Folder names may differ in your local repository. Keep this structure
> section aligned with your actual repository before publishing.

## Getting Started

### Prerequisites

-   Node.js (LTS recommended)
-   npm
-   MongoDB database

### 1. Clone the repository

``` bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>
```

### 2. Set up the backend

Open the backend directory:

``` bash
cd uddog-server
npm install
```

Create a `.env` file in the backend directory and add your MongoDB
connection string:

``` env
MONGODB_URI=your_mongodb_connection_string
```

Start the backend using the development script configured in your
backend `package.json`. For example:

``` bash
npm run dev
```

The Express API in the current local setup uses port `5000`.

### 3. Set up the frontend

Open a second terminal and go to the frontend directory:

``` bash
cd uddog-client
npm install
```

Create a `.env` file and add the environment variables required by your
Better Auth and API configuration. Use the variable names already
referenced in your source code.

Example:

``` env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
```

If your frontend calls the Express API through an environment variable,
set that variable to your local backend URL (for example,
`http://localhost:8000`).

Start the frontend:

``` bash
npm run dev
```

Open <https://uddog-client.vercel.app/> in your browser.

## API Endpoints

The Express backend currently includes these event endpoints:

  Method   Endpoint        Description
  -------- --------------- -------------------------
  `POST`   `/add-events`   Create an event
  `GET`    `/events`       Retrieve events
  `GET`    `/events/:id`   Retrieve a single event
  `POST`   `/join-event`   Join an event

The application also uses Better Auth for authentication.

## Database

MongoDB database: `uddog_project_db`

Main application collections:

-   `events` --- Event information.
-   `joined` --- Event participation / registration records.

Better Auth manages its authentication collections:

-   `user`
-   `session`
-   `account`
-   `verification`

## Main Pages

  Route              Purpose
  ------------------ ---------------------------------------------
  `/`                Homepage
  `/events`          Browse events
  `/create-event`    Create a new event
  `/manage-events`   Manage events created by the logged-in user
  `/joined-events`   View joined events
  `/login`           Authentication

## Environment Variables

Never commit real secrets or database credentials. Add `.env` files to
`.gitignore`.

  -----------------------------------------------------------------------
  Variable                            Purpose
  ----------------------------------- -----------------------------------
  `MONGODB_URI`                       MongoDB connection string

  `BETTER_AUTH_SECRET`                Secret used by Better Auth

  `BETTER_AUTH_URL`                   Base URL of the authentication
                                      application

  API base URL variable               URL of the Express backend, if
                                      configured separately
  -----------------------------------------------------------------------

Check your source code and deployment settings for the exact environment
variable names required by your project.

## Deployment

Deploy the frontend and backend separately if they are maintained as
separate applications.

1.  Deploy the Express backend to a Node.js-compatible hosting provider.
2.  Configure the production MongoDB connection string in the backend
    environment.
3.  Deploy the Next.js frontend.
4.  Set the production authentication URL, authentication secret,
    database connection, and backend API URL in the frontend
    environment.
5.  Update CORS settings on the backend to allow requests from the
    deployed frontend domain.
6.  Add the production frontend URL to the authentication and OAuth
    configuration where required.
7.  Run a production build and test sign-up, login, event creation,
    event joining, and the user event pages.

## Project Status

Uddog is an ongoing project. Features and implementation details may
change as development continues.

## Author

**Md Sayem Bin Goni**

## License

No license has been specified yet. Add a license file if you intend to
make this project open source.
