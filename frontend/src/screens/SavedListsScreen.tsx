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

export const SavedListsScreen: React.FC = () => {
	const { user } = useUser();
    const { savedLists, setSavedLists } = useUserDetails(); // a list of elements of string (not anymore of type ISavedList)
	const [lists, setLists] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

    const [newListName, setNewListName] = useState<string>('');

    if (savedLists) {
        useEffect(() => {
			const getLists = async () => {
				const fetchedLists = await Promise.all(savedLists.map(list_id => savedListService.getSavedList(list_id)));
				setSavedLists(fetchedLists);
				setLoading(false);
			}; // important to wrap it like this because we have await

			getLists();
        }, [savedLists]);
    }


	const handleAddNewList = (listName: string) => {
		if (listName.trim() !== '') {
			const newList = {  
				name: listName.trim(),
				ownerId: user?.id || '',
				sharedWith: [],
				savedListings: [],
			};

			// Update the savedLists both locally and in the context
			const updatedLists = [...lists, newList];
			setLists(updatedLists);
			setSavedLists(updatedLists); // Update the context state for the user

			console.log('list to be added', newList);

			savedListService.createSavedList(newList, user?.id)
				.then(response =>{
					console.log('List successfully created', response);
				})
				.catch(error => {
					console.error('Failed to create list', error);
				});
			//navigation.navigate('Home');

			// Clear the new list name field
			setNewListName('');
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

				{!loading && savedLists.length === 0 && (
					<HeaderText size={20}>No saved lists found!</HeaderText>
				)}
				{lists.map((savedList) => (
					<SavedListCard key={savedList.id} savedList={savedList} />
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
