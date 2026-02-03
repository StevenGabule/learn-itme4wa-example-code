import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { AccordionContext } from './AccordionContext';
import { AccordionProps } from './types';

export const Accordion: React.FC<AccordionProps> = ({
	children,
	allowMultiple = false,
	defaultExpanded = [],
}) => {
	const [expandedItems, setExpandedItems] = useState<Set<string>>(
		new Set(defaultExpanded)
	);

	const toggleItem = useCallback((id: string) => {
		setExpandedItems((prev) => {
			const next = new Set(prev);

			if (next.has(id)) {
				// Closing this item
				next.delete(id);
			} else {
				// Opening this item
				if (!allowMultiple) {
					// If only one can be open, clear others first
					next.clear();
				}
				next.add(id);
			}

			return next;
		});
	}, [allowMultiple]);

	// Memoize context value to prevent unnecessary re-renders
	const contextValue = useMemo(() => ({
		expandedItems,
		toggleItem,
		allowMultiple,
	}), [expandedItems, toggleItem, allowMultiple]);

	return (
		<AccordionContext.Provider value={contextValue}>
			<View style={styles.container}>{children}</View>
		</AccordionContext.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
});