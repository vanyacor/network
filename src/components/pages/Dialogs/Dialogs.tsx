import React from 'react';
import classes from './Dialogs.module.css';
import MessagesContainer from './Messages/MessagesContainer';
import PersonsContainer from './Persons/PersonsContainer';

type DialogsMainType = {};
const Dialogs: React.FC<DialogsMainType> = (props) => {
    return (
        <div className={classes.dialogs}>
            <PersonsContainer />
            <MessagesContainer />
        </div>
    )
};


export default Dialogs;