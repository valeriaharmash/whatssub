import React, {FC, useEffect, useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import {NavParamsMap} from "../navigation/navigation";
import RouteLogo from "../components/RouteLogo";
import {Route as RouteResponse} from "../types/api";
import client from "../apis/axios";
import RouteStop from "../components/RouteStop";

const styles = StyleSheet.create({
	container: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		margin: 40,
		backgroundColor: "white",
		borderRadius: 20
	},
	row: {
		display: "flex",
		flexDirection: "row"
	}
})

interface P {
	navigation: StackNavigationProp<NavParamsMap, 'Route'>
	route: RouteProp<NavParamsMap, 'Route'>
}

const Route: FC<P> = ({navigation, route}) => {
	const {routeId} = route.params
	const [singleRoute, setSingleRoute] = useState<null | RouteResponse>(null);
	useEffect(() => {
		navigation.addListener("focus", async () => {
			const {data}: { data: RouteResponse } = await client.get(`/transiter/v0.6/systems/us-ny-subway/routes/${routeId}`)
			setSingleRoute(data)
		})

	}, [])

	if (!singleRoute) return null

	const stopsList = singleRoute.serviceMaps.find((serviceMap) => serviceMap.configId === "alltimes")

	return (
		<ScrollView>
			<View style={styles.container}>
				<RouteLogo
					content={singleRoute.shortName!}
					color={singleRoute.color} textColor={singleRoute.textColor}
				/>
				<View style={{
					marginTop: 20,
					marginBottom: 20
				}}>
					{stopsList!.stops.map((stop, idx) => <RouteStop
						style={!(idx % 2) ? {
							backgroundColor: "#e1f4f7",
							borderRadius: 10,
						} : {}}
						color={singleRoute?.color}
						stop={stop}
						onPress={() => navigation.navigate("Stop", {stopId: stop.id})}/>)}
				</View>
			</View>
		</ScrollView>
	)
}

export default Route