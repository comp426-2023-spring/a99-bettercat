# UNC Restaurants Tracker

> This project is being developed by *[Ajay Gandecha](https://github.com/ajaygandecha)*, *[Will Astilla](https://github.com/wastilla)*, *[Angelina Su](https://github.com/angelinasu57)*, *[David Zhang](https://github.com/zhangwy324)*, *[Andrew Zadrozny](https://github.com/andrewzadrozny)*, *[Aayush Mehra](https://github.com/aayush110)*, and *[Muktha Santhoshkumar](https://github.com/muktha-s)*  for the *final project (a99)* of **[COMP 426: Modern Web Programming](https://comp423-2023-spring.github.io)** at UNC-Chapel Hill taught by *[Professor John D. Martin III](https://github.com/jdmar3)*.

## Overview

< Demo Video Here >

This is a sample overview.

## Tech Stack

Part of our goal for this project was to employ reliable and durable full-stack development tools and technologies. We wanted the project to be typesafe, streamlined, and fully integrated together. With this goal in mind, we employed the following technologies into our project:

![TypeScript](https://img.shields.io/badge/-TypeScript-05122A?style=flat&logo=typescript)

TypeScript is a superset of JavaScript that adds static typing to traditional JavaScript. While TypeScript seemed more tedious to work with at first, using it instead of JavaScript really helped to reduce errors in the long run due to more strict typing rules. Therefore, our group opted to use TypeScript for this project. In addition, TypeScript is the preferred language for the frameworks below. 

![NextJS](https://img.shields.io/badge/-Next.js-05122A?style=flat&logo=next.js)

Next.js is a frontend framework built on the React library that enables rich features and optimizations to the application, such as hybrid static & server rendering, which greatly increases speeds without sacrificing user experience. Next.js has become an [industry standard](https://nextjs.org/showcase), with companies such as Twitch, Hulu, Target, Notion, Nike, and more utiziling it. 

![React](https://img.shields.io/badge/-React.js-05122A?style=flat&logo=react)

React is an extremely powerful framework for creating fully functional user interfaces and UI components. React is automatically built into Next.js. React is the preferred method of user interface design in previous iterations of COMP 426 and is extremely useful and easy to use.

![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-05122A?style=flat&logo=tailwindcss)

Tailwind CSS is a CSS framework that makes designing user interfaces extremely easy. Instead of having a bunch of CSS classes and files littered throughout the project, Tailwind CSS creates a bunch of classes for every possible style that can be applied to HTML and React components. Then at build time, only the necessary CSS classes are included in the final app, reducing the final bundle size.

![Firebase](https://img.shields.io/badge/-Firebase-05122A?style=flat&logo=firebase)

Firebase is a platform of cloud computing services provided by Google. Firebase is used by millions of users and has built-in, fully documented support for hosting databases, provding the tools for user authentication, tracking Google Analytics statistics, and more. Firebase, specifically *Firebase Firestore*, was our preferred database option, and *Firebase Authentication* with Google Sign-on was our preferred way of authenticating users for this website.

<!--
![Vercel](https://img.shields.io/badge/-Vercel-05122A?style=flat&logo=vercel)

Vercel, the company behind Next.js, also offers hosting. We used Vercel to host this particular project.
 -->
 
## Link to Website

Our website is hosted live using Vercel - link here.

## Getting Started

If you prefer to start up a local version of this website, follow the instructions below:

1. Make sure to *clone* this respository locally. In addition, ensure that all `.env` files are used as appropriate.
2. Ensure that your computer has *Node.js* and the *Node Package Manager (npm) installed)*. You can do this [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
3. Open a terminal window at the root of the project and run the `npm install` command. This command will ensure that all necessary dependencies are installed for this project to load correctly locally.
4. (Optional) Next, feel free to run the `npm test` command. This command will start the application, ensure that it works correctly, and then promptly close the application.
5. Lastly, run the `npm run dev` command to start the project. This project should be accessible at `http://localhost:3000`.

## APIs and Documentation
