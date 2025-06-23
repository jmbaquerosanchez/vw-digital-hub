# VW Digital Hub

# Project Setup and Execution

This guide will walk you through setting up and running the project locally, as well as how to interact with the deployed application.

---

## Local Development Setup

To get the project running on your local machine, follow these steps (Everything from the monorepo root directory):

1.  **Install Dependencies:**

    ```bash
    npm install
    ```

2.  **Launch the Server:**

    ```bash
    npm run start:server
    ```

    _The server persists data in `db.json`, a JSON file located in the client project's root directory._

3.  **Launch the Client:**
    Open _another_ new terminal window, and run the following to start the client:
    ```bash
    npm run start:client
    ```
    _The client connects to the server using the `VITE_VW_API_URL` environment variable. By default, this is configured to point to `localhost:3004`, where your local server should be running._

---

## Storybook

For launching and building the storybook app:

1.  **Launch Storybook**

    ```bash
    npm run start:ds:storybook
    ```

2.  **Build the storybook**
    ```bash
    npm run build:ds:storybook
    ```

---

## Operationl Scripts

1. **Run tests**

   ```bash
   npm run test
   ```

2. **Run linter**
   ```bash
   npm run lint
   ```

---

## Running the Deployed Application (Vercel)

The application deployed on Vercel ([https://vw-digital-hub-gilt.vercel.app/](https://vw-digital-hub-gilt.vercel.app/)) also relies on a local server instance because it's configured to point to `localhost:3004`. To use the deployed version, you'll need to:

1.  **Launch the Server**

    ```bash
    npm run start:server
    ```

2.  **Open the Deployed Application**
    Once your local server is running, open your web browser and go to:
    [https://vw-digital-hub-gilt.vercel.app/](https://vw-digital-hub-gilt.vercel.app/)

# Project explanations

This is a project created from scratch using **Vite**, to which I manually added the dependencies as needed. The purpose was to build a solid and well-structured foundation that could eventually be split into a monorepo. Finally I was able to do this job but only for the design system package and the client.

## 📦 Dependencies Used

1. **react-query**
   Used as the client state manager. Everything related to server communication is located in the `src/api` folder, organized into mutations and queries ready to be imported and used with React Query. There's also a folder called `primitives` that contains primitive methods for server calls and utility functions.

2. **styled-components**
   Used for styling organization. I chose this library because I’m experienced with it.

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

This is the project for the client. So it is the deployable component that in this case use the design-system package. Inside the client we also can find the following folders:

### `api`

Contains everything related to communication with the backend API.

## `And inside the client...`

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
- **Pushes**: Run linting, tests, build the app, and deploy to prod in **Vercel**

🚀 **Live app**: [https://vw-digital-hub-gilt.vercel.app/](https://vw-digital-hub-gilt.vercel.app/)

```

```
