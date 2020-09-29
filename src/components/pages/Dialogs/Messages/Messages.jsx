import React from 'react';
import Message from './MessageItem/Message';
import classes from './Messages.module.css';



const Messages = (props) => {
    let messages = props.messages
        .map(message => (
            <Message user={message.user} key={message.id} message={message.message} />
        ));

    let newMessageElement = React.createRef();

    const enter = (event) => {
        if (event.key === 'Enter') onAddMessage();
    };

    const onAddMessage = () => {
        props.addMessage();
    };

    const onMessageChange = () => {
        let text = newMessageElement.current.value;
        props.updateNewMessageText(text);
    };


    return (
        <div className={classes.wrapper}>
            <div className={classes.messages}>
                {messages}
            </div>
            <div className={classes.input}>
                <textarea onKeyDown={enter} onChange={onMessageChange} ref={newMessageElement} className={classes.messagesArea} value={props.newMessageText} />
                <button onClick={onAddMessage} className={classes.messageBtn}>
                    <span>&#8250;</span>
                </button>
            </div>
        </div>
    );
};

export default Messages;