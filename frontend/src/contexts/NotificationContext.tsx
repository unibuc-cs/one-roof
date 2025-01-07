import * as Notifications from "expo-notifications";
import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {UserRoleEnum} from "../enums";
import * as Device from "expo-device";
import Constants from "expo-constants";
import {Platform} from "react-native";
import {useUserDetails} from "./UserDetailsContext";
import {useUser} from "@clerk/clerk-expo";
import userService from "../services/internal/userService";

interface NotificationData {
    notification: Notifications.Notification | null | undefined;
    token: Notifications.ExpoPushToken | undefined;
}

const defaultNotificationContext: NotificationData = {
    notification: undefined,
    token: undefined,
}

const NotificationContext = createContext<NotificationData>(defaultNotificationContext);

interface NotificationContextProviderProps {
    children: React.ReactNode;
}

export interface PushNotificationState {
    expoPushToken?: Notifications.ExpoPushToken;
    notification?: Notifications.Notification;
}

const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
        const {status: existingStatus} =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification");
            return;
        }

        token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig?.extra?.eas.projectId,
        });
    } else {
        alert("Must be using a physical device for Push notifications");
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    return token;
}


export const NotificationDataProvider: React.FC<NotificationContextProviderProps> = ({children}) => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldShowAlert: true,
            shouldSetBadge: false,
        }),
    });

    const [expoPushToken, setExpoPushToken] = useState<
        Notifications.ExpoPushToken | undefined
    >();

    const [notification, setNotification] = useState<
        Notifications.Notification | undefined
    >();

    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();
    const {isLoaded, user: clerkUser} = useUser();
    const {pushTokens: currPushTokens, setPushTokens} = useUserDetails();

    useEffect(() => {
        registerForPushNotificationsAsync().then(async (token : Notifications.ExpoPushToken) => {
            setExpoPushToken(token);
            if(!isLoaded){
                return;
            }
            const clerkId = clerkUser!.id; // TODO: Check for null

            if (!currPushTokens.includes(token.data)) {
                const newPushTokens = [...currPushTokens, token.data];
                await userService.updateUser(clerkId, {pushTokens: newPushTokens});
                setPushTokens(newPushTokens);
            }
        });

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
                console.log(response);
            });

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current!
            );

            Notifications.removeNotificationSubscription(responseListener.current!);
        };
    }, [isLoaded, currPushTokens]);

    return (
        <NotificationContext.Provider value={{
            token: expoPushToken,
            notification,
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);