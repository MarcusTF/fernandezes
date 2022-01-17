import { BrowserRouter } from "react-router-dom"
import { GraphQLProvider, MapProvider, DetailsProvider } from "./"

const GlobalContextProvider = ({ children }) => {
  return (
    <GraphQLProvider>
      <BrowserRouter>
        <DetailsProvider>
          <MapProvider>{children}</MapProvider>
        </DetailsProvider>
      </BrowserRouter>
    </GraphQLProvider>
  )
}

export default GlobalContextProvider
