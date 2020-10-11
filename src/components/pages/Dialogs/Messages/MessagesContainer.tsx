import React, { Dispatch } from 'react';
import Messages from './Messages';
import { connect } from 'react-redux';
import { DialogsActions } from '../../../../redux/dialogsReducer';
import { AppStateType } from '../../../../redux/redux-store';
import { Action } from 'redux';



let mapStateToProps = (state: AppStateType) => {
    return {
        newMessageText: state.messagesPage.newMessageText,
        messages: state.messagesPage.messagesData
    };
};

/* let mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
        addMessage: () => { dispatch(DialogsActions.addMessage()) },
        updateNewMessageText: (text: string) => { dispatch(DialogsActions.updateNewMessageText(text)) },
    };
}; */

const MessagesContainer = connect(mapStateToProps, {...DialogsActions})(Messages);

export default MessagesContainer;