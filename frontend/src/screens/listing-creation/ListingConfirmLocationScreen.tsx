import { RouteProp } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Background from "../../components/Background";
import MapView, { Marker, MapPressEvent, Region } from "react-native-maps";
import { BUCHAREST_COORDINATES, DEFAULT_LATITUDE_DELTA, DEFAULT_LONGITUDE_DELTA, mapStyles } from "../../utils";
import { getCoordinatesFromAddress } from "../../services/external/googleMapsService";
import { Button, CustomMarker } from '../../components';

type ListingConfirmLocationScreenProps = {
    route: RouteProp<{ params: { generalDetails: any, id: any } }, 'params'>;
    navigation: any;
};

export const ListingConfirmLocationScreen: React.FC<ListingConfirmLocationScreenProps> = ({ route, navigation }) => {
    const { generalDetails, id } = route.params;
    const mapRef = useRef(null);
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
    const handleConfirm = () =>{
        console.log(region)
        navigation.navigate('ListingFacilities', {generalDetails: generalDetails, location: region});
    }

    const getInitialRegion = async () => {
        const address = `${generalDetails.address.country} ${generalDetails.address.stateOrProvince} ${generalDetails.address.city} ${generalDetails.address.street} ${generalDetails.address.streetNumber}`;
        return await getCoordinatesFromAddress(address);
    }

    useEffect(() => {
        (async () => {
            try {
                const address = `${generalDetails.address.country} ${generalDetails.address.stateOrProvince} ${generalDetails.address.city} ${generalDetails.address.street} ${generalDetails.address.streetNumber}`;
                const region = await getCoordinatesFromAddress(address);
                console.log(generalDetails)
                console.log('MAKING INTIIAL REQUEST');
                setRegion({
                    ...region,
                    latitudeDelta: 0.010,
                    longitudeDelta: 0.010,
                });
            } catch (error) {
                setErrorMsg("Failed to get coordinates from address");
            }
        })();
    }, [id]);


    if (errorMsg) {
        return <Text>{errorMsg}</Text>;
    }

    return (
        <Background>
                <MapView
                    ref={mapRef}
                    initialRegion={region}
                    style={styles.map}
                    region={region}
                    onMapLoaded={async () => {
                        const initialRegion = await getInitialRegion();
                        setRegion(initialRegion);
                    }}
                    onRegionChangeComplete={(newRegion) => {
                        setRegion(newRegion);
                    }}
                />
                {region && (
                    <CustomMarker
                        coordinate={{
                            latitude: region.latitude,
                            longitude: region.longitude
                        }}
                        text={`New Property Location`}
                        />
                )}

            <View style={styles.buttonsContainer}>
                <Button style={styles.button} mode={"contained"} onPress={() => handleDiscard()}>Discard</Button>
                <Button style={styles.button} mode={"contained"} onPress={() => handleConfirm()}>Confirm</Button>
            </View>

        </Background>
    );
};

const styles = StyleSheet.create({
    card: {
        marginTop:60,
        flex: 1,
        width: '100%',
    },
    map: {
        height: '100%',
        width: '100%',
    },
    buttonsContainer: {
        paddingBottom: 100,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    button:{
        width: 'auto',
    }
});
