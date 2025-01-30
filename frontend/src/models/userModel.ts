import { UserRoleEnum } from '../enums';

export type IUserDetails = Omit<IUser, 'clerkId'>;

export interface IUser {
    _id: string,
    clerkId: string,
    profilePicture: string,
    role: UserRoleEnum,
    onboardingStep: number,
    contactedUsers: string[], // modified to keep clerk ID's
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IUserWithClerk extends IUser {
    firstName: string,
    lastName: string,
    email: string,
    nickname: string,
}

export interface IUserWithCompatibilityScore {
    user: IUserWithClerk,
    compatibilityScore: number,
}