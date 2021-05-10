import { name } from "faker";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import data from "../consts/dataClass";
import { auth } from "../firebase";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ClassScreen = ({ route, navigation }) => {
	const Item = ({ image }) => (
		<View style={{}}>
			<TouchableOpacity
				onPress={() => navigation.navigate("ProfileScreen")}
				style={{
					backgroundColor: "#c0c0c0",
					borderRadius: 50 / 2,
					width: 40,
					height: 40,
					backgroundColor: "black",
					marginStart: windowWidth * (1 / 100),
					marginTop: windowHeight * (1 / 128),
				}}
			>
				<Image
					source={{ uri: image }}
					style={{
						width: 40,
						height: 40,
						borderRadius: 50 / 2,
						marginRight: 20 / 2,
						borderWidth: 4,
						borderColor: `${countClassListenersBorder}`,
					}}
				/>
			</TouchableOpacity>
		</View>
	);

	const { name, className, jobTitle, image } = route.params.item;
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "Class",
			headerTitleAlign: "center",
			headerStyle: {
				height: 60,
				backgroundColor: "#e67e00",
			},
			headerTintColor: "white",
			headerTitleStyle: {
				fontWeight: "800",
				color: "white",
				alignSelf: "center",
			},
		});
	}, [navigation]);

	const renderItem = ({ item }) => <Item image={item.image} />;

	const [countMic, setCountMic] = useState("microphone");
	const onPressMic = () =>
		countMic == "microphone"
			? setCountMic("microphone-slash")
			: setCountMic("microphone");

	const [countHand, setCountHand] = useState("#2f4f4f");
	const [countClassListenersBorder, setCountClassListenersBorder] = useState(
		"white"
	);

	const onPressHand = () => {
		countHand == "#2f4f4f" ? setCountHand("red") : setCountHand("#2f4f4f"),
			countClassListenersBorder == "white"
				? setCountClassListenersBorder("green")
				: setCountClassListenersBorder("white");
	};
	return (
		<View style={{ flexDirection: "column", height: "100%" }}>
			<View style={{}}>
				<Text style={{ alignSelf: "center", fontSize: 24 }}>{className}</Text>
				<Text
					style={{
						borderBottomWidth: 1,
						borderBottomColor: "black",
						alignSelf: "center",
					}}
				>
					{jobTitle}
				</Text>
			</View>
			<Text
				style={{
					fontSize: 16,
					color: "black",
					marginTop: 5,
				}}
			>
				Teachers{" : "}
				{auth?.currentUser?.displayName}
			</Text>
			<View style={{}}>
				<TouchableOpacity
					style={{
						backgroundColor: "#c0c0c0",
						borderRadius: 50 / 2,
						width: 50,
						height: 50,
					}}
				>
					<Image
						source={{ uri: auth?.currentUser?.photoURL }}
						style={{
							width: 50,
							height: 50,
							borderRadius: 50 / 2,
							marginRight: 20 / 2,
						}}
					/>
				</TouchableOpacity>
			</View>
			<Text
				style={{
					fontSize: 16,
					color: "black",
				}}
			>
				Listeners
			</Text>
			<FlatList
				numColumns={9}
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.key}
				style={{ height: windowHeight * (2 / 10) }}
			/>
			<View
				style={{
					marginBottom: 0,
					borderTopWidth: 2,
					borderTopColor: "#00000022",
					backgroundColor: "#DDDDDD",
				}}
			>
				<View
					style={{
						height: windowHeight * (1 / 10),
						width: windowWidth,
						flexDirection: "row",
					}}
				>
					<TouchableOpacity
						style={{
							height: windowWidth * (1 / 8),
							width: windowWidth * (1 / 8),
							borderRadius: 20,
							borderWidth: 1,
							borderColor: "gray",
							marginLeft: windowWidth * (1 / 20),
							alignItems: "center",
							alignSelf: "center",
						}}
						onPress={onPressHand}
					>
						<Ionicons
							name="hand-right"
							size={windowWidth * (1 / 12)}
							color={countHand}
							style={{ padding: 5 }}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							height: windowWidth * (1 / 8),
							width: windowWidth * (1 / 8),
							borderRadius: 20,
							borderWidth: 1,
							borderColor: "gray",
							marginLeft: windowWidth * (1 / 20),
							alignItems: "center",
							alignSelf: "center",
						}}
					>
						<FontAwesome
							name="user-plus"
							size={windowWidth * (1 / 12)}
							color="#2f4f4f"
							style={{ padding: 5 }}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={onPressMic}
						style={{
							height: windowWidth * (1 / 8),
							width: windowWidth * (1 / 8),
							borderRadius: 20,
							borderWidth: 1,
							borderColor: "gray",
							marginLeft: windowWidth * (1 / 20),
							alignItems: "center",
							alignSelf: "center",
						}}
					>
						<FontAwesome
							name={countMic}
							size={windowWidth * (1 / 12)}
							color="#2f4f4f"
							style={{ padding: 5 }}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							alignItems: "center",
							alignSelf: "center",
							marginLeft: 20,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								backgroundColor: "rgb(190, 103, 101)",
								padding: 5,
								borderRadius: 15,
								//marginLeft: 20,
								//marginTop: windowHeight * (1 / 52),
								alignItems: "center",
							}}
						>
							<Ionicons name="exit-outline" size={32} color="white" />
							<Text
								style={{
									color: "white",
									padding: 5,
									width: 100,
									textAlign: "center",
									fontWeight: "bold",
									fontSize: 16,
								}}
							>
								Leave
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default ClassScreen;
