import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, } from '@react-navigation/drawer';
import { Caption, Drawer, Title, } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ProfilePicture } from '../components/base/ProfilePicture';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useUserDetails } from '../contexts/UserDetailsContext';
import { capitalize } from '../utils';
import Button from '../components/base/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UserRoleEnum } from '../enums';

export function DrawerContent(props: DrawerContentComponentProps) {
	const { user } = useUser();
	const { profilePictureUrl, role, resetUserDetails } = useUserDetails();
	const { signOut } = useAuth();

	if (!user || !role) {
		return null;
	}

	return (
		<DrawerContentScrollView {...props}>
			<View style={styles.drawerContent}>
				<View style={styles.userInfoSection}>
					<View style={styles.profilePictureContainer}>
						<ProfilePicture canEdit={false} source={{ uri: profilePictureUrl }}/>
					</View>
					<Caption style={styles.nickname}>@{user.username}</Caption>
					<Title style={styles.title}>{`${capitalize(user.firstName)} ${capitalize(user.lastName)}`}</Title>
				</View>
				<Drawer.Section style={styles.drawerSection}>
					<DrawerItem
						icon={({ color, size }) => (
							<MaterialCommunityIcons name="home-outline" color={color} size={size}/>
						)}
						label="Home"
						onPress={() => {
							props.navigation.navigate('Home');
						}}
					/>
					<DrawerItem
						icon={({ color, size }) => (
							<MaterialCommunityIcons name="account-outline" color={color} size={size}/>
						)}
						label="Profile"
						onPress={() => {
							props.navigation.navigate('Profile');
						}}
					/>
					<DrawerItem
						icon={({ color, size }) => (
							<Icon name="user-friends" size={18} color={color}/>
						)}
						label="Friends"
						onPress={() => {
							props.navigation.navigate('Friends');
						}}
					/>
					{role === UserRoleEnum.RegularUser && <DrawerItem
						icon={({ color, size }) => (
							<MaterialCommunityIcons name="account-group-outline" color={color} size={size}/>
						)}
						label="Roommates"
						onPress={() => {
							props.navigation.navigate('Roommates');
						}}
					/>}
					{role === UserRoleEnum.Landlord &&
                        <DrawerItem
                        	icon={({ color, size }) => (
                        		<MaterialCommunityIcons name="map-marker-outline" color={color} size={size}/>
                        	)}
                        	label="Add Property"
                        	onPress={() => {
                        		props.navigation.navigate('CreateListing');
                        	}}
                        />
					}
					{role === UserRoleEnum.RegularUser &&
                        <DrawerItem
                        	icon={({ color, size }) => (
                        		<MaterialCommunityIcons name="home-outline" color={color} size={size}/>
                        	)}
                        	label="Add Review"
                        	onPress={() => {
                        		props.navigation.navigate('CreateReview');
                        	}}
                        />
					}
					<DrawerItem
						icon={({ color, size }) => (
							<MaterialCommunityIcons name="heart-outline" color={color} size={size}/>
						)}
						label="Favorites"
						onPress={() => {
							props.navigation.navigate('Favorites');
						}}
					/>
					<DrawerItem
						icon={({ color, size }) => (
							<MaterialCommunityIcons name="message-outline" color={color} size={size}/>
						)}
						label="Chats"
						onPress={() => {
							props.navigation.navigate('Chats');
						}}
					/>
					<DrawerItem
						icon={({ color, size }) => (
							<MaterialCommunityIcons name="calendar-account-outline" color={color} size={size}/>
						)}
						label="Viewings"
						onPress={() => {
							props.navigation.navigate('Viewings');
						}}
					/>
					<Button
						mode="elevated"
						style={{
							width: '70%',
							alignSelf: 'center',
						}}
						icon="logout"
						onPress={() => {
							resetUserDetails();
							signOut();
						}}
					>
                        Log out
					</Button>
				</Drawer.Section>
			</View>
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
	},
	userInfoSection: {
		paddingLeft: 20,
	},
	nickname: {
		marginTop: 10
	},
	title: {
		marginTop: 5,
		fontWeight: 'bold',
	},
	drawerSection: {
		marginTop: 15,
	},
	profilePictureContainer: {
		marginLeft: 15
	}
});
