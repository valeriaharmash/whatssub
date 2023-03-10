export interface ListRoutesResponse {
	routes: Route[];
}

export interface Route {
	id: string;
	shortName?: string;
	longName?: string;
	color: string;
	textColor: string;
	description?: string;
	url?: string;
	sortOrder?: number;
	type: "SUBWAY";
	alerts: Alert[];
	estimatedHeadway?: number;
	serviceMaps: RouteServiceMap[]
}

export interface Alert {
	id: string;
	cause: AlertCause;
	effect: AlertEffect;
}

export enum AlertCause {
	UNKNOWN_CAUSE = "UNKNOWN_CAUSE",
	OTHER_CAUSE = "OTHER_CAUSE",
	TECHNICAL_PROBLEM = "TECHNICAL_PROBLEM",
	STRIKE = "STRIKE",
	DEMONSTRATION = "DEMONSTRATION",
	ACCIDENT = "ACCIDENT",
	HOLIDAY = "HOLIDAY",
	WEATHER = "WEATHER",
	MAINTENANCE = "MAINTENANCE",
	CONSTRUCTION = "CONSTRUCTION",
	POLICE_ACTIVITY = "POLICE_ACTIVITY",
	MEDICAL_EMERGENCY = "MEDICAL_EMERGENCY",
	UNRECOGNIZED = "UNRECOGNIZED",
}

export enum AlertEffect {
	UNKNOWN_EFFECT = "UNKNOWN_EFFECT",
	NO_SERVICE = "NO_SERVICE",
	REDUCED_SERVICE = "REDUCED_SERVICE",
	SIGNIFICANT_DELAYS = "SIGNIFICANT_DELAYS",
	DETOUR = "DETOUR",
	ADDITIONAL_SERVICE = "ADDITIONAL_SERVICE",
	MODIFIED_SERVICE = "MODIFIED_SERVICE",
	OTHER_EFFECT = "OTHER_EFFECT",
	STOP_MOVED = "STOP_MOVED",
	NO_EFFECT = "NO_EFFECT",
	ACCESSIBILITY_ISSUE = "ACCESSIBILITY_ISSUE",
	UNRECOGNIZED = "UNRECOGNIZED",
}

export interface RouteServiceMap {
	configId: string;
	stops: StopShortInfo[];
}

export interface StopShortInfo {
	id: string;
	name?: string;
}

export interface Stop {
	id: string,
	name: string,
	description?: string;
	zoneId?: string;
	latitude?: number;
	longitude?: number;
	timezone?: string;
	type: StopType;
	serviceMaps: StopServiceMap[];
	alerts: Alert[]
	stopTimes: StopTime[];
	headsignRules: StopHeadSign[];
}

export interface StopTime {
	stop?: StopShortInfo;
	arrival?: StopTimeEstimated;
	departure?: StopTimeEstimated;
	future: boolean;
	headsign?: string;
	track?: string;
	trip?: TripShortInfo;
}

export interface StopTimeEstimated {
	time?: number;
	delay?: number;
	uncertainty?: number;
}

export enum StopType {
	STOP = "STOP",
	STATION = "STATION",
	ENTRANCE_OR_EXIT = "ENTRANCE_OR_EXIT",
	GENERIC_NODE = "GENERIC_NODE",
	BOARDING_AREA = "BOARDING_AREA",
	UNRECOGNIZED = "UNRECOGNIZED",
}

export interface StopServiceMap {
	configId: string;
	routes: RouteShortInfo[];
}

export interface RouteShortInfo {
	id: string;
	color: string;
}

export interface TripShortInfo {
	id: string;
	route?: RouteShortInfo;
	destination?: StopShortInfo;
}

export interface StopHeadSign {
	stop?: StopShortInfo;
	priority: number;
	track?: string;
	headsign: string;
}
