import { gql } from '@apollo/client';


export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;

export const ADD_PET = gql`
mutation addPet($petData: PetStats!){
  addPet(petData:$petData) {
    username
    pets {
      petName
      petType
    }
  }
}
`
;

export const ADD_CHALLENGE = gql`
mutation addChallenge($challenge: challengeData!){
  addChallenge(challenge:$challenge){
    question {
      question
      correctAnswer
      choices
    }
  }
}
`

export const EDIT_INV = gql`
mutation mutateInv ($invData: InventoryData!) {
  mutateInv(invData:$invData) {
    username
    inventory{
      coins,
      food1,
      food2,
      food3
    }
  }
}
`
export const ADD_EXP = gql`
mutation addExp($petExp:Int! ){
  addExp(petExp:$petExp){
    username
    pets{
    petName
    experience
    }
  }
}
`

export const ADD_HAP = gql`
mutation addHappiness($hapValue: Int!){
  addHappiness(hapValue:$hapValue){
    username
    pets{
      petName
      experience
      happiness
    }
  }
}
`

export const ADD_COINS = gql`
mutation addCoins($coins: Int!){
  addCoins(coins:$coins){
    username
    inventory{
      coins
    }
  }
}
`

export const UPDATE_LVL = gql`
mutation updateLvl($petExp: Int!, $petLvl: Int!){
  updateLvl(petExp:$petExp, petLvl:$petLvl){
    username
    pets{
      petName
      level
      experience
    }
  }
}
`

;