import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, KeyboardAvoidingView, ScrollView, Dimensions, Pressable} from 'react-native';
import Background from "../components/Background";
import {Entypo, Feather} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {TextInput} from "react-native-paper";
import {theme} from "../theme";
import EmojiSelector from "react-native-emoji-selector"
import {useUserDetails} from "../contexts/UserDetailsContext";
import {messageService} from "../services";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../navigation/AppNavigation";
import {useUserData} from "../hooks/useUserData";
import {Image} from "expo-image";
import {useCustomFonts} from "../hooks/useCustomFonts";
import {white} from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import userService from "../services/internal/userService";

type ChatMessagesScreenRouteProps = RouteProp<RootStackParamList, 'Message'>;

export const ChatMessagesScreen: React.FC = () => {
    useCustomFonts();
    const {navigate} = useNavigation();
    const route = useRoute<ChatMessagesScreenRouteProps>();
    const {receiverId} = route.params;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const {userId, contactedUsers: currUserContactedUsers} = useUserDetails();
    const {userId: clerkUserId} = useUserDetails();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const {user: receiverUser} = useUserData(receiverId);

    const getConversationMessages = async () =>{
        const data = await messageService.getConversationMessages(userId, receiverId);
        setMessages(data);
    }
    useEffect(() => {
        getConversationMessages();
    }, []);


    const handleSend = async () =>{
        if(messages.length == 0){

            if (!receiverUser.contactedUsers.includes(userId)) {
                const newContactedUsers = [...receiverUser.contactedUsers, userId];
                // Update the user model with newContactedUsers
                await userService.updateUser(receiverUser?.clerkId, { contactedUsers: newContactedUsers });
            }
            if(currUserContactedUsers.includes(receiverId)){
                const newContactedUsers = [...currUserContactedUsers, receiverId];
                // Update the user model with newContactedUsers
                await userService.updateUser(clerkUserId, { contactedUsers: newContactedUsers });
            }
        }
        await messageService.uploadMessage(
            {senderId: userId,
                receiverId: receiverId,
                content: message,
                isRead: false,
                referenceId: '665368dd1698312a5705708c', // TODO: fix hardcode
                type: 'listing',
            },userId);
        setMessage('');
        getConversationMessages();
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <Background>
                <View style={{width: screenWidth, flex: 1, height: screenHeight,}}>
                    <View style={styles.topBar}>
                        {receiverUser && (
                            <>
                                <View style={styles.nameWrapper}>
                                    <Text style={styles.receiverName}>{receiverUser.firstName} {receiverUser.lastName}</Text>
                                </View>
                                <Image style={styles.receiverProfilePicture} source={receiverUser?.profilePicture}/>
                            </>
                        )}
                    </View>

                    <ScrollView>
                        {messages.map((msg, index) => (
                            <Text style={[styles.message, msg.senderId === userId ? styles.senderMsg : styles.receiverMsg]}>
                                {msg.content}
                            </Text>

                        ))}
                    </ScrollView>
                    <View style={styles.inputBarContainer}>
                        <Entypo name="camera" size={24} color="gray" />
                        <TextInput
                            style={styles.inputBar}
                            placeholder="Type your message..."
                            value={message}
                            onChangeText={(text: string) => setMessage(text)}
                        />
                        <Entypo name="mic" size={24} color="gray" />
                        <Pressable
                            onPress={() => handleSend()}>
                            <Ionicons name="send" size={24} color={theme.colors.primary} />
                        </Pressable>
                    </View>
                </View>
            </Background>
        </KeyboardAvoidingView>
    );
};

export default ChatMessagesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 60,
        backgroundColor: theme.colors.background,
        alignItems: 'center', // Keep vertical centering
        paddingHorizontal: 10,
        marginBottom: 10,
        borderBottomWidth: 2,
        borderColor: theme.colors.primary,
    },
    receiverProfilePicture: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    receiverName:{
        fontFamily: 'ProximaNova-Regular',
        fontSize: 20,
    },
    nameWrapper: {
        flex: 1, // Allow wrapper to grow and push image right
        justifyContent: 'center', // Center text horizontally within the wrapper
        alignItems: 'center',
        paddingLeft: 40,
    },
    message: {
        display: "flex",
        flexDirection: "column",
        fontFamily: 'ProximaNova-Regular',
        fontSize: 17,
        color: 'black',
        maxWidth: '70%',
        minHeight: 30,
        margin: 2.5,
        marginHorizontal: 10,
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    senderMsg: {
        alignItems: "center",
        alignSelf:"flex-end",
        backgroundColor: theme.colors.primary,
        color: 'white',
    },
    receiverMsg: {
        backgroundColor: theme.colors.background,
        alignItems: "center",
        alignSelf: "flex-start",
        color: 'black',
    },
    inputBarContainer:{
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: theme.colors.primary,
        borderTopWidth: 2,
        paddingBottom: 20,
        padding:10,
        backgroundColor: theme.colors.background,
        width: '100%',
        gap:5,
    },
    inputBar:{
        borderColor: theme.colors.primary,
        borderWidth: 1,
        height: 40,
        marginHorizontal: 5,
        flex: 1,
    }
});
