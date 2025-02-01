import { IFriendRequest, IFriendship, IListing, ISavedList, IUserWithClerk, IViewing } from "../src/models";
import { UserDetails } from "../src/contexts/UserDetailsContext";
import { getUserRoleEnumFromString, UserRoleEnum } from '../src/enums';
import { UserResource } from "@clerk/types";
import { describe, expect, test, jest, it} from '@jest/globals';

export const mockedFriends : IFriendship[] = [
    {
        firstUser: 'Ana Maria',
        secondUser:'Ioana'
    },
    {
        firstUser: 'Ana Maria',
        secondUser:'Miruna'
    },
    {
        firstUser: 'Ana Maria',
        secondUser:'Elena'
    }
]

export const mockedFriendRequests : IFriendRequest[] = [{
    requestedUser: 'maria',
    pendingUser: 'andrei',
    time: new Date(),
    status: 'pending',
}]

export const firstUser : IUserWithClerk = {
    _id: 'first user id',
	clerkId: 'clerk id',
	profilePicture: 'one pic',
	role: getUserRoleEnumFromString('ceva'),
	onboardingStep: 3,
	contactedUsers: [], // modified to keep clerk ID's
	favoriteListings: [],
	savedLists: [],
	viewedListings: [],
	createdAt: new Date(),
	updatedAt: new Date(),
    firstName: 'ana',
	lastName: 'maria',
	email: 'mail',
	nickname: 'anamaria',
}

export const secondUser : IUserWithClerk  = {
    _id: 'second user id',
	clerkId: 'clerk id 2',
	profilePicture: 'one pic 2',
	role: getUserRoleEnumFromString('ceva'),
	onboardingStep: 3,
	contactedUsers: [], // modified to keep clerk ID's
	favoriteListings: [],
	savedLists: [],
	viewedListings: [],
	createdAt: new Date(),
	updatedAt: new Date(),
    firstName: 'ioana',
	lastName: 'neacsu',
	email: 'mail 2',
	nickname: 'ioana',
}

export const oneListing : IListing = {
    _id: 'fake listing id',
    landlordId: 'user_2pwGRzshslTfPL09YP5S4jzVV7N',
    title: ' fake listing',
    description: '',
    photos: ['photo 1'],
    address: 'fake address',
    location: {
        type: 'fake address type',
        coordinates: [34,45],
    },
    type: 'apartment',
    price: 200,
    numberOfRooms: 3,
    numberOfBathrooms: 1,
    size: 100,
    external: false,
    url: '',
    amenities: ['sink'],
    createdAt: new Date(),
    updatedAt: new Date(),
    views: [new Date('2025-01-31 22:15:17'), new Date('2025-01-31 22:50:17'), new Date('2025-01-31 20:24:17'), new Date('2025-01-31 22:24:17'), new Date('2025-01-31 21:24:17'), new Date('2025-01-31 20:57:17')],
}

export const mockUseListing = {listing: oneListing, error: null};

export const mockSavedLists : ISavedList[] = [
    {
    _id:'1',
    name: 'first',
    ownerId: 'un id',
    sharedWith: [],
    savedListings: [],
    },
    {
        _id:'2',
        name: 'second',
        ownerId: 'alt id',
        sharedWith: [],
        savedListings: [],
        },
        {
            _id:'3',
            name: 'third',
            ownerId: 'un id',
            sharedWith: [],
            savedListings: [],
            }
]

export const mockedUserDetails : UserDetails = {
    onboardingStep: 3,
	setOnboardingStep: () => {},
	profilePictureUrl: '',
	setProfilePictureUrl: () => {},
	role: UserRoleEnum.RegularUser,
	setRole: () => {},
	userId: 'user_2pwGRzshslTfPL09YP5S4jzVV7N',
	setUserId:() => {},
	contactedUsers: [],
	setContactedUsers: () => {},
	favoriteListings: [],
	setFavoriteListings: () => {},
	savedLists: [],
	setSavedLists: () => {},
	viewedListings: [],
	setViewedListings: () => {},
};

export const mockListing: IListing = {
    _id: 'fake listing id',
    landlordId: 'user_2pwGRzshslTfPL09YP5S4jzVV7N',
    title: ' fake listing',
    description: '',
    photos: ['photo 1'],
    address: 'fake address',
    location: {
        type: 'fake address type',
        coordinates: [34,45],
    },
    type: 'apartment',
    price: 200,
    numberOfRooms: 3,
    numberOfBathrooms: 1,
    size: 100,
    external: false,
    url: '',
    amenities: ['sink'],
    createdAt: new Date(),
    updatedAt: new Date(),
    views: [new Date('2025-01-31 22:15:17'), new Date('2025-01-31 22:50:17'), new Date('2025-01-31 20:24:17'), new Date('2025-01-31 22:24:17'), new Date('2025-01-31 21:24:17'), new Date('2025-01-31 20:57:17')],
}

export const mockListingsResponse : IListing[] = 
    [
        {
            _id: 'fake listing id',
            landlordId: 'user_2pwGRzshslTfPL09YP5S4jzVV7N',
            title: ' fake listing',
            description: '',
            photos: ['photo 1'],
            address: 'fake address',
            location: {
                type: 'fake address type',
                coordinates: [34,45],
            },
            type: 'apartment',
            price: 200,
            numberOfRooms: 3,
            numberOfBathrooms: 1,
            size: 100,
            external: false,
            url: '',
            amenities: ['sink'],
            createdAt: new Date(),
            updatedAt: new Date(),
            views: [new Date('2025-01-31 22:15:17'), new Date('2025-01-31 22:50:17'), new Date('2025-01-31 20:24:17'), new Date('2025-01-31 22:24:17'), new Date('2025-01-31 21:24:17'), new Date('2025-01-31 20:57:17')],
        },
        {
            _id: 'fake listing id 2',
            landlordId: 'user_2pwGRzshslTfPL09YP5S4jzVV7N',
            title: ' fake listing',
            description: '',
            photos: ['photo 1'],
            address: 'fake address',
            location: {
                type: 'fake address type',
                coordinates: [34,45],
            },
            type: 'apartment',
            price: 200,
            numberOfRooms: 3,
            numberOfBathrooms: 1,
            size: 100,
            external: false,
            url: '',
            amenities: ['sink'],
            createdAt: new Date(),
            updatedAt: new Date(),
            views: [new Date('2025-01-31 18:15:17'), new Date('2025-01-31 17:50:17'), new Date('2025-01-31 19:24:17'), new Date('2025-01-31 18:37:17'), new Date('2025-01-31 19:24:17'), new Date('2025-01-31 20:57:17')],
        }
    ]

export const mockViewingsResponse : IViewing[] = [
    {
        _id: 'fake id 1',
        userId: 'some user',
        listingId: 'fake listing id 1',
        title: 'Some viewing',
        address: 'something',
        landlordId: 'user_2pwGRzshslTfPL09YP5S4jzVV7N',
        viewingDate: new Date('2025-01-31 21:50:17'),
        status: 'accepted',
    },
    {
        _id: 'fake id 2',
        userId: 'some user',
        listingId: 'fake listing id 2',
        title: 'Some viewing',
        address: 'something',
        landlordId: 'user_2pwGRzshslTfPL09YP5S4jzVV7N',
        viewingDate: new Date('2025-01-31 22:50:17'),
        status: 'accepted',
    },
    {
        _id: 'fake id 2', userId: 'some user', listingId: 'fake listing id 2', title: 'Some viewing', address: 'something',
        landlordId: 'user_2pwGRzshslTfPL09YP5S4jzVV7N',
        viewingDate: new Date('2025-01-31 21:23:17'),
        status: 'accepted',
    },
    {
        _id: 'fake id 2', userId: 'some user', listingId: 'fake listing id 2', title: 'Some viewing', address: 'something',
        landlordId: 'user_2pwGRzshslTfPL09YP5S4jzVV7N',
        viewingDate: new Date('2025-01-31 23:05:17'),
        status: 'accepted',
    },
    {
        _id: 'fake id 2', userId: 'some user', listingId: 'fake listing id 2', title: 'Some viewing', address: 'something',
        landlordId: 'user_2pwGRzshslTfPL09YP5S4jzVV7N',
        viewingDate: new Date('2025-01-31 21:58:17'),
        status: 'accepted',
    },
]

// export const mockUserResource : UserResource = {
//     id: 'user123', 
//     externalId: 'something',
//     firstName: 'John',
//     lastName: 'Doe',
//     fullName: 'John Doe',
//     username: 'johndoe',
//     hasImage: true, 
//     imageUrl: 'https://example.com/avatar.jpg',
//     //passkeys: null, 
//     primaryEmailAddress : null,
//     primaryEmailAddressId: null,
//     emailAddresses: [],
//     hasVerifiedEmailAddress: false,
//     primaryPhoneNumber: null,
//     primaryPhoneNumberId: null,
//     phoneNumbers: [],
//     hasVerifiedPhoneNumber: true,
//     primaryWeb3WalletId: null,
//     primaryWeb3Wallet: null,
//     web3Wallets: [],
//     externalAccounts: [],
//     verifiedExternalAccounts: [],
//     unverifiedExternalAccounts: [],
//     samlAccounts: [],
//     organizationMemberships: [],
//     passwordEnabled: true,
//     totpEnabled: true,
//     twoFactorEnabled: true,
//     backupCodeEnabled: true,
//     createOrganizationEnabled: true,
//     //createOrganizationsLimit: null,
//     deleteSelfEnabled: true,
//     publicMetadata: {},
//     //privateMetadata: {},
//     unsafeMetadata: {},
//     //legalAcceptedAt: new Date(),
//     lastSignInAt: new Date(),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     update: jest.MockedFunction<typeof mockUserResource.update>().mockReturnValue()
//     //...UserResource
    // update: jest.fn().mockResolvedValue({
    //     ...mockUserResource, 
    //     firstName: 'UpdatedName' // Simulating an update to the firstName
    //   }),
    //   delete: jest.fn().mockResolvedValue(undefined),
    //   setProfileImage: jest.fn().mockResolvedValue({
    //     id: 'image123',
    //     name: 'new-avatar.jpg',
    //     publicUrl: 'https://example.com/new-avatar.jpg'
    //   }),
    //   reload: jest.fn().mockResolvedValue(mockUserResource),
    //   getSessions: jest.fn().mockResolvedValue([]),
    //   createPasskey: jest.fn().mockResolvedValue({ id: 'passkey123' }),
    //   isPrimaryIdentification: jest.fn().mockReturnValue(true),
    //   getOrganizationInvitations: jest.fn().mockResolvedValue([]),
    //   getOrganizationSuggestions: jest.fn().mockResolvedValue([]),
    //   getOrganizationMemberships: jest.fn().mockResolvedValue([]),
//  };