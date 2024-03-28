import { gql } from '@apollo/client';

export const QUERY_ACTIVE_SESSION = gql`
  query activeSession($id: ID!) {
    activeSession(id: $id) {
      _id
      startedAt
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
      isActive
      activeSessionId
    }
  }
`;

export const QUERY_MY_NOTIFICATIONS = gql`
  {
    myNotifications {
      senderId {
        _id
        username
      }
      isActivated
      isRead
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