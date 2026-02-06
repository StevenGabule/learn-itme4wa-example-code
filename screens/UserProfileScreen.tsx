import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { useApi } from '../hooks/useApi';

interface User {
	id: string;
	name: string;
	email: string;
}

// Simulated API call
const fetchUser = async (userId: string): Promise<User> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	if (userId === 'error') {
		throw new Error('User not found');
	}

	return {
		id: userId,
		name: 'John Doe',
		email: 'john@example.com',
	};
};

export const UserProfileScreen: React.FC = () => {
	const { data: user, loading, error, execute } = useApi(fetchUser);

	useEffect(() => {
		execute('error');
	}, [execute]);

	if (loading) {
		return <ActivityIndicator size="large" />;
	}

	if (error) {
		return (
			<View>
				<Text>Error: {error.message}</Text>
				<Button title="Retry" onPress={() => execute('123')} />
			</View>
		);
	}

	if (!user) {
		return <Text>No user loaded</Text>;
	}

	return (
		<View>
			<Text>Name: {user.name}</Text>
			<Text>Email: {user.email}</Text>
		</View>
	);
};