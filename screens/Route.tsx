import React, { FC, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { NavParamsMap } from "../navigation";
import { Alert, Route as RouteResponse } from "../types";
import client from "../apis/axios";
import { Container, RouteLogoImg, RouteStop } from "../components";
import { colors, sharedStyles } from "../assets/styles";
import { alertStatusToText, getAlertStatus } from "../utils";

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
		<View>
			<Container>
				<RouteLogoImg routeId={routeId}/>
				<ServiceAlert alerts={singleRoute.alerts} route={singleRoute}/>
				<ScrollView style={{
					marginTop: 20,
					marginBottom: 20
				}}
				            showsVerticalScrollIndicator={false}
				>
					{stopsList!.stops.map((stop, idx) => <RouteStop
						key={idx}
						style={!(idx % 2) ? {
							backgroundColor: colors.listItem,
							borderRadius: 10,
						} : {}}
						lineStyle={true}
						color={singleRoute?.color}
						name={stop.name!}
						onPress={() => navigation.navigate("Stop", {stopId: stop.id})}
					/>)}
				</ScrollView>
			</Container>
		</View>
	)
}

const ServiceAlert: FC<{ alerts: Alert[], route: RouteResponse }> = ({alerts, route}) => {

	let configIdToServiceMap = new Map();
	for (const serviceMap of route.serviceMaps) {
		configIdToServiceMap.set(serviceMap.configId, serviceMap.stops)
	}
	let activeStopIds = new Set();
	for (const stop of configIdToServiceMap.get('realtime')) {
		activeStopIds.add(stop.id)
	}
	let realtimeService = activeStopIds.size > 0

	let status = getAlertStatus(alerts)
	if (status === "GOOD_SERVICE" && !realtimeService) {
		status = "NO_SERVICE"
	}

	return <Text style={sharedStyles.mediumText}>{alertStatusToText(status)}</Text>
}

export default Route