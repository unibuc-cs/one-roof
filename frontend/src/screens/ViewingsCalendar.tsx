import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import { useUser } from '@clerk/clerk-expo';
import { useConfirmedViewings } from '../hooks/useConfirmedViewings';
import { AgendaItem } from '../components';
import { HeaderText } from '../components';

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
        marked[viewing.viewingDate.toString()] = { marked: true };
        agendaItems[viewing.viewingDate.toString()] = { title: viewing.viewingDate.toString(), data: [] };
        agendaItems[viewing.viewingDate.toString()]["data"] += [{ hour: viewing.viewingHour, duration: '30min' , title: viewing.listingId}];
    }

    const renderItem = useCallback(({item}: any) => {
        return <AgendaItem item={item}/>;
    }, []);

    const todayString = new Date().toISOString().split('T')[0];
    const tommorowString = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const yesterdayString = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    agendaItems = [
        {title: todayString, 
            data: [
                {hour: '18:30', duration: '30 min', title: 'Test1', address: 'Kaufland Tiglina'}, 
                {hour: '19:30', duration: '1.5h', title: 'Test2', address: 'Bodega'}]
        },
        {title: tommorowString,
            data: [{hour: '13:00', duration: '30 min', title: 'Test3', address: 'Tiglina 1'}]}
    ];

    const ITEMS: any[] = agendaItems;

    //if (isLoading) 
        //return <Text>Loading...</Text>;

    return (
        <CalendarProvider
        date = {todayString}
        showTodayButton
        >
        <HeaderText size={40}>
            Viewings
        </HeaderText>
        { weekView ? (<WeekCalendar firstDay={1} markedDates = {marked}/>) :
        (<ExpandableCalendar
            firstDay={1}
            markedDates={marked}
            leftArrowImageSource={require('../../assets/previous.png')}
            rightArrowImageSource={require('../../assets/next.png')}
        />)}
        <AgendaList
            sections = {ITEMS}
            renderItem = {renderItem}
            style = {styles.section}
        />
        </CalendarProvider>
    );
};

const styles = StyleSheet.create({
    calendar: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    header: {
      backgroundColor: 'lightgrey'
    },
    section: {
      backgroundColor: 'grey',
      color: 'grey',
      textTransform: 'capitalize'
    }
});