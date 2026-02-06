import React, { useState } from "react";
import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SettingsScreen } from './screens/SettingsScreen';
import { InboxScreen } from './screens/InboxScreen';
import { UserProfileScreen } from './screens/UserProfileScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';

interface UserCardProps {
  id: string;
  name: string;
  email: string;
  age?: number;
  avatarUrl?: string;
  onPress: (id: string) => void;
  isActive: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  email,
  age = 18,
  isActive,
  onPress,
  avatarUrl,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <Text>{name}</Text>
      <Text>{email}</Text>
      <Text>{age}</Text>
      <Text>{isActive ? "Yes" : "No"}</Text>
      {avatarUrl && <Image src={avatarUrl} />}
    </TouchableOpacity>
  );
};

// 2. Props with Children
interface ContainerProps {
  children: React.ReactNode;
  padding?: number;
}

const Container: React.FC<ContainerProps> = ({ children, padding = 16 }) => {
  return <View style={{ padding }}>{children}</View>;
};

// 3. Typing State
interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

// 4. Typing API Responses
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

const login = async (
  email: string,
  password: string,
): Promise<ApiResponse<LoginResponse>> => {
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  avatar: ImageStyle;
}

export default function App() {
  const [user, setUser] = useState<User>();
  const [email, setEmail] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "john", email: "john@gmail.com", isActive: false },
    { id: "2", name: "jane", email: "jane@gmail.com", isActive: true },
    { id: "3", name: "mark", email: "mark@gmail.com", isActive: true },
  ]);

  const handleOnPress = () => {
    console.log("Tap!");
  };

  const handleTextChange = (text: string): void => {
    setEmail(text);
  };

  const handleSubmit = async (): Promise<void> => {
    // ...
  };

  // return (
  //   <View style={styles.container}>
  //     {users.map((currentUser) => (
  //       <UserCard
  //         id={currentUser.id}
  //         key={currentUser.id}
  //         name={currentUser.name}
  //         email={currentUser.email}
  //         onPress={handleOnPress}
  //         isActive={currentUser.isActive}
  //       />
  //     ))}

  //     <Container>
  //       <View>
  //         <Text>
  //           Hello from {user?.name} {email} {loading}
  //         </Text>
  //       </View>
  //     </Container>
  //   </View>
  // );

  // return <SettingsScreen />
  // return <InboxScreen />
  // return <UserProfileScreen />
  return <RegistrationScreen />
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {},
  avatar: {},
});
