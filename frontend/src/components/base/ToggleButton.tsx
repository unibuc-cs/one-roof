import Button, { ButtonProps } from './Button';
import React from 'react';
import { StyleSheet } from 'react-native';

type ToggleButtonProps = Omit<ButtonProps, 'onPress'> & {
    isActive: boolean,
    onToggle?: () => void,
};

export const ToggleButton: React.FC<ToggleButtonProps> = ({ isActive, style, ...props }) => {
	return (
		<Button mode="contained" width={props.width}>
			{props.children}
		</Button>
	);
};

const styles = StyleSheet.create({
	active: {
		backgroundColor: 'blue',
	},
	button: {
		backgroundColor: 'red',
	}
});