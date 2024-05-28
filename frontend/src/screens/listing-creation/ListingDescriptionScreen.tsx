import React, { useState } from "react";
import { StyleSheet, View, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { RouteProp } from "@react-navigation/native";
import * as Location from "expo-location";
import { Button, HeaderText } from "../../components";
import { TextInput, Card } from "react-native-paper";
import { launchImageLibrary } from "react-native-image-picker";
import Background from "../../components/Background";

type ListingDescriptionScreenProps = {
    route: RouteProp<{ params: { generalDetails: any, location: Location.LocationObject, facilities: any } }, 'params'>;
    navigation: any;
};

export const ListingDescriptionScreen: React.FC<ListingDescriptionScreenProps> = ({ route, navigation }) => {
    const { generalDetails, location, facilities } = route.params;
    const [description, setDescription] = useState("");
    const [photos, setPhotos] = useState<string[]>([]);

    const handleDiscard = () => {
        navigation.navigate('Home');
    };

    const handleConfirm = () => {
        console.log({
            description,
            photos,
            generalDetails,
            location,
            facilities,
        });
        // Navigate to the next screen or save the data
    };

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
            if (response.assets) {
                setPhotos([...photos, ...response.assets.map(asset => asset.uri)]);
            }
        });
    };

    return (
        <Background>
            <Card style={styles.card}>
                <HeaderText paddingBottom={10} textAlign={'left'} size={17}>Listing Description:</HeaderText>

                <TextInput
                    label="Description"
                    value={description}
                    onChangeText={text => setDescription(text)}
                    multiline
                    style={styles.textInput}
                />

                <Button mode="contained" onPress={pickImage}>Upload Photos</Button>
                <View style={styles.buttonsContainer}>
                    <Button style={styles.button} mode="contained" onPress={handleDiscard}>Discard</Button>
                    <Button style={styles.button} mode="contained" onPress={handleConfirm}>Confirm</Button>
                </View>
            </Card>
        </Background>
    );
};

const styles = StyleSheet.create({
    card: {
        width:'100%',
        flex:1,
        backgroundColor: 'white',
        padding: 16,
        marginVertical: 30,
    },
    textInput: {
        borderWidth: 0,
        borderRadius: 10,
        height: 100,
        padding: 10,
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
    },
    photoContainer: {
        marginTop: 10,
    },
    photo: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        width: 'fit-content',
        minWidth: 100,
    },
});
