import {IUser} from '../models';
import {IRoommatePreferences} from '../models/roommatePreferences';
import {doAnyAreasIntersect, euclideanDistanceBetweenQuizVectors, QuizVector} from '../utils/geometry';

class CompatibilityService {
	doUserPriceRangesIntersect(quiz1: IRoommatePreferences, quiz2: IRoommatePreferences): boolean {
		const price1 = quiz1.price;
		const price2 = quiz2.price;

		return price1.lowerBound <= price2.upperBound && price2.lowerBound <= price1.upperBound;
	}

	doUserAreasIntersect(quiz1: IRoommatePreferences, quiz2: IRoommatePreferences) {
		return doAnyAreasIntersect(quiz1.preferredAreas, quiz2.preferredAreas);
	}


	areCompatible(quiz1: IRoommatePreferences, quiz2: IRoommatePreferences, user1: IUser, user2: IUser) {
		if (!this.doUserAreasIntersect(quiz1, quiz2)) {
			return false;
		}

		if (!this.doUserPriceRangesIntersect(quiz1, quiz2)) {
			return false;
		}

		if (quiz1.allowedGenders !== 'both'
            && quiz2.allowedGenders !== 'both'
            && (user1.gender !== quiz2.allowedGenders || user2.gender !== quiz1.allowedGenders)) {
			return false;
		}

		if ((quiz1.smoking.self && !quiz2.smoking.other) || (quiz2.smoking.self && !quiz1.smoking.other)) {
			return false;
		}

		if ((quiz1.pets.self && !quiz2.pets.other) || (quiz2.pets.self && !quiz1.pets.other)) {
			return false;
		}

		return true;
	}

	scaleValue(x: number, min: number, max: number): number {
		return (x - min) / (max - min);
	}

	convertQuizToPoint(quiz: IRoommatePreferences): QuizVector {
		return {
			// Store roommateType and costSharing in a list for easy numerical comparison
			numerical: [
				this.scaleValue(quiz.roommateType === 'student' ? 0 : quiz.roommateType === 'working' ? 1 : 2, 0, 2),
				quiz.costSharing ? 1 : 0
			],

			// Store preferences in an array of { self, other } objects
			preferences: [
				{
					self: this.scaleValue(quiz.preferences.morningPerson.self, 1, 5),
					other: this.scaleValue(quiz.preferences.morningPerson.other, 1, 5)
				},
				{
					self: this.scaleValue(quiz.preferences.cleanliness.self, 1, 5),
					other: this.scaleValue(quiz.preferences.cleanliness.other, 1, 5)
				},
				{
					self: this.scaleValue(quiz.preferences.sociability.self, 1, 5),
					other: this.scaleValue(quiz.preferences.sociability.other, 1, 5)
				},
				{
					self: this.scaleValue(quiz.preferences.conversations.self, 1, 5),
					other: this.scaleValue(quiz.preferences.conversations.other, 1, 5)
				},
				{
					self: this.scaleValue(quiz.preferences.guest.self, 1, 5),
					other: this.scaleValue(quiz.preferences.guest.other, 1, 5)
				},
				{
					self: this.scaleValue(quiz.preferences.noise.self, 1, 5),
					other: this.scaleValue(quiz.preferences.noise.other, 1, 5)
				}
			]
		};
	}

	computeScore(quiz1: IRoommatePreferences, quiz2: IRoommatePreferences) {
		// Compute the score based on the "optional" criteria, each scaled from 0 to 1
		// We will represent them as vectors, and compute the Euclidean distance between them
		const vector1 = this.convertQuizToPoint(quiz1);
		const vector2 = this.convertQuizToPoint(quiz2);

		return euclideanDistanceBetweenQuizVectors(vector1, vector2);
	}

	getCompatibilityScore(user1: IUser, user2: IUser) {
		if (user1.role === 'landlord' || user2.role === 'landlord') {
			return 0;
		}

		const quiz1 = user1.roommateQuiz;
		const quiz2 = user2.roommateQuiz;

		if (quiz1 === undefined || quiz2 === undefined || quiz1 === null || quiz2 === null) {
			return 0;
		}

		if (!this.areCompatible(quiz1, quiz2, user1, user2)) {
			return 0;
		}

		return this.computeScore(quiz1, quiz2);
	}
}

export const compatibilityService = new CompatibilityService();