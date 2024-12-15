import React, { useContext, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserDetails } from '../contexts/UserDetailsContext';
import { useUserData, useUserDataByClerkId } from '../hooks/useUserData';
import UserChatCard from '../components/UserChatCard';
import { useCustomFonts } from '../hooks/useCustomFonts';
import { theme } from '../theme';
import { useUser } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';

export const FriendsScreen: React.FC = () => {

	return 0;
};


const styles = StyleSheet.create({
	title:{
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: theme.colors.primary,
		paddingVertical: 15,
		paddingTop: 45,
	},
	container: {
		backgroundColor: 'white',
		//minHeight: 'fit-content',
		width: '100%',
		margin:0,
	},
});
