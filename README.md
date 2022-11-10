# expense-tracker
A web app for the users to create their own account and to record the expense

## Features
* Users can register with their name, email, and password
* Users can also choose to register and login with Facebook or Google accounts
* User can create and manage their expense records
* Users can edit the detail of the expense records
* Users can filter the expense records with categories
* Users can delete the expense records

# Website Screenshot
* Register
![image](https://user-images.githubusercontent.com/107028314/201089807-7812f995-218d-4214-ba93-619a5b01945c.png)
* Login
![image](https://user-images.githubusercontent.com/107028314/201089846-85b7c826-9bae-46cc-928f-3308f6a3c025.png)
* Home page
![image](https://user-images.githubusercontent.com/107028314/201089922-35509dfa-3cc8-44d3-9a2b-62615d351e18.png)
* Create new expense records
![image](https://user-images.githubusercontent.com/107028314/201090057-e85e2283-17a9-4ba8-ae6a-43bab4a67f28.png)
* Edit expense records
![image](https://user-images.githubusercontent.com/107028314/201090108-7d62a982-3d2f-40bf-825a-80d397296440.png)

# Getting Started

## Environment
* Node.js 16.17.0 
* npm 8.15.0
* MongoDB 

## Installation
1. Open the Terminal and clone the repo
```bash
git clone https://github.com/ping8601/expense-tracker/
```
2. Use the Terminal to open the folder of the project
```bash
cd expense-tracker
```
3. Install all the needed package with npm
```bash
npm install
```
4. Add a file .env and add required environment variables as mentioned in .env.example

5. Add the seed categories, seed users and seed records
```bash
npm run seed
```
6. Start the server
```bash
npm run start
```
7. If you see this message, the server is successfully started
```bash
Express is now listening on localhost:3000
```
8. Open your brower and enter the link http://localhost:3000 to start exploring the website!

9. Use this accounts in the seed data to login or create your own acocunt.
```bash
email: user1@example.com
password: 12345678
```
10. Press control + c to end the server

# Development Tools
* Bcryptjs 2.4.3
* Bootstrap 5.1.3
* Connect-Flash 0.1.1
* Dotenv 8.2.0
* Node.js 16.7.0
* Express 4.16.4
* Express-Handlebars 3.0.0
* Express-Session 1.17.1
* Font-awesome 5.8.1
* Method-Override 3.0.0
* Mongoose 5.9.7

