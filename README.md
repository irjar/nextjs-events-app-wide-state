This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The app allows to browse events, select a single event and filter for events. 

There is an events page, the user can explore individual events and filter them by selecting the year and month filters, the app uses dummy back end on Firebase so the dummy data can be fetched from there.  

There is a newsletter registration flow – a component that allows a visitor to enter an email address and then stores that email address with help of api routes.

There is a Comments feature – users can submit a form to add comments on an event – that entered comment data should be stored on the backend with help of api routes. When we load the single event we are able to load the comments when the user wants to view the comments section.

There is a notification feature – the app uses React Context to manage app-wide state to give the user feedback regarding ongoing HTTP requests. The app shows notification at the bottom of the screen controlled with React Context when the request to register for newsletter or submit comments started, failed or succeeded.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

