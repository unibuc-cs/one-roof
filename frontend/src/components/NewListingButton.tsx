import React from 'react';
import { View } from 'react-native';
import  Button from './Button';
import { useAuth } from '@clerk/clerk-expo';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {useSearchContext} from "../contexts/SearchContext";
import { DrawerContent } from '../screens';
import {CreateListingScreen} from "../screens";

export const NewListingButton = () => {
    const { isLoaded, signOut } = useAuth();
    const { state } = useSearchContext();
    const Drawer = createDrawerNavigator();

    if (!isLoaded) {
        return null;
    }
    return (
        <View>
            <Button mode="contained">+ Listing</Button>
        </View>
    );
};
