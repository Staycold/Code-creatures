const { gql } = require('apollo-server-express');

const typeDefs = gql` 

type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    pets: [Pets]
}

type: Auth {
    token: ID!
    user: User
}

type Pets {
    petId: ID
    petName: String!
    experience: Int!
    level: Int!

}
type Challenge {
    questionId: ID
    question: String!
    correctAnswer: String!
    experience: Int!
    choices: [Answer]
}

type: Answer {
    answer: String!
}


type Query {
    me: User
    challenges: [Challenge]

}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPet(petname: String!): User

}

`

module.exports = typeDefs;