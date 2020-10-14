import React from 'react';
import classes from './BottomBar.module.css';

type BottomBarTypes = {

}

const BottomBar: React.FC<BottomBarTypes> = (props) => {
    return (<div className={classes.bottom_bar}>
       {props.children}
    </div>);
}

export default BottomBar;