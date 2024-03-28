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