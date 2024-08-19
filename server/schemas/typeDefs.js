
const typeDefs = `
    type User {
      _id: ID!
      username: String!
      email: String!
    }

    type Auth {
      token: ID!
      user: User
    }

    type Playlist {
      id: ID!
      name: String
      description: String
      external_urls: ExternalUrls
    }

    type ExternalUrls {
      spotify: String
    }

    type Query {
      users: [User]
      user(username: String!): User
      me: User
      featuredPlaylists: [Playlist]
    }

    type Mutation {
      addUser(username: String!, email: String!, password: String!): Auth
      login(email: String!, password: String!): Auth
    }

    type hello {
      hello: String
    }
`;

module.exports = typeDefs;