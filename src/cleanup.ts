import { APIRequestContext, expect } from '@playwright/test';
import {StatusCodes} from "http-status-codes";
let baseURL: string = 'http://localhost:3000/users';

export async function cleanupUsers(request: APIRequestContext): Promise<void> {
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
}