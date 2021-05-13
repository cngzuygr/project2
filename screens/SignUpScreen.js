import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Input, Button, Text } from "react-native-elements";

import firebase from "firebase/app";
import { auth, db } from "../firebase";

const SignUpScreen = ({ navigation }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	React.useLayoutEffect(() => {
		navigation.setOptions({});
	}, [navigation]);

	const register = () => {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				authUser.user.updateProfile({
					displayName: name,
					photoURL:
						imageUrl ||
						"https://images.pexels.com/photos/2869076/pexels-photo-2869076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				});
			})
			.then(() => {
				createUser();
			})
			.catch((error) => alert(error.message));
	};

	const createUser = async () => {
		await db
			.collection("users")
			.add({
				displayName: name,
				userImage: imageUrl,
				userEmail: email,
				userUid: auth?.currentUser?.uid,
			})
			.catch((error) => alert(error));
	};

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<StatusBar style="light" />
			<Text h3 style={{ marginBottom: 50 }}>
				Create an Account Now!
			</Text>
			<View style={styles.inputContainer}>
				<Input
					placeholder="Full Name"
					type="text"
					value={name}
					onChangeText={(text) => setName(text)}
				/>
				<Input
					placeholder="Email"
					type="email"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<Input
					placeholder="Password"
					secureTextEntry
					type="password"
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>
				<Input
					placeholder="Profile Picture Url (optional)"
					type="text"
					value={imageUrl}
					onChangeText={(text) => setImageUrl(text)}
					onSubmitEditing={register}
				/>
			</View>
			<Button
				containerStyle={styles.button}
				raised
				onPress={register}
				title="Sign Up"
			/>
		</KeyboardAvoidingView>
	);
};

export default SignUpScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		backgroundColor: "white",
	},
	button: { width: 200, marginTop: 10 },
	inputContainer: {
		width: 300,
	},
});
