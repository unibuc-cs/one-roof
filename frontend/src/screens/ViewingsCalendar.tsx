import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import {
	ExpandableCalendar,
	AgendaList,
	CalendarProvider,
	WeekCalendar,
} from 'react-native-calendars';
import { useUser } from '@clerk/clerk-expo';
import { useConfirmedViewings, useListing } from '../hooks';
import { AgendaItem } from '../components';
import { HeaderText } from '../components';
import { theme } from '../theme';
import { viewingService } from '../services';
import { useFocusEffect } from '@react-navigation/native';

interface Props {
	weekView?: boolean,
}

export const ViewingsCalendar: React.FC = (props: Props) => {
	const { weekView } = props;
	const { user } = useUser();
	const { viewings, isLoading, error, refetch } = useConfirmedViewings(
		user?.id as string,
	);

	const marked = {};
	const agendaItems = {};

	const todayString = new Date().toISOString().split('T')[0];

	const handleReject = async (viewingId) => {
		try {
			const response = await viewingService.deleteViewing(
				viewingId,
				user?.id as string,
			);
			console.log('response', response);
		} catch (error) {
			console.error('Error rejecting viewing', error);
		}
	};

	useFocusEffect(
		useCallback(() => {
			refetch?.();
		}, [refetch]),
	);

	for (const viewing of viewings) {
		const viewingDate = new Date(viewing.viewingDate)
			.toISOString()
			.split('T')[0];
		const viewingHour = new Date(viewing.viewingDate).toLocaleTimeString(
			[],
			{
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
			},
		);

		marked[viewingDate] = { marked: true };

		if (viewingDate.localeCompare(todayString) < 0) {
			handleReject(viewing._id);
		} else {
			if (!agendaItems[viewingDate])
				agendaItems[viewingDate] = { title: viewingDate, data: [] };

			const viewingData = {
				hour: viewingHour,
				title: viewing.title,
				address: viewing.address,
				listingId: viewing.listingId,
				status: viewing.status,
				viewingId: viewing._id,
			};
			agendaItems[viewingDate].data.push(viewingData);
		}
	}

	const renderItem = useCallback(({ item }: any) => {
		return <AgendaItem item={item} />;
	}, []);

	const formatAgendaItems = [];
	for (const key in agendaItems) {
		formatAgendaItems.push({
			title: agendaItems[key].title,
			data: agendaItems[key].data.sort((a: any, b: any) =>
				a.hour.localeCompare(b.hour),
			),
		});
	}

	formatAgendaItems.sort((a: any, b: any) => a.title.localeCompare(b.title));

	const ITEMS: any[] = formatAgendaItems;

	return (
		<CalendarProvider
			date={todayString}
			showTodayButton
			style={styles.wrapper}
			theme={{ todayButtonTextColor: theme.colors.primary }}
		>
			<HeaderText size={40} style={styles.header}>
				Viewings
			</HeaderText>
			{weekView ? (
				<WeekCalendar
					firstDay={1}
					markedDates={marked}
					style={styles.calendar}
				/>
			) : (
				<ExpandableCalendar
					firstDay={1}
					markedDates={marked}
					leftArrowImageSource={require('../../assets/previous.png')}
					rightArrowImageSource={require('../../assets/next.png')}
					style={styles.calendar}
					theme={calendarTheme}
				/>
			)}
			<AgendaList
				sections={ITEMS}
				renderItem={renderItem}
				style={styles.section}
			/>
		</CalendarProvider>
	);
};

const calendarTheme = {
	arrowColor: theme.colors.primary,

	expandableKnobColor: theme.colors.primary,

	textMonthFontFamily: 'ProximaNova-Bold',
	monthTextColor: theme.colors.primary,

	textDayHeaderFontFamily: 'Proxima-Nova/Regular',

	textDayFontFamily: 'Proxima-Nova/Regular',
	dayTextColor: theme.colors.text,
	todayTextColor: theme.colors.primary,

	selectedDayBackgroundColor: theme.colors.secondary,
	selectedDayTextColor: theme.colors.primary,
	dotColor: theme.colors.primary,
	selectedDotColor: theme.colors.primary,
};

const styles = StyleSheet.create({
	header: {
		fontFamily: 'ProximaNova-Bold',
	},
	section: {
		backgroundColor: 'lightgrey',
		color: 'grey',
		textTransform: 'capitalize',
	},
	container: {
		width: '100%',
	},
	wrapper: {
		marginTop: 50,
		width: '100%',
	},
	calendar: {
		marginTop: 20,
	},
});
