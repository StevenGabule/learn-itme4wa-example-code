import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { AccordionItemContext, useAccordion } from './AccordionContext';
import { AccordionItemProps } from './types';

export const AccordionItem: React.FC<AccordionItemProps> = ({ children, id }) => {
	const { expandedItems, toggleItem } = useAccordion();
	const isExpanded = expandedItems.has(id);
	const contextValue = useMemo(
		() => ({
			id,
			isExpanded,
			toggle: () => toggleItem(id),
		}),
		[id, isExpanded, toggleItem]
	);

	return (
		<AccordionItemContext.Provider value={contextValue}>
			<View style={styles.item}>{children}</View>
		</AccordionItemContext.Provider>
	);
};

const styles = StyleSheet.create({
	item: {
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
	},
});