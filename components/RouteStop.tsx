import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FC } from "react";
import { screenWidth, sharedStyles } from "../assets/styles";

interface P {
	name: string
	onPress?: () => void
	style: any
	prefixView?: JSX.Element
}

const styles = StyleSheet.create({
	container: {
		height: 60,
		width: screenWidth * 0.79,
	},
	name: {
		alignSelf: "center",
		textAlign: 'center',
		color: "black",
		fontStyle: "italic",
		fontSize: 15,
		paddingTop: 10,
		paddingBottom: 10,
		fontWeight: "500",
		marginLeft: 10
	},
})

const RouteStop: FC<P> = ({name, onPress, style, prefixView}) => {
	return (
		<TouchableOpacity style={[sharedStyles.row, styles.container, style]} onPress={onPress}>
			{prefixView && prefixView}
			<Text style={styles.name}>{name}</Text>
		</TouchableOpacity>
	)
}

export default RouteStop