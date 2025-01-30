import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import { HeaderText } from './HeaderText';
import { theme } from '../../theme';

interface PreferenceSliderProps {
    question: string,
    leftText: string,
    rightText: string,
    onValueChange?: (value: number) => void,
}

export const PreferenceSlider: React.FC<PreferenceSliderProps> = ({ question, leftText, rightText, onValueChange }) => {
	const [value, setValue] = useState(3);

	const handleValueChange = (newValue: number) => {
		setValue(newValue);
		if (onValueChange) {
			onValueChange(newValue);
		}
	};

	const min = useSharedValue(1);
	const max = useSharedValue(5);
	const progress = useSharedValue(3);

	const width = Dimensions.get('window').width;

	return (
		<View style={[styles.sliderContainer, { width: width * 0.7 }]}>
			<HeaderText size={18}>{question}</HeaderText>
			<Slider
				minimumValue={min}
				maximumValue={max}
				step={4}
				theme={{
					maximumTrackTintColor: theme.colors.secondary,
					minimumTrackTintColor: theme.colors.primary,
					bubbleBackgroundColor: theme.colors.primary,
				}}
				progress={progress}
				style={styles.slider}
				onValueChange={handleValueChange}
			/>
			<View style={styles.labels}>
				<Text style={[styles.label, styles.leftText]} numberOfLines={2}>
					{leftText}
				</Text>
				<Text style={[styles.label, styles.rightText]} numberOfLines={2}>
					{rightText}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	slider: {
		marginVertical: 15,
	},
	leftText: {
		textAlign: 'left',
		flex: 1,
		marginRight: 5,
	},
	label: {
		fontFamily: 'ProximaNova-Bold',
		color: theme.colors.tertiary,
	},
	rightText: {
		textAlign: 'right',
		flex: 1,
		marginLeft: 5,
	},
	labels: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	sliderContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignContent: 'center',
	},
});
