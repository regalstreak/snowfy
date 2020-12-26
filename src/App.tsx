import React from 'react';
import { Text, NativeModules, TouchableOpacity } from 'react-native';
import { getSpotifyToken, spotifyLogout } from './utils/spotifyToken';

declare const global: { HermesInternal: null | {} };

const App = () => {
	return (
		<>
			<TouchableOpacity
				style={{ backgroundColor: '#1DB954', flex: 1 }}
				onPress={async () => {
					await getSpotifyToken();
				}}
			>
				<Text style={{ color: 'white' }}>Login</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={{ backgroundColor: 'orange', flex: 1 }}
				onPress={async () => {
					await spotifyLogout();
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
		</>
	);
};

export default App;
