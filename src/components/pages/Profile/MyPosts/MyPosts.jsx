import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';



const MyPosts = React.memo((props) => {

    let posts = props.posts
        .map(postMessage => (
            <Post key={postMessage.id} message={postMessage.message} likes={postMessage.likesCount} />
        ));


    const enter = (event) => {
        if (event.key === 'Enter') onAddPost();
    };

    const onAddPost = () => {
        props.addPost();
    };

    const onPostChange = (e) => {
        let text = e.currentTarget.value;
        props.updateNewPostText(text);
    };
    console.log("render");

    return (
        <div className={classes.wrapper}>
            <div className={classes.post}>
                <h2>Add new post</h2>
                <div className={classes.posts__new}>
                    <textarea onKeyDown={enter} onChange={onPostChange} className={classes.addPostArea} value={props.newPostText} placeholder='Enter new post...' />
                    <button onClick={onAddPost} className={classes.postBtn}>
                        <span>&#8250;</span>
                    </button>
                </div>
            </div>
            <div className={classes.posts__wrapper}>
                {posts.reverse()}
            </div>
        </div>

    );
})
export default MyPosts;