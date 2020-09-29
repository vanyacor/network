import React from 'react';
import classes from './Loader.module.css';

let Loader = (props) => {
    return (
        <div className={classes.lds_ellipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
};

export default Loader;