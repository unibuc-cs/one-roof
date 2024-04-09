import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, TextInput, Button } from 'react-native-paper';
import { useUser } from '@clerk/clerk-expo';
import { useUserDetails } from '../contexts/UserDetailsContext';
import { ProfilePicture } from '../components/ProfilePicture';
import Background from '../components/Background';
import { EditableField } from '../components/EditableButton';

export const ProfileScreen: React.FC = () => {
	const { user } = useUser();
	const { profilePictureUrl, setProfilePictureUrl, role } = useUserDetails();

	const handleSaveProfilePictureUrl = (newUrl: string) => {
		setProfilePictureUrl(newUrl);
	};

	if (!user) return null;

	return (
		<Background>
			<ProfilePicture canEdit={true} source={{ uri: profilePictureUrl }} />
			<EditableField
				label="Username"
				value={user.username || ''}
				onSave={(newValue) => user.update({ username: newValue })}
			/>
			<EditableField
				label="First Name"
				value={user.firstName || ''}
				onSave={(newValue) => user.update({ firstName: newValue })}
			/>
			<EditableField
				label="Last Name"
				value={user.lastName || ''}
				onSave={(newValue) => user.update({ lastName: newValue })}
			/>
		</Background>
	);
};
