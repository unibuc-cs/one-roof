import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, Checkbox, TextInput } from 'react-native-paper';
import { Button, HeaderText } from '../../components';
import { NumberOfBathroomsEnum, NumberOfBedroomsEnum, PropertyTypeEnum } from '../../enums';
import { CustomSwitchSelector } from '../../components/CustomSwitchSelector';
import { useCustomFonts } from '../../hooks/useCustomFonts';
import * as Yup from 'yup';
import { Background } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const GeneralDetailsSchema = Yup.object().shape({
	title: Yup.string().required('Title is required'),
	type: Yup.mixed().oneOf(Object.values(PropertyTypeEnum)).required('Type is required'),
	address: Yup.object().shape({
		country: Yup.string().required('Country is required'),
		stateOrProvince: Yup.string().required('State/Province is required'),
		city: Yup.string().required('City is required'),
		postalCode: Yup.string(),
		street: Yup.string().required('Street is required'),
		streetNumber: Yup.number().required('Street number is required'),
	}),
	price: Yup.number().required('Price is required'),

});

const initialFormValues={
	title: '',
	type: 'studio',
	address: {
		country: '',
		stateOrProvince: '',
		city: '',
		postalCode: '',
		street: '',
		streetNumber: '',
	},
	price: '200',
};


export const CreateListingScreen: React.FC<any>= ({ navigation }) => {
	const LoadFonts = async () => { await useCustomFonts(); };
	const [formValues, setFormValues] = useState(initialFormValues);

	useEffect(() => {
		setFormValues(initialFormValues);
	}, []);
	const handleDiscard = () => {
		navigation.navigate('Home');
	};


	return (
		<Background>
			<Card style={styles.card}>
				<Formik
					initialValues={formValues}
					validationSchema={GeneralDetailsSchema}
					onSubmit={(values) => {
						navigation.navigate('ConfirmLocation', { generalDetails: values, id: uuidv4() });
					}}
				>
					{({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
						<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
							<HeaderText paddingBottom={10} textAlign={'center'} size={25}>Create a new listing</HeaderText>
							<HeaderText paddingBottom={10} textAlign={'left'} size={17}>Listing title:</HeaderText>
							<TextInput
								style={styles.textInput}
								placeholder="Title"
								onChangeText={handleChange('title')}
								onBlur={handleBlur('title')}
								value={values.title}
							/>
							{touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}

							<HeaderText paddingBottom={10} textAlign={'left'} size={17}>Property Type:</HeaderText>
							<CustomSwitchSelector
								options={[
									{ label: 'Studio', value: PropertyTypeEnum.Studio },
									{ label: 'Apartment', value: PropertyTypeEnum.Apartment },
									{ label: 'House', value: PropertyTypeEnum.House },
								]}
								initial={0}
								onPress={(value) => setFieldValue('type', value)}
								mode={'green'}
							/>
							{touched.type && errors.type && <Text style={styles.error}>{errors.type}</Text>}

							<HeaderText paddingBottom={10} textAlign={'left'} size={17}>Address:</HeaderText>
							<TextInput
								style={styles.textInput}
								placeholder="Country"
								onChangeText={handleChange('address.country')}
								onBlur={handleBlur('address.country')}
								value={values.address.country}
							/>
							{touched.address?.country && errors.address?.country && (
								<Text style={styles.error}>{errors.address.country}</Text>
							)}

							<TextInput
								style={styles.textInput}
								placeholder="State/Province"
								onChangeText={handleChange('address.stateOrProvince')}
								onBlur={handleBlur('address.stateOrProvince')}
								value={values.address.stateOrProvince}
							/>
							{touched.address?.stateOrProvince && errors.address?.stateOrProvince && (
								<Text style={styles.error}>{errors.address.stateOrProvince}</Text>
							)}

							<TextInput
								style={styles.textInput}
								placeholder="City"
								onChangeText={handleChange('address.city')}
								onBlur={handleBlur('address.city')}
								value={values.address.city}
							/>
							{touched.address?.city && errors.address?.city && (
								<Text style={styles.error}>{errors.address.city}</Text>
							)}

							<TextInput
								style={styles.textInput}
								placeholder="Postal Code"
								onChangeText={handleChange('address.postalCode')}
								onBlur={handleBlur('address.postalCode')}
								value={values.address.postalCode}
							/>
							{touched.address?.postalCode && errors.address?.postalCode && (
								<Text style={styles.error}>{errors.address.postalCode}</Text>
							)}

							<TextInput
								style={styles.textInput}
								placeholder="Street"
								onChangeText={handleChange('address.street')}
								onBlur={handleBlur('address.street')}
								value={values.address.street}
							/>
							{touched.address?.street && errors.address?.street && (
								<Text style={styles.error}>{errors.address.street}</Text>
							)}

							<TextInput
								style={styles.textInput}
								placeholder="Street Number"
								onChangeText={handleChange('address.streetNumber')}
								onBlur={handleBlur('address.streetNumber')}
								value={values.address.streetNumber}
								keyboardType="numeric"
							/>
							{touched.address?.streetNumber && errors.address?.streetNumber && (
								<Text style={styles.error}>{errors.address.streetNumber}</Text>
							)}

							<HeaderText textAlign={'left'} size={17}>Price € (monthly fee):</HeaderText>
							<TextInput
								style={styles.textInput}
								placeholder="Price €"
								onChangeText={handleChange('price')}
								onBlur={handleBlur('price')}
								value={values.price}
								keyboardType="numeric"
							/>
							{touched.price && errors.price && <Text style={styles.error}>{errors.price}</Text>}
							<View style={styles.buttonsContainer}>
								<Button style={styles.button} mode= "contained" onPress={handleDiscard}>Discard</Button>
								<Button style={styles.button} mode="contained" onPress={() => handleSubmit()}>Next</Button>
							</View>
						</KeyboardAwareScrollView>
					)}
				</Formik>
			</Card>
		</Background>
	);
};

const styles = StyleSheet.create({
	card: {
		flex:1,
		width: '100%',
		backgroundColor: 'white',
		padding: 16,
		margin: 30,
	},
	container: {
		display: 'flex',
		flexGrow: 1,
		margin: 10,
	},
	textInput:{
		borderWidth: 0,
		borderRadius: 10,
		height: 40,
		padding: -5,
		backgroundColor: '#f0f0f0',
		marginVertical: 5,
	},
	input: {
		marginVertical: 8,
	},
	error: {
		color: 'red',
		fontSize: 12,
	},
	buttonsContainer: {
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',

	},
	button:{
		width:'fit-content'
	}
});

