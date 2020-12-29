import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from '@env';

export const spotifyAuth = {
	clientId: SPOTIFY_CLIENT_ID,
	redirectUrl: SPOTIFY_REDIRECT_URI,
	serviceConfiguration: {
		authorizationEndpoint: 'https://accounts.spotify.com/authorize',
		tokenEndpoint: 'https://accounts.spotify.com/api/token',
	},
	scopes: ['playlist-read-private', 'user-read-private', 'user-read-email'],
};

export const spotifyDefaultHeaders = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

export const spotifyAPIBase = 'https://api.spotify.com/v1';
