import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import {Picker} from "@react-native-picker/picker";
import { Card, TextInput } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';

import { Button, HeaderText } from '../../components';
import {NumberOfBathroomsEnum, NumberOfBedroomsEnum, PropertyTypeEnum, TypeOfProviderEnum} from '../../enums';
import { CustomSwitchSelector } from '../../components/CustomSwitchSelector';
import { useCustomFonts } from '../../hooks/useCustomFonts';
import * as Yup from 'yup';
import Background from '../../components/Background';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {RouteProp} from "@react-navigation/native";
import * as Location from 'expo-location';
import RentalAmenitiesEnum from "../../enums/RentalAmenitiesEnum";


type ListingFacilitiesScreenPops = {
    route: RouteProp<{ params: { generalDetails: any, location: Location.LocationObject } }, 'params'>;
    navigation: any;
};

const FacilitiesSchema = Yup.object().shape({
    size: Yup.number().required("Size is required"),
    numberOfRooms: Yup.mixed().oneOf(Object.values(NumberOfBedroomsEnum)).required("Number of rooms is required"),
    numberOfBathrooms: Yup.mixed().oneOf(Object.values(NumberOfBedroomsEnum)).required("Number of bathrooms is required"),
    amenities: Yup.array().of(Yup.string().oneOf(Object.values(RentalAmenitiesEnum))),
    description: Yup.string(),


});

const initialFormValues = {
    size: '',
    numberOfRooms: '',
    numberOfBathrooms: '',
    amenities: [],
    description: '',
};

export const ListingFacilitiesScreen: React.FC<ListingFacilitiesScreenPops>= ({route,navigation}) => {
    useCustomFonts();
    const {generalDetails, location} = route.params;
    const [formValues, setFormValues] = useState(initialFormValues);

    useEffect(() => {
        setFormValues(initialFormValues);
    }, []);


    const handleDiscard = () => {
        navigation.navigate('Home');
    }

    return (
        <Background>
            <Card style={styles.card}>
                <Formik
                    initialValues={formValues}
                    validationSchema={FacilitiesSchema}
                    onSubmit={(values) => {
                        navigation.navigate("ListingDescription", {generalDetails: generalDetails, location: location, facilities: values});
                    }}
                >
                    {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, errors, touched }) => (
                        <View>
                            <HeaderText paddingBottom={10} textAlign={'left'} size={17}>Size:</HeaderText>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={handleChange('size')}
                                onBlur={handleBlur('size')}
                                value={values.size}
                                keyboardType="numeric"
                            />
                            {touched.size && errors.size && (
                                <Text style={styles.error}>{errors.size}</Text>
                            )}

                            <HeaderText paddingBottom={10} textAlign={'left'} size={17}>Number of rooms:</HeaderText>
                            <CustomSwitchSelector
                                options={[
                                    { label: '1', value: NumberOfBedroomsEnum.One },
                                    { label: '2', value: NumberOfBedroomsEnum.Two },
                                    { label: '3', value: NumberOfBedroomsEnum.Three },
                                    { label: '+4', value: NumberOfBedroomsEnum.FourOrMore },
                                ]}
                                initial={1}
                                onPress={(value) => setFieldValue('numberOfRooms', value)}
                                mode={'green'}
                            />
                            {touched.numberOfRooms && errors.numberOfRooms && (
                                <Text style={styles.error}>{errors.numberOfRooms}</Text>
                            )}

                            <HeaderText paddingBottom={10} textAlign={'left'} size={17}>Number of Bathrooms:</HeaderText>
                            <CustomSwitchSelector
                                options={[
                                    { label: '1', value: NumberOfBathroomsEnum.One },
                                    { label: '2', value: NumberOfBathroomsEnum.Two },
                                    { label: '+3', value: NumberOfBathroomsEnum.ThreeOrMore },
                                ]}
                                initial={1}
                                onPress={(value) => setFieldValue('numberOfBathrooms', value)}
                                mode={'green'}
                            />
                            {touched.numberOfBathrooms && errors.numberOfBathrooms && (
                                <Text style={styles.error}>{errors.numberOfBathrooms}</Text>
                            )}

                            <HeaderText paddingBottom={10} textAlign={'left'} size={17}>Amenities:</HeaderText>
                            <KeyboardAwareScrollView style={{height:270}}>
                                {Object.values(RentalAmenitiesEnum).map((amenity) => (
                                    <View key={amenity} style={styles.checkboxContainer}>
                                        <Checkbox.Item
                                            labelStyle={{fontFamily: 'ProximaNova-Regular'}}
                                            label={amenity.replace(/_/g, ' ')}
                                            status={values.amenities.includes(amenity) ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                if (values.amenities.includes(amenity)) {
                                                    setFieldValue('amenities', values.amenities.filter((item) => item !== amenity));
                                                } else {
                                                    setFieldValue('amenities', [...values.amenities, amenity]);
                                                }
                                            }}
                                        />
                                    </View>
                                ))}
                                {touched.amenities && errors.amenities && (
                                    <Text style={styles.error}>{errors.amenities}</Text>
                                )}
                            </KeyboardAwareScrollView>

                            <View style={styles.buttonsContainer}>
                                <Button style={styles.button} mode= "contained" onPress={handleDiscard}>Discard</Button>
                                <Button style={styles.button} mode="contained" onPress={() => handleSubmit()}>Next</Button>
                            </View>
                        </View>
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
    textInput:{
        borderWidth: 0,
        borderRadius: 10,
        height: 40,
        padding: -5,
        backgroundColor: '#f0f0f0',
        marginVertical: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        width: 'fit-content',
    }
});

