import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

export const MessageItem = ({ msg, index, listings, userId }) => {
	const messageDate = new Date(msg.createdAt).toDateString();
	// const showDate = messageDate !== lastDate;
	const showListing = msg.referenceId != null;
	const lastDate = messageDate;

	const formatTime = (time) => {
		const options = { hour: 'numeric', minute: 'numeric' };
		return new Date(time).toLocaleString('en-US', options);
	};

	const formatDate = (timestamp) => {
		const date = new Date(timestamp);
		return date.toDateString();
	};

	const truncateText = (text, limit) => {
		if (text.length > limit) {
			return text.substring(0, limit) + '...';
		}
		return text;
	};


	return (
		<React.Fragment key={index}>
			{/*{showDate && (*/}
			{/*	<View style={styles.dateLabelContainer}>*/}
			{/*		<Text style={styles.dateLabel}>{formatDate(msg.createdAt)}</Text>*/}
			{/*	</View>*/}
			{/*)}*/}
			{showListing && (
				<View style={[styles.listingContainer, msg.senderId === userId ? {alignSelf: 'flex-end'}: {alignSelf: 'flex-start'}]}>
					<View style={{ flex: 1 }}>
						<Text style={styles.listingTitle}>
							{listings[msg.referenceId] ? listings[msg.referenceId].title : 'Loading listing...'}
						</Text>
						<Text style={styles.listingDescription}>
							{listings[msg.referenceId] ? truncateText(listings[msg.referenceId].description, 100) : ''}
						</Text>
					</View>
					<Pressable style={styles.openButton}>
						<Text style={styles.openButtonText}>Open</Text>
					</Pressable>
				</View>
			)}
			<Pressable
				style={[
					styles.message,
					msg.senderId === userId ? styles.senderMsgBubble : styles.receiverMsgBubble
				]}
			>
				<Text style={msg.senderId === userId ? styles.senderMsg : styles.receiverMsg}>
					{msg.content}
				</Text>
				<View style={{ flexDirection: 'row', gap: 5, display: 'flex' }}>
					<Text style={msg.senderId === userId ? styles.senderMsg : styles.receiverMsg}>
						{formatTime(msg.createdAt)}
					</Text>
					{msg.senderId === userId && (
						<Ionicons
							name="checkmark-outline"
							size={15}
							color={msg.isRead ? '#70e000' : 'white'}
						/>
					)}
				</View>
			</Pressable>
		</React.Fragment>
	);
}


const styles = StyleSheet.create({
	message: {
		display: "flex",
		flexDirection: "column",
		fontFamily: 'Proxima-Nova/Regular',
		fontSize: 17,
		color: 'black',
		maxWidth: '70%',
		minHeight: 30,
		margin: 2.5,
		marginHorizontal: 10,
		padding: 5,
		paddingHorizontal: 10,
		borderRadius: 10,
	},
	senderMsgBubble: {
		alignItems: "center",
		alignSelf:"flex-end",
		backgroundColor: theme.colors.primary,
	},
	senderMsg:{
		color: 'white',
		alignSelf: 'flex-start',
	},
	receiverMsgBubble: {
		backgroundColor: theme.colors.background,
		alignItems: "center",
		alignSelf: "flex-start",
		color: 'black',
	},
	receiverMsg:{
		color: 'black',
		alignSelf: 'flex-end',
	},
	dateLabelContainer: {
		padding: 10,
		alignItems: 'center',
	},
	dateLabel: {
		fontSize: 12,
		color: 'gray',
	},
	listingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '80%',
		padding: 10,
		paddingHorizontal:15,
		backgroundColor: theme.colors.background,
		borderRadius: 10,
		marginTop: 5,
		marginHorizontal: 10,
		borderColor: theme.colors.primary,
		borderWidth: 1,
	},
	listingTitle: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	listingDescription: {
		fontSize: 14,
		color: 'gray',
	},
	openButton: {
		backgroundColor: theme.colors.primary,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 10,
	},
	openButtonText: {
		color: 'white',
	},
});
