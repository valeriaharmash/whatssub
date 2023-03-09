import React, {FC} from "react";
import {Text, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {NavParamsMap} from "../navigation/navigation";
import {RouteProp} from "@react-navigation/native";

interface P {
	navigation: StackNavigationProp<NavParamsMap, 'Route'>
	route: RouteProp<NavParamsMap, 'Route'>
}

const Route: FC<P> = ({navigation, route}) => {
	const {routeId} = route.params
	return (
		<View>
			<Text>
				{`Welcome to the route: ${routeId}`}
			</Text>
		</View>
	)
}

export default Route