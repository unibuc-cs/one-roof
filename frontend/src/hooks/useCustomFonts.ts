import { useFonts } from 'expo-font';

export const useCustomFonts = () => {
	const [fontsLoaded] = useFonts({
		'ProximaNova-Bold': require('../../assets/fonts/Proxima-Nova/Bold.otf'),
		'Proxima-Nova/Regular': require('../../assets/fonts/Proxima-Nova/Regular.otf'),
	});

	return fontsLoaded;
};
