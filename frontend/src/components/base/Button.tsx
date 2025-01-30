import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../../theme';

export type ButtonProps = {
	mode?: string,
	style?: any,
	width?: string | number,
	marginVertical?: number,
	fontSize?: number,
	lineHeight?: number,
	children: React.ReactNode,
} & React.ComponentProps<typeof PaperButton>;

export const Button = ({
	mode,
	style,
	width,
	marginVertical = 15,
	fontSize = 15,
	lineHeight = 26,
	children,
	...props
}: ButtonProps) => {
	width = width || '100%';
	return (
		<PaperButton
			style={[
				{ width, marginVertical },
				styles.button,
				mode === 'outlined' && {
					backgroundColor: theme.colors.surface,
				},
				style,
			]}
			labelStyle={[styles.text, { fontSize, lineHeight }]}
			mode={mode}
			{...props}
		>
			{children}
		</PaperButton>
	);
};

const styles = StyleSheet.create({
	button: {
		// Removed hardcoded marginVertical
	},
	text: {
		fontWeight: 'bold',
		fontSize: 15,
		lineHeight: 26,
	},
});

export default memo(Button);
