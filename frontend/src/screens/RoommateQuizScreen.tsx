import React from 'react';
import { Background, Button, HeaderText, QuizSection } from '../components';
import { Card } from 'react-native-paper';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { MAX_PRICE, MIN_PRICE } from '../utils';
import { PriceRangeSelector } from '../components/PriceRangeSelector';

const RoommateFeedbackSchema = Yup.object().shape({
	price: Yup.object().shape({
		lowerBound: Yup.number().required('Lower bound is required'),
		upperBound: Yup.number().required('Upper bound is required'),
	}),
	allowedGenders: Yup.string()
		.oneOf(['male', 'female', 'both'])
		.default('both')
		.required('Gender preference is required'),
	smoking: Yup.object().shape({
		does: Yup.boolean().default(false).required(),
		tolerates: Yup.boolean().default(false).required(),
	}),
	pets: Yup.object().shape({
		has: Yup.boolean().default(false).required(),
		tolerates: Yup.boolean().default(false).required(),
	}),
});

export const RoommateQuizScreen: React.FC = () => {
	const handleSubmit = async (roommateQuizValues: any) => {
		console.error(roommateQuizValues);
	};

	return (
		<Background>
			<Card style={styles.card} contentStyle={styles.container}>
				<Formik
					initialValues={{
						price: {
							lowerBound: MIN_PRICE,
							upperBound: MAX_PRICE,
						},
						allowedGenders: 'both',
						smoking: { does: false, tolerates: false },
						pets: { has: false, tolerates: false },
					}}
					validationSchema={RoommateFeedbackSchema}
					onSubmit={handleSubmit}
				>
					{({ handleSubmit, setFieldValue, values }) => (
						<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
							<HeaderText paddingBottom={30} size={30}>
                                Roommate Matching Quiz
							</HeaderText>

							<QuizSection
								additionalNodes={
									<View
										style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
										<HeaderText size={16}>What is your preferred price range? </HeaderText>
										<PriceRangeSelector
											priceRangeRef={{
												current: [values.price.lowerBound, values.price.upperBound],
											}}
											minPrice={MIN_PRICE}
											maxPrice={MAX_PRICE}
											onPriceChange={(newValues) => {
												setFieldValue('price.lowerBound', newValues[0]);
												setFieldValue('price.upperBound', newValues[1]);
											}}
											sliderScale={0.8}
										/>
									</View>
								}
								title="Dealbreakers"
								hasAdditionalComments={false}
								multiOptionQuestions={[
									{
										prompt: 'What gender should your roommate be?',
										options: [
											{ label: 'Women', value: 'female' },
											{ label: 'Men', value: 'male' },
											{ label: 'Either', value: 'both' },
										],
									},
								]}
								binaryQuestions={[
									'Do you smoke?',
									'Would it be fine if your roommate smoked?',
									'Do you have pets?',
									'Would it be fine if your roommate had pets?',
								]}
							/>

							<QuizSection
								title='Preferences'
								isLast={true}
								hasAdditionalComments={false}
								questions={[
									{
										prompt: 'Are you more of a morning person or a night owl?',
										leftText: 'Morning person',
										rightText: 'Night owl',
									},
									{
										prompt: 'How particular are you about cleanliness?',
										leftText: 'Very particular',
										rightText: 'Very lenient'
									},
									{
										prompt: 'How social do you want your roommate to be?',
										leftText: 'Life of the party',
										rightText: 'Bookworm'
									},
									{
										prompt: 'How much/often would you like to talk wih your roommate?',
										leftText: 'A lot',
										rightText: 'Very little'
									},
									{
										prompt: 'How often should it be okay for your roommate to have guests over?',
										leftText: 'Never',
										rightText: 'Frequently'
									},
									{
										prompt: 'How often would you have guests over?',
										leftText: 'Never',
										rightText: 'Frequently'
									},
									{
										prompt: 'How noisy would you consider yourself to be (e.g.: listen to music loudly, gaming with friends..)?',
										leftText: '1',
										rightText: '5'
									},
									{
										prompt: 'How important is quietness to you?',
										leftText: '1',
										rightText: '5'
									}
								]}
								binaryQuestions={[
									'Are you comfortable splitting costs (e.g. utilities, WiFi) evenly with your roommate?',
								]}
								multiOptionQuestions={[{
									prompt: 'Would you prefer a roommate who is..',
									options: [
										{ label: 'Student', value: 'student' },
										{ label: 'Working professional', value: 'working' },
										{ label: 'No preference', value: 'either' }
									]
								}]}
							/>
							<Button mode="contained" onPress={handleSubmit}>
                                Submit Review
							</Button>
						</KeyboardAwareScrollView>
					)}
				</Formik>
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
