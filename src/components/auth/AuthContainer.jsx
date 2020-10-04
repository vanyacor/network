import React from 'react';
import { setAuth, setLogin, logout } from './../../redux/authReducer';
import { connect } from 'react-redux';
import Content from './Content';
import Login from './Login';
import { compose } from 'redux';
import img from './../../assets/images/forest.jpg';
import { getIsAuthSelect, getIsFetchingSelect, getLoginSelect } from './../../redux/auth-selectors';

class AuthContainer extends React.Component {
    componentWillMount() {
        this.props.setAuth();
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


let mapStateToProps = (state) => {
    return {
        isAuth: getIsAuthSelect(state),
        isFetching: getIsFetchingSelect(state),
        login: getLoginSelect(state),
        isRequesting: state.auth.isRequesting,
        captchaUrl: state.auth.captchaUrl,
    }
};

export default compose(
    connect(mapStateToProps, { setAuth, setLogin, logout })
)(AuthContainer);;