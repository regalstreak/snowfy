import React from 'react';
import { Text, NativeModules, TouchableOpacity } from 'react-native';

declare const global: { HermesInternal: null | {} };

const App = () => {
	return (
		<TouchableOpacity
			style={{ backgroundColor: 'black', flex: 1 }}
			onPress={() => {
				NativeModules.Notifications.testMethod();
			}}
		>
			<Text>Send notification</Text>
		</TouchableOpacity>
	);
};

export default App;
