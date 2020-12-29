import React from 'react';
import { Text } from 'react-native';
import { RecoilRoot } from 'recoil';
import Main from './screens/main/Main';

const App = () => {
	return (
		<RecoilRoot>
			<React.Suspense fallback={<Text>Loading...</Text>}>
				<Main />
			</React.Suspense>
		</RecoilRoot>
	);
};

export default App;
