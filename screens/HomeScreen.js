import React, { useState, useEffect } from "react";
import {
	StatusBar,
	Image,
	Animated,
	Text,
	View,
	Dimensions,
	StyleSheet,
	RefreshControl,
	TextInput,
	TouchableOpacity,
	Modal,
	ScrollView,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { auth, db } from "../firebase";
import { Input } from "react-native-elements/dist/input/Input";

const keyboardVerticalOffset = Platform.OS === "android" ? 40 : 0;

const BG_IMG =
	"https://images.pexels.com/photos/5797913/pexels-photo-5797913.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = 150 + SPACING;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const roomCap = 20;
const activeListeners = 15;

const wait = (timeout) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = ({ navigation }) => {
	const [chats, setChats] = useState([]);

	const DATA = chats.map(
		({
			id,
			data: { chatAdmin, chatName, chatTitle, chatAdminImage, chatType },
		}) => {
			return {
				key: id,
				image: chatAdminImage,
				name: chatAdmin,
				jobTitle: chatTitle,
				className: chatName,
				roomType: chatType,
			};
		}
	);

	const createChat = async () => {
		await db
			.collection("chats")
			.add({
				chatName: inputClass,
				chatTitle: inputClassTitle,
				chatType: inputClassType,
				chatAdmin: auth?.currentUser?.displayName,
				chatAdminImage: auth?.currentUser?.photoURL,
			})
			.then(() => {
				navigation.navigate("ClassScreen");
				setInputClass("");
				setCountModal(false);
				setInputClassTitle("");
			})
			.catch((error) => alert(error));
	};

	useEffect(() => {
		const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
			setChats(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);
		return unsubscribe;
	}, []);

	const [inputClassType, setInputClassType] = useState("");
	const [inputClass, setInputClass] = useState("");
	const [inputClassTitle, setInputClassTitle] = useState("");
	const [refreshing, setRefreshing] = React.useState(false);
	const [countModal, setCountModal] = useState(false);
	const onPressModal = () =>
		countModal == false ? setCountModal(true) : setCountModal(false);

	const [countPublic, setCountPublic] = useState("white");
	const [countPublicBackground, setCountPublicBackground] = useState("#191919");
	const [countPrivate, setCountPrivate] = useState("white");
	const [countPrivateBackground, setCountPrivateBackground] =
		useState("#191919");
	const [countFollowers, setCountFollowers] = useState("white");
	const [countFollowersBackground, setCountFollowersBackground] =
		useState("#191919");
	const onPressPublic = () => {
		setInputClassType("Public");
		setCountPrivateBackground("#191919");
		setCountFollowersBackground("#191919");
		countPublicBackground == "#191919"
			? setCountPublicBackground("#024b30")
			: setCountPublicBackground("#191919");
		countPublic == "white" ? setCountPublic("white") : setCountPublic("white");
	};

	const onPressPrivate = () => {
		setInputClassType("Private");
		setCountPublicBackground("#191919");
		setCountFollowersBackground("#191919");
		countPrivateBackground == "#191919"
			? setCountPrivateBackground("#024b30")
			: setCountPrivateBackground("#191919");
		countPrivate == "white"
			? setCountPrivate("white")
			: setCountPrivate("white");
	};

	const onPressFollowers = () => {
		setInputClassType("Followers Only");
		setCountPrivateBackground("#191919");
		setCountPublicBackground("#191919");
		countFollowersBackground == "#191919"
			? setCountFollowersBackground("#024b30")
			: setCountFollowersBackground("#191919");
		countFollowers == "white"
			? setCountFollowers("white")
			: setCountFollowers("white");
	};

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(100).then(() => setRefreshing(false));
	}, []);

	const scrollY = React.useRef(new Animated.Value(0)).current;

	return (
		<View style={{ backgroundColor: "black", marginTop: -20 }}>
			<View style={styles.containerTop}>
				<View
					style={{
						flexDirection: "row",
						backgroundColor: "#a7a8aa",
						padding: 5,
						borderRadius: 10,
						width: windowWidth * (5 / 10),
						marginLeft: 20,
						marginTop: 15,
					}}
				>
					<AntDesign
						name="search1"
						size={16}
						color="black"
						style={{ alignSelf: "center", marginLeft: 5 }}
					/>
					<TextInput
						style={{ flex: 1 }}
						placeholder="Search for more"
					></TextInput>
				</View>
				<TouchableOpacity
					onPress={() => navigation.navigate("NotificationScreen")}
					style={{ marginLeft: 60, marginTop: 15 }}
				>
					<Ionicons
						name="ios-notifications-outline"
						size={36}
						color="black"
						backgroundColor="#eef2f6"
						iconStyle={{
							marginLeft: 10,
							width: 30,
							backgroundColor: "#eef2f6",
						}}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate("ProfileScreen")}
					style={{}}
					style={{ marginLeft: 10, marginTop: 15 }}
				>
					<Image
						source={{ uri: auth?.currentUser?.photoURL }}
						style={{
							width: 35,
							height: 35,
							borderRadius: 20,
							marginTop: 2,
							marginLeft: 5,
						}}
					/>
				</TouchableOpacity>
			</View>
			<View
				style={{
					backgroundColor: "#fff",
					width: windowWidth,
					height: windowHeight * (9 / 10),
					flexDirection: "row",
				}}
			>
				<Image
					source={{ uri: BG_IMG }}
					style={StyleSheet.absoluteFillObject}
					blurRadius={4}
				/>
				<Animated.FlatList
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					data={DATA}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: scrollY } } }],
						{ useNativeDriver: true }
					)}
					keyExtractor={(item) => item.key}
					contentContainerStyle={{
						padding: SPACING,
						paddingTop: StatusBar.currentHeight || 42,
					}}
					renderItem={({ item, index }) => {
						const inputRange = [
							-1,
							0,
							ITEM_SIZE * index,
							ITEM_SIZE * (index + 2),
						];

						const opacityInputRange = [
							-1,
							0,
							ITEM_SIZE * index,
							ITEM_SIZE * (index + 0.7),
						];

						const scale = scrollY.interpolate({
							inputRange,
							outputRange: [1, 1, 1, 0],
						});

						const opacity = scrollY.interpolate({
							inputRange: opacityInputRange,
							outputRange: [1, 1, 1, 0],
						});

						return (
							<View>
								<TouchableOpacity
									onPress={() => navigation.navigate("ClassScreen", { item })}
								>
									<Animated.View
										style={{
											flexDirection: "column",
											padding: SPACING,
											marginBottom: SPACING,
											backgroundColor: "rgba(136,136,136,0.7)",
											borderRadius: 12,
											height: 150,
											opacity,
											transform: [{ scale }],
										}}
									>
										<View style={{ flexDirection: "row" }}>
											<View style={{ flexDirection: "column", flex: 1 }}>
												<Text style={{ fontSize: 22, fontWeight: "700" }}>
													{item.className}
												</Text>
												<Text style={{ opacity: 0.7 }}>{item.jobTitle}</Text>
												<View style={{ flexDirection: "row" }}>
													<Image
														source={{ uri: item.image }}
														style={{
															width: AVATAR_SIZE / 2,
															height: AVATAR_SIZE / 2,
															borderRadius: AVATAR_SIZE / 2,
															marginRight: SPACING / 2,
															marginTop: SPACING + 10,
														}}
													/>
													<Text
														style={{
															marginTop: SPACING + 10,
															maxWidth: windowWidth / 2,
														}}
													>
														{item.name}
													</Text>
												</View>
											</View>
											<View style={{ justifyContent: "space-between" }}>
												<SimpleLineIcons name="lock-open" size={16}>
													{item.roomType}
												</SimpleLineIcons>
												<Text style={{ alignSelf: "flex-end" }}>
													{activeListeners}/{roomCap}
												</Text>
											</View>
										</View>
									</Animated.View>
								</TouchableOpacity>
							</View>
						);
					}}
				/>
			</View>
			<TouchableOpacity
				onPress={onPressModal}
				style={{
					backgroundColor: "#c0c0c0",
					alignItems: "center",
					alignSelf: "center",
					borderTopRightRadius: 100,
					borderTopLeftRadius: 100,
					borderWidth: 1.5,
					borderColor: "#191919",
					width: windowWidth * (5.5 / 10),
					position: "absolute",
					marginTop: windowHeight * (9.5 / 10),
				}}
			>
				<View
					style={{
						flexDirection: "row",
						padding: 5,
						borderRadius: 10,
					}}
				>
					<Text
						style={{
							color: "#191919",
							padding: 5,
							textAlign: "center",
							fontSize: 17,
						}}
					>
						Start a Class
					</Text>
				</View>
			</TouchableOpacity>
			<Modal transparent={true} visible={countModal}>
				<ScrollView style={{ flex: 1, backgroundColor: "#000000aa" }}>
					<View
						style={{
							width: windowWidth * (8 / 10),
							backgroundColor: "#191919",
							height: windowHeight * (6 / 10),
							alignSelf: "center",
							borderRadius: 50,
							marginTop: windowHeight * (0.7 / 10),
							flexDirection: "column",
						}}
					>
						<Text
							style={{
								alignSelf: "center",
								color: "white",
								fontFamily: "monospace",
								marginTop: 10,
							}}
						>
							Start a Class
						</Text>
						<View
							style={{
								flexDirection: "row",
								marginTop: 10,
								backgroundColor: "#191919",
							}}
						>
							<View>
								<Text
									style={{
										color: "white",
										marginLeft: 20,
										fontFamily: "monospace",
										alignSelf: "center",
									}}
								>
									Class Name
								</Text>
							</View>
							<View
								style={{
									backgroundColor: "#191919",
									flex: 1,
								}}
							>
								<Input
									backgroundColor="white"
									value={inputClass}
									maxLength={15}
									onChangeText={(text) => setInputClass(text)}
									style={{
										width: windowWidth * (3 / 10),
										fontFamily: "monospace",
										fontWeight: "bold",
										color: "#191919",
										borderRadius: 10,
										alignSelf: "flex-end",
										marginRight: 30,
									}}
								></Input>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								marginTop: 10,
								backgroundColor: "#191919",
							}}
						>
							<View>
								<Text
									style={{
										color: "white",
										marginLeft: 20,
										fontFamily: "monospace",
										alignSelf: "center",
									}}
								>
									Class Title
								</Text>
							</View>
							<View
								style={{
									backgroundColor: "#191919",
									flex: 1,
								}}
							>
								<Input
									backgroundColor="white"
									maxLength={50}
									value={inputClassTitle}
									onChangeText={(text) => setInputClassTitle(text)}
									style={{
										//flex: 1,
										width: windowWidth * (3 / 10),
										//alignSelf: "center",
										fontFamily: "monospace",
										fontWeight: "bold",
										color: "#191919",
										borderRadius: 10,
										alignSelf: "flex-end",
										marginRight: 30,
									}}
								></Input>
							</View>
						</View>
						<View
							style={{
								backgroundColor: "#191919",
								marginTop: 30,
								flexDirection: "row",
								justifyContent: "space-around",
							}}
						>
							<View
								style={{
									alignItems: "center",
									backgroundColor: `${countPublicBackground}`,
									borderRadius: 5,
								}}
							>
								<TouchableOpacity
									onPress={onPressPublic}
									style={{
										alignSelf: "center",
									}}
								>
									<SimpleLineIcons
										name="lock-open"
										size={64}
										color={countPublic}
										style={{}}
									/>
								</TouchableOpacity>
								<Text
									style={{
										color: "white",
										alignSelf: "center",
										fontFamily: "monospace",
									}}
								>
									Public
								</Text>
							</View>
							<View
								style={{
									alignItems: "center",
									backgroundColor: `${countPrivateBackground}`,
									borderRadius: 5,
								}}
							>
								<TouchableOpacity
									onPress={onPressPrivate}
									style={{
										alignSelf: "center",
									}}
								>
									<SimpleLineIcons
										name="lock"
										size={64}
										color={countPrivate}
										style={{}}
									/>
								</TouchableOpacity>
								<Text
									style={{
										color: "white",
										alignSelf: "center",
										fontFamily: "monospace",
									}}
								>
									Private
								</Text>
							</View>
							<View
								style={{
									alignItems: "center",
									backgroundColor: `${countFollowersBackground}`,
									borderRadius: 5,
								}}
							>
								<TouchableOpacity
									onPress={onPressFollowers}
									style={{
										alignSelf: "center",
									}}
								>
									<FontAwesome5
										name="user-friends"
										size={64}
										color={countFollowers}
										style={{}}
									/>
								</TouchableOpacity>
								<Text
									style={{
										color: "white",
										alignSelf: "center",
										fontFamily: "monospace",
									}}
								>
									Followers-Only
								</Text>
							</View>
						</View>
						<TouchableOpacity
							style={{
								alignSelf: "center",
								marginTop: 50,
							}}
							onPress={createChat}
						>
							<Text
								style={{
									backgroundColor: "white",
									alignSelf: "center",
									width: windowWidth * (5 / 10),
									textAlign: "center",
									borderRadius: 2,
									color: "#191919",
								}}
							>
								Done!
							</Text>
						</TouchableOpacity>
						<View style={{}}>
							<TouchableOpacity
								style={{
									alignSelf: "center",
									marginTop: 50,
									borderWidth: 2,
									borderColor: "white",
									borderRadius: 20,
								}}
								onPress={onPressModal}
							>
								<Entypo name="cross" size={32} color="white" />
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	containerTop: {
		height: windowHeight * (1 / 10),
		width: windowWidth,
		backgroundColor: "white",
		flexDirection: "row",
		alignItems: "center",
		marginTop: 0,
	},
	messageBox: {
		marginLeft: 0,
		marginTop: 0,
	},
	nots: {
		marginTop: 0,
		marginLeft: 0,
	},
	leaveButton: {
		flexDirection: "row",
		backgroundColor: "rgb(190, 103, 101)",
		padding: 5,
		borderRadius: 15,
		alignItems: "center",
	},
	text: {
		color: "white",
		padding: 5,
		width: 100,
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 17,
	},
	hand: {
		marginLeft: 20,
		borderRadius: 5,
		alignSelf: "center",
	},
	addPerson: {
		marginLeft: 35,
	},
	mic: {
		marginLeft: 35,
	},
});

export default HomeScreen;
