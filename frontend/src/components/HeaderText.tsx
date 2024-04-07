import React from 'react';
import { Text, StyleSheet, TextProps, View, ColorValue } from 'react-native';
import { theme } from '../theme';
import { useCustomFonts } from '../hooks/useCustomFonts';
import { ActivityIndicator } from 'react-native-paper';


type HeaderTextProps = {
	children: React.ReactNode,
	size: number,
	paddingBottom?: number,
	color?: ColorValue,
} & TextProps;

export const HeaderText = ({ children, color, size, paddingBottom, ...props }: HeaderTextProps) => {
	const customFonts = useCustomFonts();
	if (!customFonts) {
		return <ActivityIndicator size="large"/>;
	}

	paddingBottom = paddingBottom || 20;
	color = color || theme.colors.text;

	return (
		<Text style={[styles.headerText, { color: color, fontSize: size, paddingBottom: paddingBottom, fontFamily: 'ProximaNova-Bold' }]} {...props}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	headerText: {
		fontSize: 20,
		lineHeight: 28,
		paddingTop: 20,
		textAlign: 'center',
		paddingHorizontal: 5,
	},
});
