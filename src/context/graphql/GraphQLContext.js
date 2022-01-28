import { GraphQLClient, ClientContext } from "graphql-hooks"
import { REFRESH } from "./Mutations"

// const jwtRefresh = async (url, options) => {
//   try {
//     const res = await fetch(url, options),
//       parsedCopy = await res?.clone?.()?.json?.(),
//       errorMessage = parsedCopy?.errors?.[0]?.message

//     if (errorMessage === "The iss do not match with this server") {
//       try {
//         const session = sessionStorage.getItem("_the_fernandezes_session"),
//           remembered = localStorage.getItem("_the_fernandezes_remember_me")

//         if (!session && !remembered) return res

//         const parsed = session ? JSON.parse(session) : JSON.parse(remembered)
//         const newTokenRes = await fetch(url, {
//             ...options,
//             body: JSON.stringify({
//               query: REFRESH,
//               variables: { refreshToken: parsed?.refreshToken },
//             }),
//             headers: { ...options.headers, authorization: null },
//           }),
//           newTokenParsed = await newTokenRes.json()
//         if (newTokenParsed?.errors?.length) return res
//         const {
//           data: {
//             refreshJwtAuthToken: { authToken },
//           },
//         } = newTokenParsed
//         const tryAgainRes = await fetch(url, {
//             ...options,
//             headers: { ...options.headers, authorization: `Bearer ${authToken}` },
//           }),
//           parsedTryAgain = await tryAgainRes?.clone?.()?.json?.(),
//           notAgain = parsedTryAgain?.errors?.[0]?.message
//         if (notAgain === "The iss do not match with this server") return res
//         if (session) sessionStorage.setItem("_the_fernandezes_session", JSON.stringify({ ...session, authToken }))
//         if (remembered)
//           localStorage.setItem("_the_fernandezes_remember_me", JSON.stringify({ ...session, authToken }))
//         return tryAgainRes
//       } catch (err) {
//         return res
//       }
//     }
//     return res
//   } catch (e) {
//     return e
//   }
// }

export const graphQLClientContext = new GraphQLClient({
  url: process.env.REACT_APP_API_URL || "localhost:8080/graphql",
  // fetch: jwtRefresh,
})

export const GraphQLProvider = ({ children }) => {
  return <ClientContext.Provider value={graphQLClientContext}>{children}</ClientContext.Provider>
}
