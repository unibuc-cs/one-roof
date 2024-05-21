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

const BuildingFeedbackSchema = Yup.object().shape({
	pestIssues: Yup.object().shape({
		rodents: Yup.number().required(),
		bugs: Yup.number().required(),
		mosquitoes: Yup.number().required(),
		additionalComments: Yup.string().nullable(),
	}),
	utilityAvailability: Yup.object().shape({
		frequency: Yup.number().required(),
		centralHeating: Yup.boolean().required(),
		additionalComments: Yup.string().nullable(),
	}),
	moldIssues: Yup.object().shape({
		severity: Yup.number().required(),
		additionalComments: Yup.string().nullable(),
	}),
	noiseInsulation: Yup.object().shape({
		rating: Yup.number().required(),
		additionalComments: Yup.string().nullable(),
	}),
	security: Yup.object().shape({
		rating: Yup.number().required(),
		frequency: Yup.number().required(),
		bodyguard: Yup.boolean().required(),
		additionalComments: Yup.string().nullable(),
	}),
	hvac: Yup.object().shape({
		summer: Yup.number().required(),
		winter: Yup.number().required(),
		ac: Yup.boolean().required(),
		additionalComments: Yup.string().nullable(),
	}),
	buildingFinishes: Yup.object().shape({
		quality: Yup.number().required(),
		modernity: Yup.number().required(),
		elevator: Yup.boolean().required(),
		additionalComments: Yup.string().nullable(),
	}),
});

type BuildingFeedbackScreenProps = {
	route: RouteProp<{ params: { generalDetails: any } }, 'params'>;
	navigation: any;
};

export const BuildingFeedbackScreen: React.FC<BuildingFeedbackScreenProps> = ({ route, navigation }) => {
	const { generalDetails } = route.params;

	const handleDiscard = () => {
		navigation.navigate('Home');
	}

	const handleSubmit = (values: any) => {
		console.log('General Details:', generalDetails);
		console.log('Building Feedback:', values);
		navigation.navigate('AreaFeedback', { generalDetails, buildingFeedback: values });
	};

	return (
		<Background>
			<Card style={styles.card} contentStyle={styles.container}>
				<Formik
					initialValues={{
						pestIssues: {
							rodents: 3,
							bugs: 3,
							mosquitoes: 3,
							additionalComments: '',
						},
						utilityAvailability: {
							frequency: 3,
							centralHeating: false,
							additionalComments: '',
						},
						moldIssues: {
							severity: 3,
							additionalComments: '',
						},
						noiseInsulation: {
							rating: 3,
							additionalComments: '',
						},
						security: {
							rating: 3,
							frequency: 3,
							bodyguard: false,
							additionalComments: '',
						},
						hvac: {
							summer: 3,
							winter: 3,
							ac: false,
							additionalComments: '',
						},
						buildingFinishes: {
							quality: 3,
							modernity: 3,
							elevator: false,
							additionalComments: '',
						},
					}}
					validationSchema={BuildingFeedbackSchema}
					onSubmit={handleSubmit}
				>
					{({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
						<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
							<HeaderText paddingBottom={30} size={30}>About your Building..</HeaderText>
							<ReviewSection
								title="Pest Issues"
								questions={[
									{ prompt: 'How often do you experience issues with rodents (e.g., mice, rats)?', leftText: 'Very Often', rightText: 'Never' },
									{ prompt: 'How often do you experience issues with bugs (e.g., cockroaches, ants)?', leftText: 'Very Often', rightText: 'Never' },
									{ prompt: 'How often do you experience issues with mosquitoes?', leftText: 'Very Often', rightText: 'Never' },
								]}
							/>
							<ReviewSection
								title="Utility Availability"
								questions={[
									{ prompt: 'How often do you experience issues with warm water or other utilities (e.g., electricity, gas)?', leftText: 'Very Often', rightText: 'Never' },
								]}
								binaryQuestions={[
									'Does the building have a central heating system?'
								]}
							/>
							<ReviewSection
								title="Mold Issues"
								questions={[
									{ prompt: 'Are there any mold issues in the building?', leftText: 'All the time', rightText: 'Not at all' },
								]}
							/>
							<ReviewSection
								title="Noise and Insulation"
								questions={[
									{ prompt: 'How would you rate the noise insulation of the building (e.g., thin walls, external noise)?', leftText: 'Very Bad', rightText: 'Very Good' },
								]}
							/>
							<ReviewSection
								title="Security"
								questions={[
									{ prompt: 'How would you rate the security of the building?', leftText: 'Very Bad', rightText: 'Very Good' },
								]}
								binaryQuestions={[
									'Does the building have bodyguards at the entrance?'
								]}
							/>
							<ReviewSection
								title="HVAC (Heating, Ventilation, and Air Conditioning)"
								questions={[
									{ prompt: 'Does your building maintain a comfortable temperature during the summer?', leftText: 'Very Dissatisfied', rightText: 'Very Satisfied' },
									{ prompt: 'Does your building maintain a comfortable temperature during the winter?', leftText: 'Very Often', rightText: 'Never' },
								]}
								binaryQuestions={[
									'Does the building have an AC system?'
								]}
							/>
							<ReviewSection
								isLast={true}
								title="Building Finishes and Quality"
								questions={[
									{ prompt: 'How would you rate the quality and condition of the building finishes (e.g., windows, floors, doors)?', leftText: 'Very Bad', rightText: 'Very Good' },
									{ prompt: 'How modern and well-maintained are the building finishes (e.g., paint, fixtures)?', leftText: 'Very Bad', rightText: 'Very Good' },
								]}
								binaryQuestions={[
									'Does your building have an elevator?'
								]}
							/>
							<Button mode="contained" onPress={handleSubmit}>Next</Button>
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
