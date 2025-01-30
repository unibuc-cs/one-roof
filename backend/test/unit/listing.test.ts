import chai from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import {Listing} from '../src/models';
import {LISTINGS} from '../src/database';

const {expect} = chai;


describe('Listing Model', () => {
	let listingMock;

	before(() => {
		listingMock = sinon.mock(Listing);
	});

	after(() => {
		// Restore the mock
		listingMock.restore();
	});

	it('should create a new listing', async () => {
		const newListing = LISTINGS[3];

		listingMock.expects('create').withArgs(newListing).resolves(newListing);

		const result = await Listing.create(newListing);

		expect(result).to.have.property('title', 'Economical One-Bedroom Apartment');
		expect(result).to.have.property('description', 'Ideal for singles or couples, located in a quiet area, with easy access to metro and local markets.');
		listingMock.verify();
	});

	it('should find a listing by id', async () => {
		const listingId = new mongoose.Types.ObjectId();
		const foundListing = LISTINGS[3];

		listingMock.expects('findById').withArgs(listingId).resolves(foundListing);

		const result = await Listing.findById(listingId);

		expect(result).to.have.property('title', 'Economical One-Bedroom Apartment');
		expect(result).to.have.property('description', 'Ideal for singles or couples, located in a quiet area, with easy access to metro and local markets.');
		listingMock.verify();
	});

	it('should update a listing by id', async () => {
		const listingId = new mongoose.Types.ObjectId();
		const updatedData = {title: 'Updated Listing'};
		const updatedListing = {
			_id: listingId,
			...updatedData
		};

		listingMock.expects('findByIdAndUpdate').withArgs(listingId, updatedData, {new: true}).resolves(updatedListing);

		const result = await Listing.findByIdAndUpdate(listingId, updatedData, {new: true});

		expect(result).to.have.property('title', 'Updated Listing');
		listingMock.verify();
	});

	it('should delete a listing by id', async () => {
		const listingId = new mongoose.Types.ObjectId();

		listingMock.expects('findByIdAndDelete').withArgs(listingId).resolves({_id: listingId});

		const result = await Listing.findByIdAndDelete(listingId);

		expect(result).to.have.property('_id', listingId);
		listingMock.verify();
	});
});


