import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ISavedList } from '../models'; 
import { savedListService } from '../services/internal/savedListService';
import { useSavedListDetails } from '../contexts/SavedListDetailsContext';
import { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation'; // Adjust the import path
import { useUserDetails } from '../contexts/UserDetailsContext';
import { useUserData } from '../hooks/useUserData';
import { useUser } from '@clerk/clerk-expo';

export type SavedListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SavedListDetails'
>;

type SavedListCardProps = {
  savedList: ISavedList; 
};

const SavedListCard: React.FC<SavedListCardProps> = ({ savedList }) => {
  const { navigate } = useNavigation<SavedListNavigationProp>();
  const { user } = useUser();

  const { setSharedWith, setSavedListings } = useSavedListDetails();

  const getContext = async () => {
  console.log('before loading context from database', savedList._id);
    const listDetails = await savedListService.getSavedList(savedList._id, user?.id ?? '');
    console.log('list details: ', listDetails);
    setSharedWith(listDetails.sharedWith);
    setSavedListings(listDetails.savedListings);
  }

  getContext();

  const { savedListId, sharedWith, savedListings} = useSavedListDetails();

  const openSavedList = () => {
    navigate('SavedListDetails', {
      savedListId: savedListId || savedList._id,
      sharedWith: sharedWith,
      savedListings: savedListings,
    });
  };

  return (
    <Card style={styles.cardContainer}>
      <Card.Content>
        <Text style={styles.listName}>{savedList.name}</Text>
        <Text style={styles.ownerId}>Owner ID: {savedList.ownerId}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={openSavedList}>
          Open
        </Button>
      </Card.Actions>
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
});

export default SavedListCard;
