import React, { useCallback, useState } from 'react';
import { Background, HeaderText } from '../../components';
import { ActivityIndicator, Card } from 'react-native-paper';
import { ScrollView, StyleSheet } from 'react-native';
import userService from '../../services/internal/userService';
import { useUser } from '@clerk/clerk-expo';
import { IUserWithCompatibilityScore } from '../../models';
import { CompatibleRoommateCard } from '../../components/CompatibleRoommateCard';
import { useFocusEffect } from '@react-navigation/native';

export const BrowseRoommatesScreen: React.FC = () => {
	const { user } = useUser();
	const [compatibleUsers, setCompatibleUsers] = useState<IUserWithCompatibilityScore[]>([]);
	const [loading, setLoading] = useState(true);

	useFocusEffect(
		useCallback(() => {
			if (user) {
				setLoading(true);
				const userId = user.id;

				fetchCompatibleUsers(userId)
					.then((res) => console.log(res))
					.catch((err) => console.log(err))
					.finally(() => setLoading(false));
			}
		}, [user?.id])
	);

	const fetchCompatibleUsers = async (userId: string) => {
		const users = await userService.getCompatibleRoommates(userId);
		setCompatibleUsers(users);
	};

	const compatibleUsersElement = compatibleUsers.length > 0 ? (<ScrollView style={{ width: '100%', flex: 1 }}
		contentContainerStyle={{ alignItems: 'center' }}>
		{compatibleUsers.map((user) => (
			<CompatibleRoommateCard key={user.user._id} roommate={user.user}
				compatibilityScore={user.compatibilityScore}/>
		))}
	</ScrollView>) : (<HeaderText size={24}> No compatible roommates found! </HeaderText>);

	return (
		<Background>
			<Card style={styles.card} contentStyle={styles.container}>
				<HeaderText size={40} paddingBottom={30}>
                    View Your Matches!
				</HeaderText>
				{loading ? (
					<ActivityIndicator size="large"/>
				) :
					(compatibleUsersElement)
				}
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
	},
	container: {
		flex: 1,
		padding: 16,
		alignItems: 'center',
	},
});