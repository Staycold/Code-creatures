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
      petSprite
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
;