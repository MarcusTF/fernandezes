import { GraphQLProvider, MapProvider } from "./"

const GlobalContextProvider = ({ children }) => {
  return (
    <GraphQLProvider>
      <MapProvider>{children}</MapProvider>
    </GraphQLProvider>
  )
}

export default GlobalContextProvider
