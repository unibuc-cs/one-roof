import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { theme } from '../theme';

type HeaderTextProps = {
	children: React.ReactNode,
	size: number,
} & TextProps;

export const HeaderText = ({ children, size, ...props }: HeaderTextProps) => (
	<Text style={[styles.headerText, { fontSize: size }]} {...props}>
		{children}
	</Text>
);

const styles = StyleSheet.create({
	headerText: {
		fontSize: 20,
		lineHeight: 28,
		textAlign: 'center',
		fontWeight: 'bold',
		paddingVertical: 20,
		paddingHorizontal: 5,
		color: theme.colors.text,
	},
});
