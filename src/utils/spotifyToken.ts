import { setItem, getItem, removeItem } from './asyncStorageUtils';
import { asyncStorageKeys } from './../constants/asyncStorageKeys';
import { spotifyAuth, spotifyDefaultHeaders } from './../constants/spotify';
import { authorize, refresh } from 'react-native-app-auth';

const clearLoginStorage = async () => {
	try {
		await removeItem(asyncStorageKeys.signedIn);
		await removeItem(asyncStorageKeys.spotifyAccessToken);
		await setItem(asyncStorageKeys.spotifyRefreshToken, false);
		await removeItem(asyncStorageKeys.spotifyTokenExpiry);
	} catch (error) {
		// Do nothing
	}
};

export const getSpotifyToken = async (attempt = 1) => {
	if (attempt > 2) {
		return;
	}

	try {
		let accessToken: string, refreshToken: string;

		if (!((await getItem(asyncStorageKeys.signedIn)) === true)) {
			// Not signed in, begin authorization

			const authResult = await authorize(spotifyAuth);

			if (authResult.accessToken) {
				await setItem(asyncStorageKeys.signedIn, true);
				accessToken = authResult.accessToken;
				refreshToken = authResult.refreshToken;
				await setItem(asyncStorageKeys.spotifyAccessToken, authResult.accessToken);
				await setItem(asyncStorageKeys.spotifyRefreshToken, authResult.refreshToken);
				await setItem(asyncStorageKeys.spotifyTokenExpiry, authResult.accessTokenExpirationDate);
			} else {
				throw 'Could not log in';
			}
		} else {
			accessToken = await getItem(asyncStorageKeys.spotifyAccessToken);
			refreshToken = await getItem(asyncStorageKeys.spotifyRefreshToken);
		}

		const tryAuth = async () => {
			return await fetch('https://api.spotify.com/v1/me', {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					...spotifyDefaultHeaders,
				},
			});
		};

		const initialResponse = await tryAuth();

		if (initialResponse.status === 401) {
			// Refresh token
			const refreshResult = await refresh(spotifyAuth, {
				refreshToken,
			});
			if (!refreshResult) {
				throw 'Error refreshing token';
			}
			if ((await tryAuth()).ok) {
				await setItem(asyncStorageKeys.spotifyRefreshToken, refreshResult.refreshToken);
				await setItem(asyncStorageKeys.spotifyAccessToken, refreshResult.accessToken);
				await setItem(asyncStorageKeys.spotifyTokenExpiry, refreshResult.accessTokenExpirationDate);
				return;
			} else {
				throw 'Error refreshing token';
			}
		}

		if (initialResponse.ok && initialResponse.status !== 401) {
			console.log('succ');
			return;
		} else {
			throw 'Error getting token';
		}
	} catch (error) {
		await clearLoginStorage();
		getSpotifyToken(attempt + 1);
		console.log('bigtrycatch', error);
	}
};

export const spotifyLogout = async () => {
	try {
		const isSignedIn = await getItem(asyncStorageKeys.signedIn);
		const accessToken = await getItem(asyncStorageKeys.spotifyAccessToken);
		if (isSignedIn && accessToken) {
			await clearLoginStorage();
		}
	} catch (error) {
		console.log(error);
	}
};
