import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';

export const getFilePathForProfilePicture = (clerkId: string) => `profilePictures/${clerkId}`;

export const uploadProfilePicture = async (clerkId: string): Promise<string> => {
	const result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		quality: 1,
		allowsEditing: true,
	});

	if (result.canceled) {
		console.log('user cancelled image picker');
		return '';
	}

	const uri = result.assets[0].uri;
	const blob = await fetch(uri).then((response) => response.blob());

	const filePath = getFilePathForProfilePicture(clerkId);
	const storageRef = ref(storage, filePath);

	try {
		await uploadBytes(storageRef, blob);
		console.log('Profile picture uploaded successfully');

		const downloadURL = await getDownloadURL(storageRef);
		console.log('Download URL:', downloadURL);
		return downloadURL;
	} catch (error) {
		console.error('Error uploading profile picture:', error);
		return '';
	}
};
