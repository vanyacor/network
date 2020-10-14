import React from 'react';
import classes from './Settings.module.css';
import BottomBar from './../../BottomBar/BottomBar';
import { LoginName } from './../../LoginName/LoginName';



const Settings = (props: any) => {
    return (
        <div className={classes.settings}>
            <span>Settings</span>
            <BottomBar>
                <LoginName />
            </BottomBar>
        </div>
    );
}


export default Settings;