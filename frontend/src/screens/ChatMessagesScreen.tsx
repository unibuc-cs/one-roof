import React, {useState} from 'react';
import {Text, View, StyleSheet, KeyboardAvoidingView, ScrollView, Dimensions, Pressable} from 'react-native';
import Background from "../components/Background";
import {Entypo, Feather} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {TextInput} from "react-native-paper";
import {theme} from "../theme";
import EmojiSelector from "react-native-emoji-selector"

export const ChatMessagesScreen: React.FC = ({recipientId}) => {
    const screenWidth = Dimensions.get('window').width;

    const [message, setMessage] = useState('');

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Background>
                <View style={{width: screenWidth, flex: 1,}}>
                    <ScrollView>

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
                        <Pressable>
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
