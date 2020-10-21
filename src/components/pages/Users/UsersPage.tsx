import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Users from './Users';
import { getCurrentPage, getFilter, getPageSize } from '../../../redux/selectors/users-selectors';
import { getUsers } from '../../../redux/usersReducer';
import { useHistory } from 'react-router-dom';
import queryString from 'querystring';

type queryStringType = {
    term?: string
    friend?: string
    page?: string
}

type UsersPageType = {};

const UsersPage: React.FC<UsersPageType> = (props) => {
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getFilter);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as queryStringType;

        let actualPage = currentPage;
        let actualFilter = filter;
        if (!!parsed.page) actualPage = Number(parsed.page);
        if (!!parsed.term) actualFilter = {
            ...actualFilter,
            term: parsed.term as string
        }
        if (!!parsed.friend) actualFilter = {
            ...actualFilter, friend: parsed.friend === 'null'
                ? null
                : parsed.friend === "true"
                    ? true
                    : false,
        }

        dispatch(getUsers(actualPage, pageSize, actualFilter));
    }, []);

    useEffect(() => {
        const query: queryStringType = {};

        if (!!filter.term) query.term = filter.term;
        if (filter.friend !== null) query.friend = String(filter.friend);
        if (currentPage !== 1) query.page = String(currentPage);

        history.push({
            pathname: '/users',
            search: queryString.stringify(query),
        });
    }, [filter, currentPage]);



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