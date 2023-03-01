# Summary
## User Interface
The following is the display created in building this project:
Website View:
| | | 
|:-------------------------:|:-------------------------:|
|![Alt text](/Images/Main.png)| ![Alt text](/Images/Profile.png)|
|![Alt text](/Images/Content.png)| ![Alt text](/Images/Login.png)|

Mobile View:
| | | 
|:-------------------------:|:-------------------------:|
|![Alt text](/Images/MobileMain.png)| ![Alt text](/Images/MobileProfile.png)|
|![Alt text](/Images/MobileTrend.png)| ![Alt text](/Images/MobileComment.png)|

## Introduction
To run this project in your local environment, you can simply clone this project then install all the dependencies needed, don't forget to run the json server which is used to store data in this application as dummy data. you can run json-server by typing command: `npm run json-server`. After the json server is running, you can immediately run this React project by typing the command: `npm start`

## Library Used
In this project several libraries are used to speed up and simplify development, such as:
- <a href="https://chakra-ui.com/">Chakra</a>. Chakra is a library used to quickly and easily build component interfaces in React applications.
- <a href="https://react-query-v3.tanstack.com/overview">ReactQuery</a>. React Query is used to fetch, update and cache more easily and quickly in React applications. This library replaces the side effects that are commonly used by developers to fetch data in the React scope, where developers will have difficulty using side effects if the project development scope is wider and more complex. react query can make the work of developers easier.

## Project Overview
This project is a social media replica app inspired by the leading social media platforms, namely Facebook and Twitter. This replica social media app have some basic features include `replica authentication`,`creating new account` `login previous account`,  `user profile`, `feeds`, `make a content`, `post interactions (like content and comment)`, and `making a friend with others`.