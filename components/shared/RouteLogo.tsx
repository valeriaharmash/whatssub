import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import RouteLogoImg from "./RouteLogoImg";
import { screenWidth } from "../../assets/styles";

const styles = StyleSheet.create({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		margin: 5,
	},
	text: {
		color: "black",
		textAlign: 'center',
		textTransform: 'uppercase',
		marginHorizontal: 8,
		fontWeight: "bold"
	},
	description: {
		display: "flex",
		width: screenWidth * 0.15,
		textAlign: "center"
	}
})

interface P {
	routeId: string
	onPress?: () => void
	description?: string
}

const RouteLogo: FC<P> = ({routeId, onPress, description}) => {
	return <TouchableOpacity
		disabled={!onPress}
		onPress={onPress}
		style={[styles.container]}>
		<RouteLogoImg routeId={routeId}/>
		{description &&
          <Text style={styles.description}>{description}</Text>}
	</TouchableOpacity>
}

export default RouteLogo