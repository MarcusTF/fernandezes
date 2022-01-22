export const GET_ALL_STOPS = `
  query searchStops($search: String = "") {
    stops(first: 1000, where: { search: $search }) {
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
`

export const GET_STOP_DETAILS = `
  query GetStopDetails($id: ID = "") {
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
            mediaDetails {
              sizes {
                width
                name
                sourceUrl
              }
            }
            mediaItemUrl
            altText
          }
        }
      }
      images {
        thumbnail {
          mediaItemUrl
          altText
          mediaDetails {
            sizes {
              width
              name
              sourceUrl
            }
          }
        }
        photos {
          mediaItemUrl
          altText
          mediaDetails {
            sizes {
              width
              name
              sourceUrl
            }
          }
        }
      }
      time {
        date
        endDate
        startDate
      }
      text {
        title
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
