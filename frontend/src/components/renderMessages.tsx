import React, {useEffect, useState} from 'react';
import {ScrollView, Text, Pressable, View, StyleSheet} from 'react-native';
import {theme} from "../theme";
import { Ionicons } from '@expo/vector-icons';
import {listingService, messageService} from "../services";
import {IListing} from "../models";

const RenderMessages = ({ initialMessages, userId}) => {
    const [messages, setMessages] = useState(initialMessages);

    useEffect(() => {
        // Function to mark received messages as read
        const markMessagesAsRead = () => {
            const updatedMessages = initialMessages.map(msg => {
                if (msg.senderId !== userId && !msg.isRead) {
                    messageService.updateMessage(msg._id, {isRead: true});
                    return { ...msg, isRead: true };
                }
                return msg;
            });
            setMessages(updatedMessages);

            // Optionally, make an API call to update the messages in the backend
            // updateMessagesInBackend(updatedMessages);
        };

        markMessagesAsRead();
    }, [initialMessages, userId]);

    const formatTime = (time) => {
        const options = { hour: "numeric", minute: "numeric" };
        return new Date(time).toLocaleString("en-US", options);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toDateString();
    };

    const renderMessages = () => {
        let lastDate = null;

        return messages.map((msg, index) => {
            const messageDate = new Date(msg.createdAt).toDateString();
            const showDate = messageDate !== lastDate;
            const showListing = msg.referenceId != null;
            const [listing, setListing] = useState<IListing>();
            lastDate = messageDate;

            if (showListing) {
                const {listing} = listingService.getListing()
                setListing()

            }

            return (
                <React.Fragment key={index}>
                    {showDate && (
                        <View style={styles.dateLabelContainer}>
                            <Text style={styles.dateLabel}>{formatDate(msg.createdAt)}</Text>
                        </View>
                    )}
                    {showListing && (
                        //here
                        <Text> {msg.referenceId} </Text>
                    )}
                    <Pressable
                        style={[
                            styles.message,
                            msg.senderId === userId ? styles.senderMsgBubble : styles.receiverMsgBubble
                        ]}
                    >
                        <Text style={msg.senderId === userId ? styles.senderMsg : styles.receiverMsg}>
                            {msg.content}
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 5, display: 'flex'  }}>
                            <Text style={msg.senderId === userId ? styles.senderMsg : styles.receiverMsg}>
                                {formatTime(msg.createdAt)}
                            </Text>
                            {msg.senderId === userId && (
                                <Ionicons
                                    name="checkmark-outline"
                                    size={15}
                                    color={msg.isRead ? '#70e000' : 'white'}
                                />
                            )}
                        </View>
                    </Pressable>
                </React.Fragment>
            );
        });
    };

    return <ScrollView>{renderMessages()}</ScrollView>;
};

export default RenderMessages;


const styles = StyleSheet.create({
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
    senderMsgBubble: {
        alignItems: "center",
        alignSelf:"flex-end",
        backgroundColor: theme.colors.primary,
    },
    senderMsg:{
        color: 'white',
        alignSelf: 'flex-start',
    },
    receiverMsgBubble: {
        backgroundColor: theme.colors.background,
        alignItems: "center",
        alignSelf: "flex-start",
        color: 'black',
    },
    receiverMsg:{
        color: 'black',
        alignSelf: 'flex-end',
    },
    dateLabelContainer: {
        padding: 10,
        alignItems: 'center',
    },
    dateLabel: {
        fontSize: 12,
        color: 'gray',
    },
});
