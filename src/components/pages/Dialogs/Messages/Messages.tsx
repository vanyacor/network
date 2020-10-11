import React, { BaseSyntheticEvent } from 'react';
import Message from './MessageItem/Message';
import classes from './Messages.module.css';
import { MessagesDataType } from './../../../../types/types';
import { DialogsActionsType } from '../../../../redux/dialogsReducer';


type MessagesType = {
    newMessageText: string
    messages: Array<MessagesDataType>
    addMessage: () => void
    updateNewMessageText: (text: string) => void 
}
const Messages: React.FC<MessagesType> = (props) => {
    let messages = props.messages
        .map((message: MessagesDataType) => (
            <Message user={message.user} key={message.id} message={message.message} />
        ));


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


    return (
        <div className={classes.wrapper}>
            <div className={classes.messages}>
                {messages}
            </div>
            <div className={classes.input}>
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
            </div>
        </div>
    );
};

export default Messages;