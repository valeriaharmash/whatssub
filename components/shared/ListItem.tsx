import { FC } from "react";
import { StyleProp, StyleSheet, View } from "react-native";
import { screenWidth } from "../../assets/styles";

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		height: 60,
		width: screenWidth * 0.79
	}
})

const ListItem: FC<{ children: any, style: StyleProp<any> }> = ({children, style}) => {
	return (
		<View style={[styles.container, style]}>
			{children}
		</View>
	)
}

export default ListItem
