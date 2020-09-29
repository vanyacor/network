import React, { useEffect, useState } from 'react';
import classes from './MainImg.module.css';

/* class ProfileS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            status: '',
        }
    }

    componentDidMount() {
        this.setState({
            status: this.props.status,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status,
            });
        }
    }

    activateEditMode = () => {
        if (!this.props.profileUser) {
            this.setState({
                editMode: true,
            })
        }

    }
    disableEditMode = () => {
        this.setState({
            editMode: false,
        })
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }


    render() {
        return (<div className={classes.statusWrapper}>
            {this.state.editMode
                ? <textarea onChange={this.onStatusChange} autoFocus={true} onBlur={this.disableEditMode} className={classes.statusText + " " + classes.statusInput} value={this.state.status} />
                : <span onDoubleClick={this.activateEditMode} className={classes.statusText}>{this.state.status ? this.props.status : "Click twice to add status"}</span>

            }

        </div>)
    }
} */

describe("ProfileStatus component", () => {
   /* test("") */
});