import { Image, StyleSheet } from 'react-native';
import * as React from 'react';

const Logo = () => (
	<Image
		source={require('../../../assets/logo.png')}
		style={styles.image}/>
);

const styles = StyleSheet.create({
	image: {
		width: 160,
		height: 160,
		marginBottom: 30,
	}
});
export default Logo;
