import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FC} from "react";
import {screenWidth, sharedStyles} from "../assets/styles";

interface P {
	color: string
	name: string
	onPress?: () => void
	style: any
	time?: string
	lineStyle?: boolean
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
		fontWeight: "500"
	},
	map: {
		flexDirection: "row",
		flexShrink: 0,
		width: 20,
		position: "relative",
	},
	line: {
		width: 4,
		left: 8,
		position: "absolute",
		top: 0,
		bottom: 0,
	},
	point: {
		left: 5,
		top: 25,
		backgroundColor: "white",
		width: 10,
		height: 10,
		borderStyle: "solid",
		borderColor: "black",
		position: "absolute",
		borderRadius: 50,
		borderWidth: 2,
	}
})

const RouteStop: FC<P> = ({name, color, onPress, style, time, lineStyle}) => {
	return (
		<TouchableOpacity style={[sharedStyles.row, styles.container, style]} onPress={onPress}>
			<Text>{time}</Text>
			{lineStyle && <View style={styles.map}>
              <View style={[styles.line, {backgroundColor: `#${color}`}]}/>
              <View style={styles.point}/>
            </View>}
			<Text style={styles.name}>{name}</Text>
		</TouchableOpacity>
	)
}

export default RouteStop