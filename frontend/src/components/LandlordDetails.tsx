import React from "react";
import {Button, Card, Text} from "react-native-paper";
import {Image, StyleSheet, View} from "react-native";
import {theme} from "../theme";
import {useCustomFonts} from "../hooks/useCustomFonts";


const  LandlordDetails: React.FC<any> = ({landlordID}) => {
    const customFont = useCustomFonts();
    return (
        <Card style={styles.container}>
            <Text> Landlord information {landlordID}</Text>
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
        fontFamily: 'ProximaNova-Regular',
    },

});

export default LandlordDetails;
