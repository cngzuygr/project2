import * as React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	Dimensions,
	Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { auth } from "../firebase";

const UserName = "Brenda Crist";
const PR_IMG =
	"https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?cs=srgb&dl=pexels-thgusstavo-santana-1933873.jpg&fm=jpg";

const BG_IMG =
	"https://images.pexels.com/photos/5797913/pexels-photo-5797913.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const loremText =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultricies consectetur mi eu dignissim. Quisque interdum aliquet nulla eu rhoncus. Curabitur ullamcorper nisl elit, mollis fringilla sem interdum non. Maecenas luctus condimentum egestas. In non turpis est. Nullam urna nisl, malesuada eget risus a, aliquam finibus nunc. Cras cursus id purus convallis mattis. Donec nunc turpis, lacinia nec magna non, sagittis fringilla ipsum. Etiam sed sem sed orci convallis scelerisque nec eu massa. Praesent ";
const ProfileScreen = ({ navigation }) => {
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "Profile",
			headerStyle: {
				backgroundColor: "#f2f2f2",
			},
			headerRight: () => (
				<TouchableOpacity
					style={{ marginRight: 10 }}
					onPress={() => navigation.navigate("SettingsScreen")}
				>
					<AntDesign name="setting" size={30} color="black" />
				</TouchableOpacity>
			),
		});
	}, [navigation]);
	return (
		<View>
			<View
				style={{
					flexDirection: "row",
					borderBottomColor: "black",
					borderBottomWidth: 1,
				}}
			>
				<Image
					source={{ uri: auth?.currentUser?.photoURL }}
					style={{
						width: 100,
						height: 100,
						borderRadius: 40,
						marginTop: 2,
						alignSelf: "center",
					}}
				/>
				<View style={{ flex: 1, marginLeft: 15 }}>
					<Text style={{ fontSize: 24, flex: 1, marginTop: 5 }}>
						{auth?.currentUser?.displayName}
					</Text>
					<View style={{ flexDirection: "row", marginBottom: 20 }}>
						<Text style={{ fontSize: 16 }}>2 Followers</Text>
						<Text style={{ fontSize: 16, marginLeft: 10, fontWeight: "bold" }}>
							|
						</Text>
						<Text style={{ fontSize: 16, marginLeft: 10 }}>32 Following</Text>
					</View>
				</View>
			</View>
			<View
				style={{
					height: windowHeight * (7 / 10),
					borderBottomColor: "black",
					borderBottomWidth: 1,
				}}
			>
				<Text style={{ marginTop: 10, fontSize: 16 }}>About Me</Text>
				<Text>{loremText}</Text>
			</View>
			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity style={{ marginLeft: 20, marginTop: 10 }}>
					<FontAwesome5 name="facebook" size={32} color="black" />
				</TouchableOpacity>
				<TouchableOpacity style={{ marginLeft: 20, marginTop: 13 }}>
					<Entypo name="twitter" size={32} color="black" />
				</TouchableOpacity>
				<TouchableOpacity style={{ marginLeft: 20, marginTop: 13 }}>
					<AntDesign name="instagram" size={32} color="black" />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => Alert.alert("Email", `${auth?.currentUser?.email}`)}
					style={{ marginLeft: 20, marginTop: 13 }}
				>
					<MaterialIcons name="alternate-email" size={32} color="black" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ProfileScreen;
