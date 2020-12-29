import React, { useEffect } from 'react';
import { NativeModules, Text, TouchableOpacity, View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { spotifyAPIBase } from '../../constants/spotify';
import { spotifyLogout } from '../../utils/spotifyToken';
import { isLoggedInAtom } from '../main/Main';

export const Home = () => {
	const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

	useEffect(() => {
		(async () => {
			const spotifyPlaylists = await (await fetch(`${spotifyAPIBase}/me/playlists`)).json();
			console.log(JSON.stringify(spotifyPlaylists, null, 2));
		})();
	}, []);

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
