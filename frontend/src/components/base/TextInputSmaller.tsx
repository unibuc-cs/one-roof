import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../../theme';

type Props = React.ComponentProps<typeof Input> & {
	errorText?: string,
	marginVertical?: number,
	multiline?: boolean,
};

export const TextInputSmaller = ({
	errorText,
	marginVertical,
	multiline,
	...props
}: Props) => {
	const customPadding = multiline ? 8 : 0;
	return (
		<View style={[styles.container]}>
			<Input
				style={[
					styles.inputContainer,
					{ paddingVertical: customPadding },
				]}
				contentStyle={styles.input}
				selectionColor={theme.colors.secondary}
				underlineColor="transparent"
				mode="outlined"
				numberOfLines={2}
				dense={true}
				{...props}
			/>
			{errorText ? <Text style={styles.error}>{errorText}</Text> : null}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignContent: 'center',
	},
	inputContainer: {
		backgroundColor: theme.colors.secondary,
	},
	input: {
		paddingTop: 4,
		fontFamily: 'Proxima-Nova/Regular',
	},
	error: {
		fontSize: 14,
		color: theme.colors.error,
	},
});
