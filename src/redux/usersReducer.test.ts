import usersReducer, { InitialStateType, UsersActions } from "./usersReducer";

let state: InitialStateType;

beforeEach(() => {
   state = {
        users: [{
            id: 0,
            name: 'Lol',
            photos: { large: 'lol', small: 'sds' },
            status: 'lolol',
            followed: false
        },
        {
            id: 1,
            name: 'kol',
            photos: { large: 'kol', small: 'sds' },
            status: 'lolol',
            followed: false
        },
        {
            id: 2,
            name: 'lok',
            photos: { large: 'kol', small: 'sds' },
            status: 'lolol',
            followed: true
        }],
        pageSize: 20,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [], //array of users ids
    };
});

test("follow success", () => {

    const newState = usersReducer(state, UsersActions.follow(1));
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})

test("unfollow success", () => {

    const newState = usersReducer(state, UsersActions.unfollow(2));
    expect(newState.users[1].followed).toBeFalsy();
    expect(newState.users[2].followed).toBeFalsy();
})