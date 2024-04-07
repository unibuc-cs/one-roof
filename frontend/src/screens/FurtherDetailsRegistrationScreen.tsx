import Background from '../components/Background';
import Logo from '../components/Logo';
import { Divider, RadioButton } from 'react-native-paper';
import Button from '../components/Button';
import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useUserDetails } from '../contexts/UserDetailsContext';
import { UserRoleEnum } from '../enums/UserRoleEnum';
import SwitchSelector from 'react-native-switch-selector';
import { HeaderText } from '../components/HeaderText';
import { theme } from '../theme';
import Userpic from 'react-native-userpic';
import { ProfilePicture } from '../components/ProfilePicture';
import { useUser } from '@clerk/clerk-expo';
import userService from '../api/users';

export const FurtherDetailsRegistrationScreen: React.FC = () => {
	const { onboardingStep,
		setOnboardingStep,
		profilePicture,
		setProfilePicture,
		role,
		setRole } = useUserDetails();

	const { user } = useUser();
	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		});
		if (!result.canceled) {
			setProfilePicture(result.assets[0].uri);
		}
	};

	const submitDetails = async () => {
		if (user === null || user === undefined) {
			throw new Error('User is null');
		}

		setOnboardingStep(onboardingStep + 1);

		await userService.createUser({
			role: role,
			profilePicture: profilePicture || '',
			onboardingStep: onboardingStep,
		}, user.id);
	};

	return (
		<Background>
			<HeaderText color={theme.colors.primary} size={30}> Almost There! </HeaderText>
			<HeaderText size={20}>Pick your Role</HeaderText>
			<SwitchSelector
				options={[
					{ label: 'Regular User', value: UserRoleEnum.RegularUser },
					{ label: 'Landlord', value: UserRoleEnum.Landlord },
				]}
				buttonColor={theme.colors.text}
				borderColor={theme.colors.secondary}
				initial={0}
				onPress={(value: UserRoleEnum) => setRole(value)}
			></SwitchSelector>
			<Divider
				style={{
					marginVertical: 10,
					height: 2,
				}}
			/>
			<HeaderText paddingBottom={1} size={20}>Pick your Profile Picture (optional)</HeaderText>
			<Button
				mode={'elevated'}
				onPress={pickImage}>Choose File</Button>
			{profilePicture && <ProfilePicture source={{ uri: profilePicture }} style={{ width: 300, height: 300 }} />}
			<Button mode="contained" onPress={submitDetails}>
				Continue
			</Button>
		</Background>
	);
};
