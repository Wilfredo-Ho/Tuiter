import React, {Component} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default class App extends Component { 
    static navigationOptions = {
        tabBarLabel: '消息',
        tabBarIcon: ({focused}) => {
            let color = focused ? '#4BC1D2' : '#999';
            return <Icon name="message" color={color} size={26} />
        }
    }

    constructor(props){
        super(props);
        this._onPressButton = this._onPressButton.bind(this);
    }

    _onPressButton () {
        this.props.navigation.navigate("Login");
    }

    render () {
        return(
            <View style={styles.container}>
                <Button onPress={this._onPressButton} title="退出登录"></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});