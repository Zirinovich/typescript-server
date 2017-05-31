import {contentReducer} from './redux/contentReducer';
import {filesReducer} from './redux/filesReducer';
import {usersReducer} from './redux/usersReducer';
import {rolesReducer} from './redux/rolesReducer';

export const reducers = {
    contentdata: contentReducer,
    files: filesReducer,
    users: usersReducer,
    roles: rolesReducer
};