import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useUserDetails } from '../contexts/UserDetailsContext';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { listingService, viewingService } from '../services';
import { parseISO, format, subDays, subHours, isAfter } from 'date-fns';
import { Button } from 'react-native';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { HeaderText } from '../components/base/HeaderText';

//two buttons
export const InsightsScreen: React.FC = () => {
	// if an attribute defined with useState changes its state, the entire functional component re-runs
	const { userId } = useUserDetails();
	const [timeUnit, setTimeUnit] = useState<'Day' | 'Hour'>('Hour');
	const [displayed, setDisplayed] = useState<'Views' | 'Viewings'>('Views');
	const [chartData, setChartData] = useState<{ labels: string[], values: number[] }>({labels: [],values: [], });
	//const currDate = new Date();
	const currDate = "2025-01-25 10:24:17";

	useEffect(() => {
		const updateChartData = async () => {
			const aggregated = await handleData();
			const agg_keys:string[] = Object.keys(aggregated);
			const agg_values:number[] = Object.values(aggregated) as number[];
			setChartData({labels: agg_keys, values: agg_values});
			//setChartData(aggregated);
		};

		updateChartData();
	}, [timeUnit, displayed]);


	//console.log("CHART DATA!!!!!!!!", chartData);

	async function handleData () {
		let data;
		console.log('Handling data; current pressed:', displayed, timeUnit);
		if (displayed === 'Views') {
			data =  fetchViews(); //await
		} else {
			console.log('cur')
			data = fetchViewings(); //await 
		}
		console.log('Fetched data:', data);

		let acc: { [key: string]: number }; //!!!
		if (timeUnit === 'Hour') { // hour shows last day, day shows last month
			data = data.filter(date => isAfter(date, subHours(currDate, 7)));
			console.log('only last 24 hours:', data);
			acc = aggregateByHour(data);
			console.log('aggregated by hour : ', acc);
		} else {
			data = data.filter(date => isAfter(date, subDays(currDate, 7)));
			acc = aggregateByDay(data);
			console.log('aggregated by day: ', acc);
		}

		return acc;
	};

	const aggregateByDay = (data) => {
		return data.reduce((acc, curr) => {
			const day = format(parseISO(curr), 'yyyy-MM-dd');
			if (!acc[day]) {
				acc[day] = 0;
			}
			acc[day] += 1; // Sum the items for the day
			return acc;
		}, {});
	};

	const aggregateByHour = (data) => {
		return data.reduce((acc, curr) => {
			const hour = format(parseISO(curr), 'yyyy-MM-dd HH:00');
			//console.log('hour:', hour);
			if (!acc[hour]) {
				acc[hour] = 0;
			}
			acc[hour] += 1; // Sum the items for the hour
			return acc;
		}, {});
	};


	const fetchViews =  () => { // async
		// const allListings = await listingService.getAllListings();
		// const landlordsListings = allListings.filter(listing => listing.landlordId ===  userId);

		// const viewsDates : Date[] = [];
		// for (const listing of landlordsListings) {
		// 	viewsDates.push(...listing.views); // ?
		// }

		const viewsDates = [
			'2025-01-24 09:24:17',
			'2025-01-24 15:50:49',
			'2025-01-24 08:07:47',
			'2025-01-24 11:19:17',
			'2025-01-24 15:32:07',
			'2025-01-24 06:26:34',
			'2025-01-24 04:10:35',
			'2025-01-24 16:49:35',
			'2025-01-24 02:11:32',
			'2025-01-24 13:08:39'
		  ];

		return viewsDates;
	};

	const fetchViewings =  () => { // async
		// const landlordViewings = await viewingService.getLandlordViewings(userId);

		// const viewingsDates : Date[] = [];
		// for (const viewing of landlordViewings) {
		// 	viewingsDates.push(viewing.viewingDate);
		// }
		const viewingsDates = [
			"2025-01-15 11:31:42",
			"2025-01-24 03:41:41",
			"2025-01-20 04:15:41",
			"2025-01-17 05:54:21",
			"2025-01-19 18:55:29",
			"2025-01-24 00:08:27",
			"2025-01-14 03:18:03",
			"2025-01-17 02:41:02",
			"2025-01-21 01:30:33",
			"2025-01-17 08:54:11"
		  ];

		return viewingsDates;
	};

	// const splitChartDataIntoRows = (data, rowSize) => {
	// 	const rows : { labels: string[], values: number[] }[] = [];
	// 	const noLabels = data.labels.length;
	// 	const noRows = Math.floor(noLabels / rowSize) + (noLabels % rowSize ? 1 : 0);
	// 	for (let i = 0; i < noRows; i++) {
	// 		const row = {
	// 			labels: data.labels.slice(i * rowSize, (i + 1) * rowSize),
	// 			values: data.values.slice(i * rowSize, (i + 1) * rowSize),
	// 		}; 
	// 		rows.push(row);
	// 	}
	// 	console.log('rows:', rows);
	// 	return rows;
	// };


	return (
		<View style={styles.wrapper}>
			<ScrollView style={styles.container}>
				<HeaderText size={40}>Your Insights</HeaderText>

				<View style={styles.segmentedControl}>
                    <TouchableOpacity testID='views_button'
                        style={[styles.tab, displayed  === 'Views' && styles.activeTab]}
                        onPress={() => setDisplayed('Views')}
                    >
                        <Text style={[styles.tabText, displayed === 'Views' && styles.activeTabText]}> Views </Text>
                    </TouchableOpacity>
                    <TouchableOpacity testID = 'viewings_button'
                        style={[styles.tab, displayed === 'Viewings' && styles.activeTab]}
                        onPress={() => setDisplayed('Viewings')}
                    >
                        <Text style={[styles.tabText, displayed === 'Viewings' && styles.activeTabText]}> Viewings </Text>
                    </TouchableOpacity>
                </View>
				<View style={styles.segmentedControl}>
                    <TouchableOpacity testID='hour_button'
                        style={[styles.tab, timeUnit  === 'Hour' && styles.activeTab]}
                        onPress={() => setTimeUnit('Hour')}
                    >
                        <Text style={[styles.tabText, timeUnit  === 'Hour' && styles.activeTabText]}> Hour </Text>
                    </TouchableOpacity>
                    <TouchableOpacity testID='day_button'
                        style={[styles.tab, timeUnit  === 'Day' && styles.activeTab]}
                        onPress={() => setTimeUnit('Day')}
                    >
                        <Text style={[styles.tabText, timeUnit  === 'Day' && styles.activeTabText]}> Day </Text>
                    </TouchableOpacity>
                </View>

				<HeaderText size={25}>Displaying data for the last 7 ${timeUnit}</HeaderText>

				<View style={styles.chartContainer} testID='chart container'>
					<ScrollView>
						<BarChart
								key={'barchart'}
								// testID=`rtow ${index}`
								data={{
									labels: chartData.labels,
									datasets: [
										{
											data: chartData.values,
										},
									],
								}}
								width={Dimensions.get('window').width - 16} // Full width
								height={220}
								yAxisLabel=""
								yAxisSuffix=""
								chartConfig={{
									backgroundColor: '#f2f2f2',
									backgroundGradientFrom: '#fff',
									backgroundGradientTo: '#eee',
									decimalPlaces: 0,
									color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
								}}
								style={{ marginBottom: 16 }}
						/>
					</ScrollView>
				</View>
				
			</ScrollView>
		</View>
	);

};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		padding: 10,
	},
	wrapper: {
		flex: 1,
		padding: 16,
		paddingTop: 40, // Add padding to move content down
		backgroundColor: '#fff',
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
	chartContainer: {
		marginLeft: 20,
		marginRight: 20,
		flexDirection: 'row'
	},
});


// const styles = StyleSheet.create({
// 	wrapper: {
// 		flex: 1,
// 		padding: 16,
// 		paddingTop: 40, // Add padding to move content down
// 		backgroundColor: '#fff',
// 	},
// 	controlSection: {
// 		flexDirection: 'column', 
// 		justifyContent: 'space-between', // Space rows evenly
// 		marginBottom: 20, 
// 	  },
// 	buttonContainer: {
// 		flexDirection: 'row', // Arrange buttons horizontally
// 		justifyContent: 'space-around', // Space between buttons
// 		marginBottom: 10, // Add space below the buttons
// 		marginTop: 50,
// 	},
// 	chartContainer: {
// 		marginLeft: 20,
// 		marginRight: 20,
// 		flexDirection: 'row'
// 	},
// 	container: {
// 		flex: 1,
// 		padding: 16,
// 		paddingTop: 40, // Add padding to move content down
// 		backgroundColor: '#fff',
// 	},
// 	title: {
// 		fontSize: 24,
// 		fontWeight: 'bold',
// 		textAlign: 'center',
// 		marginBottom: 16,
// 	},
// 	segmentedControl: {
// 		flexDirection: 'row',
// 		backgroundColor: '#f5f5f5',
// 		borderRadius: 8,
// 		marginBottom: 16,
// 	},
// 	tab: {
// 		flex: 1,
// 		paddingVertical: 10,
// 		alignItems: 'center',
// 		borderRadius: 8,
// 	},
// 	activeTab: {
// 		backgroundColor: '#e0e0e0',
// 	},
// 	tabText: {
// 		fontSize: 16,
// 		color: '#666',
// 	},
// 	activeTabText: {
// 		fontWeight: 'bold',
// 		color: '#000',
// 	},
// });