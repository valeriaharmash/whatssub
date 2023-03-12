import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors } from "../assets/styles";

const splash = require("../assets/splash.gif");

const SplashScreen = () => {
	return (
		<View style={styles.container}>
			<Image source={splash}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primaryColor,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default SplashScreen