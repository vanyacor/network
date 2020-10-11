import React from 'react';
import classes from './Persons.module.css';
import DialogItem from './DialogItem/DialogItem';
import { DialogsUsersType } from '../../../../types/types';
import { PseudoBigInt } from 'typescript';

type PersonsType = {
    dialogs: Array<DialogsUsersType>
}
const Persons: React.FC<PersonsType> = (props) => {
    let Dialogs = props.dialogs
        .map((dialog: DialogsUsersType) => (
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