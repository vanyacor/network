import React from 'react';
import Header from './../Header/Header';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProfileContainer from '../pages/Profile/ProfileContainer';
import UsersContainer from '../pages/Users/UsersContainer';
import Navbar from './../Navbar/Navbar';
import Loader from '../preloader/Loader';

const Dialogs = React.lazy(() => import('./../pages/Dialogs/Dialogs'));
const News = React.lazy(() => import('./../pages/News/News'));
const Settings = React.lazy(() => import('./../pages/Settings/Settings'));

let Content = props => {
    debugger;
    return (
        <div>
            <Header login={props.login} logout={props.logout} />
            <div className="container">

                <div className="app-wrapper-content">
                    <React.Suspense fallback={<Loader></Loader>}>
                        <Switch >
                            <Route key="dialogs" path="/dialogs"
                                render={() => <Dialogs />} /> {/* EXACT exact /dialogs */}
                            <Route key="news" path="/news"
                                component={News} />
                            <Route key="settings" path="/settings"
                                component={Settings} />
                        </Switch>
                    </React.Suspense>
                    <Route key="profile" path="/profile/:userId?"
                        render={() => <ProfileContainer />} />
                    <Route key="users" path="/users"
                        render={() => <UsersContainer />} />
                    <Route key="/" path={"/"} render={() => <Redirect to="/profile" />} />
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default Content;