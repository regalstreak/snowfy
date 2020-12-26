import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (key: string): Promise<any> => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (!value) {
			return null;
		}
		try {
			return JSON.parse(value);
		} catch (w) {
			// Value can't be parsed, is a string
			return value;
		}
	} catch (error) {
		return undefined;
	}
};

export const setItem = async (key: string, value: any): Promise<void> => {
	try {
		if (typeof value === 'string') {
			await AsyncStorage.setItem(key, value);
			return;
		}
		await AsyncStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		// Do nothing
	}
};

export const removeItem = async (key: string): Promise<void> => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (error) {
		// Do nothing
	}
};
