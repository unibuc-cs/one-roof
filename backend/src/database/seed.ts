import USERS from './seeds/users';

const seedUsers = async () => {
    const usersToSeed = USERS;
    for (const user of usersToSeed) {
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
