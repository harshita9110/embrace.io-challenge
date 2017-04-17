import * as api from './api';
import config from '../config.js';

export function getResults(title, type) {
    return api.get(`${config.serverUrl}/?s=${title}&type=${type}`);
}
