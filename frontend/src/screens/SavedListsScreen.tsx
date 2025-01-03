import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import SavedListCard from '../components/SavedListCard'; 
import { HeaderText } from '../components';
import { useUserDetails } from '../contexts/UserDetailsContext';
import { useUser } from '@clerk/clerk-expo';
import { ISavedList } from '../models';
import { uniqueId } from 'lodash';
import { EditableField } from '../components/EditableField';
import { savedListService } from '../services/internal/savedListService';
import userService from '../services/internal/userService';
import { SavedListDetailsProvider } from '../contexts/SavedListDetailsContext';

export const SavedListsScreen: React.FC = () => {
	const { user } = useUser();
    const { savedLists, setSavedLists} = useUserDetails(); 
	const [loading, setLoading] = useState<boolean>(true);
	const [newListName, setNewListName] = useState<string>('');
	const [ lists, setLists] = useState<any[]>([]);

	console.log('Already saved lists: ' , savedLists);
    if (savedLists) {
        useEffect(() => {
			const getLists = async () => {
				const existingLists = savedLists.filter(id => id !== null && id !== undefined)
				const fetchedLists = await Promise.all(existingLists.map(list_id => savedListService.getSavedList(list_id, user?.id ?? '')));
				setLists(fetchedLists);
				setLoading(false);
			}; 

			getLists();
        }, [savedLists]);
    }


	const handleAddNewList = async (listName: string) => {
		if (listName.trim() !== '') {
			const newList = {  
				name: listName.trim(),
				ownerId: user?.id || '',
				sharedWith: [],
				savedListings: [],
			};

			let created_listing_id;
			//create list in database
			const saveToDatabase = async () => {
				try{
				const response = await savedListService.createSavedList(newList, user?.id ?? '')
				console.log('List successfully created', response);
				created_listing_id = response._id; // or _id??
				
				} catch(error) {
						console.error('Failed to create list', error);
				};
			}

			await saveToDatabase();

			console.log('After adding list ', savedLists, /*user?.savedLists*/ created_listing_id);
			const updatedLists = [...savedLists, created_listing_id]; 
			const updateUserWithList = async () => {
				await userService.updateUser(user?.id ?? '', {savedLists: updatedLists}); //update user in database
			}

			await updateUserWithList();
			
			setSavedLists(updatedLists); // update the user context

			console.log('list added', created_listing_id);
			
			setNewListName(''); // Clear the new list name field
		}
	};

	return (
		<View style={styles.wrapper}>
			<ScrollView style={styles.container}>
				<HeaderText size={40}>Your Saved Lists</HeaderText>

                <EditableField
                    label = "Create new list"
                    value={newListName}
                    onSave={handleAddNewList}
                    isEditable={true}
                />

				{!loading && lists.length === 0 && (
					<HeaderText size={20}>No saved lists found!</HeaderText>
				)}
				{lists.map((savedList) => (
					<SavedListDetailsProvider key={savedList._id} savedListId={savedList._id}>
						<SavedListCard savedList={savedList} />
					</SavedListDetailsProvider>
				))}
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
		marginTop: 50,
		width: '100%',
	},
});
