import React, {Component} from 'react';

import {
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated,
    Easing,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Alert,
} from 'react-native';

import { Dropdown } from 'react-native-material-dropdown-v2'

//Import basic react native components
import MultiSelect from 'react-native-multiple-select';

import {Actions, ActionConst} from 'react-native-router-flux';

import spinner from '../images/loading.gif';
import UserInput from './UserInput';
import usernameImg from '../images/username.png';
import homeImg from '../images/home.png';
import phoneImg from '../images/phone.jpg';
import LogoRequester from './LogoRequester';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = DEVICE_WIDTH / 2;
export const IMAGE_HEIGHT_SMALL = DEVICE_WIDTH /7;

//Dummy Data for the MutiSelect
this.items = [
    { id: '1', name: 'English' },
    { id: '2', name: 'Hindi' },
    { id: '3', name: 'Social Science' },
    { id: '4', name: 'Science' },
    { id: '5', name: 'Maths' },
    { id: '6', name: 'Computer' },
    { id: '7', name: 'Java' },
];

export default class BookRequesterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        isLoading: false,
        genValidate:false,
        pwdValidate:false,
        };
        //We will store selected item in this
        selectedItems: [],
        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        //this._onPress = this._onPress.bind(this);
        //this._confirmationAlert = this._confirmationAlert.bind(this);
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    }

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
        //Set Selected Items
    };

    _confirmationAlert=()=> {
        Alert.alert(
          'Hey Donator',
          'Book Request Submitted and You will receive the contact details...!',
          [
            {text: 'Ok', onPress: () => this._onPress()},
          ],
          { 
            cancelable: true 
          }
        );
      }

    _onPress() {
        if (this.state.isLoading) return;

        this.setState({isLoading: true});
        Animated.timing(this.buttonAnimated, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        }).start();

        setTimeout(() => {
        this._onGrow();
        }, 2000);

        setTimeout(() => {
            Actions.userScreen();
            this.setState({isLoading: false});
            this.buttonAnimated.setValue(0);
            this.growAnimated.setValue(0);
        }, 2300);  

    }

    _onGrow() {
        Animated.timing(this.growAnimated, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        }).start();
    }

    render() {
        const changeWidth = this.buttonAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
        });
        const changeScale = this.growAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [1, MARGIN],
        });

        const { selectedItems } = this.state;

        let classdata = [
            {
                value : '1',
            },
            {
                value : '2',
            },
            {
                value : '3',
            },
            {
                value : '4',
            },
            {
                value : '5',
            },
            {
                value : '6',
            },
            {
                value : '7',
            },
            {
                value : '8',
            },
            {
                value : '9',
            },
            {
                value : '10',
            },
        ];

        return (
        <>
            <ScrollView style={styles.container}>
               <LogoRequester/>
              <SafeAreaView style={styles.container}>
              <View style={styles.inputWrap}>
                    <UserInput
                    style={[!this.state.genValidate ? styles.error : null]}
                    source={usernameImg}
                    placeholder="Name"
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    onChangeText={(text) => this.validate(text,'data')}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <UserInput
                    style={[!this.state.genValidate ? styles.error : null]}
                    source={phoneImg}
                    placeholder="Phone"
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    onChangeText={(text) => this.validate(text,'data')}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <UserInput
                    style={[!this.state.genValidate ? styles.error : null]}
                    source={homeImg}
                    placeholder="Address"
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    onChangeText={(text) => this.validate(text,'data')}
                    />
                </View>
                <View style={{ flex: 1, padding: 30 }}>
                    <MultiSelect
                        hideTags
                        items={items}
                        uniqueKey="id"
                        ref={component => {
                        this.multiSelect = component;
                        }}
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={selectedItems}
                        selectText="Select Books..."
                        searchInputPlaceholderText="Search Items..."
                        onChangeInput={text => console.log(text)}
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#000000"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#1703fc"
                        submitButtonText="Submit"
                    />
                </View>
                <View style={{ flex: 1, padding: 30 }}>
                    <Dropdown label='Select Grade - ' data={classdata} />
                </View>
                <View style={styles.inputWrap}>
                    <Animated.View style={{width: changeWidth}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._confirmationAlert}
                        activeOpacity={1}>
                        {this.state.isLoading ? (
                        <Image source={spinner} style={styles.image} />
                        ) : (
                        <Text style={styles.text}>Books Request</Text>
                        )}
                    </TouchableOpacity>
                    <Animated.View
                        style={[styles.circle, {transform: [{scale: changeScale}]}]}
                    />
                    </Animated.View>
                </View>
                </SafeAreaView>
            </ScrollView>
        </>
        );
    }
}


const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: 'gray',
},
button: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1703fc',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
    paddingHorizontal: 10,
    width: DEVICE_WIDTH - 40,
},
wrapper: {
    paddingHorizontal: 10,
},
inputWrap: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
    height: 45,
    backgroundColor: "transparent"
},
circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#03f0fc',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#03f0fc',
},
text: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 15,
    fontWeight: 'bold',
},
fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
},
});

