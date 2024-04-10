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
	textAlign?: 'center' | 'left' | 'right' | 'justify' | 'auto',
	marginTop?: number,
} & TextProps;

export const HeaderText = ({ children, color, size, paddingBottom, textAlign, ...props }: HeaderTextProps) => {
	const customFonts = useCustomFonts();
	if (!customFonts) {
		return <ActivityIndicator size="large"/>;
	}

	color = color || theme.colors.text;
	textAlign = textAlign || 'center';

	return (
		<Text {...props} style={[styles.headerText, { textAlign: textAlign, color: color, fontSize: size, paddingBottom: paddingBottom, fontFamily: 'ProximaNova-Bold' }]}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	headerText: {
		fontSize: 20,
		lineHeight: 28,
		paddingTop: 20,
		paddingHorizontal: 5,
	},
});
