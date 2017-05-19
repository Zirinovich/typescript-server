import {contentReducer} from './redux/contentReducer';
import {usersReducer} from './redux/usersReducer';
import {rolesReducer} from './redux/rolesReducer';

export const reducers = {
    content: contentReducer,
    users: usersReducer,
    roles: rolesReducer
};