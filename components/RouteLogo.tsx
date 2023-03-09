import React, {FC} from 'react'
import {StyleSheet, Text, TouchableOpacity} from "react-native";

const styles = StyleSheet.create({
	container: {
		display: "flex",
		width: 60,
		height: 60,
		borderRadius: 50,
		borderColor: "black",
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
		margin: 3
	},
	text: {
		color: "black",
		textAlign: 'center',
		textTransform: 'uppercase',
		marginHorizontal: 8,
		fontWeight: "bold"
	}
})

interface P {
	content: string
	onPress: () => void
	color: string
	textColor: string
}

const RouteLogo: FC<P> = ({content, onPress, color, textColor}) => {

	return <TouchableOpacity
		onPress={onPress}
		style={[styles.container, {backgroundColor: `#${color}`}]}>
		<Text style={[styles.text, {color: "white"}]}>{content}</Text>
	</TouchableOpacity>
}

export default RouteLogo