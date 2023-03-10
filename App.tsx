import 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native';
import {Navigator} from "./navigation/stack";
import {colors} from "./assets/styles";

export default function App() {
	return (
		<SafeAreaView style={{flex: 1, backgroundColor: colors.lightGreen}}>
			<Navigator/>
		</SafeAreaView>
	);
}
