import React from "react";
import {Button, Card, Text} from "react-native-paper";
import {Image, StyleSheet, View} from "react-native";
import {theme} from "../theme";

const  PropertyDetails: React.FC<any> = ({listing}) => {
    return (
        <View style={styles.detailsContainer}>
            <View style={styles.row}>
                <View style={[styles.cell, styles.borderBottom]}>
                    <Text style={styles.label}>City:</Text>
                    <Text style={styles.value}>{listing.address.city}</Text>
                </View>
                <View style={[styles.cell, styles.borderBottom]}>
                    <Text style={styles.label}>Rooms:</Text>
                    <Text style={styles.value}>{listing.numberOfRooms}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={[styles.cell, styles.borderBottom]}>
                    <Text style={styles.label}>Bathrooms:</Text>
                    <Text style={styles.value}>{listing.numberOfBathrooms}</Text>
                </View>
                <View style={[styles.cell, styles.borderBottom]}>
                    <Text style={styles.label}>Size:</Text>
                    <Text style={styles.value}>{listing.size} m2</Text>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1,
        paddingVertical: 10,
        maxHeight: 100, //TODO: fix hardcoding
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cell: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        width: '48%',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
    },
    borderRight: {
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
});

export default PropertyDetails;
