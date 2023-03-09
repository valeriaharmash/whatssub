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
	alerts: Alert_Reference[];
	estimatedHeadway?: number;
	serviceMaps: Route_ServiceMap[]
}

export interface Alert_Reference {
	id: string;
	cause: Alert_Cause;
	effect: Alert_Effect;
}

export enum Alert_Cause {
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

export enum Alert_Effect {
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

export interface Route_ServiceMap {
	configId: string;
	stops: Stop_Reference[];
}

export interface Stop_Reference {
	id: string;
	name?: string;
}

export interface Stop {
	id: string,
	name: string,
	description?: string | undefined;
	zoneId?: string | undefined;
	latitude?: number | undefined;
	longitude?: number | undefined;
	timezone?: string | undefined;
	type: Stop_Type;
	serviceMaps: Stop_ServiceMap[];
	alerts: Alert_Reference[]
	stopTimes: StopTime[];
	headsignRules: Stop_HeadsignRule[];
}

export interface StopTime {
	stop: Stop_Reference | undefined;
	arrival: StopTime_EstimatedTime | undefined;
	departure: StopTime_EstimatedTime | undefined;
	future: boolean;
	headsign?: string;
	track?: string;
	trip: Trip_Reference | undefined;
}

export interface StopTime_EstimatedTime {
	time?: number;
	delay?: number;
	uncertainty?: number;
}

export enum Stop_Type {
	STOP = "STOP",
	STATION = "STATION",
	ENTRANCE_OR_EXIT = "ENTRANCE_OR_EXIT",
	GENERIC_NODE = "GENERIC_NODE",
	BOARDING_AREA = "BOARDING_AREA",
	UNRECOGNIZED = "UNRECOGNIZED",
}

export interface Stop_ServiceMap {
	configId: string;
	routes: Route_Reference[];
}

export interface Route_Reference {
	id: string;
	color: string;
}

export interface Trip_Reference {
	id: string;
	route: Route_Reference | undefined;
	destination: Stop_Reference | undefined;
	vehicle?: Vehicle_Reference | undefined;
}

export interface Vehicle_Reference {
	id: string;
}

export interface Stop_HeadsignRule {
	stop: Stop_Reference | undefined;
	priority: number;
	track?: string | undefined;
	headsign: string;
}
