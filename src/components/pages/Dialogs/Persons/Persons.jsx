import React from 'react';
import classes from './Persons.module.css';
import DialogItem from './DialogItem/DialogItem';

const Persons = (props) => {
    let Dialogs = props.dialogs
        .map(dialog => (
            <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />
        ));


    return (
        <div className={classes.dialogs_items_wrapper}>
            <div className={classes.dialogs_items}>
                {Dialogs}
            </div>
        </div>
    );
};

export default Persons;