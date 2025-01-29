import React from 'react';
import { Background } from '../../components';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Surface } from 'react-native-paper';
// import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';

export const RoommateScreen: React.FC = () => {
	const navigation = useNavigation();
	return (
		<Background>
			<Card style={styles.card} contentStyle={styles.container}>
				<Surface mode='elevated'
					style={{
						padding: 16,
						borderRadius: 16,
						marginTop: 16,
						backgroundColor: theme.colors.inverseSurface
					}}>
					<TouchableOpacity onPress={() => navigation.navigate('RoommateQuiz')} style={{
						flexWrap: 'wrap',
						alignItems: 'center',
						justifyContent: 'center',
						height: 'auto',
					}}>
						<View style={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
							<Text style={{
								fontSize: 24,
								textAlign: 'center',
								color: 'white',
								fontFamily: 'ProximaNova-Bold'
							}} numberOfLines={0}>Take the
                                Roommate
                                Quiz!</Text>
						</View>
					</TouchableOpacity>
				</Surface>
				<Surface mode='elevated'
					style={{
						padding: 16,
						borderRadius: 16,
						marginTop: 16,
						backgroundColor: theme.colors.inverseSurface
					}}>
					<TouchableOpacity onPress={() => navigation.navigate('BrowseRoommates')} style={{
						flexWrap: 'wrap',
						alignItems: 'center',
						justifyContent: 'center',
						height: 'auto',
					}}>
						<View style={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
							<Text style={{
								fontSize: 24,
								textAlign: 'center',
								color: 'white',
								fontFamily: 'ProximaNova-Bold'
							}} numberOfLines={0}>View your Roommate Matches!</Text>
						</View>
					</TouchableOpacity>
				</Surface>
			</Card>
		</Background>
	);
};

const styles = StyleSheet.create({
	card: {
		width: '100%',
		backgroundColor: 'white',
		padding: 16,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flex: 1,
		padding: 16,
		alignItems: 'center',
		justifyContent: 'center',
		width: '70%',
		gap: 20
	},
});
