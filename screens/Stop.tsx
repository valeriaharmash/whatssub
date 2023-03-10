import React, {FC, useEffect, useState} from 'react'
import {StackNavigationProp} from "@react-navigation/stack";
import {NavParamsMap} from "../navigation/navigation";
import {RouteProp} from "@react-navigation/native";
import {ScrollView, StyleProp, Text, View} from "react-native";
import {AxiosResponse} from "axios";
import {Route_Reference, Stop as StopResponse, StopTime, Trip_Reference} from "../types/api";
import RouteLogo from "../components/shared/RouteLogo";
import client from "../apis/axios";
import RouteLogoImg from "../components/shared/RouteLogoImg";
import {colors, sharedStyles} from "../assets/styles";
import Container from "../components/shared/Container"
import ListItem from "../components/shared/ListItem";

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

	let headsignToStopTimes = new Map();
	for (const headsignRule of stop.headsignRules) {
		headsignToStopTimes.set(headsignRule.headsign, [])
	}
	for (const stopTime of stop.stopTimes) {
		let headsign = stopTime.headsign ?? "(terminating trains)"
		if (!headsignToStopTimes.has(headsign)) {
			headsignToStopTimes.set(headsign, [])
		}
		headsignToStopTimes.get(headsign).push(stopTime)
	}

	let headsigns = [];
	for (const [headsign] of headsignToStopTimes) {
		headsigns.push(headsign);
	}
	headsigns.sort();

	let routes: Route_Reference[] = [];
	for (const serviceMap of stop.serviceMaps) {
		if (serviceMap.configId === 'weekday') {
			serviceMap.routes.forEach(
				route => routes.push(route)
			)
		}
	}
	let currentTime = Math.round((new Date()).getTime() / 1000);

	let stopTimes = [];
	for (const headsign of headsigns) {
		stopTimes.push(
			<HeadsignStopTimes key={headsign} headsign={headsign}
			                   stopTimes={headsignToStopTimes.get(headsign) ?? []}
			                   currentTime={currentTime}/>
		)
	}

	return (
		<Container>

			<View style={{display: "flex", alignItems: "center", alignContent: "center"}}>
				<Text style={{fontSize: 40}}>{stop.name}</Text>
				<View style={{flexDirection: "row"}}>{
					routes?.map(route => <RouteLogo
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

type HeadsignStopTimesProps = {
	headsign: string;
	stopTimes: StopTime[];
	currentTime: number;
}

const HeadsignStopTimes: FC<HeadsignStopTimesProps> = ({headsign, stopTimes, currentTime}) => {

	let [maxStopTimes, setMaxStopTimes] = useState(4);

	let children = [];
	children.push(
		<Text key="subHeading" style={{color: colors.lightGreen, fontSize: 20, marginBottom: 10}}>
			{headsign}
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
		let trip: Trip_Reference = stopTime.trip;
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
			<View style={{
				display: "flex",
				justifyContent: "center",
				height: 60,
			}}>
				<Text key="moreTrips" style={[sharedStyles.title]}
				      onPress={() => setMaxStopTimes(maxStopTimes + 4)}>
					show more trains
				</Text>
			</View>
		)
	}
	return <View style={{alignItems: "center", marginBottom: 20}}>{children}</View>

}

interface TSTP {
	lastStopName: string,
	routeId: string,
	time: any,
	style: StyleProp<any>
}

const TripStopTime: FC<TSTP> = ({
	                                lastStopName,
	                                routeId,
	                                time,
	                                style,
                                }) => {
	let displayTime = "";
	if (time < 30) {
		displayTime = "Now"
	} else if (time < 60) {
		displayTime = "<1m"
	} else {
		displayTime = Math.floor(time / 60).toString() + "m"
	}

	return (
		<ListItem style={{...sharedStyles.center, padding: 10, ...style}}>
			<View style={[sharedStyles.row, sharedStyles.center, {justifyContent: "space-between", width: 70}]}>
				<Text style={{textAlign: "center"}}>{displayTime}</Text>
				<RouteLogoImg small routeId={routeId}/>
			</View>
			<Text style={[{
				display: "flex",
				paddingLeft: 10
			}, sharedStyles.title]}>{lastStopName}</Text>

		</ListItem>
	)
}


export default Stop;