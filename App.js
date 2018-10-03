
import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	PanResponder,
	Dimensions,
	TouchableOpacity,
	TouchableHighlight,
	TouchableNativeFeedback,
} from 'react-native';
import { Motion, spring } from 'react-motion';
const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			xControl: 0,
			yControl: 0,
			xDelete: 0,
			yDelete: -450,
			isPressed: false,
			isMove: false,
			isClose: false,
			_snapped: false,
		};

		this.panResponder = PanResponder.create({
			// onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: () => {
				this.setState({
					isPressed: true,
				});
			},
			onPanResponderMove: (evt) => {
				debugger;
				if (this.state.isPressed === true) {
					const { pageX, pageY } = evt.nativeEvent;
					this.setState({
						isMove: true,
						xControl: pageX,
						yControl: pageY,
						xDelete: pageX / 7,
						yDelete: pageY / 8,
					}, () => {
						const a = this.state.xDelete - this.state.xControl;
						const b = this.state.yDelete - this.state.yControl;
						const c = Math.sqrt(a * a + b * b);
						if (c <= 50) {
							this.setState({
								isClose: true,
							});
						} else {
							this.setState({
								isClose: false,
							});
						}
					});
				}
			},
			onPanResponderRelease: () => {
				this.setState({
					isMove: false,
					isPressed: false,
					xControl: 0,
					yControl: 0,
					xDelete: 0,
					yDelete: -450,
				});
			}
		});
	}
	onPress = () => {
		debugger;
		this.setState({
			isPressed: true,
		})
	}
	
	render() {
		const { isPressed, isMove, isClose } = this.state;
		return (
			<View style={styles.container}>
				<View style={{ height: 500, width: 360, backgroundColor: 'white' }} {...this.panResponder.panHandlers}>
					<Motion
						defaultStyle={{
							x: this.state.xDelete,
							y: this.state.yDelete,
						}}
						style={
							isPressed ? (isMove ? (isClose ? { x: spring(this.state.xControl), y: spring(this.state.yControl) } : { x: spring(this.state.xDelete), y: spring(this.state.yDelete) }) : { x: spring(this.state.xDelete), y: spring(this.state.yDelete) })
								: { x: spring(this.state.xDelete), y: spring(this.state.yDelete) }
						}
					>
						{style => (
							<View
								style={{
									height: 50,
									width: 50,
									borderRadius: 25,
									backgroundColor: 'white',
									borderWidth: 1,
									borderColor: 'black',
									justifyContent: 'center',
									alignItems: 'center',
									transform: [{ translateY: style.y }, { translateX: style.x }]
								}}
							>
								<Text
									style={{
										color: 'black',
									}}
								>
									X
              				</Text>
							</View>
						)}
					</Motion>
				</View >
				<View style={{ flex: 20 }}><TouchableOpacity onPress={this.onPress} style={{ height: 50, width: 50, backgroundColor: 'red' }}><Text>button</Text></TouchableOpacity></View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: screenHeight,
		width: screenWidth,
		// justifyContent: 'center',
		alignItems: 'center',
	},
});
