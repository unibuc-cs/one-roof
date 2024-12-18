import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { HeaderText } from './HeaderText';
import { PreferenceSlider } from './PreferenceSlider';
import { TextInputSmaller } from './TextInputSmaller';
import { theme } from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomSwitchSelector } from './CustomSwitchSelector';

interface ReviewSectionSchema {
    title: string,
    questions?: Array<{
        prompt: string,
        leftText: string,
        rightText: string,
    }>,
    hasAdditionalComments?: boolean,
    isLast?: boolean,
    binaryQuestions?: Array<string>,
    multiOptionQuestions?: Array<{
        prompt: string,
        options: Array<{
            label: string,
            value: string,
        }>,
    }>,
    additionalNodes?: ReactNode,
}

export const QuizSection: React.FC<ReviewSectionSchema> = ({
	title,
	questions,
	hasAdditionalComments = true,
	isLast = false,
	binaryQuestions,
	multiOptionQuestions,
	additionalNodes
}) => {
	return (
		<View>
			<HeaderText color={theme.colors.primary} textAlign={'left'} paddingTop={0} size={22}>{title}</HeaderText>
			{additionalNodes}
			{questions?.map((q, index) =>
				<PreferenceSlider
					key={`question-${index}`}
					question={q.prompt}
					leftText={q.leftText}
					rightText={q.rightText}
				/>)}
			{binaryQuestions?.map((question, index) => (
				<View
					key={`binary-${index}`}
					style={styles.binaryQuestion}
				>
					<HeaderText paddingBottom={16} size={16}>{question}</HeaderText>
					<CustomSwitchSelector
						mode={'green'}
						width={150}
						options={[
							{ label: 'No', value: 0 },
							{ label: 'Yes', value: 1 },
						]}
					/>
				</View>
			))
			}
			{multiOptionQuestions?.map((question, index) => (
				<View style={styles.binaryQuestion} key={`multi-${index}`}>
					<HeaderText paddingBottom={16} size={16}>{question.prompt}</HeaderText>
					<CustomSwitchSelector
						mode={'green'}
						options={question.options}
					/>
				</View>
			))
			}
			{hasAdditionalComments && <TextInputSmaller
				style={styles.input}
				numberOfLines={2}
				multiline={true}
				placeholder={'Anything else you\'d like to add about the issue?'}
			/>}
			{!isLast && <View style={{
				height: 40,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: 15,
			}}>
				<Icon size={20} color={theme.colors.primary} name={'cards-diamond-outline'}></Icon>
			</View>}
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		marginTop: 20
	},
	binaryQuestion: {
		marginTop: 10,
		display: 'flex',
		alignItems: 'center',
	}
});