import { gql } from '@apollo/client';

export const ADD_SESSION = gql`
  mutation addSession($players: [ID]!) {
    addSession(players: $players) {
      _id
    }
  }
`;

export const END_SESSION = gql`
  mutation endSession($sessionId: String!) {
    endSession(sessionId: $sessionId) {
      _id
    }
  }
`;

export const JOIN_SESSION = gql`
  mutation joinSession($sessionId: String!) {
    joinSession(sessionId: $sessionId) {
      _id
    }
  }
`;