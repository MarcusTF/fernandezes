export const GET_ALL_STOPS = `
  query getStops($search: String = "") {
    stops(where: { search: $search }) {
      nodes {
        id
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

export const GET_STOP = `
  query GetStop($id: ID = "") {
    stop(id: $id) {
      location {
        coords {
          lat
          lng
        }
        address
        pois {
          address
          coords {
            lat
            lng
          }
          description
          fieldGroupName
          name
          website
          pictures {
            mediaItemUrl
          }
        }
      }
      images {
        thumbnail {
          mediaItemUrl
        }
        photos {
          mediaItemUrl
        }
      }
      time {
        date
        endDate
        startDate
      }
      text {
        description
      }
      metadata {
        home
        travelers {
          ... on Traveler {
            id
          }
        }
      }
      title
      id
    }
  }
`
