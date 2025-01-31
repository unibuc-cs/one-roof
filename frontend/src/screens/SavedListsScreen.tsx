import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import SavedListCard from '../components/SavedListCard';
import { HeaderText } from '../components';
import { useUserDetails } from '../contexts/UserDetailsContext';
import { useUser } from '@clerk/clerk-expo';
import { ISavedList } from '../models';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { EditableField } from '../components/EditableField';
import { savedListService } from '../services/internal/savedListService';
import userService from '../services/internal/userService';
import { SavedListDetailsProvider } from '../contexts/SavedListDetailsContext';
import { Text, TouchableOpacity, ActivityIndicator} from 'react-native';

type ListingToBeAddedScreenRouteProp = RouteProp<
  RootStackParamList,
  'ListingToBeAdded'
>;


export const SavedListsScreen: React.FC = () => {
	const route = useRoute<ListingToBeAddedScreenRouteProp>(); // Use RouteProp to type the route
	const listing = route.params?.listing; // Extract route params

	//console.log('listing received through params:', listing);

	const {user }= useUser(); //: clerkUser
	console.log(user?.id);
	const { savedLists, setSavedLists } = useUserDetails();
	const [loading, setLoading] = useState<boolean>(true);
	const [newListName, setNewListName] = useState<string>('');
	const [myLists, setMyLists] = useState<ISavedList[]>([]);
	const [sharedLists, setSharedLists] = useState<ISavedList[]>([]);
	const [selectedTab, setSelectedTab] = useState<'Mine' | 'Shared'>('Mine');

	useEffect(() => {
		const fetchLists = async () => {
			const existingLists = savedLists.filter(list => (list !== null && list !== undefined));
			const fetchedLists = await Promise.all(existingLists.map(id => savedListService.getSavedList(id, user?.id ?? '')));
			
			let selectedLists;
			if (selectedTab === 'Mine') {
				selectedLists = fetchedLists.filter(list => list?.ownerId === user?.id);
				setMyLists(selectedLists);
			}
			else {
				selectedLists = fetchedLists.filter(list => list?.ownerId !== user?.id);
				setSharedLists(selectedLists);
			}
			console.log('Selected Lists:', selectedLists);
			setLoading(false);
		};

		fetchLists();
	}, [savedLists, selectedTab]);

	console.log('selectedTab: ', selectedTab);


	const handleAddNewList = async (listName: string) => {
		if (listName.trim() !== '') {
			const newList = {
				name: listName.trim(),
				ownerId: user?.id ?? '',
				sharedWith: [],
				savedListings: [],
			};

			let created_list_id;
			const saveToDatabase = async () => {
				try{
					const response = await savedListService.createSavedList(newList, user?.id ?? '');
					console.log('List successfully created', response);
					created_list_id = response._id; // or _id??
				} catch(error) {
					console.error('Failed to create list', error);
				}
			};
			await saveToDatabase();

			console.log('After adding list ', savedLists, created_list_id);
			let updatedLists;
			if (savedLists === null) {
				updatedLists = [created_list_id];
			}
			else {
				updatedLists = [...savedLists, created_list_id];
			}
			
			await userService.updateUser(user?.id ?? '', { savedLists: updatedLists }); //update user in database
	
			console.log('list added', created_list_id);

			setSavedLists(updatedLists);
			//setMyLists(updatedLists); // update the user context
			setNewListName(''); // Clear the new list name field
			
		}
	};

	const renderContent = () => {
		if (loading) {
		  return <ActivityIndicator size="large" color="#0000ff" />;
		}
	  
		if (selectedTab === 'Mine') {
		  return (
			<>
			  <EditableField
				label="Create new list"
				value={newListName}
				onSave={handleAddNewList}
				isEditable={true}
			  />
	  
			  {!loading && myLists.length === 0 && (
				<HeaderText size={20}>No saved lists of yours found!</HeaderText>
			  )}
	  
			  {myLists.map((savedList) => (
				<SavedListDetailsProvider key={savedList._id} savedListId={savedList._id}>
				  <SavedListCard savedList={savedList} listingToBeAdded={listing} />
				</SavedListDetailsProvider>
			  ))}
			</>
		  );
		}
	  
		if (selectedTab === 'Shared') {
		  return (
			<>
			  {!loading && sharedLists.length === 0 && (
				<HeaderText size={20}>No saved shared lists found!</HeaderText>
			  )}
	  
			  {sharedLists.map((savedList) => (
				<SavedListDetailsProvider key={savedList._id} savedListId={savedList._id}>
				  <SavedListCard savedList={savedList} listingToBeAdded={listing} />
				</SavedListDetailsProvider>
			  ))}
			</>
		  );
		}
	  
		return null; 
	  };


	return (
		<View style={styles.wrapper}>
			<ScrollView style={styles.container}>
				<HeaderText size={40}>Your Saved Lists</HeaderText>

				<View style={styles.segmentedControl}>
					<TouchableOpacity
						style={[styles.tab, selectedTab === 'Mine' && styles.activeTab]}
						onPress={() => {console.log('Pressed Mine'); setSelectedTab('Mine')}}>
						<Text style={[styles.tabText, selectedTab === 'Mine' && styles.activeTabText]}> Mine </Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.tab, selectedTab === 'Shared' && styles.activeTab]}
						onPress={() => {console.log('Pressed Shared'); setSelectedTab('Shared')}}
					>
						<Text style={[styles.tabText, selectedTab === 'Shared' && styles.activeTabText]}> Shared </Text>
					</TouchableOpacity>
				</View>

				{renderContent()}
				
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		padding: 10,
	},
	wrapper: {
		flex: 1,
		padding: 16,
		paddingTop: 40, // Add padding to move content down
		backgroundColor: '#fff',
	},
	segmentedControl: {
		flexDirection: 'row',
		backgroundColor: '#f5f5f5',
		borderRadius: 8,
		marginBottom: 16,
	},
	tab: {
		flex: 1,
		paddingVertical: 10,
		alignItems: 'center',
		borderRadius: 8,
	},
	activeTab: {
		backgroundColor: '#e0e0e0',
	},
	tabText: {
		fontSize: 16,
		color: '#666',
	},
	activeTabText: {
		fontWeight: 'bold',
		color: '#000',
	},
});


	//const { savedLists } = useSavedLists(clerkId);
	//const savedLists = savedListService.getUserSavedLists(clerkId);

	// const getLists= async () : Promise<ISavedList[]> => {
	// 	const aux = await savedListService.getUserSavedLists(userId);
	// 	return aux;
	// };
	// const usersSavedLists = await getLists();

	// const usersSavedLists = savedLists;
	// console.log(usersSavedLists);