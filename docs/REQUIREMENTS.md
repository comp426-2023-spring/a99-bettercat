# Requirements

> This markdown file contains the requirements specified in the `a99` instructions, as well as our progress and justification for each.

A GitHub repository in the class organization containing your code and documentation and a prototype release package. 🔴

Your project should take the form of a Node package, with all of the attendant items associated with that. 🟢
> Our project is a Node package.

1. `npm install` - Install dependencies for your package. 🟢
    > The `npm install` command installs all of the necessary dependencies for our package.
3. `npm test` - Start app, check that everything can run, and then stop app. 🟢
    > The `npm test` command builds our application, showing any errors if our program is broken. This command succeeds if all pages can run.
4. `npm run` - Command to bring up all parts of the app/system's server scripts. 🟢
    > The `npm run dev` command starts our website. Note: This command must be `npm run dev` due to quirks of the Next.js package used to organize this project. However, the `npm run dev` command has the same functionality as the `npm run` command. and starts the project.

1. Back-end specifications
	1. API built on whatever framework you choose. 🟢
	    > API is built on top of Next.js.
	2. API root endpoint at `http://HOST/app/`. 🟢
	    > Our API root endpoint is `http://HOST/api/`. This is due to how Next.js registers API routes. We were unable to change this or redirect back to `/app`.
	4. Create (if nonexistent) and interact with a database of users (optional) and interactions (this can be logs, even). If users do not need to login to use your app, then do not worry about a user DB. These can be separate databases for different microservices or separate tables in one database. It is up to your team's decisions. 🟢
	    > The authentication service we are using for this project is `Firebase Authentication`. Firebase stores sensitive user data. Our project is configured to use Google sign-in authentication, so user passwords and sensitive information is not saved by us.
	    > In addition, we have a `user` database collection in our Firestore database which contains extra user information which `Firebase Authentication` does not store.
	6. Database can be of any type you choose. 🟢
      > We are using the Firebase Firestore database for our project.
2. Front-end specifications
	1. Give users the ability to register an account, update their information, see their information somewhere, and delete their account. 🔴
    > Users are able to register an account on the home page, as well as view their details and update their preferences on the user page.
	2. Interactions with the front end should be logged in a database. 🟢
    > Logs are added to a logging collection in Firebase Firestore. Timestamps and user IDs are collected every time a user starts a new session.
3. Database specifications
	1. User database (if relevant) - registration details (username, email address, etc.) 🟢
	   > As mentioned above , we have a `user` database collection in our Firestore database which contains extra user information which `Firebase Authentication` does not store.
	2. Interaction database - details of user interactions (login history, access logs, etc.) 🟢
     > As mentioned above, we have a `logs` database collection in our Firestore database which stores user IDs, timestamps, and event descriptions on major UI interactions.
4. Documentation
	1. License documenation - Choose a license and include it in the repository just like we have been. 🟢
      > Our project uses the `GPL-3.0 Liscence`.
	2. README.md file with basic descriptiong, installation requirements/instructions, dependency list, run instructions. 🟢
     > The `README.md` file at the root of the directory exists and contains all information listed here.
	3. `/docs/` directory containing full documentation of every available API endpoint that you create for your app. This directory shoud also house an archive of your planning documentation. 🟢 
	   > The `API.md` file at the root of the directory exists and contains all information on API routes. Other `.md` files shows the progress we have made on the project.
  4. Code comments (preferably referring to the documentation) 🟢
     > Code is well documented.
	5. User instructions in the interface if needed. 🟢
     > The user interface is easy-to-use.
5. Demo video 🔴
	1. In order to get credit for this, add a row to the table in the README here and make a pull request: https://github.com/comp426-2022-fall/a99-demos/edit/main/README.md
7. Self/group evaluation (Individual group members: this is part of the final exam for the course.) 🔴
