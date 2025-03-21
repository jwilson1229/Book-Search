import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getMe {
    me {
      id
      username
      email
      savedBooks {
        id
        title
        author
      }
    }
  }
`;
