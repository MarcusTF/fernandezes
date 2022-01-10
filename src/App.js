import { useQuery } from "graphql-hooks"
import { GET_ALL_STOPS } from "./context/graphql/Queries"

import "./App.scss"

function App() {
  const { data, loading, error } = useQuery(GET_ALL_STOPS)
  return loading ? (
    <div>loading...</div>
  ) : (
    <div className='App'>
      {data?.stops?.nodes?.map?.(e => (
        <div>
          {e?.images?.photos?.map?.(p => (
            <img src={p.mediaItemUrl} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default App
