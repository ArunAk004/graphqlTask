import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { onError } from "@apollo/client/link/error"
import { ApolloProvider, ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client"

const httpLink = new HttpLink({
  uri: "https://graphql.anilist.co",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      console.log(message)
    })
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
  link: from([errorLink, httpLink]),
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
