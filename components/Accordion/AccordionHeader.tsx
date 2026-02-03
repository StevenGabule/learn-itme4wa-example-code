import React from 'react';
import {
	TouchableOpacity,
	Text,
	View,
	StyleSheet,
} from 'react-native';
import { useAccordionItem } from './AccordionContext';
import { AccordionHeaderProps } from './types';

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({ children }) => {
	const { isExpanded, toggle } = useAccordionItem();

	return (
		<TouchableOpacity
			style={styles.header}
			onPress={toggle}
			activeOpacity={0.7}
		>
			<View style={styles.headerContent}>
				{typeof children === 'string' ? (
					<Text style={styles.headerText}>{children}</Text>
				) : (
					children
				)}
			</View>

			{/* Chevron indicator */}
			<Text style={[styles.chevron, isExpanded && styles.chevronExpanded]}>
				›
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 16,
		paddingHorizontal: 16,
		backgroundColor: '#fff',
	},
	headerContent: {
		flex: 1,
	},
	headerText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
	},
	chevron: {
		fontSize: 24,
		color: '#666',
		transform: [{ rotate: '0deg' }],
	},
	chevronExpanded: {
		transform: [{ rotate: '90deg' }],
	},
});
