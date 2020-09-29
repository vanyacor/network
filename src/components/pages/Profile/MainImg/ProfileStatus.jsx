import React, { useEffect, useState } from 'react';
import classes from './MainImg.module.css'; 

const ProfileStatus = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
         setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        if (!props.profileUser) {
            setEditMode(true);
        }
    };

    const disableEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (<div className={classes.statusWrapper}>
        {editMode
            ? <textarea
                onChange={onStatusChange}
                autoFocus={true} onBlur={disableEditMode}
                className={classes.statusText + " " + classes.statusInput}
                value={status} />
            : <span
                onDoubleClick={activateEditMode}
                className={classes.statusText}>
                {status ? status : "Click twice to add status"}
            </span>
        }
    </div>)
}


export default ProfileStatus;