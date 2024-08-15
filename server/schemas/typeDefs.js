const typeDefs = `
    type User {
      _id: ID
      username: String
      email: String
      password: String
    }

    type Auth {
      token: ID!
      user: User
    }

    type Query {
      users: [User]!
      user(userId: ID!): Profile
      me: User
    }

    type Mutation {
      addUser(username: String!, email: String!, password: String!): Auth
      login(email: String!, password: String!): Auth
      removeUser: User
    }
`;

module.exports = typeDefs;