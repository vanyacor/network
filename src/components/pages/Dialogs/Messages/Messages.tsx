import React, { BaseSyntheticEvent } from 'react';
import Message from './MessageItem/Message';
import classes from './Messages.module.css';
import { MessagesDataType } from './../../../../types/types';
import { DialogsActionsType } from '../../../../redux/dialogsReducer';


type MessagesType = {
    /* newMessageText: string */
    messages: Array<MessagesDataType>/* 
    addMessage: () => void
    updateNewMessageText: (text: string) => void */
}
const Messages: React.FC<MessagesType> = (props) => {
    let messages = props.messages
        .map((message: MessagesDataType) => (
            <Message user={message.user} key={message.id} message={message.message} />
        ));





    return (
        <div className={classes.wrapper}>
            <div className={classes.messages}>
                {messages}
            </div>
        </div>
    );
};

export default Messages;