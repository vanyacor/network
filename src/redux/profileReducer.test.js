import profileReducer, { ProfileActions } from './profileReducer';
// 1. test data
let action = ProfileActions.addPostActionCreator();
let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: "22" },
        { id: 2, message: "Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post ", likesCount: "23" },
        { id: 3, message: 'It\'s my first post', likesCount: "2" },
    ],
    newPostText: "it-kamasutra.com",
};

test("length of posts should be incremented", () => {


    //2. action
    let newState = profileReducer(initialState, action);

    //3. expectation
    expect(newState.posts.length).toBe(4);
});

test("message of posts should be it-kamasutra.com", () => {


    //2. action
    let newState = profileReducer(initialState, action);

    //3. expectation
    expect(newState.posts[3].message).toBe("it-kamasutra.com");
});
test("id of posts[4] should be 4", () => {


    //2. action
    let newState = profileReducer(initialState, action);

    //3. expectation

    expect(newState.posts[3].id).toBe(4);
});
test("likesCount of posts[4] should be 0", () => {


    //2. action
    let newState = profileReducer(initialState, action);

    //3. expectation

    expect(newState.posts[3].likesCount).toBe(0);
});

test("length of message after deleting should decremented", () => {

    let action = ProfileActions.deletePost(3);
    //2. action
    let newState = profileReducer(initialState, action);

    //3. expectation

    expect(newState.posts.length).toBe(2);
});