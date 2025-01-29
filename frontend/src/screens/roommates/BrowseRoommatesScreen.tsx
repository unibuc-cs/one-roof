import React from 'react';
import { Background, HeaderText } from '../../components';
import { Card } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Button from '../../components/Button';

export const BrowseRoommatesScreen: React.FC = ({ navigation }) => {
	return (
		<Background>
			<Card style={styles.card} contentStyle={styles.container}>
				<HeaderText size={40} paddingBottom={30}>
                    Browse Roommates
				</HeaderText>
				<Button mode="contained" onPress={() => navigation.goBack()}>
                    Go back
				</Button>
			</Card>
		</Background>
	);
};

const styles = StyleSheet.create({
	card: {
		width: '100%',
		backgroundColor: 'white',
		padding: 16,
		height: '100%',
	},
	container: {
		flex: 1,
		padding: 16,
		alignItems: 'center',
	},
});
