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