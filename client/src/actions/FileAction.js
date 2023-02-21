import axios from 'axios';

import {
    GET_ERROR,
    GET_EVENT
} from './types';

let pre_path;
let interval1;

export const SetPath = ({ path, location }) => async (dispatch) => {
    try {
        const handler = async (pth) => {
            const mtime = await axios.post('/api/file', { data: pth });
            dispatch({
                type: GET_EVENT,
                payload: { time: mtime, position: location, path: path }
            });
        }
        if (pre_path === path) {
            interval1 = setInterval(() => {
                handler(path);
            }, 5000);
        } else {
            pre_path = path;
            clearInterval(interval1);
            handler(path);
        }
    } catch (err) {
        dispatch({
            type: GET_ERROR
        });
    }
};