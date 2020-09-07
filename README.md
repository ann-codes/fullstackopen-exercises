# FullStackOpen 2020

This is a repo of my exercise solutions following the University of Helsinki [Full Stack Open 2020](https://fullstackopen.com/en) course. 

Note: Some folders will require deleting the yarn.lock file in order to install node_modules and run server (later added to .gitignore).

Some exercises uses [Pure CSS](https://purecss.io/), a super lightweight CSS framework for fun.

## Course Contents

- [Part 0 Fundamentals of Web apps](/part0/)
  - a General Info
  - b Fundamentals of Web Apps
- [Part 1 Introduction to React](/part1/)
  - a Introduction to React
  - b JavaScript
  - c Component state, event handlers
  - d A more complex state, debugging React apps
- [Part 2 Communicating with server](/part2/)
  - a Rendering a collection, modules
  - b Forms
  - c Getting data from server
    - NTS uses .env to hold API keys; set up index.html w/ Pure css (see [countries_data](/part2/countries_data/))
  - d Altering data in server
  - e Adding styles to React app
- [Part 3 Programming a server with NodeJS and Express](/part3/)
  - a Node.js and Express
  - b Deploying app to internet
    - deployable version can be found in a [standalone repo](https://github.com/ann-codes/backend_phonebook)
  - c Saving data to MongoDB
    - see https://fso-backend-phonebook.herokuapp.com/
  - d Validation and ESLint
  - [Certificate of Completion (for 3 credits worth, lol)](https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/262ba8424fe26655f03598d5d1ea851c)
- [Part 4 Testing Express servers, user administration](/part4/)
  - a Structure of backend application, introduction to testing
  - b Testing the backend
  - c User administration
  - d Token authentication ([see notes on auth in postman](/part4/README.md))
- [Part 5 Testing React apps](/part5/)
  - a Login in frontend ([see notes on async/await](/part5/bloglist-frontend/README.md))
  - b props.children and proptypes
  - c Testing React apps
  - d End to end -testing
- [Part 6 State management with Redux](/part6/)
  - a Flux-architecture and Redux
  - b Many reducers
  - c Communicating with server in a redux application ([See app covering 6A-C, the "newer" way](/part6/redux-anecdotes/))
  - d connect ([See app covering connect only, on separate branch](https://github.com/ann-codes/fullstackopen-exercises/tree/6D))
- [Part 7 React router, custom hooks, styling app with CSS and webpack](/part7/)
  - a [React-router](/part7/routed-anecdotes/)
  - b Custom hooks: [example1](/part7/country-hook/) & [example2](/part7/ultimate-hooks/)
  - c More about styles
  - d [Webpack](/part7/webpack-part7/)
  - e Class components, Miscellaneous
  - f Exercises: extending the bloglist: [frontend](/part7/bloglist-frontend/), [backend](/part7/bloglist-backend/)
  - <figure class="video_container"><video controls="true" allowfullscreen="true"><source src="https://video.twimg.com/tweet_video/EhR-SfQWAAABshs.mp4" type="video/mp4"></video></figure>
  - 7.21 Course Feedback - Since I don't have access to the moodle (you need to be a credit earning UoH student), I will write my review here instead: 
    - For someone with some intermediate experience in React, Node, and Mongo but are by no means an expert in any of these tools, this course is exceptional. It allowed me to practice what I already know and provide further insight into new aspects and processes in working with the MERN stack. The follow-along examples give enough hints to complete the exercises, but not so much that it handholds the student. The course employs scaffolding and requires the student to understand and complete each section before advancing to the next. This has been very effective in my learning. I have some suggestions: to break the exercises in 7F to other sections (even though it may not be directly related to the readings) so that it does not feel so overwhelming for the student when they get to that point. Another suggestion would be to create a community in Slack or Discord rather than Telegram. Telegram is not so easy to follow along as it is one big chatroom, whereas Slack or Discord will allow for channels that can better organize the discussion. Those are pretty slight complaints, as overall, the course has been an amazing experience and I appreciate that UoH offers it for free. Thank you! I am looking forward to learning about GraphQL and Typescript in the last 2 sections, as both will be entirely new to me. 
- Part 8 GraphQL
  - a GraphQL-server
  - b React and GraphQL
  - c Database and user administration
  - d Login and updating the cache
  - e Fragments and subscriptions
- Part 9 Typescript
  - a Background and introduction
  - b First steps with Typescript
  - c Typing the express app
  - d React with types
