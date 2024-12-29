import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import { useUser } from '@clerk/clerk-expo';
import { useConfirmedViewings, useListing } from '../hooks';
import { AgendaItem } from '../components';
import { HeaderText } from '../components';
import { theme } from '../theme';

interface Props {
    weekView?: boolean;
}

export const ViewingsCalendar: React.FC = (props: Props) => {
    const { weekView } = props;
    const { user } = useUser();
    let { viewings, isLoading, error } = useConfirmedViewings(user?.id as string);

    let marked = {};
    let agendaItems = {};

    for(let viewing of viewings) {
        const viewingDate = new Date(viewing.viewingDate).toISOString().split('T')[0];
        const viewingHour = new Date(viewing.viewingDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});

        marked[viewingDate] = { marked: true };

        if (!agendaItems[viewingDate])
            agendaItems[viewingDate] = { title: viewingDate, data: [] };

        //let { listing } = useListing(viewing.listingId, user?.id as string);
        let listing = { title: 'Test', address: 'Tiglina 1' };
        const viewingData = { hour: viewingHour, title: listing?.title, address: listing?.address, listingId: viewing.listingId, status: viewing.status, viewingId: viewing._id };
        agendaItems[viewingDate].data.push(viewingData);
    }

    const renderItem = useCallback(({item}: any) => {
        return <AgendaItem item={item}/>;
    }, []);

    const todayString = new Date().toISOString().split('T')[0];

    let formatAgendaItems = [];
    for (let key in agendaItems) {
        formatAgendaItems.push({title: agendaItems[key].title, data: agendaItems[key].data});
    }

    const ITEMS: any[] = formatAgendaItems;

    //if (isLoading) 
        //return <Text>Loading...</Text>;

    return (
        <CalendarProvider
            date = {todayString}
            showTodayButton
            style = {styles.wrapper}
            theme = {{todayButtonTextColor: theme.colors.primary}}
        >
        <HeaderText size={40} style = {styles.header}>
            Viewings
        </HeaderText>
        { weekView ? 
        (<WeekCalendar 
            firstDay={1} 
            markedDates = {marked} 
            style = {styles.calendar}
        />)
        : (<ExpandableCalendar
            firstDay={1}
            markedDates={marked}
            leftArrowImageSource={require('../../assets/previous.png')}
            rightArrowImageSource={require('../../assets/next.png')}
            style = {styles.calendar}
            theme = {calendarTheme}
        />)}
        <AgendaList
            sections = {ITEMS}
            renderItem = {renderItem}
            style = {styles.section}
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
    selectedDotColor: theme.colors.primary
}

const styles = StyleSheet.create({
    header: {
      fontFamily: 'ProximaNova-Bold'
    },
    section: {
      backgroundColor: 'lightgrey',
      color: 'grey',
      textTransform: 'capitalize'
    },
    container: {
		width: '100%',
	},
	wrapper: {
		marginTop: 50,
		width: '100%'
	},
    calendar: {
        marginTop: 20,
    },
});