import { Text } from 'react-native';
import { Card } from 'react-native-paper';
import React from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

type MockDataType = {
	id: string,
	title: string,
	subtitle: string,
	description: string,
};

const data: MockDataType[] = [
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
	const renderItem = (item: MockDataType) => (
		<Card key={item.id}>
			<Card.Title title={item.title} subtitle={item.subtitle} />
			<Card.Content>
				<Text>{item.description}</Text>
			</Card.Content>
		</Card>
	);

	return (
		<BottomSheetScrollView>
			{data.map((item: MockDataType) => renderItem(item))}
		</BottomSheetScrollView>
	);
};
