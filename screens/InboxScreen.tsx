import React, { useState } from 'react';
import {
	FlatList,
	Text,
	View,
	StyleSheet,
	Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { SwipeActionRenderProps } from '../components/SwipeableRow/types';
import { SwipeableRow } from '../components/SwipeableRow/SwipeableRow';

interface Email {
	id: string;
	subject: string;
	sender: string;
	preview: string;
}

const mockEmails: Email[] = [
	{ id: '1', subject: 'Meeting tomorrow', sender: 'John', preview: 'Hey, can we meet...' },
	{ id: '2', subject: 'Project update', sender: 'Sarah', preview: 'The project is...' },
	{ id: '3', subject: 'Quick question', sender: 'Mike', preview: 'Do you have time...' },
];

// Custom action components - THE CONSUMER CONTROLS THE UI
const DeleteAction: React.FC<SwipeActionRenderProps> = ({ progress }) => (
	<View style={[styles.action, { opacity: 0.5 + progress * 0.5 }]}>
		<Text style={styles.actionIcon}>🗑️</Text>
		<Text style={styles.actionText}>Delete</Text>
	</View>
);

const ArchiveAction: React.FC<SwipeActionRenderProps> = ({ progress }) => (
	<View style={[styles.action, { opacity: 0.5 + progress * 0.5 }]}>
		<Text style={styles.actionIcon}>📁</Text>
		<Text style={styles.actionText}>Archive</Text>
	</View>
);

export const InboxScreen: React.FC = () => {
	const [emails, setEmails] = useState<Email[]>(mockEmails);

	const handleDelete = (id: string) => {
		Alert.alert('Deleted', `Email ${id} deleted`);
		setEmails((prev) => prev.filter((e) => e.id !== id));
	};

	const handleArchive = (id: string) => {
		Alert.alert('Archived', `Email ${id} archived`);
		setEmails((prev) => prev.filter((e) => e.id !== id));
	};

	const renderEmail = ({ item }: { item: Email }) => (
		<SwipeableRow
			renderLeftActions={(props) => <ArchiveAction {...props} />}
			renderRightActions={(props) => <DeleteAction {...props} />}
			onSwipeLeft={() => handleDelete(item.id)}
			onSwipeRight={() => handleArchive(item.id)}
		>
			<View style={styles.emailItem}>
				<Text style={styles.sender}>{item.sender}</Text>
				<Text style={styles.subject}>{item.subject}</Text>
				<Text style={styles.preview}>{item.preview}</Text>
			</View>
		</SwipeableRow>
	);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Inbox</Text>
			<FlatList
				data={emails}
				keyExtractor={(item) => item.id}
				renderItem={renderEmail}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#f5f5f5' },
	title: { fontSize: 28, fontWeight: 'bold', padding: 16 },
	emailItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
	sender: { fontWeight: '600', fontSize: 16 },
	subject: { fontSize: 14, marginTop: 4 },
	preview: { fontSize: 12, color: '#666', marginTop: 4 },
	action: { alignItems: 'center', justifyContent: 'center', flex: 1 },
	actionIcon: { fontSize: 24 },
	actionText: { color: '#fff', fontSize: 12, marginTop: 4 },
});