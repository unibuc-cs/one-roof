import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button, MapInput } from '../../components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Card } from 'react-native-paper';
import { BUCHAREST_COORDINATES, DEFAULT_LATITUDE_DELTA, DEFAULT_LONGITUDE_DELTA } from '../../utils';
import Background from '../../components/Background';
import { HeaderText } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputSmaller } from '../../components';

const GeneralDetailsSchema = Yup.object().shape({
	latitude: Yup.number().required('Latitude is required'),
	longitude: Yup.number().required('Longitude is required'),
	livingSituation: Yup.string().required('Living situation is required'),
	title: Yup.string().required('Title is required'),
	recommend: Yup.number().min(1).max(5).required('Recommendation is required'),
	comments: Yup.string(),
});

export const ReviewGeneralDetailsScreen = ({ navigation }) => {
	const handleDiscard = () => {
		navigation.navigate('Home');
	}
	return (
		<Background>
			<Card style={styles.card} contentStyle={styles.container}>
				<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
					<Button onPress={() => navigation.navigate('BuildingFeedback', { generalDetails: {} })}>Go</Button>
					<Formik
						initialValues={{
							latitude: BUCHAREST_COORDINATES.latitude,
							longitude: BUCHAREST_COORDINATES.longitude,
							livingSituation: '',
							title: '',
							recommend: '',
							comments: '',
						}}
						validationSchema={GeneralDetailsSchema}
						onSubmit={(values) => {
							navigation.navigate('BuildingFeedback', { generalDetails: values });
							console.log('VALUES', values);
						}}
					>
						{({ setFieldValue, handleChange, handleBlur, handleSubmit, values, errors }) => (
							<View style={styles.container}>
								<HeaderText textAlign={'left'} size={28}>General Details</HeaderText>
								<HeaderText textAlign={'left'} size={16}>Pinpoint your address:</HeaderText>
								<MapInput onLocationChange={(latitude, longitude) => {
									setFieldValue('latitude', latitude);
									setFieldValue('longitude', longitude);
								}}/>
								<HeaderText textAlign={'left'} size={15}>Short context regarding your living
									situation:</HeaderText>
								<TextInputSmaller
									marginVertical={0}
									placeholder={'E.g.: renting a studio in the 21th Residence Complex'}
									onChangeText={handleChange('livingSituation')}
									onBlur={handleBlur('livingSituation')}
									value={values.livingSituation}
								/>
								{errors.livingSituation &&
									<Text style={styles.error}>{errors.livingSituation}</Text>}
								<HeaderText textAlign={'left'} size={15}>Title of your review:</HeaderText>
								<TextInputSmaller
									marginVertical={0}
									onChangeText={handleChange('title')}
									onBlur={handleBlur('title')}
									value={values.title}
								/>
								{errors.title && <Text style={styles.error}>{errors.title}</Text>}
								<HeaderText textAlign={'left'} size={15}>On a scale from 1 to 5, would you recommend
									your living situation to a friend?</HeaderText>
								<TextInputSmaller
									marginVertical={0}
									onChangeText={handleChange('recommend')}
									onBlur={handleBlur('recommend')}
									value={values.recommend}
									keyboardType="numeric"
								/>
								{errors.recommend && <Text style={styles.error}>{errors.recommend}</Text>}
								<HeaderText textAlign={'left'} size={15}>What would you have liked to know before moving
									in here? What do you enjoy most about this place? What are the gotchas?</HeaderText>
								<TextInputSmaller
									marginVertical={0}
									numberOfLines={4}
									onChangeText={handleChange('comments')}
									onBlur={handleBlur('comments')}
									value={values.comments}
									multiline
								/>
								<Button mode="contained" onPress={() => handleSubmit()}>Next</Button>
								<Button style={{ marginTop: 0 }} mode="contained" onPress={() => handleDiscard()}>Discard Review</Button>
							</View>
						)}
					</Formik>
				</KeyboardAwareScrollView>
			</Card>
		</Background>
	);
};

const styles = StyleSheet.create({
	card: {
		width: '100%',
		backgroundColor: 'white',
		padding: 16,
		height: '100%'
	},
	container: {
		display: 'flex',
		flexGrow: 1,
	},
	flexItem: {
		flexGrow: 1,
		alignSelf: 'center',
		marginTop: 16,
	},
	message: {
		marginBottom: 16,
		fontSize: 16,
		color: 'darkslategray',
		textAlign: 'center',
	},
	callToAction: {
		marginBottom: 20,
		fontSize: 18,
		color: 'darkblue',
		textAlign: 'center',
		fontWeight: 'bold',
	},
	input: {
		marginVertical: 8,
	},
	map: {
		width: '100%',
		height: 200,
		marginVertical: 8,
	},
	error: {
		color: 'red',
		fontSize: 12,
	},
});