import React, { FC, useEffect, useState } from 'react'
import { StackNavigationProp } from "@react-navigation/stack";
import { NavParamsMap } from "../navigation";
import { RouteProp } from "@react-navigation/native";
import { ScrollView, StyleProp, Text, TouchableOpacity, View } from "react-native";
import { AxiosResponse } from "axios";
import { RouteShortInfo, Stop as StopResponse, StopTime, TripShortInfo } from "../types";
import client from "../apis/axios";
import { colors, sharedStyles } from "../assets/styles";
import { Container, RouteLogo, RouteLogoImg, RouteStop } from "../components"

interface P {
	navigation: StackNavigationProp<NavParamsMap, 'Stop'>
	route: RouteProp<NavParamsMap, 'Stop'>
}

const Stop: FC<P> = ({navigation, route}) => {
	const {stopId} = route.params;
	const [stop, setStop] = useState<null | StopResponse>(null)

	useEffect(() => {
		navigation.addListener("focus", () => {
			client.get(`/transiter/v0.6/systems/us-ny-subway/stops/${stopId}`)
				.then((response: AxiosResponse) => {
					const stop: StopResponse = response.data
					setStop(stop)
				})
		})
	}, [])

	if (!stop) return null;

	let headSignToStopTimes = new Map();
	for (const headSignRule of stop.headsignRules) {
		headSignToStopTimes.set(headSignRule.headsign, [])
	}
	for (const stopTime of stop.stopTimes) {
		let headSign = stopTime.headsign ?? "(terminating trains)"
		if (!headSignToStopTimes.has(headSign)) {
			headSignToStopTimes.set(headSign, [])
		}
		headSignToStopTimes.get(headSign).push(stopTime)
	}

	let headSigns = [];
	for (const [headSign] of headSignToStopTimes) {
		headSigns.push(headSign);
	}
	headSigns.sort();

	let routes: RouteShortInfo[] = [];
	for (const serviceMap of stop.serviceMaps) {
		if (serviceMap.configId === 'weekday') {
			serviceMap.routes.forEach(
				route => routes.push(route)
			)
		}
	}
	let currentTime = Math.round((new Date()).getTime() / 1000);

	let stopTimes = [];
	for (const headSign of headSigns) {
		stopTimes.push(
			<HeadSignStopTimes key={headSign} headSign={headSign}
			                   stopTimes={headSignToStopTimes.get(headSign) ?? []}
			                   currentTime={currentTime}/>
		)
	}

	return (
		<Container>
			<View style={{display: "flex", alignItems: "center", alignContent: "center"}}>
				<Text style={sharedStyles.mediumText}>{stop.name}</Text>
				<View style={{flexDirection: "row"}}>{
					routes?.map((route, idx) => <RouteLogo
						key={idx}
						routeId={route.id}
						onPress={() => navigation.push("Route", {routeId: route.id})}/>)
				}</View>
				<ScrollView showsVerticalScrollIndicator={false}>
					{stopTimes}
				</ScrollView>
			</View>
		</Container>
	)
}

type HeadSignStopTimesProps = {
	headSign: string;
	stopTimes: StopTime[];
	currentTime: number;
}

const HeadSignStopTimes: FC<HeadSignStopTimesProps> = ({headSign, stopTimes, currentTime}) => {

	let [maxStopTimes, setMaxStopTimes] = useState(4);

	let children = [];
	children.push(
		<Text key="subHeading" style={{color: colors.primaryColor, fontSize: 20, marginBottom: 10}}>
			{headSign}
		</Text>
	);
	let rendered = 0;
	let skipped = 0;
	if (stopTimes.length === 0) {
		children.push(
			<Text key="noTrainsScheduled" style={sharedStyles.title}>
				No trains scheduled
			</Text>
		);
	}
	let tripStopTimeElements = [];
	for (let i = 0; i < stopTimes.length; i++) {
		const stopTime = stopTimes[i]
		let tripTime = stopTime.arrival?.time;
		if (tripTime === undefined) {
			tripTime = stopTime.departure?.time;
		}
		if (tripTime === undefined) {
			skipped += 1;
			continue
		}

		if (tripTime < currentTime) {
			skipped += 1;
			continue;
		}
		if (rendered >= maxStopTimes && tripTime - currentTime > 10 * 60) {
			break
		}
		if (!stopTime.trip) {
			skipped += 1;
			continue;
		}
		rendered += 1
		let trip: TripShortInfo = stopTime.trip;
		tripStopTimeElements.push(
			<TripStopTime
				style={(i % 2) ? {
					backgroundColor: colors.listItem,
					borderRadius: 10,
				} : {}}
				key={"trip" + trip.id}
				lastStopName={trip.destination?.name || ""}
				routeId={trip.route?.id || ""}
				time={tripTime - currentTime}
			/>
		);
	}
	if (rendered > maxStopTimes) {
		maxStopTimes = rendered
	}
	children.push(
		<View key="tripStopTimes">
			{tripStopTimeElements}
		</View>
	);
	if (rendered + skipped !== stopTimes.length) {
		children.push(
			<TouchableOpacity
				key="moreTrips"
				style={{
					display: "flex",
					justifyContent: "center",
					height: 60,
				}}
				onPress={() => setMaxStopTimes(maxStopTimes + 4)}
			>
				<Text style={[sharedStyles.title]}>
					show more trains
				</Text>
			</TouchableOpacity>
		)
	}
	return <View style={{alignItems: "center", marginBottom: 20}}>{children}</View>

}

interface TripStopTimeP {
	lastStopName: string,
	routeId: string,
	time: any,
	style: StyleProp<any>
}

const TripStopTime: FC<TripStopTimeP> = ({
	                                         lastStopName,
	                                         routeId,
	                                         time,
	                                         style,
                                         }) => {
	let displayTime;
	if (time < 30) {
		displayTime = "Now"
	} else if (time < 60) {
		displayTime = "<1m"
	} else {
		displayTime = Math.floor(time / 60).toString() + "m"
	}

	return (
		<RouteStop
			name={lastStopName}
			style={{...sharedStyles.center, padding: 10, ...style}}
			prefixView={<TimeView routeId={routeId} time={displayTime}/>}
		/>
	)
}

const TimeView: FC<{ routeId: string, time: string }> = ({routeId, time}) => {
	return <View style={[sharedStyles.row, sharedStyles.center, {justifyContent: "space-between", width: 70}]}>
		<Text style={{textAlign: "center"}}>{time}</Text>
		<RouteLogoImg small routeId={routeId}/>
	</View>
}

export default Stop;