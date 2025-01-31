import { IListing, IViewing } from "../src/models";
import { UserDetails } from "../src/contexts/UserDetailsContext";
import { UserRoleEnum } from '../src/enums';

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
