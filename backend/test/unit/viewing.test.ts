import chai from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { Viewing, IViewing } from '../../src/models/viewing';
import { ViewingService } from '../../src/services/viewingService';

const { expect } = chai;

describe('ViewingService', () => {
	let viewingMock: sinon.SinonMock;

	// Sample data based on IViewing model
	const viewingId = '67793778d815212e0f2e0e04';
	const userId =  'user_2qc8TeDG934yyhBeDwtcE6aGnJo';
	const landlordId = 'user_2pwGRzshslTfPL09YP5S4jzVV7N';
	const listingId = '6762b57bb262e29ef055ad7';

	const sampleViewing = {
		_id: '67793778d815212e0f2e0e04',
		userId: 'user_2qc8TeDG934yyhBeDwtcE6aGnJo',
		listingId: '6762b57bb262e29ef055ad7',
		title: 'Spacious 2-Bedroom Apartment',
		address: '15 Calea Victoriei, Bucharest, Romania',
		landlordId: 'user_2pwGRzshs1TFPL09YPS54jZV7VN',
		viewingDate: new Date('2025-01-07T10:00:00.000Z'),
		status: 'not confirmed',
		createdAt: new Date('2025-01-04T13:28:24.628Z'),
		updatedAt: new Date('2025-01-04T13:32:13.900Z'),
		__v: 0
	};

	before(() => {
		viewingMock = sinon.mock(Viewing);
	});

	after(() => {
		// Clean up after tests
		viewingMock.restore();
	});

	// Test to create a new viewing
	it('should create a new viewing', async () => {
		viewingMock.expects('create').withArgs(sampleViewing).resolves(sampleViewing);

		const result = await Viewing.create(sampleViewing);

		expect(result).to.have.property('status', 'not confirmed');
		expect(result).to.have.property('userId', userId);
		expect(result).to.have.property('listingId', listingId);
		expect(result).to.have.property('title', 'Spacious 2-Bedroom Apartment');
		viewingMock.verify();
	});

	// Test to get a viewing by ID
	it('should get a viewing by ID', async () => {
		viewingMock.expects('findById').withArgs(viewingId).resolves(sampleViewing);

		const result = await Viewing.findById(viewingId);

		expect(result).to.have.property('_id', viewingId);
		expect(result).to.have.property('status', 'not confirmed');
		viewingMock.verify();
	});

	// Test to get all viewings for a user (tenant or landlord)
	it('should get user viewings (tenant and landlord)', async () => {
		viewingMock.expects('find').twice().resolves([sampleViewing]);

		const result = await ViewingService.getUserViewings(userId);

		expect(result).to.be.an('array').that.is.not.empty;
		expect(result[0]).to.have.property('userId', userId);
		expect(result[0]).to.have.property('listingId', listingId);
		viewingMock.verify();
	});

	// Test to get confirmed viewings for a user
	it('should get confirmed user viewings', async () => {
		const confirmedViewing = { ...sampleViewing, status: 'confirmed' };
		viewingMock.expects('find').withArgs({ status: 'confirmed', $or: [{ userId }, { landlordId: userId }] }).resolves([confirmedViewing]);

		const result = await ViewingService.getUserConfirmedViewings(userId);

		expect(result).to.be.an('array').that.is.not.empty;
		expect(result[0]).to.have.property('status', 'confirmed');
		viewingMock.verify();
	});

	// Test to update a viewing by ID
	it('should update a viewing by ID', async () => {
		const updatedViewing = { ...sampleViewing, status: 'confirmed' };

		viewingMock
			.expects('findByIdAndUpdate')
			.withArgs(viewingId, { status: 'confirmed' }, { new: true })
			.resolves(updatedViewing);

		const result = await ViewingService.updateViewingById(viewingId, { status: 'confirmed' });
		expect(result).equal(updatedViewing);

		viewingMock.verify();
	});

	// Test to confirm a viewing by ID
	it('should confirm a viewing by ID', async () => {
		const confirmedViewing = { ...sampleViewing, status: 'confirmed' };
		viewingMock.expects('findByIdAndUpdate').withArgs(viewingId, { status: 'confirmed' }, { new: true }).resolves(confirmedViewing);

		const result = await ViewingService.confirmViewingById(viewingId);

		expect(result).to.have.property('status', 'confirmed');
		viewingMock.verify();
	});

	// Test to reject a viewing by ID
	it('should reject a viewing by ID', async () => {
		const rejectedViewing = { ...sampleViewing, status: 'rejected' };
		viewingMock.expects('findByIdAndUpdate').withArgs(viewingId, { status: 'rejected' }, { new: true }).resolves(rejectedViewing);

		const result = await ViewingService.rejectViewingById(viewingId);

		expect(result).to.have.property('status', 'rejected');
		viewingMock.verify();
	});

	// Test to delete a viewing by ID
	it('should delete a viewing by ID', async () => {
		viewingMock.expects('findByIdAndDelete').withArgs(viewingId).resolves(sampleViewing);

		const result = await ViewingService.deleteViewingById(viewingId);

		expect(result).to.have.property('_id', viewingId);
		viewingMock.verify();
	});
});
