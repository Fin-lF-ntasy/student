import { combineReducers } from "redux";
import { pagination } from "./pagination";
import { students } from "./students";
import { search } from "./search";
import { connectRouter } from 'connected-react-router';

const createRootReducer = history => combineReducers({
    router: connectRouter(history),
    pagination: pagination,
    students: students,
    search: search
});

export default createRootReducer;
