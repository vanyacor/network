import React from 'react';
import Header from '../Header/Header';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProfileContainer from '../pages/Profile/ProfileContainer';
import UsersContainer from '../pages/Users/UsersContainer';
import Navbar from '../Navbar/Navbar';
import Loader from '../preloader/Loader';

const Dialogs = React.lazy(() => import('../pages/Dialogs/Dialogs'));
const News = React.lazy(() => import('../pages/News/News'));
const Settings = React.lazy(() => import('../pages/Settings/Settings'));

type PropsType = {
     login: string
     logout: () => void
}

let Content: React.FC<PropsType> = (props) => {
    return (
        <div className="appWrapper">
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
                            <Route key="profile" path="/profile/:userId?"
                            // @ts-ignore
                                render={() => <ProfileContainer />} />
                            <Route key="users" path="/users"
                                render={() => <UsersContainer />} />
                            <Route key="/" exact path={"/"} render={() => <Redirect to="/profile" />} />
                            <Route key="*" path={"*"} render={() =>  <div className={"not_found"}>404 NOT FOUND</div>} />
                        </Switch>
                    </React.Suspense>

                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default Content;