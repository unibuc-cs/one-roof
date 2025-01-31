import {
	ImageBackground,
	KeyboardAvoidingView,
	StyleSheet,
	View,
} from 'react-native';
import React from 'react';

interface BackgroundProps {
	children: React.ReactNode,
}

export const Background = ({ children }: BackgroundProps) => (
	<View style={styles.main_container}>
		<ImageBackground
			source={require('../../../assets/background_dot_bigger.png')}
			resizeMode={'repeat'}
			style={{ height: '100%', width: '100%', flex: 1 }}
		>
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				{children}
			</KeyboardAvoidingView>
		</ImageBackground>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		width: '100%',
		alignSelf: 'center',
	},
	background: {
		flex: 1,
		width: '100%',
	},
	main_container: {
		flex: 1,
		width: '100%',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
