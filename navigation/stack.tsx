import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer,} from '@react-navigation/native'
import {NavParamsMap} from "./navigation";
import Home from "../screens/Home";
import Route from "../screens/Route";
import Stop from "../screens/Stop";
import {colors} from "../assets/styles";

const Stack = createStackNavigator<NavParamsMap>()

const Navigator = () => {
	return <NavigationContainer>
		<Stack.Navigator initialRouteName={"Home"} screenOptions={{
			headerStyle: {},
			cardStyle: {
				backgroundColor: colors.lightGreen
			}
		}}>
			<Stack.Screen name="Home" component={Home}/>
			<Stack.Screen name="Route" component={Route}/>
			<Stack.Screen name="Stop" component={Stop}/>
		</Stack.Navigator>
	</NavigationContainer>
}

export {Navigator}
