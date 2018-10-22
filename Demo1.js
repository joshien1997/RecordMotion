import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	PanResponder,
	Dimensions,
	TouchableOpacity,

} from 'react-native';
import { Motion, spring } from 'react-motion';
const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
export default class Demo1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			xDelete: 0,
			yDelete: -450,
			xProgress: 0,
			yProgress: 300,
			isPress: false,
			isMove: false,
			isClose: false,
		};

		this.panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: () => {
				this.setState({
					isPress: true,
				});
			},
			onPanResponderMove: (evt) => {
				debugger;
				if (this.state.isPress === true) {
					const { pageX, pageY } = evt.nativeEvent;
					const a = (pageX - 200) - (pageX / 7);
					const b = (pageY - 200) - (pageY / 8);
					const c = Math.sqrt(a * a + b * b);
					this.setState({
						isMove: true,
						isClose: c <= 150 ? true : false,
						xDelete: c <= 150 ? pageX - 200 : pageX / 7,
						yDelete: c <= 150 ? pageY - 200 : pageY / 8,
						xProgress: pageX - 200,
						yProgress: pageY - 200,
					});
				}
			},
			onPanResponderRelease: () => {
				this.setState({
					isMove: false,
					isPress: false,
					xDelete: 0,
					yDelete: -450,
					xProgress: 0,
					yProgress: 300,
				});
			}
		});
		this.renderProgress = this.renderProgress.bind(this);
		this.renderDelete = this.renderDelete.bind(this);
	}

	renderProgress(style) {
		const { isClose, isPress } = this.state;
		return (
			<View
				style={isPress ?
					{
						height: 50,
						width: 100,
						borderRadius: 25,
						backgroundColor: '#3266cd',
						transform: [{ translateX: style.xProgress }, { translateY: style.yProgress }],
						position: isClose ? 'absolute' : null,
						zIndex: 1,
					} : { display: 'none' }}
			/>
		);
	}

	renderDelete(style) {
		const { isClose, isPress } = this.state;
		return (
			<View>
				<View
					style={isPress ? {
						height: 50,
						width: 50,
						borderRadius: 25,
						backgroundColor: 'rgba(48, 48, 48, 0.5)',
						borderWidth: 1.25,
						borderColor: 'white',
						justifyContent: 'center',
						alignItems: 'center',
						transform: [{ translateY: style.y }, { translateX: style.x }],
						position: isClose ? 'absolute' : null,
						zIndex: 2,
					} : { display: 'none' }}
				>
					<Text style={{ color: 'black', }}> X </Text>
				</View>
			</View>
		);
	}

	render() {
		const { isPress, isMove } = this.state;
		return (
			<View
				style={{ flex: 1, alignItems: 'center' }} {...this.panResponder.panHandlers}
			>
				<View style={{ height: 500, width: 360, alignItems: 'center', position: 'relative' }}>
					<Motion
						defaultStyle={{ x: this.state.xProgress, y: this.state.yProgress }}
						style={{ xProgress: this.state.xProgress, yProgress: this.state.yProgress }}
					>
						{this.renderProgress}
					</Motion>
					<Motion
						defaultStyle={{ x: this.state.xDelete, y: this.state.yDelete }}
						style={{ x: spring(this.state.xDelete), y: spring(this.state.yDelete) }}
					>
						{this.renderDelete}
					</Motion>
				</View>
				<TouchableOpacity style={{ height: 50, width: 50, backgroundColor: 'blue' }} />
			</View>
		);
	}
}
