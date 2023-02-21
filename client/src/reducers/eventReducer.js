import {
    GET_EVENT,
    GET_ERROR
} from '../actions/types';

const initialState = {
    timeStamp: "",
    location: "",
    path: "",
};

const Event = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_EVENT:
            return {
                ...state,
                timeStamp: payload.time.data,
                location: payload.position,
                path: payload.path
            }
        case GET_ERROR:
        default:
            return state;
    }
}

export default Event;
