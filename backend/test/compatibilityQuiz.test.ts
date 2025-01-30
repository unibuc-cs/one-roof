import {assert} from 'chai';
import sinon from 'sinon';
import {compatibilityService} from '../src/services/compatibilityService';
import {IUser} from '../src/models';
import {ICoordinates, IRoommatePreferences} from '../src/models/roommatePreferences';
import mongoose from 'mongoose';

describe('CompatibilityService', function () {
	let quiz1: IRoommatePreferences;
	let quiz2: IRoommatePreferences;
	let user1: IUser;
	let user2: IUser;

	const priceRange1 = {lowerBound: 500, upperBound: 1000};
	const priceRange2 = {lowerBound: 800, upperBound: 1200};
	const priceRange3 = {lowerBound: 100, upperBound: 400};

	const area1: ICoordinates[] = [
		{latitude: 0, longitude: 0},
		{latitude: 2, longitude: 0},
		{latitude: 1, longitude: 2}
	];

	const area2: ICoordinates[] = [
		{latitude: 1, longitude: 1},
		{latitude: 3, longitude: 1},
		{latitude: 2, longitude: 3}
	];

	const area3: ICoordinates[] = [
		{latitude: 5, longitude: 5},
		{latitude: 7, longitude: 5},
		{latitude: 6, longitude: 7}
	];

	beforeEach(function () {
		// Sample roommate preferences
		quiz1 = {
			dateTaken: new Date(),
			preferredAreas: [area1],
			price: {lowerBound: 500, upperBound: 1000},
			allowedGenders: 'both',
			smoking: {self: false, other: true},
			pets: {self: false, other: true},
			costSharing: true,
			roommateType: 'student',
			preferences: {
				morningPerson: {self: 3, other: 3},
				cleanliness: {self: 5, other: 4},
				sociability: {self: 2, other: 3},
				conversations: {self: 4, other: 3},
				guest: {self: 2, other: 3},
				noise: {self: 5, other: 2},
			}
		};

		quiz2 = {
			dateTaken: new Date(),
			preferredAreas: [area2],
			price: {lowerBound: 800, upperBound: 1200},
			allowedGenders: 'both',
			smoking: {self: false, other: true},
			pets: {self: false, other: true},
			costSharing: true,
			roommateType: 'student',
			preferences: {
				morningPerson: {self: 3, other: 3},
				cleanliness: {self: 5, other: 4},
				sociability: {self: 2, other: 3},
				conversations: {self: 4, other: 3},
				guest: {self: 2, other: 3},
				noise: {self: 5, other: 2},
			}
		};

		user1 = {
			_id: new mongoose.Types.ObjectId(),
			gender: 'male',
			role: 'regularUser',
			roommateQuiz: quiz1,
			toObject: sinon.stub().returnsThis() // Fake Mongoose document behavior
		} as unknown as IUser;

		// Mock User 2
		user2 = {
			_id: new mongoose.Types.ObjectId(),
			gender: 'female',
			role: 'regularUser',
			roommateQuiz: quiz2,
			toObject: sinon.stub().returnsThis()
		} as unknown as IUser;

	});

	afterEach(function () {
		sinon.restore(); // Clean up mocks
	});

	describe('doUserPriceRangesIntersect', function () {
		it('should return true if price ranges overlap', function () {
			assert.isTrue(compatibilityService.doUserPriceRangesIntersect({...quiz1, price: priceRange1}, {
				...quiz2,
				price: priceRange2
			}));
		});

		it('should return false if price ranges do not overlap', function () {
			assert.isFalse(compatibilityService.doUserPriceRangesIntersect({...quiz1, price: priceRange1}, {
				...quiz2,
				price: priceRange3
			}));
		});
	});

	describe('doUserAreasIntersect', function () {
		it('should return true if areas intersect', function () {
			assert.isTrue(compatibilityService.doUserAreasIntersect(
				{...quiz1, preferredAreas: [area1]},
				{...quiz2, preferredAreas: [area2]}
			));
		});

		it('should return false if areas do not intersect', function () {
			assert.isFalse(compatibilityService.doUserAreasIntersect(
				{...quiz1, preferredAreas: [area1]},
				{...quiz2, preferredAreas: [area3]}
			));
		});
	});

	describe('allowedGenders compatibility', function () {
		it('should return true if both users have allowedGenders set to "both"', function () {
			assert.isTrue(compatibilityService.areCompatible(
				{...quiz1, allowedGenders: 'both'},
				{...quiz2, allowedGenders: 'both'},
				user1,
				user2,
			));
		});

		it('should return true if one user allows "both" and the other specifies a gender that matches', function () {
			user2.gender = 'male';
			assert.isTrue(compatibilityService.areCompatible(
				{...quiz1, allowedGenders: 'male'},
				{...quiz2, allowedGenders: 'both'},
				user1,
				user2
			));
		});

		it('should return false if user1 only allows "male" but user2 is "female"', function () {
			user2.gender = 'female';
			assert.isFalse(compatibilityService.areCompatible(
				{...quiz1, allowedGenders: 'male'},
				{...quiz2, allowedGenders: 'male'},
				user1,
				user2
			));
		});

		it('should return false if user1 only allows "female" but user2 is "male"', function () {
			user2.gender = 'male';
			assert.isFalse(compatibilityService.areCompatible(
				{...quiz1, allowedGenders: 'female'},
				{...quiz2, allowedGenders: 'female'},
				user1,
				user2
			));
		});
	});

	describe('smoking compatibility', function () {
		it('should return true if neither user smokes', function () {
			assert.isTrue(compatibilityService.areCompatible(
				{...quiz1, smoking: {self: false, other: true}},
				{...quiz2, smoking: {self: false, other: true}},
				user1,
				user2
			));
		});

		it('should return true if one user smokes and the other tolerates it', function () {
			assert.isTrue(compatibilityService.areCompatible(
				{...quiz1, smoking: {self: true, other: true}},
				{...quiz2, smoking: {self: false, other: true}},
				user1,
				user2
			));
		});

		it('should return false if one user smokes and the other does not tolerate it', function () {
			assert.isFalse(compatibilityService.areCompatible(
				{...quiz1, smoking: {self: true, other: true}},
				{...quiz2, smoking: {self: false, other: false}},
				user1,
				user2
			));
		});

		it('should return false if both users smoke but neither tolerates it in a roommate', function () {
			assert.isFalse(compatibilityService.areCompatible(
				{...quiz1, smoking: {self: true, other: false}},
				{...quiz2, smoking: {self: true, other: false}},
				user1,
				user2
			));
		});
	});

	describe('pets compatibility', function () {
		it('should return true if neither user has pets', function () {
			assert.isTrue(compatibilityService.areCompatible(
				{...quiz1, pets: {self: false, other: true}},
				{...quiz2, pets: {self: false, other: true}},
				user1,
				user2
			));
		});

		it('should return true if one user has pets and the other tolerates it', function () {
			assert.isTrue(compatibilityService.areCompatible(
				{...quiz1, pets: {self: true, other: true}},
				{...quiz2, pets: {self: false, other: true}},
				user1,
				user2
			));
		});

		it('should return false if one user has pets and the other does not tolerate it', function () {
			assert.isFalse(compatibilityService.areCompatible(
				{...quiz1, pets: {self: true, other: false}},
				{...quiz2, pets: {self: false, other: false}},
				user1,
				user2
			));
		});

		it('should return false if both users have pets but neither tolerates them in a roommate', function () {
			assert.isFalse(compatibilityService.areCompatible(
				{...quiz1, pets: {self: true, other: false}},
				{...quiz2, pets: {self: true, other: false}},
				user1,
				user2
			));
		});
	});
});

describe('computeScore', function () {
	let quiz1: IRoommatePreferences;
	let quiz2: IRoommatePreferences;

	beforeEach(() => {
		quiz1 = {
			roommateType: 'either',
			costSharing: true,
			preferences: {
				morningPerson: {self: 3, other: 3},
				cleanliness: {self: 3, other: 3},
				sociability: {self: 3, other: 3},
				conversations: {self: 3, other: 3},
				guest: {self: 3, other: 3},
				noise: {self: 3, other: 3},
			}
		} as IRoommatePreferences;

		quiz2 = {
			roommateType: 'either',
			costSharing: true,
			preferences: {
				morningPerson: {self: 3, other: 3},
				cleanliness: {self: 3, other: 3},
				sociability: {self: 3, other: 3},
				conversations: {self: 3, other: 3},
				guest: {self: 3, other: 3},
				noise: {self: 3, other: 3},
			}
		} as IRoommatePreferences;
	});

	it('should return a score between 0 and 1', function () {
		const score = compatibilityService.computeScore(quiz1, quiz2);
		assert.isAtLeast(score, 0, 'Score should be at least 0');
		assert.isAtMost(score, 1, 'Score should be at most 1');
	});

	it('should return 1 for identical preferences', function () {
		const score = compatibilityService.computeScore(quiz1, quiz2);
		assert.equal(score, 1, 'Score should be 1 for identical preferences');
	});

	it('should return a high score for almost identical preferences', function () {
		quiz2.preferences.morningPerson.self = 2;
		quiz2.preferences.morningPerson.other = 4;

		const score = compatibilityService.computeScore(quiz1, quiz2);

		assert.isAbove(score, 0.8, 'Score should be close to 1 for almost identical preferences');
		assert.isAtMost(score, 0.9, 'Score should still be at most 1');
	});

	it('should return a score close to 0 for a lot of differences', function () {
		quiz1.costSharing = false;
		quiz2.costSharing = true;
		quiz1.roommateType = 'student';
		quiz2.roommateType = 'working';
		quiz2.preferences.morningPerson.self = 1;
		quiz2.preferences.morningPerson.other = 5;
		quiz2.preferences.cleanliness.self = 1;
		quiz2.preferences.cleanliness.other = 5;
		quiz2.preferences.sociability.self = 1;
		quiz2.preferences.sociability.other = 5;
		quiz2.preferences.conversations.self = 1;
		quiz2.preferences.conversations.other = 5;
		quiz2.preferences.guest.self = 1;
		quiz2.preferences.guest.other = 5;
		quiz2.preferences.noise.self = 1;
		quiz2.preferences.noise.other = 5;

		const score = compatibilityService.computeScore(quiz1, quiz2);
		assert.isAbove(score, 0, 'Score should be at least 0');
		assert.isAtMost(score, 0.4, 'Score should be at most 0.4');
	});
});

//
// describe('doUserAreasIntersect', function () {
//     beforeEach(() => {
//         sinon.stub(doAnyAreasIntersect, 'call').returns(true);
//     });
//
//     it('should return true if areas overlap', function () {
//         assert.isTrue(compatibilityService.doUserAreasIntersect(quiz1, quiz2));
//     });
//
//     it('should return false if areas do not overlap', function () {
//         sinon.restore();
//         sinon.stub(doAnyAreasIntersect, 'call').returns(false);
//         assert.isFalse(compatibilityService.doUserAreasIntersect(quiz1, quiz2));
//     });
// });
//
// describe('areCompatible', function () {
//     it('should return false if areas do not overlap', function () {
//         sinon.stub(compatibilityService, 'doUserAreasIntersect').returns(false);
//         assert.isFalse(compatibilityService.areCompatible(quiz1, quiz2, user1, user2));
//     });
//
//     it('should return false if price ranges do not overlap', function () {
//         sinon.stub(compatibilityService, 'doUserAreasIntersect').returns(true);
//         sinon.stub(compatibilityService, 'doUserPriceRangesIntersect').returns(false);
//         assert.isFalse(compatibilityService.areCompatible(quiz1, quiz2, user1, user2));
//     });
//
//     it('should return false if genders are incompatible', function () {
//         quiz2.allowedGenders = 'female';
//         assert.isFalse(compatibilityService.areCompatible(quiz1, quiz2, user1, user2));
//     });
//
//     it('should return false if smoking preferences conflict', function () {
//         quiz1.smoking = { self: false, other: false };
//         quiz2.smoking = { self: true, other: false };
//         assert.isFalse(compatibilityService.areCompatible(quiz1, quiz2, user1, user2));
//     });
//
//     it('should return false if pet preferences conflict', function () {
//         quiz1.pets = { self: true, other: false };
//         quiz2.pets = { self: false, other: true };
//         assert.isFalse(compatibilityService.areCompatible(quiz1, quiz2, user1, user2));
//     });
//
//     it('should return true if all dealbreaker conditions match', function () {
//         assert.isTrue(compatibilityService.areCompatible(quiz1, quiz2, user1, user2));
//     });
// });
//
// describe('convertQuizToPoint', function () {
//     it('should correctly convert quiz preferences into numerical vectors', function () {
//         const vector = compatibilityService.convertQuizToPoint(quiz1);
//         assert.lengthOf(vector.numerical, 2);
//         assert.lengthOf(vector.preferences, 6);
//     });
// });
//
// describe('computeScore', function () {
//     it('should compute Euclidean distance between two quiz vectors', function () {
//         const vector1 = compatibilityService.convertQuizToPoint(quiz1);
//         const vector2 = compatibilityService.convertQuizToPoint(quiz2);
//
//         const expectedDistance = euclideanDistanceBetweenQuizVectors(vector1, vector2);
//         assert.closeTo(compatibilityService.computeScore(quiz1, quiz2), expectedDistance, 0.001);
//     });
// });
//
// describe('getCompatibilityScore', function () {
//     it('should return 0 if one user is a landlord', function () {
//         user1.role = 'landlord';
//         assert.equal(compatibilityService.getCompatibilityScore(user1, user2), 0);
//     });
//
//     it('should return 0 if one user has not taken the quiz', function () {
//         user1.roommateQuiz = undefined;
//         assert.equal(compatibilityService.getCompatibilityScore(user1, user2), 0);
//     });
//
//     it('should return 0 if users are not compatible', function () {
//         sinon.stub(compatibilityService, 'areCompatible').returns(false);
//         assert.equal(compatibilityService.getCompatibilityScore(user1, user2), 0);
//     });
//
//     it('should return the computed score
