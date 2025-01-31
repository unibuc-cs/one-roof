import React, {useState} from "react";
import {StyleSheet, Switch, View} from "react-native";
import {Background, HeaderText} from "../components";
import {theme} from '../theme';
import {Button, Card, Divider, Text} from "react-native-paper";
import {useUserDetails} from "../contexts/UserDetailsContext";
import userService from "../services/internal/userService";
import {NotificationTypesEnum} from "../enums";
import {useUser} from "@clerk/clerk-expo";

export const NotificationsScreen: React.FC = () => {
    const {allowedNotifications, setAllowedNotifications} = useUserDetails();
    const [messageNotification, setMessageNotification] = useState(allowedNotifications.includes(NotificationTypesEnum.Messages));
    const [friendRequestNotification, setFriendRequestNotification] = useState(allowedNotifications.includes(NotificationTypesEnum.FriendRequests));
    const [reminderNotification, setReminderNotification] = useState(allowedNotifications.includes(NotificationTypesEnum.Reminders));
    const [appointmentNotification, setAppointmentNotification] = useState(allowedNotifications.includes(NotificationTypesEnum.Appointments));
    const [newPropertyNotification, setNewPropertyNotification] = useState(allowedNotifications.includes(NotificationTypesEnum.NewProperties));
    const { user: clerkUser } = useUser();


    const toggleSwitch = (setState: React.Dispatch<React.SetStateAction<boolean>>) =>{
        setState(previousState => !previousState);
    }

    const handleSave = async () =>{
        let newAllowedNotifications =[]
        if(messageNotification)
            newAllowedNotifications.push(NotificationTypesEnum.Messages);
        if(friendRequestNotification)
            newAllowedNotifications.push(NotificationTypesEnum.FriendRequests);
        if(reminderNotification)
            newAllowedNotifications.push(NotificationTypesEnum.Reminders);
        if(appointmentNotification)
            newAllowedNotifications.push(NotificationTypesEnum.Appointments);
        if(newPropertyNotification)
            newAllowedNotifications.push(NotificationTypesEnum.NewProperties);

        console.log(newAllowedNotifications);
        setAllowedNotifications(newAllowedNotifications);
        await userService.updateUser(clerkUser!.id, {allowedNotifications: newAllowedNotifications});
    }

    return (
        <Background>
            <Card style={styles.card} contentStyle={styles.container}>
                <View style={[styles.flexItem, {alignItems: 'center'}]}>
                    <HeaderText color={theme.colors.primary} size={32}>
                        Allow Notifications
                    </HeaderText>
                </View>
                <View style={styles.flexItem}>
                    <View style={[styles.row]}>
                        <Switch
                            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            trackColor={{false: theme.colors.onDrag, true: theme.colors.secondary}}
                            thumbColor={messageNotification ? theme.colors.primary : theme.colors.offWhite}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => toggleSwitch(setMessageNotification)}
                            value={messageNotification}
                        />
                        <Text style={styles.notificationName}>Messages</Text>
                    </View>
                </View>
                <Divider/>
                <View style={styles.flexItem}>
                    <View style={styles.row}>
                        <Switch
                            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}

                            trackColor={{false: theme.colors.onDrag, true: theme.colors.secondary}}
                            thumbColor={friendRequestNotification ? theme.colors.primary : theme.colors.offWhite}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => toggleSwitch(setFriendRequestNotification)}
                            value={friendRequestNotification}
                        />
                        <Text style={styles.notificationName}>Friend requests </Text>
                    </View>
                </View>

                <Divider/>
                <View style={styles.flexItem}>
                    <View style={styles.row}>
                        <Switch
                            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}

                            trackColor={{false: theme.colors.onDrag, true: theme.colors.secondary}}
                            thumbColor={appointmentNotification ? theme.colors.primary : theme.colors.offWhite}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => toggleSwitch(setAppointmentNotification)}
                            value={appointmentNotification}
                        />
                        <Text style={styles.notificationName}>Appointments</Text>
                    </View>
                    <Text style={styles.notificationDescription}>
                        Get updates on your appointments.
                    </Text>
                </View>

                <Divider/>
                <View style={styles.flexItem}>
                    <View style={styles.row}>
                        <Switch
                            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}

                            trackColor={{false: theme.colors.onDrag, true: theme.colors.secondary}}
                            thumbColor={reminderNotification ? theme.colors.primary : theme.colors.offWhite}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => toggleSwitch(setReminderNotification)}
                            value={reminderNotification}
                        />
                        <Text style={styles.notificationName}>Reminders </Text>
                    </View>
                    <Text style={styles.notificationDescription}>
                        Get a reminder when a scheduled viewing is approaching.
                    </Text>
                </View>

                <Divider/>
                <View style={styles.flexItem}>
                    <View style={styles.row}>
                        <Switch
                            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            trackColor={{false: theme.colors.onDrag, true: theme.colors.secondary}}
                            thumbColor={newPropertyNotification ? theme.colors.primary : theme.colors.offWhite}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => toggleSwitch(setNewPropertyNotification)}
                            value={newPropertyNotification}
                        />
                        <Text style={styles.notificationName}>New properties</Text>
                    </View>
                    <Text style={styles.notificationDescription}>
                        Be notified when a property that might interest you appears.
                    </Text>
                </View>
                <View style={[styles.flexItem, {alignSelf: 'center'}]}>
                    <Button mode={'contained'} onPress={handleSave}>
                        Save
                    </Button>
                </View>
            </Card>
        </Background>
    );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
    card: {
        marginVertical: 30,
        backgroundColor: theme.colors.background,
        padding: 16,
        paddingTop: 16,
        maxHeight: '100%',
    },
    container: {
        display: 'flex',
        flexGrow: 1,
    },
    row:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        maxHeight: 'fit-content',

    },
    flexItem: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 16,
        maxHeight: 'fit-content',
    },
    notificationName: {
        fontSize: 18,
        color: theme.colors.text,
        marginHorizontal: 10,
    },
    notificationDescription: {
        color: theme.colors.onDrag,
    }

});