import { User } from '../../models';

export const REGULAR_USER = new User({
    auth0Id: 'auth0|regularuser123',
    email: 'john_doe@example.com',
    nickname: 'johnny',
    firstName: 'John',
    lastName: 'Doe',
    profilePicture: 'https://example.com/path/to/regularuser/profilepic.jpg',
    role: 'user'
});

export const LANDLORD_USER = new User({
    auth0Id: 'auth0|landlorduser123',
    email: 'landlord@example.com',
    nickname: 'landlord',
    firstName: 'Land',
    lastName: 'Lord',
    profilePicture: 'https://example.com/path/to/landlord/profilepic.jpg',
    role: 'landlord'
});

const USERS = [REGULAR_USER, LANDLORD_USER];

export default USERS;
