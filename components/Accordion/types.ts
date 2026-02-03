import React from "react";

export interface AccordionContextType {
  expandedItems: Set<string>;
  toggleItem: (id: string) => void;
  allowMultiple: boolean;
}

export interface AccordionItemContextType {
  id: string;
  isExpanded: boolean;
  toggle: () => void;
}

export interface AccordionProps {
  children: React.ReactNode;
  allowMultiple?: boolean;
  defaultExpanded?: string[];
}

export interface AccordionItemProps {
  children: React.ReactNode;
  id: string;
}

export interface AccordionHeaderProps {
  children: React.ReactNode;
}

export interface AccordionContentProps {
  children: React.ReactNode;
}
