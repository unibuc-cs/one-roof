import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ActivityIndicator, Card } from 'react-native-paper';
import { Background, CustomMarker, HeaderText, ReviewDetailsSection, RootStackParamList } from '../components';
import { RouteProp, useRoute } from '@react-navigation/native';
import ReachOutToUser from '../components/ReachOutToUser';
import { reviewService } from '../services';
import { IReview } from '../models';
import { useUser } from '@clerk/clerk-expo';

type ViewReviewScreenProps = RouteProp<RootStackParamList, 'ViewReview'>;

export const ViewReviewScreen: React.FC<any> = () => {
	const route = useRoute<ViewReviewScreenProps>();
	const { user } = useUser();


	const [review, setReview] = useState<IReview>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchReview = async (reviewId) => {
		try {
			const fetchedReview = await reviewService.getReview(reviewId, user?.id as string);
			setReview(fetchedReview);
			setLoading(false);
		} catch (err) {
			console.error('Error fetching review:', err);
			setError(err);
			setLoading(false);
		}
	};


	useEffect(() => {
		const reviewId = route.params?.id;
		if (reviewId) {
			fetchReview(reviewId);
		}
	}, [route.params]);

	if (loading || !review) {
		return <ActivityIndicator size="large" />;
	}


	const areaFeedback = review?.areaFeedback;
	const buildingFeedback = review?.buildingFeedback;

	return (
		<Background>
			<Card style={styles.card} contentStyle={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<HeaderText paddingBottom={0} size={32}>{review.title}</HeaderText>
					<ReviewDetailsSection
						title={''}
						multiOptionQuestions={[
							{ prompt: '', value: review.description },
						]}
					/>
					<ReachOutToUser message={'Reach out to find out more!'} userToReachOutToId={review.reviewerId} referenceId={review._id} type={'review'}/>
					<HeaderText paddingBottom={5} size={24}>Building Feedback</HeaderText>
					<ReviewDetailsSection
						title="Pest Issues"
						questions={[
							{
								prompt: 'Rodents issues frequency:',
								value: buildingFeedback.pestIssues.rodents,
								leftText: 'Very Often',
								rightText: 'Never'
							},
							{
								prompt: 'Bugs issues frequency:',
								value: buildingFeedback.pestIssues.bugs,
								leftText: 'Very Often',
								rightText: 'Never'
							},
							{
								prompt: 'Mosquitoes issues frequency:',
								value: buildingFeedback.pestIssues.mosquitoes,
								leftText: 'Very Often',
								rightText: 'Never'
							},
						]}
						additional={buildingFeedback.pestIssues.additionalComments}
					/>
					<ReviewDetailsSection
						title="Utility Availability"
						binaryQuestions={[
							{
								question: 'Central heating availability:',
								value: buildingFeedback.utilityAvailability.centralHeating
							}
						]}
						additional={buildingFeedback.utilityAvailability.additionalComments}
					/>
					<ReviewDetailsSection
						title="Mold Issues"
						questions={[
							{
								prompt: 'Severity of mold issues:',
								value: buildingFeedback.moldIssues.severity,
								leftText: 'All the time',
								rightText: 'Not at all'
							},
						]}
						additional={buildingFeedback.moldIssues.additionalComments}
					/>
					<ReviewDetailsSection
						title="Noise and Insulation"
						questions={[
							{
								prompt: 'Noise insulation rating:',
								value: buildingFeedback.noiseInsulation.rating,
								leftText: 'Very Bad',
								rightText: 'Very Good'
							},
						]}
						additional={buildingFeedback.noiseInsulation.additionalComments}
					/>
					<ReviewDetailsSection
						title="Security"
						questions={[
							{
								prompt: 'Building security rating:',
								value: buildingFeedback.security.rating,
								leftText: 'Very Bad',
								rightText: 'Very Good'
							},
						]}
						binaryQuestions={[
							{ question: 'Bodyguard availability:', value: buildingFeedback.security.bodyguard }
						]}
						additional={buildingFeedback.security.additionalComments}
					/>
					<ReviewDetailsSection
						title="HVAC (Heating, Ventilation, and Air Conditioning)"
						binaryQuestions={[
							{ question: 'AC system availability:', value: buildingFeedback.hvac.ac }
						]}
						additional={buildingFeedback.hvac.additionalComments}
					/>
					<ReviewDetailsSection
						title="Building Finishes and Quality"
						questions={[
							{
								prompt: 'Quality of building finishes:',
								value: buildingFeedback.buildingFinishes.quality,
								leftText: 'Very Bad',
								rightText: 'Very Good'
							},
							{
								prompt: 'Modernity of building finishes:',
								value: buildingFeedback.buildingFinishes.modernity,
								leftText: 'Very Bad',
								rightText: 'Very Good'
							},
						]}
						binaryQuestions={[
							{ question: 'Elevator availability:', value: buildingFeedback.buildingFinishes.elevator }
						]}
						additional={buildingFeedback.buildingFinishes.additionalComments}
					/>
					<HeaderText paddingBottom={4} size={24}>Area Feedback</HeaderText>
					<ReviewDetailsSection title="Transportation"
										  questions={[
											  {
												  prompt: 'Public transport options satisfaction level:',
												  value: areaFeedback.transport.publicTransport,
												  leftText: 'Poor',
												  rightText: 'Excellent'
											  },
											  {
												  prompt: 'Car transport conditions satisfaction level:',
												  value: areaFeedback.transport.carTransport,
												  leftText: 'Poor',
												  rightText: 'Excellent'
											  },
											  {
												  prompt: 'Traffic congestion frequency:',
												  value: areaFeedback.transport.trafficCongestion,
												  leftText: 'Frequent',
												  rightText: 'Rare'
											  },
										  ]}
										  multiOptionQuestions={[
											  {
												  prompt: 'Primary transportation mode:',
												  value: areaFeedback.transport.primaryTransportMode
											  },
										  ]}
										  additional={areaFeedback.transport.additionalComments}
					/>
					<ReviewDetailsSection title="Demographics" multiOptionQuestions={[
						{ prompt: 'Predominant demographic:', value: areaFeedback.demographics.predominantDemographic },
					]}/>
					<ReviewDetailsSection title="Safety and Noise" questions={[
						{
							prompt: 'Noise level rating:',
							value: areaFeedback.safetyAndNoise.noiseLevel,
							leftText: 'Noisy',
							rightText: 'Quiet'
						},
						{
							prompt: 'Nighttime safety rating:',
							value: areaFeedback.safetyAndNoise.nighttimeSafety,
							leftText: 'Unsafe',
							rightText: 'Safe'
						},
					]}/>
					<ReviewDetailsSection title="Environmental Factors" questions={[
						{
							prompt: 'Cleanliness rating:',
							value: areaFeedback.environmentalFactors.cleanliness,
							leftText: 'Dirty',
							rightText: 'Clean'
						},
						{
							prompt: 'Green spaces satisfaction level:',
							value: areaFeedback.environmentalFactors.greenSpaces,
							leftText: 'Poor',
							rightText: 'Excellent'
						},
						{
							prompt: 'Pollution levels rating:',
							value: areaFeedback.environmentalFactors.pollutionLevels,
							leftText: 'High',
							rightText: 'Low'
						},
					]}/>
				</ScrollView>
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
	questionText: {
		fontSize: 16,
		color: 'black',
		padding: 10,
	},
	map: {
		width: '100%',
		height: 200,
		marginVertical: 8,
	},
	detailContainer: {
		width: '100%',
		padding: 16,
	},
	detailText: {
		fontSize: 16,
		color: 'black',
		padding: 10,
	},
});

