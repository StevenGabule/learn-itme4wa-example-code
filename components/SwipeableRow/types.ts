import { ReactNode } from "react";

// The data we pass to render functions
export interface SwipeActionRenderProps {
  progress: number; // 0 to 1, how far the swipe has gone
  isActive: boolean; // Whether this side is currently being swiped
}

export interface SwipeableRowProps {
  children: ReactNode;

  // Render props - functions that return UI
  renderLeftActions?: (props: SwipeActionRenderProps) => ReactNode;
  renderRightActions?: (props: SwipeActionRenderProps) => ReactNode;

  // Callbacks
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;

  // Configuration
  swipeThreshold?: number; // How far to swipe to trigger action (default: 0.5)
  actionWidth?: number; // Width of action area (default: 80)
}
