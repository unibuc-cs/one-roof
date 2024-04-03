import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../auth/useAuth';

interface HomeScreenProps {
    myData: string,
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ myData }) => {
    const { user, signIn, signOut } = useAuth();
    return (
        <View style={styles.container}>
            {user
                ? (
                    <>
                        <Text>Welcome, {user.name}!</Text>
                        <Button title="Sign Out" onPress={signOut} />
                    </>
                )
                : (
                    <Button title="Sign In" onPress={signIn} />
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
