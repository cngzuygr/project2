import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { TouchableOpacity } from "react-native";
import { TouchableOpacityBase } from "react-native";
import {
	View,
	Text,
	Image,
	StyleSheet,
	KeyboardAvoidingView,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { auth } from "../firebase";

const BG_IMG =
	"https://images.pexels.com/photos/5797913/pexels-photo-5797913.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";

const SignInScreen = ({ navigation }) => {
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			console.log(authUser);
			if (authUser) {
				navigation.replace("HomeScreen");
			}
		});
		return unsubscribe;
	}, []);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signIn = () => {
		auth
			.signInWithEmailAndPassword(email, password)
			.catch((error) => alert(error));
	};

	return (
		<KeyboardAvoidingView behavior="height" enabled style={styles.container}>
			<StatusBar style="light" />
			<Image
				source={{
					uri:
						"https://wp-media.petersons.com/blog/wp-content/uploads/2019/11/08093323/online-learning-.jpg",
				}}
				style={{ width: 200, height: 200 }}
			/>
			<View style={styles.inputContainer}>
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
					onSubmitEditing={signIn}
					onChangeText={(text) => setPassword(text)}
				/>
				<Button containerStyle={styles.button} onPress={signIn} title="Login" />
				<Button
					onPress={() => navigation.navigate("SignUpScreen")}
					containerStyle={styles.button}
					type="outline"
					title="Register"
				/>
			</View>
		</KeyboardAvoidingView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		backgroundColor: "white",
	},
	inputContainer: { width: 300 },
	button: { width: 200, marginTop: 10, alignSelf: "center" },
});

export default SignInScreen;
