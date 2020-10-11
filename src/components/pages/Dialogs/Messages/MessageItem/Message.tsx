import React from 'react';
import classes from './Message.module.css'

type MessageType = {
    user: string
    message: string
}
const Message: React.FC<MessageType> = (props) => {
    let style = () => (props.user == 'me') ? classes.right : classes.left;
    return (
        <div className={`${classes.wrapper}`}>
            <div className={`${style()}`}>
                <div className={classes.message}>
                    {props.message}
                </div>
            </div>
        </div>
    );
}

export default Message;