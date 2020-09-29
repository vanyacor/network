import React from 'react';
import classes from './Header.module.css';

class ProfileName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogoutOpen: false,
        }
    }

    onLoginClick () {
        this.setState({
            isLogoutOpen: !this.state.isLogoutOpen,
        });
    }
    logout () {
        this.props.logout();
    }
    render() {
        return (<div className={classes.userLogin}>
            <span onClick={this.onLoginClick.bind(this)}>{this.props.login}</span>
            {this.state.isLogoutOpen ? <div onClick={this.logout.bind(this)} className={classes.logout}>Logout</div> : null}
        </div>);
    }
}

const Header = (props) => {
    return (
        <header className={classes.header}>
            <img className={classes.img} src="https://is4-ssl.mzstatic.com/image/thumb/Purple113/v4/ee/91/eb/ee91ebc6-f7e6-2fa2-356e-d5930900691b/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png" />
            <ProfileName login={props.login} logout={props.logout}/>
        </header>)
}
export default Header;