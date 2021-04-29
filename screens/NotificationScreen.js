import * as React from "react";
import {
	View,
	Text,
	Button,
	TouchableOpacity,
	Image,
	Dimensions,
	StyleSheet,
	FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import faker, { name } from "faker";
import { Ionicons } from "@expo/vector-icons";

faker.seed(10);
const DATA = [...Array(100).keys()].map((_, i) => {
	return {
		key: faker.random.uuid(),
		image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
			"women",
			"men",
		])}/${faker.random.number(60)}.jpg`,
		name: faker.name.findName(),
		jobTitle: faker.name.jobTitle(),
		email: faker.internet.email(),
	};
});

const Item = ({ image, name }) => (
	<View>
		<TouchableOpacity>
			<View
				style={{
					height: windowHeight * (1 / 10),
					borderColor: "#2f4f4f",
					borderTopWidth: 0.5,
					borderBottomWidth: 0.5,
					flexDirection: "row",
				}}
			>
				<View
					style={{
						flex: 2,
						alignItems: "center",
						alignSelf: "center",
					}}
				>
					<Image
						source={{ uri: image }}
						style={{
							borderRadius: 20,
							width: 50,
							height: 50,
						}}
					/>
				</View>
				<Text
					style={{
						fontSize: 16,
						marginLeft: 10,
						marginTop: 15,
						color: "#2f4f4f",
						flex: 7,
					}}
				>
					<Text style={{ fontWeight: "bold" }}>{name}</Text> started following
					you!
				</Text>
				<Text style={{ flex: 1, alignSelf: "flex-end" }}>1h</Text>
			</View>
		</TouchableOpacity>
	</View>
);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const NotificationScreen = ({ navigation }) => {
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "Notifications",
			headerStyle: {
				backgroundColor: "#2f4f4f",
			},
			headerTintColor: "white",
			headerTitleStyle: {
				fontWeight: "800",
				color: "white",
				alignSelf: "center",
			},
			headerRight: () => (
				<TouchableOpacity
					style={{ marginRight: 10 }}
					onPress={() => alert("s")}
				>
					<Text style={{ color: "white", fontSize: 12 }}>Clear All</Text>
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(100).then(() => setRefreshing(false));
	}, []);

	const renderItem = ({ item }) => <Item name={item.name} image={item.image} />;

	return (
		<View>
			<FlatList
				data={DATA}
				keyExtractor={(item) => item.key}
				renderItem={renderItem}
			></FlatList>
		</View>
	);
};

export default NotificationScreen;
