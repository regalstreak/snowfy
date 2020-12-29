import React from 'react';
import { Text } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import Main from './screens/main/Main';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<React.Suspense fallback={<Text>Loading...</Text>}>
					<Main />
				</React.Suspense>
			</RecoilRoot>
		</QueryClientProvider>
	);
};

export default App;
