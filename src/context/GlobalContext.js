import { GraphQLProvider } from "./graphql"

const GlobalContextProvider = ({ children }) => {
  return <GraphQLProvider>{children}</GraphQLProvider>
}

export default GlobalContextProvider
