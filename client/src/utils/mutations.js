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
;