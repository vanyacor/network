import React from 'react';
import classes from './Header.module.css';
/* import logo from './../../assets/images/'; */

class ProfileName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogoutOpen: false,
        }
    }

    onLoginClick() {
        this.setState({
            isLogoutOpen: !this.state.isLogoutOpen,
        });
    }
    logout() {
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
            <img className={classes.img} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Google_Lens_-_new_logo.png/600px-Google_Lens_-_new_logo.png"} alt="LOGO"/>
            <ProfileName login={props.login} logout={props.logout} />
        </header>)
}
export default Header;