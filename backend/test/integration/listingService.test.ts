import { expect } from 'chai';
import mongoose from 'mongoose';
import { Listing } from '../../src/models';
import { ListingService } from '../../src/services/listingService';
import { beforeAll, afterEach, describe, test } from '@jest/globals';

describe('ListingService Integration Tests', () => {
	let landlordId, listingId;

	beforeAll(async () => {
		landlordId = new mongoose.Types.ObjectId().toString();
	});

	afterEach(async () => {
		await Listing.deleteMany();
	});

	test('Should create a new listing', async () => {
		const listingData = {
			landlordId,
			title: 'Beautiful Apartment',
			description: 'Spacious and modern with a great view',
			photos: ['https://example.com/photo1.jpg'],
			address: '123 Main St, New York, NY',
			location: { type: 'Point', coordinates: [-73.935242, 40.73061] },
			type: 'apartment',
			price: 2500,
			numberOfRooms: 2,
			numberOfBathrooms: 1,
			size: 75,
			amenities: ['Gym', 'Pool', 'Parking'],
			external: false
		};

		const listing = await ListingService.createListing(new Listing(listingData));
		expect(listing).to.have.property('_id');
		expect(listing?.title).to.equal('Beautiful Apartment');
		expect(listing?.toObject().location).to.deep.equal({ type: 'Point', coordinates: [-73.935242, 40.73061] });

		listingId = listing?._id;
	});

	test('Should retrieve a listing by ID', async () => {
		const listing = await ListingService.createListing(new Listing({
			landlordId,
			title: 'Cozy Studio',
			description: 'Perfect for students',
			photos: ['https://example.com/studio.jpg'],
			address: '456 College Rd, Boston, MA',
			location: { type: 'Point', coordinates: [-71.0589, 42.3601] },
			type: 'studio',
			price: 1200,
			numberOfRooms: 1,
			numberOfBathrooms: 1,
			size: 40,
			amenities: ['WiFi', 'Laundry'],
			external: true
		}));

		const fetchedListing = await ListingService.getListingById(listing?._id);
		expect(fetchedListing).to.exist;
		expect(fetchedListing?.title).to.equal('Cozy Studio');
		expect(fetchedListing?.location.coordinates).to.deep.equal([-71.0589, 42.3601]);
	});

	test('Should update a listing', async () => {
		const listing = await ListingService.createListing(new Listing({
			landlordId,
			title: 'Old House',
			description: 'Needs some renovations',
			photos: ['https://example.com/oldhouse.jpg'],
			address: '789 Old St, Chicago, IL',
			location: { type: 'Point', coordinates: [-87.6298, 41.8781] },
			type: 'house',
			price: 1800,
			numberOfRooms: 3,
			numberOfBathrooms: 2,
			size: 100,
			amenities: ['Backyard', 'Garage'],
			external: false
		}));

		const updatedListing = await ListingService.updateListingById(listing?._id, { price: 2000, description: 'Renovated and modern' });
		expect(updatedListing?.price).to.equal(2000);
		expect(updatedListing?.description).to.equal('Renovated and modern');
	});

	test('Should delete a listing', async () => {
		const listing = await ListingService.createListing(new Listing({
			landlordId,
			title: 'Temporary Rental',
			description: 'Short-term lease available',
			photos: ['https://example.com/shortterm.jpg'],
			address: '101 Temporary Ln, Los Angeles, CA',
			location: { type: 'Point', coordinates: [-118.2437, 34.0522] },
			type: 'apartment',
			price: 2800,
			numberOfRooms: 2,
			numberOfBathrooms: 1,
			size: 65,
			amenities: ['Gym', 'Laundry'],
			external: false
		}));

		const deletedListing = await ListingService.deleteListingById(listing?._id);
		const fetchedDeleted = await ListingService.getListingById(listing?._id);

		expect(deletedListing).to.exist;
		expect(fetchedDeleted).to.be.null;
	});

	test('Should retrieve all listings (limit 50)', async () => {
		for (let i = 0; i < 55; i++) {
			await ListingService.createListing(new Listing({
				landlordId,
				title: `Listing ${i + 1}`,
				description: 'Test listing',
				photos: [],
				address: `Random Address ${i + 1}`,
				location: { type: 'Point', coordinates: [-73.935242 + i * 0.01, 40.73061 + i * 0.01] },
				type: 'apartment',
				price: 1000 + i * 50,
				size: 50,
				amenities: ['WiFi'],
				external: false
			}));
		}

		const listings = await ListingService.getAllListings();
		expect(listings.length).to.equal(50);
	});
});
