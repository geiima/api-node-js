// tests/api.spec.ts
import { test, expect } from '@playwright/test';
import {StatusCodes} from "http-status-codes";
let baseURL: string = 'http://localhost:3000/users';

test.describe('User management API - all other tests', () => {

    test('find user: should return a user by ID', async ({ request }) => {
        // create user
        const response = await request.post(`${baseURL}`);
        const responseBody = await response.json()
        const userId = responseBody.id

        //find user by ID
        const getResponse = await request.get(baseURL + '/' + userId);
        expect(getResponse.status()).toBe(StatusCodes.OK);

    });

    test('find user: should return 404 if user not found', async ({ request }) => {
        const nonExistingUserID = 123456789101112
        const response = await request.get(`${baseURL}/${nonExistingUserID}`);
        expect(response.status()).toBe(StatusCodes.NOT_FOUND);
    });

    test('create user: should add a new user', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        expect(response.status()).toBe(StatusCodes.CREATED);
        const responseBody = await response.json()
        expect(responseBody.name).toBeDefined();
        console.log(responseBody);
    });

    test('delete user: should delete a user by ID', async ({ request }) => {
        // create user
        const response = await request.post(`${baseURL}`);
        const responseBody = await response.json()
        const userId = responseBody.id

        // delete user
        const getResponse = await request.delete(baseURL + '/' + userId);
        expect(getResponse.status()).toBe(StatusCodes.OK);
    });

    test('delete user: should return 404 if user not found', async ({ request }) => {
        const nonExistingUserID = 123456789101112
        const getResponse = await request.delete(baseURL + '/' + nonExistingUserID);
        expect(getResponse.status()).toBe(StatusCodes.NOT_FOUND);
    });
});
