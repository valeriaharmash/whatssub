import {Dimensions, StyleSheet} from "react-native";

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
	}
})

const colors = {
	"lightGreen": "#023e8a",
	"listItem": "#e3f2fd"
}

export {sharedStyles, screenWidth, screenHeight, colors}
