import React from 'react';
import { addMessageActionCreator, updateNewMessageTextActionCreator } from '../../../../redux/dialogsReducer';
import Messages from './Messages';
import { connect } from 'react-redux';




let mapStateToProps = (state) => {
    return {
        newMessageText: state.messagesPage.newMessageText,
        messages: state.messagesPage.messagesData
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {dispatch(addMessageActionCreator())},/* addMessage */
        updateNewMessageText: (text)=>{dispatch(updateNewMessageTextActionCreator(text))},/* onMessageChange */
    };
};

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

export default MessagesContainer;