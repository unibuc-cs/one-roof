import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React from "react";
import {useUserData} from "../hooks/useUserData";
import {theme} from "../theme";
import {useNavigation} from "@react-navigation/native";



const UserChatCard: React.FC<any> = ({userId, index}) => {
    const { user, isLoading, error } = useUserData(userId);
    const {navigate} = useNavigation();

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }
    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text>{error}</Text>
            </View>
        );
    }
    if (!user) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
      <Pressable style={styles.container} onPress={() => navigate("Messages",{ receiverId: user._id})}>
          <Image style={styles.profilePicture} source={{ uri: user.profilePicture }} />
          <View style={{gap:5, flex:1}}>
              <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
              <Text style={styles.lastMessage}>Last message</Text>
          </View>
          <View>
              <Text style={styles.time}>3:00 pm</Text>
          </View>
      </Pressable>
    );
}

export default UserChatCard;

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderBottomWidth:0.75,
        borderColor: theme.colors.primary,
        padding: 10,
    },
    profilePicture: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight:5,
    },
    name:{
        fontFamily: 'ProximaNova-Bold',
        fontSize: 20,
    },
    lastMessage:{
        fontFamily: 'ProximaNova-Regular',
        color: 'gray'
    },
    time:{
        fontFamily: 'ProximaNova-Regular',
        color: 'gray'
    },
    loadingContainer: {
        padding: 10,
        alignItems: 'center',
    },
    errorContainer: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'red',
    },
})