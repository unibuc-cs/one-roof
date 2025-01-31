import { expect } from 'chai';
import mongoose from 'mongoose';
import { ViewingService } from '../../src/services/viewingService';
import { Viewing } from '../../src/models/viewing';
import { beforeAll, afterEach, describe, test } from '@jest/globals';

describe('ViewingService Integration Tests', () => {
	let userId: string, landlordId: string, listingId: string, viewingId: string;

	beforeAll(() => {
		userId = new mongoose.Types.ObjectId().toString();
		landlordId = new mongoose.Types.ObjectId().toString();
		listingId = new mongoose.Types.ObjectId().toString();
	});

	afterEach(async () => {
		await Viewing.deleteMany();
	});

	test('Should create a new viewing', async () => {
		const viewing = await ViewingService.createViewing(new Viewing ({
			userId,
			landlordId,
			listingId,
			title: 'Spacious 2-Bedroom Apartment',
			address: '15 Calea Victoriei, Bucharest, Romania',
			viewingDate: new Date('2025-01-07T10:00:00.000Z'),
			status: 'not confirmed'
		}));

		expect(viewing).to.exist;
		expect(viewing).to.have.property('_id');
		expect(viewing?.userId).to.equal(userId);
		expect(viewing?.listingId).to.equal(listingId);
		expect(viewing?.status).to.equal('not confirmed');

		const savedViewing = await Viewing.findById(viewing?._id);
		expect(savedViewing).to.exist;
	});

	test('Should retrieve a viewing by ID', async () => {
		const viewing = await ViewingService.createViewing(new Viewing({
			userId, landlordId, listingId,
			title: 'Spacious 2-Bedroom Apartment',
			address: '15 Calea Victoriei, Bucharest, Romania',
			viewingDate: new Date('2025-01-07T10:00:00.000Z'),
			status: 'not confirmed'
		}));

		const retrievedViewing = await ViewingService.getViewingById(viewing?._id.toString());
		expect(retrievedViewing?._id.toString() ).to.equal(viewing?._id.toString());
	});

	test('Should update a viewing by ID', async () => {
		const viewing = await ViewingService.createViewing(new Viewing({
			userId, landlordId, listingId,
			title: 'Spacious 2-Bedroom Apartment',
			address: '15 Calea Victoriei, Bucharest, Romania',
			viewingDate: new Date('2025-01-07T10:00:00.000Z'),
			status: 'not confirmed'
		}));

		const updatedViewing = await ViewingService.updateViewingById(viewing?._id.toString(), { status: 'confirmed' });
		expect(updatedViewing).to.have.property('status', 'confirmed');
	});

	test('Should confirm a viewing by ID', async () => {
		const viewing = await ViewingService.createViewing(new Viewing({
			userId, landlordId, listingId,
			title: 'Spacious 2-Bedroom Apartment',
			address: '15 Calea Victoriei, Bucharest, Romania',
			viewingDate: new Date('2025-01-07T10:00:00.000Z'),
			status: 'not confirmed'
		}));

		const confirmedViewing = await ViewingService.confirmViewingById(viewing?._id.toString());
		expect(confirmedViewing).to.have.property('status', 'confirmed');
	});

	test('Should reject a viewing by ID', async () => {
		const viewing = await ViewingService.createViewing(new Viewing({
			userId, landlordId, listingId,
			title: 'Spacious 2-Bedroom Apartment',
			address: '15 Calea Victoriei, Bucharest, Romania',
			viewingDate: new Date('2025-01-07T10:00:00.000Z'),
			status: 'not confirmed'
		}));

		const rejectedViewing = await ViewingService.rejectViewingById(viewing?._id.toString());
		expect(rejectedViewing).to.have.property('status', 'rejected');
	});

	test('Should delete a viewing by ID', async () => {
		const viewing = await ViewingService.createViewing(new Viewing({
			userId, landlordId, listingId,
			title: 'Spacious 2-Bedroom Apartment',
			address: '15 Calea Victoriei, Bucharest, Romania',
			viewingDate: new Date('2025-01-07T10:00:00.000Z'),
			status: 'not confirmed'
		}));

		await ViewingService.deleteViewingById(viewing?._id.toString());
		const deletedViewing = await Viewing.findById(viewing?._id);
		expect(deletedViewing).to.not.exist;
	});
});
