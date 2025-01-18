import React, { useEffect, useState } from 'react';
import { StyleSheet} from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { IListing, ISavedList, IUser, IUserWithClerk } from '../models';
import { useSavedListDetails } from '../contexts/SavedListDetailsContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation'; // Adjust the import path
import { friendService } from '../services/internal/friendService';
import { useUser } from '@clerk/clerk-expo';
import userService from '../services/internal/userService';
import { savedListService } from '../services';
import { TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
import { View } from 'react-native';

export type SavedListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SavedListDetails'
>;

type SavedListCardProps = {
  savedList: ISavedList,
  listingToBeAdded: IListing | undefined
};

const SavedListCard: React.FC<SavedListCardProps> = ({ savedList , listingToBeAdded}) => {
	const { navigate } = useNavigation<SavedListNavigationProp>();
	const { user } = useUser();
	const [friends, setFriends] = useState<IUserWithClerk[]>([]);
	const [friendsDropdownVisible, setFriendsDropdownVisible] = useState(false);
	// make sure the context is updated everywhere necessary!!!!
	const { savedListId, sharedWith, setSharedWith, savedListings, setSavedListings } = useSavedListDetails(); 

	useEffect(() => {
		//let friendsList;
		const getFriends= async() => {
			const fetchedFriendships = await friendService.getAllFriends(user?.id ?? '');
			const friendsList = fetchedFriendships.map(friendship => friendship.firstUser === user?.id ? friendship.secondUser : friendship.firstUser)
			const fullFriendsList : IUserWithClerk[] = await Promise.all(friendsList.map(friendId => userService.getUserByClerkId(friendId)));
			setFriends(fullFriendsList);
		}
		getFriends();

		// console.log('friendsList: ', friendsList);

		// const getFullFriends = async() => {
			
		// }
		// getFullFriends();
	}, []);
	

	const toggleFriendsDropdown = () => {
		console.log('friends: ', friends);
		setFriendsDropdownVisible(!friendsDropdownVisible);
	};

	const openSavedList = () => {
		navigate('SavedListDetails', {
			savedListId: savedListId || savedList._id,
			sharedWith: sharedWith,
			savedListings: savedListings,
		});
	};

	const shareList = async (friend: IUser) => {
		if (sharedWith.includes(friend._id)) {
			Alert.alert('This list is already shared with this friend.');
			return;
		}
		else{
			let updatedSharedWith;
			if (savedList.sharedWith === null) {
				updatedSharedWith = [friend._id];
			} else {
				updatedSharedWith = [...savedList.sharedWith, friend._id];
			}
			console.log('new sharedWith: ', updatedSharedWith);
			await savedListService.updateSavedList(savedList._id, { sharedWith: updatedSharedWith }, user?.id ?? '');
			setSharedWith(updatedSharedWith);

			const friendSavedLists = friend.savedLists;
			friendSavedLists.push(savedList._id);
			await userService.updateUser(friend._id, { savedLists: friendSavedLists });
			// here context of friend can't be updated
		}
	};

	const selectList = async (list : ISavedList) => { // to see type of list
		if (listingToBeAdded){
			console.log('Inside select list ', list);


			let updatedSavedListings;
			if (list.savedListings === null)
			{
				updatedSavedListings = [listingToBeAdded._id];
			}
			else {
				if (!list.savedListings.includes(listingToBeAdded._id)) {
						console.log(`Adding to ${list.name}`);
						updatedSavedListings = [...list.savedListings, listingToBeAdded?._id];
				} else
				console.log('Already exists in list');
			}
			if (updatedSavedListings !== savedList.savedListings) {
				await savedListService.updateSavedList(list._id, { savedListings: updatedSavedListings }, user?.id ?? '');
			setSavedListings(updatedSavedListings);
			}

			listingToBeAdded = undefined; // !!! watch out here
	
		}
		

		
		};

	return (
		<Card style={styles.cardContainer}>
			<Card.Content>
				<Text style={styles.listName}>{savedList.name}</Text>
				<Text style={styles.ownerId}>Owner ID: {savedList.ownerId}</Text>
			</Card.Content>
			<Card.Actions>
				<Button mode="contained" onPress={openSavedList}> Open </Button>
				<Button mode="contained" onPress={toggleFriendsDropdown}> Share </Button>
				{(listingToBeAdded !== null && listingToBeAdded !== undefined) && (
					<Button mode="contained" onPress={() => selectList(savedList)}>Add</Button>
				)}
			</Card.Actions>

			<Modal visible={friendsDropdownVisible} transparent={true} animationType="slide" onRequestClose={toggleFriendsDropdown}>
				<View style= {styles.modalContainer}>
					<View style={styles.modalContent}>
						<FlatList data={friends} keyExtractor={(item: IUserWithClerk)=>item._id.toString()} renderItem={({ item })=>(
							<TouchableOpacity style={styles.listItem} onPress={() => shareList(item)}>
								<Text style = {styles.listItemText}> {item.firstName + ' ' + item.lastName} </Text>
							</TouchableOpacity>
						)} />
					</View>
				</View>
			</Modal>
		</Card>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		marginVertical: 10,
		marginHorizontal: 15,
		padding: 10,
		borderRadius: 10,
		backgroundColor: '#f5f5f5',
	},
	listName: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	ownerId: {
		fontSize: 14,
		color: '#666',
		marginTop: 5,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		backgroundColor: 'white',
		width: '80%',
		padding: 20,
		borderRadius: 10,
	},
	listItem: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	listItemText: {
		fontSize: 16,
	},
});

export default SavedListCard;








// const getContext = async () => {
	// 	console.log('before loading context from database', savedList._id);
	// 	const listDetails = await savedListService.getSavedList(savedList._id, user?.id ?? '');
	// 	console.log('list details: ', listDetails);
	// 	setSharedWith(listDetails.sharedWith);
	// 	setSavedListings(listDetails.savedListings);
	// };

	// await getContext();