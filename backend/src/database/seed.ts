import { USERS } from './seeds';

const seedUsers = async () => {
    for (const user of USERS) {
        await user.save();
    }
};
export const seedDatabase = async () => {
    try {
        await seedUsers();
        console.log('Database seeding successful');
    } catch (error) {
        console.error('Database seeding failed');
    }
};
