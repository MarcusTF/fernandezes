import { GraphQLProvider, MapProvider, DetailsProvider } from "./"

const GlobalContextProvider = ({ children }) => {
  return (
    <GraphQLProvider>
      <DetailsProvider>
        <MapProvider>{children}</MapProvider>
      </DetailsProvider>
    </GraphQLProvider>
  )
}

export default GlobalContextProvider
