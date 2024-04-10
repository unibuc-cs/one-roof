import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import Button  from '../components/Button';

type EditableFieldProps = {
	label: string,
	value: string,
	onSave: (newValue: string) => void,
};

export const EditableField: React.FC<EditableFieldProps> = ({ label, value, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(value);

	// TODO: make this prettier, remove hardcoded height
	return (
		<View style={styles.fieldContainerColumn}>
			<Text style={styles.label}>{label}:</Text>
			<View style={styles.fieldContainerRow}>
				{isEditing ? (
					<View style={{ height: 50 }}>
						<TextInput
							dense
							style={{ ...styles.input, width: 'fitContent', height: 50 }}
							value={editValue}
							onChangeText={setEditValue}
						/>
					</View>
				) : (
					<Text style={styles.value}>{value}</Text>
				)}
				{isEditing ? (
					<Button style={{ width: 80 }} onPress={() => {
						onSave(editValue);
						setIsEditing(false);
					}}>Save</Button>
				) : (
					<Button width={80} onPress={() => setIsEditing(true)}>Edit</Button>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	fieldContainerColumn: {
		flexDirection: 'column',
		alignItems: 'center',
		marginVertical: 10,
	},
	fieldContainerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 8,
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginRight: 10,
	},
	value: {
		fontSize: 16,
	},
	input: {
		flex: 1,
		marginRight: 10,
	},
});
