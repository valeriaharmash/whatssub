import 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native';
import {Navigator} from "./navigation/stack";

export default function App() {
	return (
		<SafeAreaView style={{flex: 1}}>
			<Navigator/>
		</SafeAreaView>
	);
}
