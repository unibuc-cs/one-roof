import React, {useContext} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useUserDetails} from "../contexts/UserDetailsContext";
import userService from "../services/internal/userService";
import {useUser} from "@clerk/clerk-expo";
import {useUserData} from "../hooks/useUserData";
import Background from "../components/Background";
import UserChatCard from "../components/UserChatCard";
import {Card} from "react-native-paper";
import {useCustomFonts} from "../hooks/useCustomFonts";
import {theme} from "../theme";

export const ChatsScreen: React.FC = () => {
	useCustomFonts();
	const navigation = useNavigation();
	const {userId} = useUserDetails();
	const {user: currentUser} = useUserData(userId)
	if(!currentUser){
		return (
			<View style={{justifyContent: 'center'}}>
				<Text>Loading..</Text>
			</View>
		);
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
			<View style={styles.title}>
				<Text style={{fontSize:25, fontFamily: 'ProximaNova-Bold',}}> Chats</Text>
			</View>
			<Pressable>
				{currentUser.contactedUsers.map((userId, index) =>(
					<UserChatCard key={index} userId={userId}/>
				))}
			</Pressable>
		</ScrollView>
	);
};


const styles = StyleSheet.create({
	title:{
		alignItems: "center",
		borderBottomWidth: 1,
		borderColor: theme.colors.primary,
		paddingVertical: 15,
		paddingTop: 45,
	},
	container: {
		backgroundColor: 'white',
		minHeight: 'fit-content',
		width: '100%',
		margin:0,
	},
});
