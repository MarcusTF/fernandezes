export const GET_ALL_STOPS = `
  query getAllStops {
    stops {
      nodes {
        id
        location {
          lat
          lng
          address
        }
      }
    }
  }
`
