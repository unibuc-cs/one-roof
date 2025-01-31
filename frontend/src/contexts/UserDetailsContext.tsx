import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRoleEnum } from '../enums';

interface UserDetails {
	onboardingStep: number,
	setOnboardingStep: React.Dispatch<React.SetStateAction<number>>,
	profilePictureUrl?: string,
	setProfilePictureUrl: React.Dispatch<React.SetStateAction<string>>,
	role: UserRoleEnum,
	setRole: React.Dispatch<React.SetStateAction<UserRoleEnum>>,
	userId: string,
	favoriteListings: string[],
	setUserId: React.Dispatch<React.SetStateAction<string>>,
	contactedUsers: string[],
	pushTokens: string[],
	setPushTokens: React.Dispatch<React.SetStateAction<string[]>>,
	allowedNotifications: NotificationTypesEnum[],
	setAllowedNotifications: React.Dispatch<React.SetStateAction<NotificationTypesEnum[]>>,
	setContactedUsers: React.Dispatch<React.SetStateAction<string[]>>,
	setFavoriteListings: React.Dispatch<React.SetStateAction<string[]>>,
	resetUserDetails: () => void,
}

const defaultUserDetails: UserDetails = {
	onboardingStep: 1,
	setOnboardingStep: () => {},
	profilePictureUrl: '',
	setProfilePictureUrl: () => {},
	role: UserRoleEnum.RegularUser,
	setRole: () => {},
	userId: '',
	setUserId: () => {},
	contactedUsers: [],
	setContactedUsers: () => {},
	pushTokens: [],
	setPushTokens: () => {},
	favoriteListings: [],
	setFavoriteListings: () => {},
	resetUserDetails: () => {},
	allowedNotifications: [],
	setAllowedNotifications: () => {},
};

const UserDetailsContext = createContext<UserDetails>(defaultUserDetails);

interface UserDetailsProviderProps {
	children: ReactNode,
}

export const UserDetailsProvider: React.FC<UserDetailsProviderProps> = ({
	children,
}) => {
	const [onboardingStep, setOnboardingStep] = useState<number>(1);
	const [profilePicture, setProfilePicture] = useState<string>('');
	const [role, setRole] = useState<UserRoleEnum>(UserRoleEnum.RegularUser);
	const [userId, setUserId] = useState<string>('');
	const [contactedUsers, setContactedUsers] = useState<string[]>([]);
	const [pushTokens, setPushTokens] = useState<string[]>([]);
	const [favoriteListings, setFavoriteListings] = useState<string[]>([]);
	const resetUserDetails = () => {
		setOnboardingStep(1);
		setProfilePicture('');
		setRole(UserRoleEnum.RegularUser);
		setUserId('');
		setContactedUsers([]);
		setFavoriteListings([]);
	};
	const [allowedNotifications, setAllowedNotifications] = useState<NotificationTypesEnum[]>([]);

	const { user } = useUser();

	useEffect(() => {
		if (user) {
			const userId = user.id;
			fetchAndStoreUserDetails(userId)
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		}
	}, [user]);

	const fetchAndStoreUserDetails = async (userId: string) => {
		console.log('before fetchAndStoreUserDetails', userId);
		const userDetails = await userService.getUserByClerkId(userId);
		console.log('userdetails', userDetails);
		setPushTokens(userDetails.pushTokens);
		setRole(userDetails.role);
		setOnboardingStep(userDetails.onboardingStep);
		setProfilePicture(userDetails.profilePicture);
		setUserId(userDetails._id);
		setContactedUsers(userDetails.contactedUsers);
		setAllowedNotifications(userDetails.allowedNotifications);
	};

	return (
		<UserDetailsContext.Provider value={{
			favoriteListings, setFavoriteListings,
			onboardingStep, setOnboardingStep,
			profilePictureUrl: profilePicture, setProfilePictureUrl: setProfilePicture,
			role, setRole,
			userId, setUserId,
			contactedUsers, setContactedUsers,
			pushTokens, setPushTokens,
			allowedNotifications, setAllowedNotifications
            resetUserDetails
        }}>
			{children}
		</UserDetailsContext.Provider>
	);
};

export const useUserDetails = () => useContext(UserDetailsContext);
