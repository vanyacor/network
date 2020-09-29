import React from 'react';
import classes from './Dialogs.module.css';
import MessagesContainer from './Messages/MessagesContainer';
import PersonsContainer from './Persons/PersonsContainer';


const Dialogs = (props) => {
    return (
        <div className={classes.dialogs}>
            <PersonsContainer />
            <MessagesContainer />
        </div>
    )
};


export default Dialogs;