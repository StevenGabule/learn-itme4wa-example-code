import React from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import { useForm } from '../hooks/useForm';

interface RegistrationForm {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const validate = (values: RegistrationForm): Partial<Record<keyof RegistrationForm, string>> => {
	const errors: Partial<Record<keyof RegistrationForm, string>> = {};

	if (!values.name.trim()) {
		errors.name = 'Name is required';
	}

	if (!values.email.trim()) {
		errors.email = 'Email is required';
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
		errors.email = 'Invalid email format';
	}

	if (!values.password) {
		errors.password = 'Password is required';
	} else if (values.password.length < 8) {
		errors.password = 'Password must be at least 8 characters';
	}

	if (values.password !== values.confirmPassword) {
		errors.confirmPassword = 'Passwords do not match';
	}

	return errors;
};

export const RegistrationScreen: React.FC = () => {
	const {
		values,
		errors,
		touched,
		isSubmitting,
		handleChange,
		handleBlur,
		handleSubmit,
	} = useForm<RegistrationForm>({
		initialValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validate,
		onSubmit: async (data) => {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));
			console.log('Registration successful:', data);
		},
	});

	const renderField = (
		field: keyof RegistrationForm,
		label: string,
		options?: { secureTextEntry?: boolean; keyboardType?: 'email-address' | 'default' }
	) => (
		<View style={styles.fieldContainer}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={[styles.input, touched[field] && errors[field] && styles.inputError]}
				value={values[field]}
				onChangeText={handleChange(field)}
				onBlur={handleBlur(field)}
				secureTextEntry={options?.secureTextEntry}
				keyboardType={options?.keyboardType || 'default'}
				autoCapitalize="none"
			/>
			{touched[field] && errors[field] && (
				<Text style={styles.errorText}>{errors[field]}</Text>
			)}
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Create Account</Text>

			{renderField('name', 'Full Name')}
			{renderField('email', 'Email', { keyboardType: 'email-address' })}
			{renderField('password', 'Password', { secureTextEntry: true })}
			{renderField('confirmPassword', 'Confirm Password', { secureTextEntry: true })}

			<TouchableOpacity
				style={[styles.button, isSubmitting && styles.buttonDisabled]}
				onPress={handleSubmit}
				disabled={isSubmitting}
			>
				{isSubmitting ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text style={styles.buttonText}>Register</Text>
				)}
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 24, backgroundColor: '#fff' },
	title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
	fieldContainer: { marginBottom: 16 },
	label: { fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#333' },
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
	},
	inputError: { borderColor: '#f44336' },
	errorText: { color: '#f44336', fontSize: 12, marginTop: 4 },
	button: {
		backgroundColor: '#007AFF',
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 8,
	},
	buttonDisabled: { opacity: 0.6 },
	buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});