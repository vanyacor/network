import React, { ChangeEvent, useEffect, useState } from 'react';
import classes from './MainImg.module.css'; 

type PropsType = {
    status: string
    profileUser: number
    updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState<boolean>(false);
    let [status, setStatus] = useState<string>(props.status);

    useEffect(() => {
         setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        if (!props.profileUser) {
            setEditMode(true);
        }
    };

    const disableEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onStatusChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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