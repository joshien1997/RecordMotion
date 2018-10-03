import React, { Component } from 'react';
import {
    Text,
    View,
    PanResponder,
    Dimensions,
    TouchableOpacity,

} from 'react-native';
import { Motion, spring } from 'react-motion';
const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
export default class App1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xControl: 0,
            yControl: 0,
            xDelete: 0,
            yDelete: 110,
            xProgress: 0,
            yProgress: 450,
            isPress: false,
            isMove: false,
            isClose: false,
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
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
                    this.setState({
                        isMove: true,
                        xControl: pageX,
                        yControl: pageY,
                        xDelete: pageX / 7,
                        yDelete: pageY / 8 + 70,
                        xProgress: pageX - 190,
                        yProgress: pageY - 100,
                    }, () => {
                        const a = (this.state.xProgress + (75 / 2)) - (this.state.xDelete + 25);
                        const b = (this.state.yProgress + 20) - (this.state.yDelete + 25);
                        const c = Math.sqrt(a * a + b * b);
                        if (c <= 150) {
                            this.setState({
                                xDelete: this.state.xProgress + (75 / 2) - 37.25,
                                yDelete: this.state.yProgress + 20 - 25,
                                isClose: true,
                            })
                        }
                    });
                }
            },
            onPanResponderRelease: () => {
                this.setState({
                    isMove: false,
                    isPress: false,
                    xControl: 0,
                    yControl: 0,
                    xDelete: 0,
                    yDelete: 110,
                    xProgress: 0,
                    yProgress: 450,
                });
            }
        });
    }

    render() {
        const { isPress, isMove, isClose } = this.state;
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                }}
                {...this.panResponder.panHandlers}
            >
                <View style={{ height: 500, width: 360, alignItems: 'center', position: 'relative' }}>
                    <Motion
                        defaultStyle={{
                            xP: 0,
                            yP: 450,
                        }}
                        style={
                            isPress ?
                                {
                                    xP: spring(this.state.xProgress, { stiffness: 120, damping: 16 }),
                                    yP: spring(this.state.yProgress, { stiffness: 120, damping: 16 }),
                                }
                                :
                                {
                                    xP: 0,
                                    yP: 450,
                                }
                        }
                    >
                        {style => (
                            <View
                                style={
                                    isPress ?
                                        (isClose ?
                                            {
                                                height: 40,
                                                width: 75,
                                                borderRadius: 20,
                                                backgroundColor: '#3266cd',
                                                transform: [{ translateX: style.xP }, { translateY: style.yP }],
                                                position: 'absolute',
                                            } :
                                            {
                                                height: 40,
                                                width: 75,
                                                borderRadius: 20,
                                                backgroundColor: '#3266cd',
                                                transform: [{ translateX: style.xP }, { translateY: style.yP }]
                                            }
                                        )
                                        :
                                        { display: 'none' }
                                }
                            />
                        )}
                    </Motion>
                    <Motion
                        defaultStyle={{
                            xD: 0,
                            yD: 100,
                        }}
                        style={
                            isPress ?
                                {
                                    xD: spring(this.state.xDelete, { stiffness: 120, damping: 16 }),
                                    yD: spring(this.state.yDelete, { stiffness: 120, damping: 16 }),
                                }
                                :
                                {
                                    xD: 0,
                                    yD: 100,
                                }
                        }
                    >
                        {style => (
                            <View
                                style={
                                    isPress ?
                                        (isClose ?
                                            {
                                                height: 50,
                                                width: 50,
                                                borderRadius: 25,
                                                borderWidth: 1.25,
                                                borderColor: 'white',
                                                backgroundColor: 'rgba(48, 48, 48, 0.5)',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                transform: [{ translateY: style.yD }, { translateX: style.xD }],
                                                position: 'absolute',
                                            }
                                            :
                                            {
                                                height: 50,
                                                width: 50,
                                                borderRadius: 25,
                                                borderWidth: 1.25,
                                                borderColor: 'white',
                                                backgroundColor: 'rgba(48, 48, 48, 0.5)',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                transform: [{ translateY: style.yD }, { translateX: style.xD }],
                                            }
                                        )
                                        :
                                        { display: 'none' }
                                }
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                    }}
                                >
                                    X
                                </Text>
                            </View>
                        )}
                    </Motion>

                </View>
                <TouchableOpacity style={{ height: 50, width: 50, backgroundColor: 'blue' }}></TouchableOpacity>
            </View>
        );
    }
}
