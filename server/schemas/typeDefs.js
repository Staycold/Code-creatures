const { gql } = require('apollo-server-express');

const typeDefs = gql` 

type User {
    _id: ID
    username: String
    email: String!
    coins: Int
    password: String!
    pets:[Pet]
}

type Auth {
    token: ID!
    user: User
}

type Pet {
    petId: ID
    petName: String!
    petType: String!
    experience: Int
    level: Int!

}

type Challenge {
    _id: ID
    question: String
    correctAnswer: String
    experience: Int
    choices: [String]
}


type Query {
    me: User
    users: [User]
    challenges: [Challenge]
    pets:[Pet]
    challenge(challengeId: ID!): Challenge

}

type Question {
    question: Challenge
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPet(petData: PetStats!): User
    addChallenge( challenge: challengeData!): Question
    addExp( exp: PetStats! ) :User
}

input challengeData {
    _id: ID
    question: String!
    correctAnswer: String!
    experience: Int
    choices: [String]
}

input PetStats {
    petName: String!
    petType: String!
    experience: Int!
    level: Int!
}
`

module.exports = typeDefs;