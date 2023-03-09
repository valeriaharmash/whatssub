
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
