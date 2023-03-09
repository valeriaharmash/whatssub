import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FC} from "react";
import {Stop_Reference} from "../types/api";

interface P {
	color: string
	stop: Stop_Reference
	onPress?: () => void
	style: any
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: "row",
		width: 300
	},
	name: {
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
		top: 10,
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

const RouteStop: FC<P> = ({stop, color, onPress, style}) => {
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			{/*<div className="time">{props.time}</div>*/}
			<View style={styles.map}>
				<View style={[styles.line, {backgroundColor: `#${color}`}]}/>
				<View style={styles.point}/>
			</View>
			<Text style={styles.name}>{stop.name}</Text>
		</TouchableOpacity>
	)
}

export default RouteStop