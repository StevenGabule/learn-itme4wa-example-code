import { Accordion as AccordionRoot } from './Accordion';
import { AccordionItem } from './AccordionItem';
import { AccordionHeader } from './AccordionHeader';
import { AccordionContent } from './AccordionContent'

// Attach sub-components to main component
export const Accordion = Object.assign(AccordionRoot, {
	Item: AccordionItem,
	Header: AccordionHeader,
	Content: AccordionContent,
});

// Also export types if consumers need them
export type {
	AccordionProps,
	AccordionItemProps,
	AccordionHeaderProps,
	AccordionContentProps,
} from './types';