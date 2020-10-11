import React from 'react';
import { setAuth, setLogin, logout } from '../../redux/authReducer';
import { connect } from 'react-redux';
import Content from './Content';
import Login from './Login';
import { compose } from 'redux';
import img from './../../assets/images/forest.jpg';
import { getIsAuthSelect, getIsFetchingSelect, getLoginSelect } from '../../redux/auth-selectors';
import { AppStateType } from "./../../redux/redux-store"
import { LoginType } from '../../types/types';

type MapStateToPropsType = {
    isAuth: boolean
    isFetching: boolean
    login: string
    isRequesting: boolean
    captchaUrl: string | null
}

type MapDispatchToProps = {
    setAuth: () => void
    setLogin: (LoginData: LoginType) => void
    logout: () => void
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
                ? <Content {...this.props} ></Content>
                : <Login
                    isRequesting={this.props.isRequesting}
                    isFetching={this.props.isFetching}
                    setLogin={this.props.setLogin}
                    bgimg={img}
                    captchaUrl={this.props.captchaUrl}
                ></Login>}
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
        isFetching: getIsFetchingSelect(state),
        login: getLoginSelect(state),
        isRequesting: state.auth.isRequesting,
        captchaUrl: state.auth.captchaUrl,
    }
};

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToProps>(mapStateToProps, { setAuth, setLogin, logout })
)(AuthContainer);;