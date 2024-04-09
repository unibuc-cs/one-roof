import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, TextInput, Button } from 'react-native-paper';
import { useUser } from '@clerk/clerk-expo';
import { useUserDetails } from '../contexts/UserDetailsContext';

type EditableFieldProps = {
	label: string,
	value: string,
	onSave: (newValue: string) => void,
};

const EditableField: React.FC<EditableFieldProps> = ({ label, value, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(value);

	return (
		<View style={styles.fieldContainer}>
			<Text style={styles.label}>{label}:</Text>
			{isEditing ? (
				<TextInput
					value={editValue}
					onChangeText={setEditValue}
					style={styles.input}
				/>
			) : (
				<Text style={styles.value}>{value}</Text>
			)}
			{isEditing ? (
				<Button onPress={() => {
					onSave(editValue);
					setIsEditing(false);
				}}>Save</Button>
			) : (
				<Button onPress={() => setIsEditing(true)}>Edit</Button>
			)}
		</View>
	);
};

export const ProfileScreen: React.FC = () => {
	const { user } = useUser();
	const { profilePictureUrl, setProfilePictureUrl, role } = useUserDetails();

	const handleSaveProfilePictureUrl = (newUrl: string) => {
		setProfilePictureUrl(newUrl);
	};

	if (!user) return null;

	return (
		<View style={styles.container}>
			<Avatar.Image
				size={100}
				source={{ uri: profilePictureUrl || 'https://via.placeholder.com/100' }}
				style={styles.avatar}
			/>
			<EditableField
				label="Username"
				value={user.username || ''}
				onSave={() => {}}
			/>
			<EditableField
				label="Role"
				value={role}
				onSave={() => {}}
			/>
			{/* More fields as needed */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 20,
	},
	avatar: {
		marginBottom: 20,
	},
	fieldContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 8,
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginRight: 10,
	},
	value: {
		fontSize: 16,
	},
	input: {
		flex: 1,
		marginRight: 10,
	},
});
