import { Alert } from "../types";

type AlertStatus = "GOOD_SERVICE" | "DELAYS" | "SERVICE_CHANGE" | "NO_SERVICE"

export function getAlertStatus(alerts: Alert[]): AlertStatus {
	if (alerts.length === 0) {
		return "GOOD_SERVICE"
	}
	for (const alert of alerts) {
		if (alert.cause.includes("DELAY")) {
			return "DELAYS"
		}
		if (alert.effect.includes("DELAY")) {
			return "DELAYS"
		}
	}
	return "SERVICE_CHANGE"
}

export const alertStatusToText = (status: AlertStatus): string => {
	if (status === "GOOD_SERVICE") {
		return "Good Service"
	} else if (status === "DELAYS") {
		return "Delays"
	} else if (status === "SERVICE_CHANGE") {
		return "Service Change"
	} else {
		return "No Service"
	}
}