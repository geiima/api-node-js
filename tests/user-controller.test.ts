// tests/api.spec.ts
import { test, expect } from '@playwright/test';
import {StatusCodes} from "http-status-codes";
let baseURL: string = 'http://localhost:3000/users';

test.describe('User management API - all other tests', () => {

    test.beforeEach(async ({request}) => {
        // get all users
        const responseAllUsers = await request.get(`${baseURL}`);
        expect(responseAllUsers.status()).toBe(StatusCodes.OK);

        const responseUsers = await responseAllUsers.json()
        const numberOfObjects = responseUsers.length;
        console.log('Existing users before test: ' + numberOfObjects);

        let userIDs: number[] = [];

        // loop through all users and store their ID in an array
        for (let i = 0; i < numberOfObjects; i++) {
            let userID = responseUsers[i].id;
            userIDs.push(userID);
        }
        console.log('userIDs', userIDs);

        // delete all users
        for (let i = 0; i < numberOfObjects; i++) {
            let response = await request.delete(`${baseURL}/${userIDs[i]}`);
            expect.soft(response.status()).toBe(200);
        }

        // verify cleanup
        const finalCheck = await request.get(`${baseURL}`);
        expect(finalCheck.status()).toBe(StatusCodes.OK);
        const responseBody = await finalCheck.json()
        expect(responseBody).toEqual([]);

    });

    // TESTS
    test('find user: should return a user by ID', async ({request}) => {
        // create user
        const response = await request.post(`${baseURL}`);
        const responseBody = await response.json()
        const userId = responseBody.id

        //find user by ID
        const getResponse = await request.get(baseURL + '/' + userId);
        expect(getResponse.status()).toBe(StatusCodes.OK);

    });

    test('find user: should return 404 if user not found', async ({request}) => {
        const nonExistingUserID = 123456789101112
        const response = await request.get(`${baseURL}/${nonExistingUserID}`);
        expect(response.status()).toBe(StatusCodes.NOT_FOUND);
    });

    test('create user: should add a new user', async ({request}) => {
        const response = await request.post(`${baseURL}`);
        expect(response.status()).toBe(StatusCodes.CREATED);
        const responseBody = await response.json()
        expect(responseBody.name).toBeDefined();
        console.log(responseBody);
    });

    test('delete user: should delete a user by ID', async ({request}) => {
        // create user
        const response = await request.post(`${baseURL}`);
        const responseBody = await response.json()
        const userId = responseBody.id

        // delete user
        const getResponse = await request.delete(baseURL + '/' + userId);
        expect(getResponse.status()).toBe(StatusCodes.OK);
    });

    test('delete user: should return 404 if user not found', async ({request}) => {
        const nonExistingUserID = 123456789101112
        const getResponse = await request.delete(baseURL + '/' + nonExistingUserID);
        expect(getResponse.status()).toBe(StatusCodes.NOT_FOUND);
    });

    test('get users ID information', async ({request}) => {
        // create two users
        const response1 = await request.post(`${baseURL}`);
        expect(response1.status()).toBe(StatusCodes.CREATED);
        const response2 = await request.post(`${baseURL}`);
        expect(response2.status()).toBe(StatusCodes.CREATED);

        // get all users
        const responseAllUsers = await request.get(`${baseURL}`);
        const responseUsers = await responseAllUsers.json()
        const numberOfObjects = responseUsers.length;
        console.log('numberOfObjects', numberOfObjects);

        let userIDs: number[] = [];

        // loop through all users and store their ID in an array
        for (let i = 0; i < numberOfObjects; i++) {
            // get user ID from the response
            let userID = responseUsers[i].id;
            // push is used to add elements to the end of an array
            userIDs.push(userID);
        }
        console.log('userIDs', userIDs);

    })
})
