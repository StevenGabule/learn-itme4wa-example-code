import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAccordionItem } from './AccordionContext';
import { AccordionContentProps } from './types';

export const AccordionContent: React.FC<AccordionContentProps> =
	({ children }) => {
		const { isExpanded } = useAccordionItem();

		if (!isExpanded) {
			return null;
		}

		return <View style={styles.content}>{children}</View>;
	};

const styles = StyleSheet.create({
	content: {
		padding: 16,
		backgroundColor: '#f9f9f9',
	},
});
