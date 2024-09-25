import User from "../src/classes/User/User";
import { Context } from "hono";
import { mock } from 'jest-mock-extended'
import { BaseUser } from "../src/interfaces/BaseUser";

describe('User class testing', () => {
    let instance: User;

    beforeEach(() => {
        instance = new User();
    });

    test('Cookie registering', () => {
        const honoContext = mock<Context>(),
                userData = mock<BaseUser>();
        userData.mockReturnValue(instance);

        expect(instance.registerUserCookies(honoContext, userData)).toBe(true);
    })
});