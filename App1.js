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
export default class App1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xControl: 0,
            yControl: 0,
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
                    this.setState({
                        isMove: true,
                        xControl: pageX,
                        yControl: pageY,
                        xDelete: pageX / 7,
                        yDelete: pageY / 8,
                        xProgress: pageX - 200,
                        yProgress: pageY - 200,
                    }, () => {
                        const a = this.state.xProgress - this.state.xDelete;
                        const b = this.state.yProgress - this.state.yDelete;
                        const c = Math.sqrt(a * a + b * b);
                        if (c <= 100) {
                            this.setState({
                                xDelete: this.state.xProgress,
                                yDelete: this.state.yProgress,
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
                    yDelete: -450,
                    xProgress: 0,
                    yProgress: 300,
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
                    alignItems: 'center'
                }}
                {...this.panResponder.panHandlers}
            >
                <View style={{ height: 500, width: 360, alignItems: 'center', position: 'relative' }}>
                    <Motion
                        defaultStyle={{
                            x: this.state.xDelete,
                            y: this.state.yDelete,
                        }}
                        style={
                            isPress ?
                                (isMove ?
                                    { x: spring(this.state.xDelete), y: spring(this.state.yDelete) } :
                                    { x: spring(this.state.xDelete), y: spring(this.state.yDelete) })
                                : { x: spring(this.state.xDelete), y: spring(this.state.yDelete) }
                        }
                    >
                        {style => (
                            <View>
                                <View
                                    style={isClose ? {
                                        height: 50,
                                        width: 50,
                                        borderRadius: 25,
                                        backgroundColor: 'white',
                                        borderWidth: 1,
                                        borderColor: 'black',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        transform: [{ translateY: style.y }, { translateX: style.x }],
                                        position: 'absolute',
                                        zIndex: 2,
                                    } : {
                                            height: 50,
                                            width: 50,
                                            borderRadius: 25,
                                            backgroundColor: 'white',
                                            borderWidth: 1,
                                            borderColor: 'black',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            transform: [{ translateY: style.y }, { translateX: style.x }],

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
                            </View>
                        )}
                    </Motion>
                    <Motion
                        defaultStyle={{
                            x: this.state.xProgress,
                            y: this.state.yProgress,
                        }}
                        style={isMove ?
                            {
                                xProgress: spring(this.state.xProgress),
                                yProgress: spring(this.state.yProgress),
                            } :
                            {
                                xProgress: this.state.xProgress,
                                yProgress: this.state.yProgress
                            }}
                    >
                        {style => (
                            <View
                                style={isPress ?
                                    (isClose ?
                                        {
                                            height: 50,
                                            width: 100,
                                            borderRadius: 25,
                                            backgroundColor: '#3266cd',
                                            transform: [{ translateX: style.xProgress }, { translateY: style.yProgress }],
                                            position: 'absolute',
                                            zIndex: 1,
                                        }
                                        :
                                        {
                                            height: 50,
                                            width: 100,
                                            borderRadius: 25,
                                            backgroundColor: '#3266cd',
                                            transform: [{ translateX: style.xProgress }, { translateY: style.yProgress }]
                                        })
                                    :
                                    { display: 'none' }}
                            >
                            </View>
                        )}
                    </Motion>
                </View>
                <TouchableOpacity style={{ height: 50, width: 50, backgroundColor: 'blue' }}></TouchableOpacity>
            </View>
        );
    }
}
