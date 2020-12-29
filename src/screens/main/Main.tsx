import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import fetchIntercept from 'fetch-intercept';
import { asyncStorageKeys } from '../../constants/asyncStorageKeys';
import { getItem, setItem } from '../../utils/asyncStorageUtils';
import { Home } from '../home/Home';
import { Login } from '../login/Login';
import { spotifyAPIBase, spotifyAuth, spotifyDefaultHeaders } from '../../constants/spotify';
import { refresh } from 'react-native-app-auth';

fetchIntercept.register({
	request: async (url: string, config: RequestInit = {}) => {
		if (!url.includes(spotifyAPIBase)) {
			return [url, config];
		}

		let accessToken: string = await getItem(asyncStorageKeys.spotifyAccessToken);
		try {
			const tokenExpiry = await getItem(asyncStorageKeys.spotifyTokenExpiry);
			const refreshToken = await getItem(asyncStorageKeys.spotifyRefreshToken);
			if (refreshToken && tokenExpiry && Date.now() >= Date.parse(tokenExpiry)) {
				// Refresh token
				const refreshResult = await refresh(spotifyAuth, {
					refreshToken,
				});
				if (!refreshResult) {
					throw 'Error refreshing token';
				}
				accessToken = refreshResult.accessToken;
				await setItem(asyncStorageKeys.spotifyRefreshToken, refreshResult.refreshToken);
				await setItem(asyncStorageKeys.spotifyAccessToken, refreshResult.accessToken);
				await setItem(asyncStorageKeys.spotifyTokenExpiry, refreshResult.accessTokenExpirationDate);
			}
		} catch (error) {
			console.log('fetchIntercept Error: ', error);
		}

		config.headers = {
			Authorization: `Bearer ${accessToken}`,
			...spotifyDefaultHeaders,
		};
		return [url, config];
	},
});

export const isLoggedInAtom = atom({
	key: 'isLoggedIn',
	default: false,
});

const Stack = createStackNavigator();
const Main = () => {
	const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
	useEffect(() => {
		(async () => {
			const loggedInStorage = await getItem(asyncStorageKeys.signedIn);
			if (!loggedInStorage) {
				setIsLoggedIn(false);
				return;
			}
			setIsLoggedIn(true);
		})();
	}, [isLoggedIn, setIsLoggedIn]);

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{isLoggedIn ? (
					<Stack.Screen name='Home' component={Home} />
				) : (
					<Stack.Screen name='Login' component={Login} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Main;
