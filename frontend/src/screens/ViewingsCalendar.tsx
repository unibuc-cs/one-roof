import React, { useEffect, useState, useCallback } from 'react';
import { Text, View } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider, LocaleConfig, WeekCalendar } from 'react-native-calendars';
import { useUser } from '@clerk/clerk-expo';
import { useConfirmedViewings } from '../hooks/useConfirmedViewings';
import { todayString } from 'react-native-calendars/src/expandableCalendar/commons';

interface Props {
    weekView?: boolean;
}

export const ViewingsCalendar: React.FC = (props: Props) => {
    const { weekView } = props;
    const { user } = useUser();
    const { viewings, isLoading, error } = useConfirmedViewings(user?.id as string);
    
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    let marked = {};
    let agendaItems = {};

    for(let viewing of viewings) {
        marked[viewing.viewingDate.toString()] = { marked: true };
        agendaItems[viewing.viewingDate.toString()] = { title: viewing.viewingDate.toString(), data: [] };
        agendaItems[viewing.viewingDate.toString()]["data"] += [{ hour: viewing.viewingHour, duration: '30min' , title: viewing.listingId}];
    }

    const ITEMS: any[] = agendaItems;

    const renderItem = useCallback(({item}: any) => {
        return (
            <View>
                <Text>{item.title}</Text>
                <Text>{item.hour}</Text>
            </View>
        );
    }, []);
    
    return (
        <CalendarProvider
        date = {todayString}
        showTodayButton
        >
        { weekView ? (<WeekCalendar firstDay={1} markedDates = {marked} />) :
        (<ExpandableCalendar
            firstDay={1}
            markedDates={marked}
            leftArrowImageSource={require('../assets/left-arrow.png')}
            rightArrowImageSource={require('../assets/right-arrow.png')}
        />)}
        <AgendaList
        sections = {ITEMS}
        renderItem = {renderItem}
        />
        </CalendarProvider>
    )
};