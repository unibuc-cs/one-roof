import SwitchSelector from 'react-native-switch-selector';
import { SearchTypeEnum } from '../enums';
import { theme } from '../theme';
import React from 'react';

// TODO: fix any
export const CustomSwitchSelector: React.FC<any> = ({ options, mode, value, onPress }) => {
	const buttonColor = mode === 'green' ? theme.colors.inverseSurface : theme.colors.text;
	const borderColor = mode === 'green' ? theme.colors.text : theme.colors.secondary;
	const backgroundColor = mode === 'green' ? theme.colors.inversePrimary : '';
	return (
		<SwitchSelector
			options={options}
			buttonColor={buttonColor}
			backgroundColor={backgroundColor}
			borderColor={borderColor}
			borderWidth={10}
			initial={0}
			value={options.map(entry => entry.value).indexOf(value)}
			onPress={onPress}
			bold={true}
		/>
	);
};
