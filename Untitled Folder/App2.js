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
            isPress: false,
            isMove: true,
            xControl: 0,
            yControl: 0,
        }
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                this.setState({
                    isPress: true,
                });
            },
            onPanResponderMove: (evt) => {
                const { pageX, pageY } = evt.nativeEvent;
                this.setState({
                    isMove: true,
                    xControl: pageX,
                    yControl: pageY,
                });
            },
            onPanResponderRelease: () => {
                this.setState({
                    isPress: false,
                    isMove: false,
                    xControl: 0,
                    yControl: 0,
                });
            }
        });
    }

    render() {
        const { isPress } = this.state;
        return (
            <View
                style={{
                    flex: 1,
                    position: 'relative',
                }}
                {...this.panResponder.panHandlers}
            >
                <View style={{ flex: 90, alignItems: 'center', justifyContent: 'space-around' }}>
                    <Motion
                        defaultStyle={{
                            xD: 0,
                            yD: 0,
                        }}
                        style={{
                            xD: spring(this.state.xControl / 7),
                            yD: spring(this.state.yControl / 8),
                        }}
                    >
                        {style => (
                            <View
                                style={isPress ? {
                                    height: 50,
                                    width: 50,
                                    borderRadius: 25,
                                    borderWidth: 1.25,
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(48, 48, 48, 0.5)',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // position: 'absolute',
                                    transform: [{ translateX: style.xD }, { translateY: style.yD }]
                                } : { display: 'none' }}
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
                    {/* </View>
                <View style={{ flex: 15, alignItems: 'center' }}> */}
                    <Motion
                        defaultStyle={{
                            xP: 0,
                            yP: 0,
                        }}
                        style={{
                            xP: spring(this.state.xControl/10),
                            yP: spring(this.state.yControl/10),
                        }}
                    >
                        {style => (
                            <View
                                style={isPress ? {
                                    height: 40,
                                    width: 75,
                                    borderRadius: 20,
                                    backgroundColor: '#3266cd',
                                    // position: 'absolute',3
                                    transform: [{ translateX: style.xP }, { translateY: style.yP }]
                                } : { display: 'none' }}
                            />
                        )}
                    </Motion>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={{ height: 50, width: 50, backgroundColor: 'blue' }} />
                </View>
            </View>
        );
    }
}