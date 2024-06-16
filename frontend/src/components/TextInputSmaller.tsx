import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../theme';
import { useCustomFonts } from '../hooks/useCustomFonts';

type Props = React.ComponentProps<typeof Input> & { errorText?: string, marginVertical ?: number};

export const TextInputSmaller = ({ errorText, marginVertical, ...props }: Props) => {
	const LoadFonts = async () => { await useCustomFonts(); };
	const customPadding = props.multiline ? 8 : 0;
	return  (
		<View style={[styles.container]}>
			<Input
				style={[styles.inputContainer, {paddingVertical: customPadding}]}
				contentStyle={styles.input}
				selectionColor={theme.colors.secondary}
				underlineColor="transparent"
				mode='outlined'
				numberOfLines={2}
				dense={true}
				{...props}
			/>
			{errorText ? <Text style={styles.error}>{errorText}</Text> : null}
		</View>
	);

}
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
		fontFamily: 'ProximaNova-Regular',
	},
	error: {
		fontSize: 14,
		color: theme.colors.error,
	}
});
