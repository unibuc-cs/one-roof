import React, { useCallback, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { ItemList } from './ItemList';

export const BottomBar = () => {
	const bottomSheetRef = useRef<BottomSheet>(null);

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	return (
		<BottomSheet
			ref={bottomSheetRef}
			snapPoints={[75, '100%']}
			onChange={handleSheetChanges}
		>
			<BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
				<Text style={{
					fontWeight: 'bold',
					fontSize: 18,
				}}> 5 results </Text>
				<View style={ { height: 25 }} ></View>
				<ItemList/>
			</BottomSheetScrollView>
		</BottomSheet>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center',
		width: '100%',
	},
});

