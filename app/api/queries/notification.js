import { gql } from '@apollo/client';

export const QUERY_MY_NOTIFICATIONS = gql`
  {
    myNotifications {
        _id
        senderId {
            _id
            username
        }
        isActivated
        isRead
        sessionId
    }
  }
`;