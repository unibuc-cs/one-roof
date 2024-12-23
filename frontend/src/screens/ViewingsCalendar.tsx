import React, { useEffect, useState, useCallback } from 'react';
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
        const viewingDate = viewing.viewingDate.toISOString().split('T')[0];

        marked[viewingDate] = { marked: true };

        if (!agendaItems[viewingDate])
            agendaItems[viewingDate] = { title: viewingDate, data: [] };

        let { listing } = useListing(viewing.listingId, user?.id as string);
        agendaItems[viewing.viewingDate.toString()]["data"] += [{ hour: "12:00", title: listing?.title, address: listing?.address, listingId: viewing.listingId, status: viewing.status }];
    }

    const renderItem = useCallback(({item}: any) => {
        return <AgendaItem item={item}/>;
    }, []);

    const todayString = new Date().toISOString().split('T')[0];
    const tommorowString = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const yesterdayString = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    marked[todayString] = {marked: true};
    marked[tommorowString] = {marked: true};
    
    agendaItems = [
        {title: yesterdayString, 
            data: [
                {hour: '12:00', title: 'Test0', address: 'Tiglina 1', status: 'confirmed', listingId: '6762b575bb262e29ef055ad9'},
                {hour: '13:00', title: 'Test-1', address: 'Tiglina 2', status: 'not confirmed', listingId: '6762b575bb262e29ef055ad9'},
                {hour: '14:00', title: 'Test-2', address: 'Tiglina 3', status: 'confirmed', listingId: '6762b575bb262e29ef055ad9'},
                {hour: '15:00', title: 'Test-3', address: 'Tiglina 4', status: 'not confirmed', listingId: '6762b575bb262e29ef055ad9'}]},
        {title: todayString, 
            data: [
                {hour: '18:30', title: 'Test1', address: 'Kaufland Tiglina', status: 'confirmed', listingId: '6762b575bb262e29ef055ad9'}, 
                {hour: '19:30', title: 'Test2', address: 'Bodega', status: 'confirmed', listingId: '6762b575bb262e29ef055ad9'}]
        },
        {title: tommorowString,
            data: [{hour: '13:00', title: 'Test3', address: 'Tiglina 1', status: 'not confirmed', listingId: '6762b575bb262e29ef055ad9'}]}
    ];

    const ITEMS: any[] = agendaItems;

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