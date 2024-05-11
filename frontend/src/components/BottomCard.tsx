import React, { useMemo, useRef, useState } from 'react';
import { Button, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import PropertyCard from './PropertyCard'; // Assuming this is the correct import

export const BottomCard: React.FC<any> = ({ item, onClose }) => {
	const [isOpen, setIsOpen] = useState(true);
	const bottomSheetRef = useRef<BottomSheet>(null);

	const handleClosePress = () => {
		setIsOpen(false);
		if (onClose) onClose();
	};

	return (
		<BottomSheet
			ref={bottomSheetRef}
			onClose={handleClosePress}
			enablePanDownToClose={true}
			snapPoints={[350]}
			index={isOpen ? 0 : -1}
		>
			<PropertyCard listing={item} />
		</BottomSheet>
	);
};
