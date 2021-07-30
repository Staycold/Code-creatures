import { gql } from '@apollo/client';

export const QUERY_USER = gql`
{
me {
        _id
        username
        email
        pets{
            petId
            petName
            experience
            level
        }
    }
}
`
;

export const GET_CHALLENGE = gql`
{
challenges{
        _id
        question
        correctAnswer
        choices
    }
}
`
;

export const GET_SINGLE_CHALLENGE = gql`
query getSingleChallenge($challengeId: ID!) {
  challenge(challengeId: $challengeId) {
    _id
    question
    correctAnswer
    choices
  }
}
`;

