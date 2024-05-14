import React from "react";
import {Button, Card, Text} from "react-native-paper";
import {Image, StyleSheet, View} from "react-native";
import {theme} from "../theme";


const  LandlordDetails: React.FC<any> = ({listing}) => {
    return (
        <Card style={styles.container}>
            <Text>Detalii Landlord</Text>
        </Card>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        maxHeight: 100, //TODO: fix hardcoding
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },

});

export default LandlordDetails;
