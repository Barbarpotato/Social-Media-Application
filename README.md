# Summary
## User Interface
The following is the display created in building this project:
| | | 
|:-------------------------:|:-------------------------:|
|![Alt text](/Images/Main.png)| ![Alt text](/Images/Profile.png)|
|![Alt text](/Images/Content.png)| ![Alt text](/Images/Login.png)|

## Introduction
To run this project in your local environment, you can simply clone this project then install all the dependencies needed, don't forget to run the json server which is used to store data in this application as dummy data. you can run json-server by typing command: `npm run json-server`. After the json server is running, you can immediately run this React project by typing the command: `npm start`

## Library Used
In this project several libraries are used to speed up and simplify development, such as:
- <a href="https://chakra-ui.com/">Chakra</a>. Chakra is a library used to quickly and easily build component interfaces in React applications.
- <a href="https://react-query-v3.tanstack.com/overview">ReactQuery</a>. React Query is used to fetch, update and cache more easily and quickly in React applications. This library replaces the side effects that are commonly used by developers to fetch data in the React scope, where developers will have difficulty using side effects if the project development scope is wider and more complex. react query can make the work of developers easier.

## Login
on the Login menu, nothing special, authenticated user data will be stored in session storage, then this data will be forwarded to the next several components which will be used in posting data, updating data according to the user account entered in the main content. `NOTE:In this project, route blocking has not yet been implemented when the user is on the login page, further development will implement this.`

## Home Menu
The main component in the main menu is `post tweet` where users can post tweets using the POST data method on the json-server endpoint users can input text, images and emoticons, `Note: images that have been posted will not be read if the page is refreshed because the image source will be allocated. need to be fixed for the next development.`

Next for the content is implemented using useInfiniteQueries, but the use of useInfiniteQueries is customized according to what I want so that it becomes a custom hook that will be used repeatedly in this project. infiniteQueries is used to display some of the fetch data by paginating the json-server endpoint. in the case of this project, the user will click on the more button then react query will provide further data with the specified amount.

The components built into this content component use HOC (Higher Order Component) techniques, because this component will be used in bookmark navigation so it requires reusable components. in this content, Users can make comments on the content provided, like content and also save the content in the bookmark list


## Search Bar & Other User Tweet
The component on the right side contains a search bar and also a Twitter random user, for now the search bar is only implemented so that users can search for tweets using the api: https://randomuser.me/api, according to the user type in the search bar. for how it works: when mounting the component, https://randomuser.me/api will be fetched, there are 1000 random users ready to be searched. if the user types something in the searchbar, another component will appear to provide search results according to the user type in the searchbar

There are other components, namely 5 random users that are displayed, when the user clicks the follow button, the user will be stored in the jsonserver and for now it is assumed that the user has become friends with that person.

## Others
There are several other navigations that can be seen when cloned this project, there are several implementations such as mutation, useContext, memo, custom hooks, react-router-dom, etc. which have not been discussed in more detail in this readme.
