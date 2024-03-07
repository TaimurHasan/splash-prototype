import { gql } from '@apollo/client';

export const QUERY_THOUGHTS = gql`
    query thoughts($username: String, $isAaron: Boolean!) {
        thoughts(username: $username, isAaron: $isAaron) {
            _id
            thoughtText
            createdAt
            username
            aaronOnly
            reactionCount
            reactions {
                _id
                createdAt
                username
                reactionBody
            }
        }
    }
`;

export const QUERY_THOUGHT = gql`
    query thought($id: ID!) {
        thought(_id: $id) {
            _id
            thoughtText
            createdAt
            username
            aaronOnly
            reactionCount
            reactions {
                _id
                createdAt
                username
                reactionBody
            }
        }
    }
`

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
        aaronOnly
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      isAaron
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;