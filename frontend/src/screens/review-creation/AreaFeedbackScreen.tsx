import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, ReviewSection } from '../../components';
import { RouteProp } from '@react-navigation/native';
import { HeaderText } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Background from '../../components/Background';
import { Card } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { reviewService } from '../../services';
import { useUserDetails } from '../../contexts/UserDetailsContext';

const AreaFeedbackSchema = Yup.object().shape({
	transport: Yup.object().shape({
		publicTransport: Yup.number().required(),
		carTransport: Yup.number().required(),
		trafficCongestion: Yup.number().required(),
		primaryTransportMode: Yup.string().required(),
		additionalComments: Yup.string().nullable(),
	}),
	demographics: Yup.object().shape({
		predominantDemographic: Yup.string().required(),
	}),
	safetyAndNoise: Yup.object().shape({
		noiseLevel: Yup.number().required(),
		nighttimeSafety: Yup.number().required(),
	}),
	environmentalFactors: Yup.object().shape({
		cleanliness: Yup.number().required(),
		greenSpaces: Yup.number().required(),
		pollutionLevels: Yup.number().required(),
	}),
});

type AreaFeedbackScreenProps = {
	route: RouteProp<{ params: { generalDetails: any; buildingFeedback: any } }, 'params'>;
	navigation: any;
};

export const AreaFeedbackScreen: React.FC<AreaFeedbackScreenProps> = ({ route, navigation }) => {
	const { generalDetails, buildingFeedback } = route.params;
	const handleDiscard = () => {
		navigation.navigate('Home');
	}
	const handleSubmit = (values: any) => {
		const reviewData = {
			title: generalDetails.title,
			recommend: generalDetails.recommend,
			description: generalDetails.comments,
			location: {
				type: 'Point',
				coordinates: [generalDetails.longitude, generalDetails.latitude],
			},
			address: generalDetails.livingSituation,
			areaFeedback: values,
			buildingFeedback: buildingFeedback,
			reviewerId: '664c96989d32dae8d13aba37',
		}

		console.log('reviewData', reviewData);

		reviewService.createReview(reviewData, generalDetails.reviewerId)
			.then(response => {
				console.log('Review submitted successfully', response);
				navigation.navigate('Home');
			})
			.catch(error => {
				console.error('Error submitting review', error);
			});
	};

	return (
		<Background>
			<Card style={styles.card} contentStyle={styles.container}>
				<Formik
					initialValues={{
						transport: {
							publicTransport: 3,
							carTransport: 3,
							trafficCongestion: 3,
							primaryTransportMode: 'Metro',
							additionalComments: '',
						},
						demographics: {
							predominantDemographic: 'Mixed',
						},
						safetyAndNoise: {
							noiseLevel: 3,
							nighttimeSafety: 3,
						},
						environmentalFactors: {
							cleanliness: 3,
							greenSpaces: 3,
							pollutionLevels: 3,
						},
					}}
					validationSchema={AreaFeedbackSchema}
					onSubmit={handleSubmit}
				>
					{({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
						<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
							<HeaderText paddingBottom={30} size={30}>About your Area..</HeaderText>
							<ReviewSection
								title="Transportation"
								questions={[
									{
										prompt: 'How satisfied are you with the public transport options in your area?',
										leftText: 'Very Dissatisfied',
										rightText: 'Very Satisfied'
									},
									{
										prompt: 'How satisfied are you with the conditions for car transport in your area (e.g., road quality, traffic flow)?',
										leftText: 'Very Dissatisfied',
										rightText: 'Very Satisfied'
									},
									{
										prompt: 'How often do you experience severe traffic congestion in your area?',
										leftText: 'Very Often',
										rightText: 'Never'
									},
								]}
								multiOptionQuestions={[
									{
										prompt: 'What is your primary mode of transportation in the area?',
										options: [
											{ label: 'Metro', value: 'metro'},
											{ label: 'Bus', value: 'bus' },
											{ label: 'Tram', value: 'tram' },
											{ label: 'Car', value: 'car' },
											{ label: 'Bike', value: 'bike'},
											{ label: 'Walking', value: 'walking' }
										]
									},
								]}
							/>
							<ReviewSection
								title="Demographics"
								multiOptionQuestions={[
									{
										prompt: 'What is the predominant demographic in your area?', options: [
											{ label: 'Can\'t tell', value: 'all' },
											{ label: 'Students', value: 'students'},
											{ label: 'Young Adults', value: 'young'},
											{ label: 'Families', value: 'families' },
											{ label: 'Retirees', value: 'retirees'},
										]
									},
								]}
							/>
							<ReviewSection
								title="Safety and Noise"
								questions={[
									{
										prompt: 'How would you rate the noise level in your area?',
										leftText: 'Very Noisy',
										rightText: 'Very Quiet'
									},
									{
										prompt: 'Do you feel safe walking around your area at night?',
										leftText: 'Very Unsafe',
										rightText: 'Very Safe'
									},
								]}
							/>
							<ReviewSection
								isLast={true}
								title="Environmental Factors"
								questions={[
									{
										prompt: 'How would you rate the cleanliness of your area (e.g., streets, public spaces)?',
										leftText: 'Very Bad',
										rightText: 'Very Good'
									},
									{
										prompt: 'How satisfied are you with the amount and quality of green spaces (e.g., parks, gardens) in your area?',
										leftText: 'Very Dissatisfied',
										rightText: 'Very Satisfied'
									},
									{
										prompt: 'How would you rate the pollution levels (e.g., air quality, noise pollution) in your area?',
										leftText: 'Very Bad',
										rightText: 'Very Good'
									},
								]}
							/>
							<Button mode="contained" onPress={handleSubmit}>Submit Review</Button>
							<Button style={{ marginTop: 0 }} mode="contained" onPress={() => handleDiscard()}>Discard Review</Button>
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
