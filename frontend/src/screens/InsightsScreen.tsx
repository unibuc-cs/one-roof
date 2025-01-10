import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { HeaderText } from '../components';
import { useUserDetails } from '../contexts/UserDetailsContext';
import { useUser } from '@clerk/clerk-expo';
import { EditableField } from '../components/EditableField';
import userService from '../services/internal/userService';
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { listingService, viewingService } from '../services';
import format from '@testing-library/react-native/build/helpers/format';
import { parseISO } from "date-fns";

//two buttons
export const InsightsScreen: React.FC = () => {
    const { userId } = useUserDetails();

    const aggregateByDay = (data) => {
        return data.reduce((acc, curr) => {
          const day = format(parseISO(curr.date), "yyyy-MM-dd"); 
          if (!acc[day]) {
            acc[day] = 0;
          }
          acc[day] += curr.value; // Sum the items for the day
          return acc;
        }, {});
      };

      const aggregateByHour = (data) => {
        return data.reduce((acc, curr) => {
          const hour = format(parseISO(curr.date), "yyyy-MM-dd HH:00"); 
          if (!acc[hour]) {
            acc[hour] = 0;
          }
          acc[hour] += 1; // Sum the items for the hour
          return acc;
        }, {});
      };
      

    const fetchViews = async() => {
        // retrieve data for views
        const allListings = await listingService.getAllListings()
        const landlordsListings = allListings.filter(listing => listing.landlordId ===  userId);

        let viewsDates : Date[] = [];
        for (const listing of landlordsListings) {
            viewsDates.push(...listing.views);
        }

        return viewsDates
    }

    const fetchViewings = async() => {
        const landlordViewings = await viewingService.getLandlordViewings(userId);

        let viewingsDates : Date[] = [];
        for (const viewing of landlordViewings) {
            viewingsDates.push(viewing.viewingDate);
        }

        return viewingsDates;
    }

    const viewsDates = fetchViews();
    const viewingsDates = fetchViewings();

    //button
    const handleData = (what: string ='views', time_unit:string = 'hour') => {
        let data;
        if (what === 'views') {
            data = viewsDates;
        } else { data = viewingsDates; }

        let acc;
        if (time_unit === 'hour') {
            acc = aggregateByHour(data);
        } else { acc = aggregateByDay(data); }

    }

    const 
    return ();
}