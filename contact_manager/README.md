# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## First I create the project using the below command 

npm create vite@latest contact-manager -- --template react
cd contact-manager
npm run dev

## Run the backend using below command 

json-server --watch db.json --port 3001

### 1. I tailored the solution to work fully on the frontend, using react-hook-form and Material UI's TextField.

### 2. Validating the Phone Number :

"Phone number not more than 10 digit only"

So I implemented exactly 10 digits, by using a regex pattern in react-hook-form validation:

### 3. Validating the Email (Same Approach as Phone):

"Email should be valid format only"
