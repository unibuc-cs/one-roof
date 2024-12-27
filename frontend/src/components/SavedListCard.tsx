import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ISavedList } from '../models'; 

type SavedListCardProps = {
  savedList: ISavedList; 
};

const SavedListCard: React.FC<SavedListCardProps> = ({ savedList }) => {
  const { navigate } = useNavigation();

  const openSavedList = () => {
    navigate('SavedListDetails', { savedList: savedList });
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
