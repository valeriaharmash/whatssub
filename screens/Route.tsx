import React, {FC, useEffect, useState} from "react";
import {ScrollView, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import {NavParamsMap} from "../navigation/navigation";
import {Route as RouteResponse} from "../types/api";
import client from "../apis/axios";
import RouteStop from "../components/RouteStop";
import RouteLogoImg from "../components/shared/RouteLogoImg";
import Container from "../components/shared/Container"
import {colors} from "../assets/styles";

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

export default Route