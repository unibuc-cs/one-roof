import {jest} from '@jest/globals';

jest.mock('@react-navigation/native', () => {
    return {
      useNavigation: () => ({
        navigate: jest.fn(),
        dispatch: jest.fn(),
      }),
    //   useRoute: () => ({
    //     params: {
    //       id: '123',
    //     },
    //   }),
    };
  });

  


// jest.mock('react-native-chart-kit', () => ({
//     LineChart: 'LineChart', // Mock the chart components
//     BarChart: 'BarChart',
//   }));

// jest.mock('react-native', () => {
//     const RN = jest.requireActual('react-native');
//     return {
//       ...RN,
//       ActivityIndicator: 'ActivityIndicator',  // Mock ActivityIndicator
//       Alert: 'Alert',                          // Mock Alert
//       View: 'View',                            // Mock View
//       Text: 'Text',                            // Mock Text
//       TouchableOpacity: 'TouchableOpacity',    // Mock TouchableOpacity
//       ImageBackground: 'ImageBackground',      // Mock ImageBackground
//       KeyboardAvoidingView: 'KeyboardAvoidingView', // Mock KeyboardAvoidingView
//       Image: 'Image',                          // Mock Image
//       FlatList: 'FlatList',                    // Mock FlatList
//       ScrollView: 'ScrollView',                // Mock ScrollView
//       Modal: 'Modal',                          // Mock Modal
//       Dimensions: { get: jest.fn() },           // Mock Dimensions (you can mock specific methods if needed)
//       TextProps: 'TextProps',                  // Mock TextProps
//       ColorValue: 'ColorValue',                // Mock ColorValue
//       Pressable: 'Pressable',                  // Mock Pressable
//     };
//   });
// // SLIDER? SMILE SLIDER??

// ////////////
// jest.mock('@gorhom/bottom-sheet', () => {
//     return {
//       __esModule: true,
//       default: () => null, // Or mock the component's behavior if necessary
//     };
//   });

// jest.mock('react-native-reanimated-carousel', () => {
// return {
// 	__esModule: true,
// 	default: () => null, // Or mock the component's behavior if necessary
// };
// });

// jest.mock('react-native-reanimated', () => {
// 	return {
// 		__esModule: true,
// 		default: () => null, // Or mock the component's behavior if necessary
// 	};
// 	});

// jest.mock('react-native-keyboard-aware-scroll-view', () => {
// 	return {
// 		__esModule: true,
// 		default: () => null, // Or mock the component's behavior if necessary
// 	};
// 	});
// jest.mock('react-native-awesome-slider', () => {
// 	return {
// 		__esModule: true,
// 		default: () => null, // Or mock the component's behavior if necessary
// 	};
// 	});

// jest.mock('@react-navigation/drawer', () => {
// 	return {
// 		__esModule: true,
// 		default: () => null, // Or mock the component's behavior if necessary
// 	};
// 	});

// jest.mock('react-native-modal-datetime-picker', () => {
//     return {
//         __esModule: true,
//         default: () => null, // Or mock the component's behavior if necessary
//     };
//     });

// jest.mock('react-native-calendars', () => {
//     return {
//         __esModule: true,
//         default: () => null, // Or mock the component's behavior if necessary
//     };
//     });

// jest.mock('react-native-maps', () => ({
//     MapView: 'MapView',  // Mock the MapView component
//     Marker: 'Marker',    // Mock Marker component
//     }));

// // jest.mock('react-native-paper', () => ({
// //     Button: 'Button',       // Mock Button component
// //     TextInput: 'TextInput', // Mock TextInput component
// //     IconButton: 'IconButton',
// //     }));

// jest.mock('react-native-paper', () => {
//     return {
//       ...jest.requireActual('react-native-paper'),
//       DefaultTheme: {
//         ...jest.requireActual('react-native-paper').DefaultTheme,
//         colors: {
//           primary: '#276B73',
//           secondary: '#e2f5eb',
//           error: '#b74155',
//           surface: '#459e6c',
//           text: '#1f211f',
//           dropdown: '#34312D',
//           onDrag: '#7e7f83',
//           offWhite: '#f6f6f6',
//           inverseSurface: '#174c50',
//           inversePrimary: '#c9dcde',
//         },
//       },
//     };
//   });

// jest.mock('react-native-safe-area-context', () => ({
//     SafeAreaProvider: 'SafeAreaProvider',
//     SafeAreaView: 'SafeAreaView',
//     }));

// jest.mock('react-native-snackbar', () => ({
//     show: jest.fn(),
//     hide: jest.fn(),
//     }));

// jest.mock('react-native-toast-message', () => ({
//     show: jest.fn(),
//     hide: jest.fn(),
//     }));

// jest.mock('react-native-vector-icons', () => ({
//     Ionicons: 'Ionicons',
//     MaterialIcons: 'MaterialIcons',
//     }));

// jest.mock('react-native-date-picker', () => ({
//     DatePicker: 'DatePicker',
//     }));

//     jest.mock('react-native-gesture-handler', () => ({
//         GestureHandlerRootView: 'GestureHandlerRootView',
//       }));

//       jest.mock('react-native-get-random-values', () => ({
//         getRandomValues: jest.fn(),
//       }));

//       jest.mock('react-native-image-picker', () => ({
//         launchCamera: jest.fn(),
//         launchImageLibrary: jest.fn(),
//       }));

//       jest.mock('react-native-keyboard-aware-scroll-view', () => ({
//         KeyboardAwareScrollView: 'KeyboardAwareScrollView',
//       }));
      
//       jest.mock('react-native-loading-spinner-overlay', () => ({
//         Spinner: 'Spinner',
//       }));

//       jest.mock('react-native-map-clustering', () => ({
//         ClusteredMapView: 'ClusteredMapView',
//       }));

//       jest.mock('react-native-picker', () => ({
//         Picker: 'Picker',
//       }));

//       jest.mock('react-native-screens', () => ({
//         Screen: 'Screen',
//         ScreenContainer: 'ScreenContainer',
//       }));
      