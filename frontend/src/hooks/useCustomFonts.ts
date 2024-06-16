import * as Font from 'expo-font';

export const useCustomFonts = async () => {
	await Font.loadAsync({
		'ProximaNova-Bold': require('../../assets/fonts/Proxima-Nova/Bold.otf'),
		'Proxima-Nova/Regular': require('../../assets/fonts/Proxima-Nova/Regular.otf'),
	});
};
