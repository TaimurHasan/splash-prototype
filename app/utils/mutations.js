import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_FRIEND = gql`
    mutation addFriend($id: ID!) {
        addFriend(friendId: $id) {
            _id
            username
            friendCount
            friends {
                _id
                username
            }
        }
    }
`

export const ADD_SESSION = gql`
  mutation addSession($username: String!) {
    addSession(username: $username) {
      _id
    }
  }
`;

export const END_SESSION = gql`
  mutation endSession($username: String!) {
    endSession(username: $username) {
      _id
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
    addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
      _id
      reactionCount
      reactions {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`;