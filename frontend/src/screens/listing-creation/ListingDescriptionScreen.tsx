import React, {useEffect, useState} from "react";
import {StyleSheet, View, Image, ScrollView, KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity} from "react-native";
import { RouteProp } from "@react-navigation/native";
import * as Location from "expo-location";
import { Button, HeaderText } from "../../components";
import { TextInput, Card } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import Background from "../../components/Background";
import Carousel from "react-native-reanimated-carousel";
import { Ionicons } from '@expo/vector-icons';
import {listingService} from "../../services";
import {useUserDetails} from "../../contexts/UserDetailsContext";
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";


type ListingDescriptionScreenProps = {
    route: RouteProp<{ params: { generalDetails: any, location: any, facilities: any } }, 'params'>;
    navigation: any;
};

const descriptionSchema = Yup.object().shape({
    description: Yup.string().required("Description is required"),
    photos: Yup.array().of(Yup.string().required("Photos are required")),
})

const initialFormValues = {
    description: "",
    photos: []
}

export const ListingDescriptionScreen: React.FC<ListingDescriptionScreenProps> = ({ route, navigation }) => {
    const { generalDetails, location, facilities } = route.params;
    const [description, setDescription] = useState("");
    const [photos, setPhotos] = useState<string[]>([]);
    const {userId} = useUserDetails()
    const width = Dimensions.get('window').width;
    const  height = Dimensions.get('window').height;
    const currentDate = new Date();

    useEffect(() => {
        setPhotos([]);
    }, []);

    const handleDiscard = () => {
        setPhotos([]);
        navigation.navigate('Home');
    };

    const handleCreate = async () => {
        const listingData ={
            landlordId: userId,
            title: generalDetails.title,
            description: description,
            photos: photos,
            address: `${generalDetails.address.country} ${generalDetails.address.stateOrProvince} ${generalDetails.address.city} ${generalDetails.address.street} ${generalDetails.address.streetNumber}`,
            location: {
                type: 'Point',
                coordinates: [location.longitude, location.latitude],
            },
            type: generalDetails.type,
            price: generalDetails.price,
            numberOfRooms: facilities.numberOfRooms,
            numberOfBathrooms: facilities.numberOfBathrooms,
            size: facilities.size,
            amenities: facilities.amenities,
            external: false,
            createdAt: currentDate,
            updatedAt: currentDate,

        }
        console.log('listingData', listingData);
        listingService.createListing(listingData, listingData.landlordId)
            .then(response =>{
                console.log('Listing successfully created', response);
            })
            .catch(error => {
                console.error('Failed to create listing', error);
            });
        // navigation.navigate('Home');
        // Navigate to the next screen or save the data
    };

    const pickImage = async () => {
        let response = await ImagePicker.launchImageLibraryAsync({
                allowsMultipleSelection: true,
            }
        )
        if (response.assets) {
            const newPhotos = response.assets.map(asset => ({
                uri: asset.uri,
                fileName: asset.fileName,
            }));

            const uniquePhotos = [...photos];

            newPhotos.forEach(newPhoto => {
                if (!uniquePhotos.some(photo => photo.fileName === newPhoto.fileName)) {
                    uniquePhotos.push(newPhoto);
                }
            });
            setPhotos(uniquePhotos);
        }
    };
    const deletePhoto = (uri: string) => {
        setPhotos(photos.filter(photo => photo !== uri));
    };

    return (

        <Background>


            <Card style={styles.card}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>

                <HeaderText paddingBottom={10} textAlign={'left'} size={17}>Photos:</HeaderText>

                <Carousel
                    loop
                    width={width - 100}
                    height={width / 2}
                    autoPlay={true}
                    data= {photos}
                    autoPlayInterval={5000}
                    scrollAnimationDuration={1000}
                    style={styles.carousel}
                    renderItem={({ index }) => (
                        <View>
                            { photos[index] &&
                                ( <Image
                                    style={styles.image}
                                    source={{
                                        uri: photos[index].uri
                                    }}
                                />)}
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => deletePhoto(photos[index])}
                            >
                                <Ionicons name="trash" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}
                />

                <Button mode="contained" onPress={pickImage}>Upload Photos</Button>
                <HeaderText paddingBottom={10} textAlign={'left'} size={17}>Listing Description:</HeaderText>

                <TextInput
                    label="Description"
                    value={description}
                    onChangeText={text => setDescription(text)}
                    multiline
                    style={styles.textInput}
                />
                <View style={styles.buttonsContainer}>
                    <Button style={styles.button} mode="contained" onPress={handleDiscard}>Discard</Button>
                    <Button style={styles.button} mode="contained" onPress={handleCreate}>Create</Button>
                </View>
            </ScrollView>

            </Card>


        </Background>

    );
};

const styles = StyleSheet.create({
    card: {
        display: "flex",
        flexDirection: "column",
        width:'100%',
        flex:1,
        backgroundColor: 'white',
        padding: 16,
        marginVertical: 30,
    },
    scrollView: {
        display: "flex",
    },
    textInput: {
        borderWidth: 0,
        borderRadius: 10,
        minHeight: 100,
        padding: 10,
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
    },
    carousel:{
        justifyContent:'center',
        alignSelf:'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
        borderRadius: 50,
    },
    buttonsContainer: {
        justifySelf: 'flex-end',
        alignItems: 'flex-end',
        // width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        width: 'fit-content',
        minWidth: 100,
    },
});