import { GraphQLClient, ClientContext } from "graphql-hooks"

export const graphQLClientContext = new GraphQLClient({
  url: process.env.REACT_APP_API_URL || "localhost:8080/graphql",
})

export const GraphQLProvider = ({ children }) => {
  return <ClientContext.Provider value={graphQLClientContext}>{children}</ClientContext.Provider>
}
