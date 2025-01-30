import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useSearchContext } from '../contexts/SearchContext';
import { ActivityIndicator } from 'react-native-paper';
import { ItemList } from './ItemList';

export const BottomBar = () => {
	const { state } = useSearchContext();
	const bottomSheetRef = useRef<BottomSheet>(null);

	return (
		<View style={styles.container}>
			<BottomSheet
				index={0}
				ref={bottomSheetRef}
				snapPoints={[75, '100%']}
				enableContentPanningGesture={!state.isWaitingForSearch}
			>
				{state.isWaitingForSearch ? (
					<ActivityIndicator size="small" color={'grey'}/>
				) : (
					<BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<Text style={styles.resultsText}>
								{state.searchType === 'listings' ? state.listings.length : state.reviews.length} results
							</Text>
							<View style={{ height: 50 }}></View>
						</View>
						<ItemList/>
					</BottomSheetScrollView>
				)}
			</BottomSheet>
		</View>
	);
};

const styles = StyleSheet.create({
	resultsText: {
		fontWeight: 'bold',
		fontSize: 18,
	},
	container: {
		display: 'flex',
		flex: 1,
		justifyContent: 'flex-end',
	},
	contentContainer: {},
	newListingButton: {
		marginBottom: 80,
		marginRight: 10, // TODO: Fix hardcoding?
		width: 110,
		alignSelf: 'flex-end',
	}
});

