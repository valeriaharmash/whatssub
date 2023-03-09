import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer,} from '@react-navigation/native'
import {NavParamsMap} from "./navigation";
import Home from "../screens/Home";
import Route from "../screens/Route";

const Stack = createStackNavigator<NavParamsMap>()

const Navigator = () => {
	return <NavigationContainer>
		<Stack.Navigator initialRouteName={"Home"}>
			<Stack.Screen name="Home" component={Home}/>
			<Stack.Screen name="Route" component={Route}/>
		</Stack.Navigator>
	</NavigationContainer>
}

export {Navigator}
