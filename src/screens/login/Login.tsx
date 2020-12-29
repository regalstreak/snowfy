import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useRecoilState } from 'recoil';
import { getSpotifyToken } from '../../utils/spotifyToken';
import { isLoggedInAtom } from '../main/Main';

export const Login = () => {
	const [, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
	return (
		<TouchableOpacity
			style={{ backgroundColor: '#1DB954', flex: 1 }}
			onPress={async () => {
				try {
					await getSpotifyToken();
					setIsLoggedIn(true);
				} catch (error) {
					// Do nothing
				}
			}}
		>
			<Text style={{ color: 'white' }}>Login</Text>
		</TouchableOpacity>
	);
};
