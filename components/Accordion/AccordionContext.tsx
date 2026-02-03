import { createContext, useContext } from 'react';
import { AccordionContextType, AccordionItemContextType } from './types';

// Main accordion context (tracks which items are expanded)
export const AccordionContext = createContext<AccordionContextType | null>(null);

// Individual item context (knows its own id and state)
export const AccordionItemContext = createContext<AccordionItemContextType | null>(null);

// Custom hooks for consuming context with proper error handling
export const useAccordion = (): AccordionContextType => {
	const context = useContext(AccordionContext);
	if (!context) {
		throw new Error('useAccordion must be used within an Accordion component');
	}
	return context;
};

export const useAccordionItem = (): AccordionItemContextType => {
	const context = useContext(AccordionItemContext);
	if (!context) {
		throw new Error('useAccordionItem must be used within an Accordion.Item component');
	}
	return context;
};