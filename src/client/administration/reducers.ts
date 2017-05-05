import {usersReducer} from './redux/usersReducer';
import {rolesReducer} from './redux/rolesReducer';

export const reducers = {
    users: usersReducer,
    roles: rolesReducer
};