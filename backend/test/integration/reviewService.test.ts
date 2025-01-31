import { expect } from 'chai';
import mongoose from 'mongoose';
import { Review } from '../../src/models';
import { ReviewService } from '../../src/services/reviewService';
import { beforeAll, afterEach, describe, test } from '@jest/globals';

describe('ReviewService Integration Tests', () => {
	let reviewerId, reviewId;

	beforeAll(async () => {
		reviewerId = new mongoose.Types.ObjectId().toString();
	});

	afterEach(async () => {
		await Review.deleteMany();
	});

	test('Should create a new review', async () => {
		const reviewData = {
			reviewerId,
			title: 'Great Place',
			recommend: 5,
			description: 'Loved living here!',
			location: { type: 'Point', coordinates: [-73.935242, 40.73061] },
			areaFeedback: {
				transport: {
					publicTransport: 5,
					carTransport: 3,
					trafficCongestion: 2,
					primaryTransportMode: 'Subway',
				},
				demographics: {
					predominantDemographic: 'Young professionals',
				},
				safetyAndNoise: {
					noiseLevel: 3,
					nighttimeSafety: 4,
				},
				environmentalFactors: {
					cleanliness: 4,
					greenSpaces: 3,
					pollutionLevels: 2,
				}
			},
			buildingFeedback: {
				pestIssues: {
					rodents: 1,
					bugs: 2,
					mosquitoes: 1,
				},
				utilityAvailability: {
					frequency: 5,
					centralHeating: true,
				},
				moldIssues: {
					severity: 1,
				},
				noiseInsulation: {
					rating: 4,
				},
				security: {
					rating: 5,
					frequency: 1,
					bodyguard: false,
				},
				hvac: {
					summer: 3,
					winter: 4,
					ac: true,
				},
				buildingFinishes: {
					quality: 4,
					modernity: 5,
				}
			}
		};

		const review = await ReviewService.createReview(new Review(reviewData));
		expect(review).to.have.property('_id');
		expect(review?.title).to.equal('Great Place');
		expect(review?.location).to.deep.equal({ type: 'Point', coordinates: [-73.935242, 40.73061] });

		reviewId = review?._id;
	});

	test('Should retrieve a review by ID', async () => {
		const review = await ReviewService.createReview(new Review({
			reviewerId,
			title: 'Nice Area',
			recommend: 4,
			description: 'Good but a bit noisy',
			location: { type: 'Point', coordinates: [-73.935242, 40.73061] },
			areaFeedback: {
				transport: { publicTransport: 4, carTransport: 3, trafficCongestion: 3, primaryTransportMode: 'Bus' },
				demographics: { predominantDemographic: 'Students' },
				safetyAndNoise: { noiseLevel: 4, nighttimeSafety: 3 },
				environmentalFactors: { cleanliness: 3, greenSpaces: 3, pollutionLevels: 3 },
			},
			buildingFeedback: {
				pestIssues: { rodents: 1, bugs: 2, mosquitoes: 2 },
				utilityAvailability: { frequency: 5, centralHeating: false },
				moldIssues: { severity: 2 },
				noiseInsulation: { rating: 3 },
				security: { rating: 4, frequency: 1, bodyguard: false },
				hvac: { summer: 2, winter: 4, ac: false },
				buildingFinishes: { quality: 3, modernity: 4 },
			}
		}));

		const fetchedReview = await ReviewService.getReviewById(review?._id);
		expect(fetchedReview).to.exist;
		expect(fetchedReview?.title).to.equal('Nice Area');
		expect(fetchedReview?.location.coordinates).to.deep.equal([-73.935242, 40.73061]);
	});

	test('Should update a review', async () => {
		const review = await ReviewService.createReview(new Review({
			reviewerId,
			title: 'Update Test',
			recommend: 3,
			description: 'Needs improvement',
			location: { type: 'Point', coordinates: [-73.935242, 40.73061] },
			areaFeedback: {
				transport: { publicTransport: 2, carTransport: 4, trafficCongestion: 4, primaryTransportMode: 'Car' },
				demographics: { predominantDemographic: 'Families' },
				safetyAndNoise: { noiseLevel: 3, nighttimeSafety: 3 },
				environmentalFactors: { cleanliness: 2, greenSpaces: 4, pollutionLevels: 3 },
			},
			buildingFeedback: {
				pestIssues: { rodents: 2, bugs: 3, mosquitoes: 3 },
				utilityAvailability: { frequency: 3, centralHeating: true },
				moldIssues: { severity: 3 },
				noiseInsulation: { rating: 3 },
				security: { rating: 3, frequency: 2, bodyguard: false },
				hvac: { summer: 2, winter: 3, ac: true },
				buildingFinishes: { quality: 2, modernity: 3 },
			}
		}));

		const updatedReview = await ReviewService.updateReviewById(review?._id, { recommend: 5, description: 'Much better now' });
		expect(updatedReview?.recommend).to.equal(5);
		expect(updatedReview?.description).to.equal('Much better now');
	});

	test('Should delete a review', async () => {
		const review = await ReviewService.createReview(new Review({
			reviewerId,
			title: 'Delete Me',
			recommend: 2,
			description: 'This review will be deleted',
			location: { type: 'Point', coordinates: [-73.935242, 40.73061] },
			areaFeedback: {
				transport: { publicTransport: 2, carTransport: 2, trafficCongestion: 5, primaryTransportMode: 'Bike' },
				demographics: { predominantDemographic: 'Retirees' },
				safetyAndNoise: { noiseLevel: 2, nighttimeSafety: 2 },
				environmentalFactors: { cleanliness: 1, greenSpaces: 2, pollutionLevels: 5 },
			},
			buildingFeedback: {
				pestIssues: { rodents: 3, bugs: 3, mosquitoes: 3 },
				utilityAvailability: { frequency: 1, centralHeating: false },
				moldIssues: { severity: 4 },
				noiseInsulation: { rating: 2 },
				security: { rating: 2, frequency: 2, bodyguard: false },
				hvac: { summer: 1, winter: 2, ac: false },
				buildingFinishes: { quality: 1, modernity: 2 },
			}
		}));

		const deletedReview = await ReviewService.deleteReviewById(review?._id);
		const fetchedDeleted = await ReviewService.getReviewById(review?._id);

		expect(deletedReview).to.exist;
		expect(fetchedDeleted).to.be.null;
	});
});