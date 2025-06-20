# VW Digital Hub

# Project Setup and Execution

This guide will walk you through setting up and running the project locally, as well as how to interact with the deployed application.

---

## Local Development Setup

To get the project running on your local machine, follow these steps:

1.  **Install Dependencies**
    Navigate to the project's root directory in your terminal and run:

    ```bash
    npm install
    ```

2.  **Launch the Server**
    Open a new terminal window, navigate to the project's root, and start the server:

    ```bash
    npm run start:server
    ```

    _The server persists data in `db.json`, a JSON file located in the project's root directory._

3.  **Launch the Client**
    Open _another_ new terminal window, navigate to the project's root, and start the client:
    ```bash
    npm run start:client
    ```
    _The client connects to the server using the `VITE_VW_API_URL` environment variable. By default, this is configured to point to `localhost:3004`, where your local server should be running._

## Storybook

To get the project running on your local machine, follow these steps:

**Launch Storybook**
`bash
    npm run start:ds:storybook
    `

**Build the storybook**
`bash
    npm run build:ds:storybook
    `

---

## Operationl Scripts

To get the project running on your local machine, follow these steps:

**Run tests**
`bash
    npm run test
    `

**Run linter**
`bash
    npm run lint
    `

---

## Running the Deployed Application (Vercel)

The application deployed on Vercel (`https://vw-digital-hub-gilt.vercel.app/`) also relies on a local server instance because it's configured to point to `localhost:3004`. To use the deployed version, you'll need to:

1.  **Launch the Server**
    Open a terminal window, navigate to the project's root, and start the server:

    ```bash
    npm run start:server
    ```

2.  **Open the Deployed Application**
    Once your local server is running, open your web browser and go to:
    ```
    [https://vw-digital-hub.vercel.app/](https://vw-digital-hub.vercel.app/)
    ```

---

## Running the tests

```bash
   npm run test
```

---

## Running the linter

```bash
   npm run lint
```

# Project explanations

This is a project created from scratch using **Vite**, to which I manually added the dependencies as needed. The purpose was to build a solid and well-structured foundation that could eventually be split into a monorepo.

## 📦 Dependencies Used

1. **react-query**
   Used as the client state manager. Everything related to server communication is located in the `src/api` folder, organized into mutations and queries ready to be imported and used with React Query. There's also a folder called `primitives` that contains primitive methods for server calls and utility functions.

2. **styled-components**
   Used for styling organization. I chose this library because I’m experienced with it and it allowed for faster development.

3. **react-router v7**
   Used in its **Data API mode** for routing and navigation.

4. **react-icons**
   A library of ready-to-use, easily importable icons.

5. **use-debounce**
   A hook used to debounce the search input’s callback. I used it to save time instead of creating a custom hook from scratch.

6. **react-intersection-observer**
   A small library that helped implement infinite scroll for the paginated notes display.

## 🛠 Development Tools

- **Vitest**: Testing framework.
- **React Testing Library**: For writing tests.
- **ESLint**: Linting tool.
- **json-server**: Used to mock the backend. Notes are persisted in a `db.json` file at the root of the project.

## 📁 Folder Structure

### `design-system` (Design System)

This project acts as a mini design system for the app. It contains styled components, as well as color and typography tokens under the `config` folder. The configuration includes a global CSS reset.

### `client` (The client)

## `And inside the client...`

### `api`

Contains everything related to communication with the backend API. Like the design system, it’s also structured to be easily moved to its own monorepo package if necessary. Initially, I intended to move this folder into a separate package within a **monorepo**. Although I didn't have time to do so, the folder has no dependencies on other parts of the app, making this change straightforward if needed.

### `components`

Includes the reusable components developed throughout the project. The key structural components are:

- `Layout`
- `Content`
- `Header`
- `SideBar`

It also includes two global service components:

- `Modal`
- `Toast`

These components follow a self-contained architecture, each with:

- The main component file
- A context for managing internal state
- A set of custom hooks that expose a clear interface to the rest of the app

If I had more time, I would move these into their own library within the monorepo.

## ✅ Testing & CI

Due to time limitations, I was only able to write unit tests for the most basic components in the design system project. The environment was configured using **Vitest** and **React Testing Library**.

Although I aimed to showcase my own development skills, I did make limited use of **AI** (ChatGPT) to help generate some unit tests and to solve specific project configuration issues. Also for this readme formatting. All other code was written manually.

For **CI/CD**, I set up basic workflows using **GitHub Actions**:

- **Pull Requests**: Run linting and tests
- **Pushes**: Run linting, tests, build the app, and deploy to **Vercel**

🚀 **Live app**: [https://vw-digital-hub.vercel.app/](https://vw-digital-hub.vercel.app/)

```

```
