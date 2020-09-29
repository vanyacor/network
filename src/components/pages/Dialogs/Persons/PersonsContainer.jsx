import React from 'react';
import Persons from './Persons';
import { connect } from 'react-redux';




let mapStateToProps = (state) => {
    return {
        dialogs: state.messagesPage.dialogs,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {};
};


const PersonsContainer = connect(mapStateToProps, mapDispatchToProps)(Persons);

export default PersonsContainer;