import { Text } from 'react-native';
import { Card } from 'react-native-paper';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useSearchContext } from '../contexts/SearchContext';
import PropertyCard from './PropertyCard';
import { IListing } from '../models';

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
	const { state, setState } = useSearchContext();
	const renderItem = useCallback(
		(listing: IListing) => (
			<PropertyCard listing={listing} canOpen={true}/>
		), []
	);

	return state.listings.map(renderItem);
};
