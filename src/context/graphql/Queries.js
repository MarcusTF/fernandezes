export const GET_ALL_STOPS = `
  query getAllStops {
    stops {
      nodes {
        id
        time {
          when
          startDate
          endDate
          date
        }
        location {
          lat
          lng
          address
        }
      }
    }
  }
`
