import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default class Community extends Component { 
    static navigationOptions = {
        tabBarLabel: '社区',
        tabBarIcon: ({focused}) => {
            let color = focused ? '#4BC1D2' : '#999';
            return <Icon name="network" color={color} size={26} />
        }
    }

    render () {
        return(
            <View style={styles.container}>
                <Text>社区</Text>
                <Icon name="location" size={16} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});