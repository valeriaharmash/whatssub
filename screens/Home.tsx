import React, {FC, useEffect, useState} from 'react'
import {StyleSheet, View} from "react-native";
import axios, {AxiosResponse} from 'axios';
import {ListRoutesResponse, Route} from "../types/api";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from '@react-navigation/native'
import {NavParamsMap} from "../navigation/navigation";
import RouteLogo from "../components/RouteLogo";

const styles = StyleSheet.create({
	container: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		margin: 10
	},
	row: {
		display: "flex",
		flexDirection: "row"
	}
})

interface P {
	navigation: StackNavigationProp<NavParamsMap, 'Home'>
	route: RouteProp<NavParamsMap, 'Home'>
}

const layout = [
	["1", "2", "3"],
	["4", "5", "6"],
	["7", "G", "L"],
	["A", "C", "E"],
	["B", "D", "F", "M"],
	["N", "Q", "R", "W"],
	["J", "Z", "SI"],
	["H", "FS", "GS"]
];

const Home: FC<P> = ({navigation, route}) => {
	const [routes, setRoutes] = useState<null | Map<string, Route>>(null)

	useEffect(() => {
		navigation.addListener("focus", () => {
			axios.get('https://realtimerail.nyc/transiter/v0.6/systems/us-ny-subway/routes?skip_service_maps=true')
				.then((response: AxiosResponse) => {
					const data: ListRoutesResponse = response.data
					const routesMap: Map<string, Route> = data.routes.reduce((acc, route) => {
						acc.set(route.id, route)
						return acc
					}, new Map<string, Route>())
					setRoutes(routesMap)
				})
		})
	}, [])

	if (!routes) return null

	let grid = layout.map((row) => {
			return <View style={styles.row}>{row.map((routeId, idx) => {
				let route = routes.get(routeId)!
				return <RouteLogo
					content={route.shortName!}
					onPress={() => navigation.navigate("Route", {routeId: route.id})}
					color={route.color} textColor={route.textColor}
				/>
			})}
			</View>
		}
	)

	return (
		<View style={styles.container}>
			{grid}
		</View>
	)
}

export default Home