import {FC} from "react";
import {Image, StyleSheet} from "react-native";

const routeImage = {
	'1': require('../../assets/images/1.png'),
	'2': require('../../assets/images/2.png'),
	'3': require('../../assets/images/3.png'),
	'4': require('../../assets/images/4.png'),
	'5': require('../../assets/images/5.png'),
	'6': require('../../assets/images/6.png'),
	'7': require('../../assets/images/7.png'),
	'A': require('../../assets/images/a.png'),
	'B': require('../../assets/images/b.png'),
	'C': require('../../assets/images/c.png'),
	'D': require('../../assets/images/d.png'),
	'E': require('../../assets/images/e.png'),
	'F': require('../../assets/images/f.png'),
	'G': require('../../assets/images/g.png'),
	'H': require('../../assets/images/h.png'),
	'J': require('../../assets/images/j.png'),
	'L': require('../../assets/images/l.png'),
	'M': require('../../assets/images/m.png'),
	'N': require('../../assets/images/n.png'),
	'Q': require('../../assets/images/q.png'),
	'R': require('../../assets/images/r.png'),
	'S': require('../../assets/images/s.png'),
	'SIR': require('../../assets/images/sir.png'),
	'SI': require('../../assets/images/sir.png'),
	'W': require('../../assets/images/w.png'),
	'Z': require('../../assets/images/z.png'),
	"FS": require('../../assets/images/fs.png'),
	"GS": require('../../assets/images/gs.png'),
};


interface P {
	routeId: string,
	small?: boolean
}

const styles = StyleSheet.create({
	image: {
		width: 70,
		height: 70,
		backgroundColor: 'transparent',
		alignSelf: 'center'
	},
	small: {
		width: 30,
		height: 30
	}
})

const RouteLogoImg: FC<P> = ({routeId, small}) => {

	let image = (routeImage as any)[routeId];
	if (!image) {
		return null
	}


	return (
		<Image style={[styles.image, small && styles.small]} source={image}/>
	)
}

export default RouteLogoImg
