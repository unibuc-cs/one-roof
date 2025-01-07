import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import { UserRoleEnum } from '../enums';
import {useUser} from "@clerk/clerk-expo";
import userService from "../services/internal/userService";

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
	setContactedUsers: React.Dispatch<React.SetStateAction<string[]>>,
	setFavoriteListings: React.Dispatch<React.SetStateAction<string[]>>,
	setPushTokens: React.Dispatch<React.SetStateAction<string[]>>,
}

const defaultUserDetails: UserDetails = {
	onboardingStep: 1,
	setOnboardingStep: () => {},
	profilePictureUrl: '',
	setProfilePictureUrl: () => {},
	role: UserRoleEnum.RegularUser,
	setRole: () => {},
	userId: '',
	setUserId:() => {},
	contactedUsers: [],
	setContactedUsers: () => {},
	pushTokens: [],
	setPushTokens: () => {},
	favoriteListings: [],
	setFavoriteListings: () => {},
};

const UserDetailsContext = createContext<UserDetails>(defaultUserDetails);

interface UserDetailsProviderProps {
	children: ReactNode,
}

export const UserDetailsProvider: React.FC<UserDetailsProviderProps> = ({ children }) => {
	const [onboardingStep, setOnboardingStep] = useState<number>(1);
	const [profilePicture, setProfilePicture] = useState<string>('');
	const [role, setRole] = useState<UserRoleEnum>(UserRoleEnum.RegularUser);
	const [userId, setUserId] = useState<string>('');
	const [contactedUsers, setContactedUsers] = useState<string[]>([]);
	const [pushTokens, setPushTokens] = useState<string[]>([]);
	const [favoriteListings, setFavoriteListings] = useState<string[]>([]);

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
	};

	return (
		<UserDetailsContext.Provider value={{ favoriteListings, setFavoriteListings, onboardingStep, setOnboardingStep, profilePictureUrl: profilePicture, setProfilePictureUrl: setProfilePicture, role, setRole, userId, setUserId, contactedUsers, setContactedUsers, pushTokens, setPushTokens }}>
			{children}
		</UserDetailsContext.Provider>
	);
};

export const useUserDetails = () => useContext(UserDetailsContext);
