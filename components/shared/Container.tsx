import { FC } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
	container: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 20,
		padding: 25,
		margin: 20
	}
})

const Container: FC<{ children: any }> = ({children}) => {
	return (
		<View style={styles.container}>
			{children}
		</View>
	)
}

export default Container
