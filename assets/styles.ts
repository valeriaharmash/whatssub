import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const sharedStyles = StyleSheet.create({
	title: {
		fontWeight: "bold"
	},
	row: {
		display: "flex",
		flexDirection: "row"
	},
	center: {
		alignItems: "center"
	},
	mediumText: {
		fontSize: 30
	}
})

const colors = {
	"primaryColor": "#023e8a",
	"listItem": "#e3f2fd",
	"white": "white"
}

export { sharedStyles, screenWidth, screenHeight, colors }
