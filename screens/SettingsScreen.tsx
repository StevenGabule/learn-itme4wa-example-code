import React from 'react';
import { Text, Switch, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Accordion } from '../components/Accordion';

export const SettingsScreen: React.FC = () => {
	const [pushEnabled, setPushEnabled] = React.useState(true);
	const [emailEnabled, setEmailEnabled] = React.useState(false);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Settings</Text>

			<Accordion allowMultiple={false} defaultExpanded={[]}>
				<Accordion.Item id="notifications">
					<Accordion.Header>Notifications</Accordion.Header>
					<Accordion.Content>
						<View style={styles.settingRow}>
							<Text>Push Notifications</Text>
							<Switch value={pushEnabled} onValueChange={setPushEnabled} />
						</View>
						<View style={styles.settingRow}>
							<Text>Email Notifications</Text>
							<Switch value={emailEnabled} onValueChange={setEmailEnabled} />
						</View>
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item id="privacy">
					<Accordion.Header>Privacy</Accordion.Header>
					<Accordion.Content>
						<Text>Privacy settings go here...</Text>
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item id="account">
					<Accordion.Header>Account</Accordion.Header>
					<Accordion.Content>
						<Text>Account settings go here...</Text>
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item id="account2">
					<Accordion.Header>Account 2nd</Accordion.Header>
					<Accordion.Content>
						<Text>Hidden account available for you!</Text>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		padding: 16,
	},
	settingRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 8,
	},
});
