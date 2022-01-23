import { BrowserRouter } from "react-router-dom"
import { GraphQLProvider, MapProvider, DetailsProvider, AuthProvider } from "./"

const GlobalContextProvider = ({ children }) => {
  return (
    <GraphQLProvider>
      <AuthProvider>
        <BrowserRouter>
          <DetailsProvider>
            <MapProvider>{children}</MapProvider>
          </DetailsProvider>
        </BrowserRouter>
      </AuthProvider>
    </GraphQLProvider>
  )
}

export default GlobalContextProvider
