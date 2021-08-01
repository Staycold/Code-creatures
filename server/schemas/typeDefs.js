const { gql } = require('apollo-server-express');

const typeDefs = gql` 

type User {
    _id: ID
    username: String
    email: String!
    inventory:Inventory
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

type Inventory {
    inventoryId: ID
    coins: Int
    food1: Int
    food2: Int
    food3: Int
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
    addUser(username: String!, email: String!, password: String!, inventory: InventoryData): Auth
    addPet(petData: PetStats!): User
    addChallenge( challenge: challengeData!): Question
    mutateInv( invData: InventoryData! ) : User
    addExp(petExp: Int! ) : User
}

input InventoryData {
    coins: Int
    food1: Int
    food2: Int
    food3: Int
}

input challengeData {
    _id: ID
    question: String!
    correctAnswer: String!
    choices: [String]
}

input PetStats {
    petName: String!
    petType: String!
    experience: Int!
    level: Int!
}

input petExp {
    exp: Int!


}






`

module.exports = typeDefs;