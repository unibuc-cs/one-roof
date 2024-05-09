import { USERS, LOCATIONS } from './seeds';

const seedUsers = async () => {
	for (const user of USERS) {
		await user.save();
	}
};

const seedLocations = async () => {
	for (const location of LOCATIONS) {
		await location.save();
	}
};
export const seedDatabase = async () => {
	try {
		await seedUsers();
		await seedLocations();
		console.log('Database seeding successful');
	} catch (error) {
		console.error('Database seeding failed');
	}
};
