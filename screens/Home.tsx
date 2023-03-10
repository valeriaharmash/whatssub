import React, {FC, useEffect, useState} from 'react'
import {View} from "react-native";
import {AxiosResponse} from 'axios';
import {ListRoutesResponse, Route} from "../types/api";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from '@react-navigation/native'
import {NavParamsMap} from "../navigation/navigation";
import RouteLogo from "../components/shared/RouteLogo";
import Container from "../components/shared/Container"
import client from "../apis/axios";
import {sharedStyles} from "../assets/styles";

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
			client.get('/transiter/v0.6/systems/us-ny-subway/routes?skip_service_maps=true')
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


	let grid = layout.map((row, idx) => {
			return <View key={idx} style={sharedStyles.row}>{row.map((routeId, idx) => {
				let route = routes.get(routeId)!
				return <RouteLogo
					description={(routeId === "H" || routeId === "FS" || routeId === "GS") ? route.longName : undefined}
					key={routeId}
					routeId={routeId}
					onPress={() => navigation.navigate("Route", {routeId: route.id})}
				/>
			})}
			</View>
		}
	)

	return (
		<Container>
			{grid}
		</Container>
	)
}

export default Home