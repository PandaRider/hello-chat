import { PICK_MATCH } from '../Actions/types';

export const startChat = (roomKey) => ({
    type: PICK_MATCH,
    payload: roomKey
});
