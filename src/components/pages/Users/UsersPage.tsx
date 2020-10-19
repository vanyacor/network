import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Users from './Users';
import { getCurrentPage, getFilter, getPageSize } from '../../../redux/selectors/users-selectors';
import { getUsers } from '../../../redux/usersReducer';

type UsersPageType = {};
const UsersPage: React.FC<UsersPageType> = (props) => {
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getFilter);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter));
    }, []);

    return <Users></Users>
}

//HERE many times ago was connect))

/* let mapDispatchToProps = (dispatch) => {
    return {
        setIsFetching: isFetching => {
            dispatch(setIsFetchingAC(isFetching));
        },
        getUsers: (currentPage, pageSize) => {
            dispatch(getUsers(currentPage, pageSize))
        }
    };
}; */

export default UsersPage;