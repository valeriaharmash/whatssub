import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { Navigator } from "./navigation";
import { colors } from "./assets/styles";
import SplashScreen from './components/SplashScreen';
import React, { useEffect, useState } from "react";

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);


	useEffect(() => {
		// SP.hideAsync()
		setTimeout(() => {
			setAppIsReady(true)
		}, 4000)
	}, [])

	if (!appIsReady) return <SplashScreen/>

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: colors.primaryColor}}>
			<Navigator/>
		</SafeAreaView>
	);
}

