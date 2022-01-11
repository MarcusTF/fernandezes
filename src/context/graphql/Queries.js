export const GET_ALL_STOPS = `
  query getAllStops($search: String) {
    stops(where: {search: $search}) {
      nodes {
        title
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
