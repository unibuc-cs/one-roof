import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../theme'; // Ensure you have a theme file or adjust the colors accordingly

interface ReviewCardProps {
	title: string,
	livingSituation: string,
	description: string,
	recommend: 1 | 2 | 3 | 4 | 5,
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ title, livingSituation, description, recommend }) => {
	return (
		<Card style={styles.card}>
			<Card.Content>
				<Title style={styles.title}>{title}</Title>
				<Paragraph style={styles.livingSituation}>{livingSituation}</Paragraph>
				<Paragraph style={styles.description}>{description}</Paragraph>
				<View style={styles.recommendContainer}>
					<Text style={styles.recommendText}>Recommend: {recommend}/5</Text>
				</View>
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		margin: 10,
		backgroundColor: 'white',
		padding: 16,
		borderRadius: 8,
		elevation: 3,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: theme.colors.primary,
		marginBottom: 8,
	},
	livingSituation: {
		fontSize: 16,
		color: theme.colors.text,
		marginBottom: 8,
	},
	description: {
		fontSize: 14,
		color: theme.colors.text,
		marginBottom: 16,
	},
	recommendContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	recommendText: {
		fontSize: 14,
		color: theme.colors.accent,
		fontWeight: 'bold',
	},
});
