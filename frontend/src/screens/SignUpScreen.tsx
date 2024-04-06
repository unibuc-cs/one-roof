import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp();

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [pendingVerification, setPendingVerification] = React.useState(false);
    const [code, setCode] = React.useState('');

    const onSignUpPress = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            await signUp.create({
                firstName,
                lastName,
                username,
                emailAddress,
                password
            });

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

            setPendingVerification(true);
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const onPressVerify = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code
            });

            await setActive({ session: completeSignUp.createdSessionId });
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <View>
            {!pendingVerification && (
                <View>
                    <View>
                        <TextInput
                            autoCapitalize="none"
                            value={firstName}
                            placeholder="First Name..."
                            onChangeText={(firstName) => { setFirstName(firstName); }}
                        />
                    </View>
                    <View>
                        <TextInput
                            autoCapitalize="none"
                            value={lastName}
                            placeholder="Last Name..."
                            onChangeText={(lastName) => { setLastName(lastName); }}
                        />
                    </View>
                    <View>
                        <TextInput
                            autoCapitalize="none"
                            value={username}
                            placeholder="Username..."
                            onChangeText={(username) => { setUsername(username); }}
                        />
                    </View>
                    <View>
                        <TextInput
                            autoCapitalize="none"
                            value={emailAddress}
                            placeholder="Email..."
                            onChangeText={(email) => { setEmailAddress(email); }}
                        />
                    </View>

                    <View>
                        <TextInput
                            value={password}
                            placeholder="Password..."
                            placeholderTextColor="#000"
                            secureTextEntry={true}
                            onChangeText={(password) => { setPassword(password); }}
                        />
                    </View>

                    <TouchableOpacity onPress={onSignUpPress}>
                        <Text>Sign up</Text>
                    </TouchableOpacity>
                </View>
            )}
            {pendingVerification && (
                <View>
                    <View>
                        <TextInput
                            value={code}
                            placeholder="Code..."
                            onChangeText={(code) => { setCode(code); }}
                        />
                    </View>
                    <TouchableOpacity onPress={onPressVerify}>
                        <Text>Verify Email</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
