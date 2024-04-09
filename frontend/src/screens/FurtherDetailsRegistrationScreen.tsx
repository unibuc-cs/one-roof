import Background from '../components/Background';
import { Divider, RadioButton } from 'react-native-paper';
import Button from '../components/Button';
import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useUserDetails } from '../contexts/UserDetailsContext';
import { UserRoleEnum } from '../enums/UserRoleEnum';
import SwitchSelector from 'react-native-switch-selector';
import { HeaderText } from '../components/HeaderText';
import { theme } from '../theme';
import { ProfilePicture } from '../components/ProfilePicture';
import { useUser } from '@clerk/clerk-expo';
import userService from '../services/internal/usersService';
import { uploadProfilePicture } from '../services';

export const FurtherDetailsRegistrationScreen: React.FC = () => {
	const { onboardingStep,
		setOnboardingStep,
		profilePictureUrl,
		setProfilePictureUrl,
		role,
		setRole } = useUserDetails();

	const [image, setImage] = React.useState(null);

	const { user } = useUser();
	const pickImageAndUpload = async () => {
		if (!user || !user.id) {
			console.error('user is not defined');
			return;
		}

		const url = await uploadProfilePicture(user.id);
		if (url) {
			setProfilePictureUrl(url);
		} else {
			console.error('Failed to upload profile picture');
		}
	};

	const submitDetails = async () => {
		if (user === null || user === undefined) {
			throw new Error('User is null');
		}

		const nextOnboardingStep = onboardingStep + 1;

		setOnboardingStep(nextOnboardingStep);

		await userService.createUser({
			role: role,
			profilePicture: profilePictureUrl || '',
			onboardingStep: nextOnboardingStep
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
				onPress={pickImageAndUpload}>Choose File</Button>
			{profilePictureUrl && <ProfilePicture source={{ uri: profilePictureUrl }} style={{ width: 300, height: 300 }} />}
			<Button mode="contained" onPress={submitDetails}>
				Continue
			</Button>
		</Background>
	);
};
