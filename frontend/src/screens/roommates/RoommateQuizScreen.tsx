import React from 'react';
import { Background, Button, HeaderText, QuizSection } from '../../components';
import { Card } from 'react-native-paper';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { MAX_PRICE, MIN_PRICE } from '../../utils';
import { PriceRangeSelector } from '../../components/PriceRangeSelector';
import { MapWithAreaPolygons } from '../../components/MapWithAreaPolygons';
import { useUser } from '@clerk/clerk-expo';
import userService from '../../services/internal/userService';
import { useNavigation } from '@react-navigation/native';

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
		self: Yup.boolean().required(),
		other: Yup.boolean().required(),
	}),

	pets: Yup.object().shape({
		self: Yup.boolean().required(),
		other: Yup.boolean().required(),
	}),

	costSharing: Yup.boolean().required('Cost-sharing preference is required'),

	roommateType: Yup.string()
		.oneOf(['student', 'working', 'either'])
		.default('either')
		.required('Roommate type preference is required'),

	preferences: Yup.object().shape({
		morningPerson: Yup.object().shape({
			self: Yup.number().min(1).max(5).required(),
			other: Yup.number().min(1).max(5).required(),
		}),
		cleanliness: Yup.object().shape({
			self: Yup.number().min(1).max(5).required(),
			other: Yup.number().min(1).max(5).required(),
		}),
		sociability: Yup.object().shape({
			self: Yup.number().min(1).max(5).required(),
			other: Yup.number().min(1).max(5).required(),
		}),
		conversations: Yup.object().shape({
			self: Yup.number().min(1).max(5).required(),
			other: Yup.number().min(1).max(5).required(),
		}),
		guest: Yup.object().shape({
			self: Yup.number().min(1).max(5).required('How often you have guests is required'),
			other: Yup.number().min(1).max(5).required('How often your roommate can have guests is required'),
		}),

		noise: Yup.object().shape({
			self: Yup.number().min(1).max(5).required('Your noise level preference is required'),
			other: Yup.number().min(1).max(5).required('How quiet you expect your roommate to be is required'),
		}),
	}),
});


export const RoommateQuizScreen: React.FC = () => {
	const navigation = useNavigation();
	const { user } = useUser();
	const currentUserId = user?.id;


	const handleSubmit = async (roommateQuizValues: any) => {
		await userService.submitRoommateQuiz(currentUserId as string, roommateQuizValues);
		navigation.navigate('Roommates');
	};

	return (
		<Background>
			<Card style={styles.card} contentStyle={styles.container}>
				<Formik
					initialValues={{
						preferredAreas: [],
						price: { lowerBound: MIN_PRICE, upperBound: MAX_PRICE },
						allowedGenders: 'both',
						smoking: { self: false, other: false },
						pets: { self: false, other: false },
						costSharing: true,
						roommateType: 'either',
						preferences: {
							morningPerson: { self: 3, other: 3 },
							cleanliness: { self: 3, other: 3 },
							sociability: { self: 3, other: 3 },
							conversations: { self: 3, other: 3 },
							guest: { self: 3, other: 3 },
							noise: { self: 3, other: 3 },
						},
					}}
					validationSchema={RoommateFeedbackSchema}
					onSubmit={handleSubmit}
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
								setFieldValue={setFieldValue}
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
								binaryQuestions={[
									{ prompt: 'Do you smoke?', fieldName: 'smoking.self' },
									{ prompt: 'Do you have pets?', fieldName: 'pets.self' },
									{
										prompt: 'Would you be comfortable with a roommate who smokes?',
										fieldName: 'smoking.other'
									},
									{
										prompt: 'Would you be comfortable with a roommate who has pets?',
										fieldName: 'pets.other'
									},
								]}
								multiOptionQuestions={[
									{
										prompt: 'Who would you want as a roommate?',
										options: [
											{ label: 'Women', value: 'female' },
											{ label: 'Men', value: 'male' },
											{ label: 'Either', value: 'both' },
										],
										fieldName: 'allowedGenders',
									},
								]}
							/>

							<QuizSection
								setFieldValue={setFieldValue}
								hasAdditionalComments={false}
								title="Preferences"
								isLast={true}
								questions={[
									{
										prompt: 'Are you more of a morning person or a night owl?',
										leftText: 'Morning person',
										rightText: 'Night owl',
										fieldName: 'preferences.morningPerson.self',
									},
									{
										prompt: 'How much of a morning person should your roommate be?',
										leftText: 'Not at all',
										rightText: 'Very much',
										fieldName: 'preferences.morningPerson.other',
									},
									{
										prompt: 'How particular are you about cleanliness?',
										leftText: 'Very particular',
										rightText: 'Not too bothered',
										fieldName: 'preferences.cleanliness.self',
									},
									{
										prompt: 'How clean should your roommate be?',
										leftText: 'Not important',
										rightText: 'Very important',
										fieldName: 'preferences.cleanliness.other',
									},
									{
										prompt: 'How often do you have guests?',
										leftText: 'Never',
										rightText: 'Frequently',
										fieldName: 'preferences.guest.self',
									},
									{
										prompt: 'How often should your roommate have guests?',
										leftText: 'Never',
										rightText: 'Frequently',
										fieldName: 'preferences.guest.other',
									},
									{
										prompt: 'How noisy would you consider yourself to be?',
										leftText: 'Very quiet',
										rightText: 'Very noisy',
										fieldName: 'preferences.noise.self',
									},
									{
										prompt: 'How quiet should your home be?',
										leftText: 'Not important',
										rightText: 'Very important',
										fieldName: 'preferences.noise.other',
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
										fieldName: 'roommateType',
									},
								]}
								binaryQuestions={[
									{
										prompt: 'Are you comfortable splitting costs (e.g., utilities, WiFi) evenly with your roommate?',
										fieldName: 'costSharing'
									},
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
