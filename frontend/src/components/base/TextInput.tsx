import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../../theme';

type Props = React.ComponentProps<typeof Input> & {
	errorText?: string,
	marginVertical?: number,
};

export const TextInput = ({ errorText, marginVertical, ...props }: Props) => {
	const customMargin = marginVertical !== undefined ? marginVertical : 12;
	return (
		<View style={[styles.container, { marginVertical: customMargin }]}>
			<Input
				style={[styles.input]}
				selectionColor={theme.colors.secondary}
				underlineColor="transparent"
				mode="outlined"
				{...props}
			/>
			{errorText ? <Text style={styles.error}>{errorText}</Text> : null}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginVertical: 0,
	},
	input: {
		color: 'red',
		fontFamily: 'Proxima-Nova/Regular',
		backgroundColor: theme.colors.secondary,
	},
	error: {
		fontSize: 14,
		color: theme.colors.error,
		paddingHorizontal: 4,
	},
});

export default memo(TextInput);
