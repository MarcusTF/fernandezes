export const GET_ALL_STOPS = `
  query getAllStops {
    stops {
      nodes {
        id
        images {
          photos {
            id
            mediaItemUrl
            title
          }
        }
        location {
          lat
          lng
        }
      }
    }
  }
`
