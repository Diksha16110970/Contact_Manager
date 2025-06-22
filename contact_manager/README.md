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
