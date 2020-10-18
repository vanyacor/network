import React from 'react';
import classes from './Post.module.css';

type PostType = {
    message: string
    likes: number
}
const Post: React.FC<PostType> = (props) => {
    return (
        <div className={classes.post}>
            <span className={classes.post_message}>{props.message}</span>
            <span className={classes.post_likes}>{props.likes} like</span>
        </div>
    );
}
export default Post;