import { IListing, IViewing } from "../src/models"

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
            views: [],
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
            views: [],
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
        viewingDate: '',
        status: 'accepted',
    },
    {
        _id: 'fake id 2',
        userId: 'some user',
        listingId: 'fake listing id 2',
        title: 'Some viewing',
        address: 'something',
        landlordId: 'user_2pwGRzshslTfPL09YP5S4jzVV7N',
        viewingDate: '',
        status: 'accepted',
    }
]
