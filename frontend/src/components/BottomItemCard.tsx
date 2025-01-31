import React, { useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { PropertyCard } from './PropertyCard';
import { ReviewCard } from './ReviewCard';

export const BottomItemCard: React.FC<any> = ({ item, onClose, type }) => {
	const [isOpen, setIsOpen] = useState(true);
	const bottomSheetRef = useRef<BottomSheet>(null);

	const handleClosePress = () => {
		setIsOpen(false);
		if (onClose) onClose();
	};

	// snap points value needs to match bottom card container height in Map.tsx
	return (
		<BottomSheet
			ref={bottomSheetRef}
			onClose={handleClosePress}
			enablePanDownToClose={true}
			snapPoints={[400]}
			index={isOpen ? 0 : -1}
		>
			{type === 'review' ? (
				<ReviewCard review={item} />
			) : (
				<PropertyCard
					showFavorite={true}
					mode={'contained'}
					backgroundColor={'white'}
					canOpen={true}
					listing={item}
				/>
			)}
		</BottomSheet>
	);
};
