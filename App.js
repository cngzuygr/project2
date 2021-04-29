import "react-native-gesture-handler";
import * as React from "react";
import { Button, View, TouchableOpacity, navi } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";

import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ClassScreen from "./screens/ClassScreen";
import NotificationScreen from "./screens/NotificationScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createStackNavigator();

function MyStack() {
	return (
		<Stack.Navigator initialRouteName={SignInScreen}>
			<Stack.Screen name="SignInScreen" component={SignInScreen} />
			<Stack.Screen name="SignUpScreen" component={SignUpScreen} />
			<Stack.Screen
				name="HomeScreen"
				options={{ headerShown: false }}
				component={HomeScreen}
			/>
			<Stack.Screen name="ProfileScreen" component={ProfileScreen} />
			<Stack.Screen name="ClassScreen" component={ClassScreen} />
			<Stack.Screen name="NotificationScreen" component={NotificationScreen} />
			<Stack.Screen name="SettingsScreen" component={SettingsScreen} />
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<MyStack />
		</NavigationContainer>
	);
}
