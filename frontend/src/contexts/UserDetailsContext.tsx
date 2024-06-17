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
	setContactedUsers: React.Dispatch<React.SetStateAction<string[]>>,
	setFavoriteListings: React.Dispatch<React.SetStateAction<string[]>>,
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
	const [favoriteListings, setFavoriteListings] = useState<string[]>([]);
	return (
		<UserDetailsContext.Provider value={{ favoriteListings, setFavoriteListings, onboardingStep, setOnboardingStep, profilePictureUrl: profilePicture, setProfilePictureUrl: setProfilePicture, role, setRole, userId, setUserId, contactedUsers, setContactedUsers }}>
			{children}
		</UserDetailsContext.Provider>
	);
};

export const useUserDetails = () => useContext(UserDetailsContext);
