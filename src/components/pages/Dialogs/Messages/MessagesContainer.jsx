import React from 'react';
import Messages from './Messages';
import { connect } from 'react-redux';
import { DialogsActions } from './../../../../redux/dialogsReducer';




let mapStateToProps = (state) => {
    return {
        newMessageText: state.messagesPage.newMessageText,
        messages: state.messagesPage.messagesData
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {dispatch(DialogsActions.addMessageActionCreator())},/* addMessage */
        updateNewMessageText: (text)=>{dispatch(DialogsActions.updateNewMessageTextActionCreator(text))},/* onMessageChange */
    };
};

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

export default MessagesContainer;