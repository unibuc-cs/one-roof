import { RouteProp } from '@react-navigation/native';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import Background from "../../components/Background";
import { Card } from "react-native-paper";
import * as Location from 'expo-location';
import MapView, { Marker, MapPressEvent, Region } from "react-native-maps";
import { BUCHAREST_COORDINATES, DEFAULT_LATITUDE_DELTA, DEFAULT_LONGITUDE_DELTA, mapStyles } from "../../utils";
import { getCoordinatesFromAddress } from "../../services/external/googleMapsService";
import {Button} from "../../components";

type ListingConfirmLocationScreenProps = {
    route: RouteProp<{ params: { generalDetails: any } }, 'params'>;
    navigation: any;
};

export const ListingConfirmLocationScreen: React.FC<ListingConfirmLocationScreenProps> = ({ route, navigation }) => {
    const { generalDetails } = route.params;

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [region, setRegion] = useState<Region>({
        latitude: BUCHAREST_COORDINATES.latitude,
        longitude: BUCHAREST_COORDINATES.longitude,
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
    });

    const handleDiscard = () => {
        navigation.navigate('Home');
    }

    useEffect(() => {
        (async () => {
            try {
                const address = `${generalDetails.address.country} ${generalDetails.address.stateOrProvince} ${generalDetails.address.city} ${generalDetails.address.street} ${generalDetails.address.streetNumber}`;
                console.log(address);
                const region = await getCoordinatesFromAddress(address);
                console.log(region);
                setLocation({
                    coords:{
                        latitude: region.latitude,
                        longitude: region.longitude,
                    }
                });
                setRegion({
                    ...region,
                    latitudeDelta: 0.010,
                    longitudeDelta: 0.010,
                });
            } catch (error) {
                setErrorMsg("Failed to get coordinates from address");
            }
        })();
    }, [generalDetails.address]);

    const handleMapPress = (event: MapPressEvent) => {
        const { coordinate } = event.nativeEvent;
        setLocation({
            coords: {
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
            },
        });
        setRegion((prevRegion) => ({
            ...prevRegion,
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
        }));
    };

    if (errorMsg) {
        return <Text>{errorMsg}</Text>;
    }

    return (
        <Background>
            <Card style={styles.card}>
                <MapView
                    customMapStyle={mapStyles}
                    style={styles.map}
                    region={region}
                    onPress={handleMapPress}
                >
                    {location &&
                        (<Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                        />)}
                </MapView>
            </Card>
            <View style={styles.buttonsContainer}>
                <Button style={styles.button} mode={"contained"} onPress={() => handleDiscard()}>Discard</Button>
                <Button style={styles.button} mode={"contained"} onPress={() => handleDiscard()}>Confirm</Button>
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    card: {
        margin:20,
        marginTop:60,
        flex: 1,
        width: '100%',
    },
    map: {
        minHeight: '100%',
        minWidth: '100%',
        padding: 20,
        flex: 1,
    },
    buttonsContainer: {
        paddingBottom: 20,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    button:{
        width: 'fit-content',
    }
});
