import { FlatList, View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import React from 'react';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

const data = [
	{ id: '1', title: 'First Item', subtitle: 'Subtitle 1', description: 'Description for first item' },
	{ id: '2', title: 'Second Item', subtitle: 'Subtitle 2', description: 'Description for second item' },
	{ id: '3', title: 'Second Item', subtitle: 'Subtitle 2', description: 'Description for second item' },
	{ id: '4', title: 'Second Item', subtitle: 'Subtitle 2', description: 'Description for second item' },
	{ id: '5', title: 'Second Item', subtitle: 'Subtitle 2', description: 'Description for second item' },
	{ id: '6', title: 'Second Item', subtitle: 'Subtitle 2', description: 'Description for second item' },
	{ id: '7', title: 'Second Item', subtitle: 'Subtitle 2', description: 'Description for second item' },
	{ id: '8', title: 'Second Item', subtitle: 'Subtitle 2', description: 'Description for second item' },
];

export const ItemList = () => {
	const renderItem = ({ item }) => (
		<Card>
			<Card.Title title={item.title} subtitle={item.subtitle} />
			<Card.Content>
				<Text>{item.description}</Text>
			</Card.Content>
		</Card>
	);
	return (
		<BottomSheetFlatList data={data} renderItem={renderItem}></BottomSheetFlatList>
	);
};