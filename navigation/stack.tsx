import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, } from '@react-navigation/native'
import { NavParamsMap } from "./navigation";
import { Home, Route, Stop } from "../screens";
import { colors } from "../assets/styles";

const Stack = createStackNavigator<NavParamsMap>()

const Navigator = () => {
	return <NavigationContainer>
		<Stack.Navigator initialRouteName={"Home"} screenOptions={{
			headerStyle: {
				backgroundColor: colors.primaryColor,
				borderWidth: 1,
				borderBottomColor: colors.white,
				borderTopWidth: 0
			},
			cardStyle: {
				backgroundColor: colors.primaryColor
			},
			headerTintColor: colors.white,
		}}>
			<Stack.Screen name="Home" component={Home}/>
			<Stack.Screen name="Route" component={Route}/>
			<Stack.Screen name="Stop" component={Stop}/>
		</Stack.Navigator>
	</NavigationContainer>
}

export { Navigator }
