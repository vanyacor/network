import { setFollowing, UsersActions } from './usersReducer';
import { usersAPI } from './../api/users-api';
import { ResultCodesEnum, TheMostCommonResponseType } from './../api/api';

jest.mock('./../api/users-api');
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const result: TheMostCommonResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {},
}
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.follow.mockClear();
    userAPIMock.unfollow.mockClear();
});  //reset mocks before each test

userAPIMock.follow.mockReturnValue(Promise.resolve(result));
test("success follow thunk", async () => {
    const thunk = setFollowing(true, 2);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, UsersActions.setFollowingProgress(true, 2));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, UsersActions.follow(2));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, UsersActions.setFollowingProgress(false, 2))
});


userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
test("success unfollow thunk", async () => {
    const thunk = setFollowing(false, 2);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, UsersActions.setFollowingProgress(true, 2));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, UsersActions.unfollow(2));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, UsersActions.setFollowingProgress(false, 2))
});