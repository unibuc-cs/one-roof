import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { ItemList } from './ItemList';
import { useSearchContext } from '../contexts/SearchContext';
import { useCustomFonts } from '../hooks/useCustomFonts';
import Button from "./Button";
import {useNavigation} from "@react-navigation/native";
import {useUserDetails} from "../contexts/UserDetailsContext";
import {createDrawerNavigator} from "@react-navigation/drawer";

export const BottomBar = () => {
	const customFont = useCustomFonts();
	const { state } = useSearchContext();
	const {role, setRole} = useUserDetails();
	const { navigate} = useNavigation();
	const bottomSheetRef = useRef<BottomSheet>(null);

	const handleCreateListing = () => {
		navigate('CreateListing');
	};

	return (
		<View style={styles.container}>
			{state.searchType === 'listings' && role === 'Landlord' && (
				<Button
					style={styles.newListingButton}
					mode={"contained"}
					onPress={handleCreateListing}
				>+ Listing </Button>
			)}
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
						}}> {state.searchType === 'listings' ? state.listings.length : state.reviews.length} results </Text>
						<View style={ { height: 50 }} ></View>
					</View>
					<ItemList/>
				</BottomSheetScrollView>
			</BottomSheet>
		 </View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		justifyContent: 'flex-end',
	},
	contentContainer: {
	},
	newListingButton: {
		marginBottom: 80,
		marginRight: 10, // TODO: Fix hardcoding?
		width: 110,
		alignSelf:'flex-end',
	}
});

