import isEmpty from 'lodash/isEmpty';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { useUserDetails } from '../contexts/UserDetailsContext';
import { UserRoleEnum } from '../enums';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/';
import { acceptViewing, deleteViewing } from '../hooks';
import { useUser } from '@clerk/clerk-expo';

interface ItemProps {
    item: any;
}

export const AgendaItem = (props: ItemProps) => {
    const {item} = props;
    const { role } = useUserDetails();
    const { user } = useUser();
    const { navigate } = useNavigation();

    const acceptButtonPressed = useCallback(() => {
        acceptViewing(item.id, user?.id as string);
    }, []);

    const rejectButtonPressed = useCallback(() => {
        deleteViewing(item.id, user?.id as string);
    }, []);

    const itemPressed = useCallback(() => {
        navigate('Listing', { id: item.listingId });
    }, []);

    if (isEmpty(item)) {
        return (
            <View style={styles.emptyItem}>
                <Text style={styles.emptyItemText}>No Events Planned Today</Text>
            </View>
        );
    }

    const status = item.status === 'confirmed';

    const acceptable = item.status === 'not confirmed';
    //const acceptable = item.status === 'not confirmed' && role === UserRoleEnum.Landlord;

    return (
        <TouchableOpacity onPress={itemPressed} style={styles.item}>
            <View>
                <Text style={styles.itemHourText}>{item.hour}</Text>
                { status ? <Text style={styles.itemConfirmText}>Confirmed       </Text> : <Text style={styles.itemNotConfirmText}>Not Confirmed</Text> }
            </View>
            <View>
                <Text style={styles.itemTitleText}>{item.title}</Text>
                <Text style={styles.itemAddressText}>{item.address}</Text>
            </View>
            { acceptable ? 
            (<View style={styles.itemButtonContainer}>
                <Button style={styles.buttonAccept} onPress={acceptButtonPressed}>
                    <Text style={styles.buttonText}>Accept</Text>
                </Button>
                <Button style={styles.buttonReject} onPress={rejectButtonPressed}>
                    <Text style={styles.buttonText}>Reject</Text>
                </Button>
            </View>) : null }
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    item: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        flexDirection: 'row'
    },
    itemHourText: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'ProximaNova-Bold'
    },
    itemConfirmText: {
        color: theme.colors.primary,
        fontSize: 12,
        marginTop: 4,
        fontFamily: 'Proxima-Nova/Regular'
    },
    itemNotConfirmText: {
        color: theme.colors.error,
        fontSize: 12,
        marginTop: 4,
        fontFamily: 'Proxima-Nova/Regular'
    },
    itemTitleText: {
        color: 'black',
        marginLeft: 16,
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'ProximaNova-Bold'
    },
    itemAddressText: {
        color: 'grey',
        fontSize: 12,
        marginLeft: 16,
        marginTop: 4,
        fontFamily: 'Proxima-Nova/Regular'
    },
    itemButtonContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    emptyItem: {
        paddingLeft: 20,
        height: 52,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
    },
    emptyItemText: {
        color: 'lightgrey',
        fontSize: 14
    },
    buttonAccept: {
        width: 70,
        backgroundColor: theme.colors.primary,
        fontSize: 10,
        marginVertical: 5
    },
    buttonReject: {
        width: 70,
        backgroundColor: theme.colors.error,
        fontSize: 10,
        marginVertical: 5
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'ProximaNova-Bold',
        fontSize: 14
    }
});