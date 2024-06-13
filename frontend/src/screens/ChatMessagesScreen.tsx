import React from 'react';
import { Text, View, StyleSheet} from 'react-native';

export const ChatMessagesScreen: React.FC = ({recipientId}) => {
    console.log(recipientId);
    return (
        <View>
            <Text>Alerts Screen</Text>
        </View>
    );
};

export default ChatMessagesScreen;

const styles = StyleSheet.create({});
