import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import Button  from '../components/Button';
import { HeaderText } from './HeaderText';

type EditableFieldProps = {
	label: string,
	value: string,
	isEditable: boolean,
	onSave: (newValue: string) => void,
};

export const EditableField: React.FC<EditableFieldProps> = ({ label, value, onSave, isEditable }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(value);

	return (
		<View style={styles.fieldContainerColumn}>
			<HeaderText size={20} textAlign="left">{label}</HeaderText>
			<View style={styles.fieldContainerRow}>
				{isEditing ? (
					<View style={{ width: '70%' }}>
						<TextInput
							style={{ ...styles.input, width: '100%' }}
							value={editValue}
							onChangeText={setEditValue}
						/>
					</View>
				) : (
					<Text style={styles.value}>{value}</Text>
				)}
				{isEditing ? (
					<Button mode="elevated" width={'fit-content'} style={{ marginLeft: 10 }} onPress={() => {
						onSave(editValue);
						setIsEditing(false);
					}}>Save</Button>
				) : (
					<Button mode="elevated" disabled={!isEditable} width={80} onPress={() => setIsEditing(true)}>Edit</Button>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	fieldContainerColumn: {
		flexDirection: 'column',
	},
	fieldContainerRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginRight: 10,
	},
	value: {
		fontSize: 16,
		backgroundColor: '#f6f6f6',
		padding: 10,
		marginRight: 15,
		borderRadius: 20,
		paddingLeft: 15,
		borderColor: '#dcdcdc',
		borderWidth: 1,
		width: '70%',
		color: '#616161'
	},
	input: {
		fontSize: 16,
		backgroundColor: '#eaeaea',
		borderColor: '#dcdcdc',
		borderWidth: 1,
		width: '70%',
		borderRadius: 20,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		height: 40,
		color: 'black'
	},
});
