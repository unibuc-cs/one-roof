import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../theme';
import { HeaderText } from './HeaderText';
import { Button } from './Button';
import { IReview } from '../models';
import { useNavigation } from '@react-navigation/native';

type ReviewCardProps = {
	review: IReview,
}

export const ReviewCard: React.FC<ReviewCardProps> = ({review}) => {
	const { navigate } = useNavigation();
	return (
		<Card key={review._id} style={styles.card}>
			<Card.Content>
				<HeaderText size={30} style={styles.title}>{review.title}</HeaderText>
				<Paragraph>{review.livingSituation}</Paragraph>
				<Paragraph style={styles.description}>{review.description}</Paragraph>
				<View style={styles.recommendContainer}>
					<HeaderText size={18} textAlign={"left"} style={styles.recommendText}>Recommend: {review.recommend}/5</HeaderText>
				</View>
				<Button mode={'contained'} onPress={() => navigate('ViewReview', {review: review})}> Go to Full Review! </Button>
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
		color: theme.colors.primary,
		fontWeight: 'bold',
	},
});
