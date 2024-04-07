import React from 'react';
import { Image, ImageProps, StyleSheet, View } from 'react-native';
import { theme } from '../theme';

export const ProfilePicture: React.FC<ImageProps> = (props) => {
	return (
	  <Image
			source={props.source}
			style={styles.image}
	  />
	);
};

const styles = StyleSheet.create({
	image: {
		width: 200,
		height: 200,
		borderRadius: 100,
		marginVertical: 10,
		borderWidth: 2,
		borderColor: theme.colors.outline
	},
});
