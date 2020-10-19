import React from 'react';
import { setAuth, setLogin } from '../../redux/authReducer';
import { connect } from 'react-redux';
import Content from './Content';
import Login from './Login';
import { compose } from 'redux';
import { getIsAuthSelect, getIsFetchingSelect, getIsRequesting } from '../../redux/selectors/auth-selectors';
import { AppStateType } from "./../../redux/redux-store";
import { getCaptchaUrl } from './../../redux/selectors/auth-selectors';

type MapStateToPropsType = {
    isAuth: boolean
}

type MapDispatchToProps = {
    setAuth: () => void
}

type PropsType = MapStateToPropsType & MapDispatchToProps;

class AuthContainer extends React.Component<PropsType> {

    // @ts-ignore
    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        alert("Some error occured");
    }
    componentWillMount() {
        this.props.setAuth();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        // @ts-ignore
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        return (<div>
            {this.props.isAuth
                ? <Content {...this.props} />
                : <Login />}
        </div>)
    }
}
/* 
let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        isFetching: state.auth.isFetching,
        login: state.auth.login,
    }
}; */


let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: getIsAuthSelect(state),
    }
};

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToProps>(mapStateToProps, { setAuth })
)(AuthContainer);;