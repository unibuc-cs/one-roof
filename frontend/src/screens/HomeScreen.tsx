import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../auth/useAuth';
import { Button } from 'react-native-paper';

interface HomeScreenProps {
    myData: string,
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ myData }) => {
    const { accessToken, user, signIn, signOut } = useAuth();
    return (
        <View style={styles.container}>
            {user
                ? (
                    <>
                        <Text>Welcome, {user.name} with {accessToken}!</Text>
                        <Button onPress={signOut} > Sign Out! </Button>
                    </>
                )
                : (
                    <Button onPress={signIn} > Sign In! </Button>
                )}
        </View>
    );
    // return (
    //     <View style={styles.container}>
    //         <Text>Open up App.tsx to start working on your app! { myData }</Text>
    //         <StatusBar style="auto" />
    //     </View>
    // );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
