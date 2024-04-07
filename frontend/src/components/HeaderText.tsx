import React from 'react';
import { Text, StyleSheet, TextProps, View } from 'react-native';
import { theme } from '../theme';
import { useCustomFonts } from '../hooks/useCustomFonts';
import { ActivityIndicator } from 'react-native-paper';


type HeaderTextProps = {
	children: React.ReactNode,
	size: number,
} & TextProps;

export const HeaderText = ({ children, size, ...props }: HeaderTextProps) => {
	const customFonts = useCustomFonts();
	if (!customFonts) {
		return <ActivityIndicator size="large"/>;
	}

	return (
		<Text style={[styles.headerText, { fontSize: size, fontFamily: 'ProximaNova-Bold' }]} {...props}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	headerText: {
		fontSize: 20,
		lineHeight: 28,
		textAlign: 'center',
		paddingVertical: 20,
		paddingHorizontal: 5,
		color: theme.colors.text,
	},
});
