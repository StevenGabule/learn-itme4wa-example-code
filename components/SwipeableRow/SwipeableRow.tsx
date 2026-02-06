import React, { useRef } from 'react';
import {
	View,
	StyleSheet,
	Animated,
	PanResponder,
	Dimensions,
} from 'react-native';
import { SwipeableRowProps } from './types';

export const SCREEN_WIDTH = Dimensions.get('window').width;

export const SwipeableRow: React.FC<SwipeableRowProps> = ({
	children,
	renderLeftActions,
	renderRightActions,
	onSwipeLeft,
	onSwipeRight,
	swipeThreshold = 0.5,
	actionWidth = 80,
}) => {
	// Animated value for horizontal translation
	const translateX = useRef(new Animated.Value(0)).current;

	// Track current swipe direction
	const swipeDirection = useRef<'left' | 'right' | null>(null);

	// Calculate progress for render props (0 to 1)
	const leftProgress = translateX.interpolate({
		inputRange: [0, actionWidth],
		outputRange: [0, 1],
		extrapolate: 'clamp',
	});

	const rightProgress = translateX.interpolate({
		inputRange: [-actionWidth, 0],
		outputRange: [1, 0],
		extrapolate: 'clamp',
	});

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => false,
			onMoveShouldSetPanResponder: (_, gestureState) => {
				// Only respond to horizontal gestures
				return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
					Math.abs(gestureState.dx) > 10;
			},
			onPanResponderGrant: () => {
				// Store current value when gesture starts
				translateX.setOffset((translateX as any)._value);
				translateX.setValue(0);
			},
			onPanResponderMove: (_, gestureState) => {
				// Determine swipe direction
				if (gestureState.dx > 0 && renderLeftActions) {
					swipeDirection.current = 'right'; // Swiping right reveals left actions
					translateX.setValue(Math.min(gestureState.dx, actionWidth));
				} else if (gestureState.dx < 0 && renderRightActions) {
					swipeDirection.current = 'left'; // Swiping left reveals right actions
					translateX.setValue(Math.max(gestureState.dx, -actionWidth));
				}
			},
			onPanResponderRelease: (_, gestureState) => {
				translateX.flattenOffset();

				const swipedPastThreshold =
					Math.abs(gestureState.dx) > actionWidth * swipeThreshold;

				if (swipedPastThreshold) {
					// Complete the swipe
					if (swipeDirection.current === 'right' && onSwipeRight) {
						Animated.timing(translateX, {
							toValue: actionWidth,
							duration: 200,
							useNativeDriver: true,
						}).start(() => {
							onSwipeRight();
							resetPosition();
						});
					} else if (swipeDirection.current === 'left' && onSwipeLeft) {
						Animated.timing(translateX, {
							toValue: -actionWidth,
							duration: 200,
							useNativeDriver: true,
						}).start(() => {
							onSwipeLeft();
							resetPosition();
						});
					}
				} else {
					// Snap back
					resetPosition();
				}

				swipeDirection.current = null;
			},
		})
	).current;

	const resetPosition = () => {
		Animated.spring(translateX, {
			toValue: 0,
			useNativeDriver: true,
			tension: 40,
			friction: 8,
		}).start();
	};

	return (
		<View style={styles.container}>
			{/* Left Actions (revealed when swiping right) */}
			{renderLeftActions && (
				<Animated.View
					style={[
						styles.actionsContainer,
						styles.leftActions,
						{ width: actionWidth },
					]}
				>
					{renderLeftActions({
						progress: (leftProgress as any).__getValue?.() ?? 0,
						isActive: swipeDirection.current === 'right',
					})}
				</Animated.View>
			)}

			{/* Right Actions (revealed when swiping left) */}
			{renderRightActions && (
				<Animated.View
					style={[
						styles.actionsContainer,
						styles.rightActions,
						{ width: actionWidth },
					]}
				>
					{renderRightActions({
						progress: (rightProgress as any).__getValue?.() ?? 0,
						isActive: swipeDirection.current === 'left',
					})}
				</Animated.View>
			)}

			{/* Main Content */}
			<Animated.View
				style={[styles.content, { transform: [{ translateX }] }]}
				{...panResponder.panHandlers}
			>
				{children}
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		overflow: 'hidden',
	},
	content: {
		backgroundColor: '#fff',
		zIndex: 1,
	},
	actionsContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	leftActions: {
		left: 0,
		backgroundColor: '#4CAF50',
	},
	rightActions: {
		right: 0,
		backgroundColor: '#f44336',
	},
});