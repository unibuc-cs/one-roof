import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useUserDetails } from '../contexts/UserDetailsContext';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { listingService, viewingService } from '../services';
import { parseISO, format, subDays, subHours, isAfter } from 'date-fns';
import { Button } from 'react-native';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native';

//two buttons
export const InsightsScreen: React.FC = () => {
	// if an attribute defined with useState changes its state, the entire functional component re-runs
	const { userId } = useUserDetails();
	const [timeUnit, setTimeUnit] = useState<'Day' | 'Hour'>('Hour');
	const [displayed, setDisplayed] = useState<'Views' | 'Viewings'>('Views');
	const [chartData, setChartData] = useState<{ labels: string[], values: number[] }> 
	({ labels: [], values: [] });

	const aggregateByDay = (data) => {
		return data.reduce((acc, curr) => {
			const day = format(parseISO(curr.date), 'yyyy-MM-dd');
			if (!acc[day]) {
				acc[day] = 0;
			}
			acc[day] += 1; // Sum the items for the day
			return acc;
		}, {});
	};

	const aggregateByHour = (data) => {
		return data.reduce((acc, curr) => {
			const hour = format(parseISO(curr.date), 'yyyy-MM-dd HH:00');
			if (!acc[hour]) {
				acc[hour] = 0;
			}
			acc[hour] += 1; // Sum the items for the hour
			return acc;
		}, {});
	};


	const fetchViews = async () => {
		const allListings = await listingService.getAllListings();
		const landlordsListings = allListings.filter(listing => listing.landlordId ===  userId);

		const viewsDates : Date[] = [];
		for (const listing of landlordsListings) {
			viewsDates.push(...listing.views); // ?
		}

		return viewsDates;
	};

	const fetchViewings = async () => {
		const landlordViewings = await viewingService.getLandlordViewings(userId);

		const viewingsDates : Date[] = [];
		for (const viewing of landlordViewings) {
			viewingsDates.push(viewing.viewingDate);
		}

		return viewingsDates;
	};

	const currDate = new Date();

	//button
	const handleData = async () => {
		let data;
		if (displayed === 'Views') {
			data = await fetchViews();
		} else {
			data = await fetchViewings();
		}

		let acc: { [key: string]: number }; //!!!
		if (timeUnit === 'Hour') { // hour shows last day, day shows last month
			data = data.filter(date => isAfter(date, subHours(currDate, 24)));
			acc = aggregateByHour(data);
		} else {
			data = data.filter(date => isAfter(date, subDays(currDate, 7)));
			acc = aggregateByDay(data);
		}

		return acc;
	};


	useEffect(() => {
		const updateChartData = async () => {
			const aggregated = await handleData();
			const agg_keys:string[] = Object.keys(aggregated);
			const agg_values:number[] = Object.values(aggregated) as number[];
			setChartData({labels: agg_keys, values: agg_values});
			//setChartData(aggregated);
			if (!chartData)
				setChartData({
					labels: ['Mock 1', 'Mock 2', 'Mock 3'],
					values: [10, 20, 30], 
				});
		};

		updateChartData();
	}, [timeUnit, displayed]);

	if (! chartData)
		setChartData({labels:[], values: []});

	//console.log("CHART DATA!!!!!!!!", chartData);


	return (
	<View style={styles.container}>
			<Text style={styles.title}> Insights </Text>

			{/* Segmented Control */}
			<View style={styles.segmentedControl}>
				<TouchableOpacity
					style={[styles.tab, timeUnit === 'Day' && styles.activeTab]}
					onPress={() => setTimeUnit('Day')}
				>
					<Text style={[styles.tabText, timeUnit === 'Day' && styles.activeTabText]}> Day </Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tab, timeUnit === 'Hour' && styles.activeTab]}
					onPress={() => setTimeUnit('Hour')}
				>
					<Text style={[styles.tabText, timeUnit === 'Hour' && styles.activeTabText]}> Hour </Text>
				</TouchableOpacity>
			</View>

			<View style={styles.segmentedControl}>
				<TouchableOpacity
					style={[styles.tab, displayed  === 'Views' && styles.activeTab]}
					onPress={() => setDisplayed('Views')}
				>
					<Text style={[styles.tabText, displayed === 'Views' && styles.activeTabText]}> Day </Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tab, displayed === 'Viewings' && styles.activeTab]}
					onPress={() => setDisplayed('Viewings')}
				>
					<Text style={[styles.tabText, displayed === 'Viewings' && styles.activeTabText]}>
						Hour
					</Text>
				</TouchableOpacity>
			</View>

			{/* Render selected tab content */}
			{/* {renderSegmentContent()} */}
			<View style={styles.chartContainer}>
				<BarChart
					data={{
						labels: chartData.labels,
						datasets: [
							{
								data: chartData.values, // Ensure numeric values
							},
						],
					}}
					width={Dimensions.get('window').width - 16} // Full width
					height={220}
					yAxisLabel=''
					yAxisSuffix=''
					chartConfig={{
						backgroundColor: '#f2f2f2',
						backgroundGradientFrom: '#fff',
						backgroundGradientTo: '#eee',
						decimalPlaces: 0,
						color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
					}}
					//style={styles.chart}
				/>
			</View>
	</View>
	);

};

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row', // Arrange buttons horizontally
		justifyContent: 'space-around', // Space between buttons
		marginBottom: 10, // Add space below the buttons
		marginTop: 50,
	},
	chartContainer: {
		marginLeft: 20,
	},
	container: {
		flex: 1,
		padding: 16,
		paddingTop: 40, // Add padding to move content down
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 16,
	},
	segmentedControl: {
		flexDirection: 'row',
		backgroundColor: '#f5f5f5',
		borderRadius: 8,
		marginBottom: 16,
	},
	tab: {
		flex: 1,
		paddingVertical: 10,
		alignItems: 'center',
		borderRadius: 8,
	},
	activeTab: {
		backgroundColor: '#e0e0e0',
	},
	tabText: {
		fontSize: 16,
		color: '#666',
	},
	activeTabText: {
		fontWeight: 'bold',
		color: '#000',
	},
});