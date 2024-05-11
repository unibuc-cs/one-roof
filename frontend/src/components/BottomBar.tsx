import React, { useCallback, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { ItemList } from './ItemList';

export const BottomBar = () => {
	const bottomSheetRef = useRef<BottomSheet>(null);

	return (
		<BottomSheet
			index={0}
			ref={bottomSheetRef}
			snapPoints={[75, '100%']}
		>
			<BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{
						fontWeight: 'bold',
						fontSize: 18,
					}}> 5 results </Text>
					<View style={ { height: 25 }} ></View>
				</View>
				<ItemList/>
			</BottomSheetScrollView>
		</BottomSheet>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {}
});

