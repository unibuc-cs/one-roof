import React from 'react';
import { Background, Button, HeaderText, QuizSection } from '../components';
import { Card } from 'react-native-paper';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { MAX_PRICE, MIN_PRICE } from '../utils';
import { PriceRangeSelector } from '../components/PriceRangeSelector';
import { MapWithAreaPolygons } from '../components/MapWithAreaPolygons';

const RoommateFeedbackSchema = Yup.object().shape({
	preferredAreas: Yup.array()
		.of(Yup.array().of(
			Yup.object().shape({
				latitude: Yup.number().required(),
				longitude: Yup.number().required(),
			})
		))
		.required('Please mark at least one area on the map'),
	price: Yup.object().shape({
		lowerBound: Yup.number()
			.min(MIN_PRICE, `Price cannot be below ${MIN_PRICE}`)
			.max(MAX_PRICE, `Price cannot exceed ${MAX_PRICE}`)
			.required('Lower bound is required'),
		upperBound: Yup.number()
			.min(MIN_PRICE, `Price cannot be below ${MIN_PRICE}`)
			.max(MAX_PRICE, `Price cannot exceed ${MAX_PRICE}`)
			.required('Upper bound is required'),
	}),
	allowedGenders: Yup.string()
		.oneOf(['male', 'female', 'both'])
		.default('both')
		.required('Gender preference is required'),
	smoking: Yup.object().shape({
		does: Yup.boolean().required(),
		tolerates: Yup.boolean().required(),
	}),
	pets: Yup.object().shape({
		has: Yup.boolean().required(),
		tolerates: Yup.boolean().required(),
	}),
	guestPreferences: Yup.object().shape({
		roommateGuests: Yup.number()
			.min(1)
			.max(5)
			.required('How often guests are allowed is required'),
		selfGuests: Yup.number()
			.min(1)
			.max(5)
			.required('How often you have guests is required'),
	}),
	noisePreferences: Yup.object().shape({
		selfNoiseLevel: Yup.number()
			.min(1)
			.max(5)
			.required('Your noise level preference is required'),
		roommateQuietnessImportance: Yup.number()
			.min(1)
			.max(5)
			.required('Quietness importance is required'),
	}),
	costSharing: Yup.boolean().required('Cost-sharing preference is required'),
	roommateType: Yup.string()
		.oneOf(['student', 'working', 'either'])
		.default('either')
		.required('Roommate type preference is required'),
	preferences: Yup.object().shape({
		morningPerson: Yup.number()
			.min(1)
			.max(5)
			.required('Morning or night owl preference is required'),
		cleanliness: Yup.number()
			.min(1)
			.max(5)
			.required('Cleanliness preference is required'),
		sociability: Yup.number()
			.min(1)
			.max(5)
			.required('Social interaction preference is required'),
		conversations: Yup.number()
			.min(1)
			.max(5)
			.required('Conversation frequency preference is required'),
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
						price: { lowerBound: MIN_PRICE, upperBound: MAX_PRICE },
						allowedGenders: 'both',
						smoking: { does: false, tolerates: false },
						pets: { has: false, tolerates: false },
						guestPreferences: { roommateGuests: 3, selfGuests: 3 },
						noisePreferences: { selfNoiseLevel: 3, roommateQuietnessImportance: 3 },
						costSharing: true,
						roommateType: 'either',
						preferences: {
							morningPerson: 3,
							cleanliness: 3,
							sociability: 3,
							conversations: 3,
						},
					}}
					validationSchema={RoommateFeedbackSchema}
					onSubmit={(values) => {
						console.error('Form values:', values);
					}}
				>
					{({ handleSubmit, setFieldValue, values }) => (
						<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
							<HeaderText paddingBottom={30} size={30}>
                                Roommate Matching Quiz
							</HeaderText>

							<HeaderText size={16}> Where are you searching? </HeaderText>
							<View style={{ height: 400, marginTop: 10 }}>
								<MapWithAreaPolygons
									onChangePolygons={(polygons) => setFieldValue('preferredAreas', polygons)}
								/>
							</View>
							<QuizSection
								additionalNodes={
									<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
										<HeaderText size={16}>What’s your preferred price range?</HeaderText>
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
								hasAdditionalComments={false}
								title="Dealbreakers"
								multiOptionQuestions={[
									{
										prompt: 'Who would you want as a roommate?',
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
								hasAdditionalComments={false}
								title="Preferences"
								isLast={true}
								questions={[
									{
										prompt: 'Are you more of a morning person or a night owl?',
										leftText: 'Morning person',
										rightText: 'Night owl',
									},
									{
										prompt: 'How particular are you about cleanliness?',
										leftText: 'Very particular',
										rightText: 'Not too bothered',
									},
									{
										prompt: 'How social do you want your roommate to be?',
										leftText: 'Very outgoing',
										rightText: 'Prefers to keep to themselves',
									},
									{
										prompt: 'How often should it be okay for your roommate to have guests over?',
										leftText: 'Never',
										rightText: 'Frequently',
									},
									{
										prompt: 'How often would you have guests over?',
										leftText: 'Never',
										rightText: 'Frequently',
									},
									{
										prompt: 'How noisy would you consider yourself to be?',
										leftText: 'Very quiet',
										rightText: 'Very noisy',
									},
									{
										prompt: 'How important is it for your home to be quiet?',
										leftText: 'Not important',
										rightText: 'Very important',
									},
								]}
								multiOptionQuestions={[
									{
										prompt: 'Would you prefer a roommate who is...',
										options: [
											{ label: 'A student', value: 'student' },
											{ label: 'A working professional', value: 'working' },
											{ label: 'No preference', value: 'either' },
										],
									},
								]}
								binaryQuestions={[
									'Are you comfortable splitting costs (e.g., utilities, WiFi) evenly with your roommate?',
								]}
							/>

							<Button mode="contained" onPress={handleSubmit}>
                                Submit Quiz
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
