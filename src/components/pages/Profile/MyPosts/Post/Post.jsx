import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
    return (
        <div className={classes.post}>
            {props.message}
            <span>{props.likes} like</span>
        </div>
    );
}
export default Post;