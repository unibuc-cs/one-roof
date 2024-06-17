import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HeaderText } from './HeaderText';
import { theme } from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCustomFonts } from '../hooks/useCustomFonts';

interface ReviewSectionSchema {
	title: string,
	questions?: Array<{
		prompt: string,
		leftText: string,
		rightText: string,
		value: number,
	}>,
	isLast?: boolean,
	binaryQuestions?: Array<{
		question: string,
		value: boolean,
	}>,
	multiOptionQuestions?: Array<{
		prompt: string,
		value: string,
	}>,
	additional?: string,
}

export const ReviewDetailsSection: React.FC<ReviewSectionSchema> = ({ title, questions, isLast, binaryQuestions, multiOptionQuestions, additional }) => {
	return (
		<View>
			{title !== '' && <HeaderText color={theme.colors.primary} textAlign={'left'} paddingTop={0} size={22}>{title}</HeaderText>}
			{questions?.map((q, index) => (
				<View key={index} style={styles.questionContainer}>
					<Text style={styles.questionText}>{q.prompt}</Text>
					<Text style={styles.answerText}>{q.value >= 3 ? q.rightText : q.leftText}</Text>
				</View>
			))}
			{binaryQuestions?.map((binaryQuestion, index) => (
				<View key={index} style={styles.questionContainer}>
					<Text style={styles.questionText}>{binaryQuestion.question}</Text>
					<Text style={styles.answerText}>{binaryQuestion.value ? 'Yes' : 'No'}</Text>
				</View>
			))}

			{multiOptionQuestions?.map((question, index) => (
				<View key={index} style={styles.questionContainer}>
					{question.prompt !== '' && <Text style={styles.questionText}>{question.prompt}</Text>}
					<Text style={styles.answerText}>{question.value}</Text>
				</View>
			))}
			{}
			{!isLast && (
				<View style={styles.diamondIcon}>
					<Icon size={20} color={theme.colors.primary} name={'cards-diamond-outline'} />
				</View>
			)}
			{additional && (
				<View>
					<HeaderText size={20}>Additional Comments: </HeaderText>
					<Text>{additional}</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	questionContainer: {
		marginTop: 10,
	},
	questionText: {
		fontFamily: 'Proxima-Nova/Regular',
		fontSize: 16,
		fontWeight: 'bold',
		color: theme.colors.text,
	},
	answerText: {
		fontFamily: 'Proxima-Nova/Regular',
		fontSize: 16,
		color: theme.colors.text,
		textAlign: 'justify',
	},
	diamondIcon: {
		height: 40,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 15,
	}
});

