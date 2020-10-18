import React, { BaseSyntheticEvent } from 'react';
import { AppStateType } from '../../../redux/redux-store';
import BottomBar from '../../BottomBar/BottomBar';
import classes from './Dialogs.module.css';
import MessagesContainer from './Messages/MessagesContainer';
import PersonsContainer from './Persons/PersonsContainer';
import { connect } from 'react-redux';
import { DialogsActions } from '../../../redux/dialogsReducer';

type DialogsTextAreaType = {
    newMessageText: string
}

type DispatchTextAreaType = {
    addMessage: () => void
    updateNewMessageText: (text: string) => void
}

const DialogsTextArea: React.FC<DialogsTextAreaType & DispatchTextAreaType> = (props) => {
    const enter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') onAddMessage();
    };

    const onAddMessage = () => {
        props.addMessage();
    };

    const onMessageChange = (e: BaseSyntheticEvent) => {
        let text = e.currentTarget.value;
        props.updateNewMessageText(text);
    };

    return (<div className={classes.input}>
        <textarea
            onKeyDown={enter}
            onChange={onMessageChange}
            className={classes.messagesArea}
            value={props.newMessageText}
            placeholder='Enter new message'
        />
        <button onClick={onAddMessage} className={classes.messageBtn}>
            <span>&#8250;</span>
        </button>
    </div>);
}
const MapStateToProps = (state: AppStateType): DialogsTextAreaType => ({
    newMessageText: state.messagesPage.newMessageText
});

const ConnectedDialogsTextArea = connect<DialogsTextAreaType, DispatchTextAreaType>(MapStateToProps, {
    addMessage: DialogsActions.addMessage,
    updateNewMessageText: DialogsActions.updateNewMessageText
})(DialogsTextArea);



type DialogsMainType = {};
const Dialogs: React.FC<DialogsMainType> = (props) => {
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs_content_wrapper}><PersonsContainer />
                <MessagesContainer /></div>
            <div className={classes.bottom_bar_wrapper}>
                <BottomBar >
                    <ConnectedDialogsTextArea />
                </BottomBar>
            </div>
        </div>
    )
};


export default Dialogs;