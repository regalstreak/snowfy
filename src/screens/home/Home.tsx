import React from 'react';
import { NativeModules, Text, TouchableOpacity, View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { spotifyLogout } from '../../utils/spotifyToken';
import { isLoggedInAtom } from '../main/Main';

export const Home = () => {
	const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
	return (
		<View style={{ flex: 1 }}>
			<TouchableOpacity
				style={{ backgroundColor: 'orange', flex: 1 }}
				onPress={async () => {
					try {
						await spotifyLogout();
						setIsLoggedIn(false);
					} catch (error) {
						// Do nothing
					}
				}}
			>
				<Text style={{ color: 'white' }}>Logout</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={{ backgroundColor: '#191414', flex: 1 }}
				onPress={() => {
					NativeModules.Notifications.testMethod();
				}}
			>
				<Text style={{ color: 'white' }}>Send notification</Text>
			</TouchableOpacity>
		</View>
	);
};
