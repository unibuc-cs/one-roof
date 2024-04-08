import React, { useEffect } from 'react';
import { TextInput } from '../components';
import { useSignIn, useUser } from '@clerk/clerk-expo';
import Background from '../components/Background';
import Button from '../components/Button';
import Logo from '../components/Logo';
import userService from '../api/services/usersService';
import { useUserDetails } from '../contexts/UserDetailsContext';

export default function SignInScreen() {
	const { signIn, setActive, isLoaded } = useSignIn();
	const { setRole, setOnboardingStep, setProfilePicture } = useUserDetails();
	const { user } = useUser();

	const [emailAddress, setEmailAddress] = React.useState('');
	const [password, setPassword] = React.useState('');


	const onSignInPress = async () => {
		if (!isLoaded) {
			return;
		}

		try {
			const completeSignIn = await signIn.create({
				identifier: emailAddress,
				password
			});

			await setActive({ session: completeSignIn.createdSessionId });
		} catch (err: any) {
			console.log(err);
		}
	};
	return (
		<Background>
			<Logo />
			<TextInput
				label="Email"
				returnKeyType="next"
				autoCapitalize="none"
				value={emailAddress}
				placeholder="Email..."
				onChangeText={(emailAddress) => { setEmailAddress(emailAddress); }}
			/>

			<TextInput
				label="Password"
				returnKeyType="done"
				value={password}
				placeholder="Password..."
				secureTextEntry={true}
				onChangeText={(password) => { setPassword(password); }}
			/>

			<Button mode="contained" onPress={onSignInPress}>
                Sign In
			</Button>
		</Background>
	);
}
