import React, { Dispatch } from 'react';
import Persons from './Persons';
import { connect } from 'react-redux';
import { AppStateType } from '../../../../redux/redux-store';
import { Action } from 'redux';



let mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.messagesPage.dialogs,
    };
};

let mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {};
};


const PersonsContainer = connect(mapStateToProps, mapDispatchToProps)(Persons);

export default PersonsContainer;