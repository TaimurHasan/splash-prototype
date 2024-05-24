import { gql } from '@apollo/client';

export const QUERY_ACTIVE_SESSION = gql`
  query activeSession($id: ID!) {
    activeSession(id: $id) {
      _id
      startedAt
      playerStats {
        _id
        user {
          _id
          username 
        }
        FGM
        FGA
        PTS
        TPM
        BLK
        REB
        STL
      }
    }
  }
`;