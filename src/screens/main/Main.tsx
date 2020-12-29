import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { asyncStorageKeys } from '../../constants/asyncStorageKeys';
import { getItem } from '../../utils/asyncStorageUtils';
import { Home } from '../home/Home';
import { Login } from '../login/Login';

export const isLoggedInAtom = atom({
	key: 'isLoggedIn',
	default: false,
});

const Stack = createStackNavigator();
const Main = () => {
	const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
	useEffect(() => {
		console.log(isLoggedIn);
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
