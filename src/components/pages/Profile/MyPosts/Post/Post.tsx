import React from 'react';
import classes from './Post.module.css';

type PostType = {
    message: string
    likes: number
}
const Post: React.FC<PostType> = (props) => {
    return (
        <div className={classes.post}>
            {props.message}
            <span>{props.likes} like</span>
        </div>
    );
}
export default Post;