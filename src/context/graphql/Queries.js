export const GET_ALL_STOPS = `
  query getStops($search: String = "") {
    stops(where: { search: $search }) {
      nodes {
        title
        location {
          coords {
            lat
            lng
          }
        }
        time {
          endDate
          date
          startDate
          when
        }
        metadata {
          home
        }
      }
    }
  }
`
