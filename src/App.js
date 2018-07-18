import React, { Component } from 'react';
import {View, Text, StyleSheet, StatusBar, ImageBackground, Platform, NetInfo, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {fetchWeather} from './weatherApi';

const iconNames = {
    Default: 'md-time',
    Clear: 'md-sunny',
    Rain: 'md-rainy',
    Thunderstorm: 'md-thunderstorm' ,
    Clouds: 'md-cloudy' ,
    Snow: 'md-snow' ,
    Drizzle: 'md-umbrella' ,
    Mist: 'md-partly-sunny',
    Haze: 'md-cloudy-night',
};

export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            temp:0,
            weather:'Default',
            cityName: 'None',
            countryName: 'None',
            humidity: 0,
            pressure: 0,
            windSpeed: 0,
            connection: '',
        };
        this.getLocation = this.getLocation.bind(this);
    }


    refresh(callback){
        httpAddress = 'https://www.google.com';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', httpAddress);
        xhr.onreadystatechange = (e) => {
            if (xhr.readyState !== 4) {
                return;
            }
            console.log("--- STATUS ---");
            console.log(xhr.status);
            this.getLocation(xhr.status);
            if (xhr.status === 200) {
                callback(true);
                console.log('result goes here: ' + true)
            } else {
                callback(false);
            }
        };
        xhr.send();
    }



    getLocation(connect){
        if (connect === 200) {
            navigator.geolocation.getCurrentPosition(
                (posData) => fetchWeather(posData.coords.latitude, posData.coords.longitude)
                    .then(res => this.setState({
                        temp: Math.round(res.temp),
                        weather: res.weather,
                        cityName: res.cityName,
                        countryName: res.countryName,
                        humidity: res.humidity,
                        pressure: res.pressure,
                        windSpeed: res.windSpeed,
                        connection: ''
                    })),

                (error) => console.log(error),
                {timeout: 10000}
            );
        }
        else {
            this.setState({
                temp:0,
                weather:'Default',
                cityName: 'None',
                countryName: 'None',
                humidity: 0,
                pressure: 0,
                windSpeed: 0,
                connection: 'اتصال اینترنت خود را بررسی کنید',
            })
        }
    }

    componentDidMount() {
        this._timer = setInterval(() => {this.refresh((result) => {this.state.splash = result})}, 1000);
        this.getLocation();
    };

    componentWillMount() {
        this._timer2 = setInterval(() => {this.refresh((result) => {this.state.splash = result})}, 1000);
    }
    componentWillUnmount() {
        clearInterval(this._timer);
        clearInterval(this._timer2);
    }

    render() {
        return(

            <ImageBackground source={require('./sky2.jpg')} style={styles.backContainer}>
                <View style={styles.container}>
                        <StatusBar hidden={true}/>
                        <LinearGradient colors={['#211175', '#3b5998', '#f39c12']} style={styles.linearGradient}>
                            <Animatable.View animation="zoomIn" style={ styles.header }>
                                <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}><Icon name={iconNames[this.state.weather]} size={50} color='#bdc3c7'/></Animatable.Text>
                                <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={ styles.degreeStyle }>{this.state.temp}°C</Animatable.Text>
                            </Animatable.View>
                        </LinearGradient>
                        <View style={ styles.body }>
                                <Animatable.View style={ styles.bodyContainer }>
                                            <Animatable.Text animation="pulse" iterationCount="infinite" style={ styles.location }>
                                                مکان فعلی شما: ‌{this.state.countryName+'/'+this.state.cityName}
                                            </Animatable.Text>


                                        <LinearGradient colors={['#038387', '#8764B8', '#34495e']} style={styles.linearGradient}>
                                            <Animatable.View style={ styles.bodyContainer }>
                                                <Text style={{textAlign: 'center', fontFamily: 'IRANSansMobile', marginTop: '3%', fontSize: 18}}>رطوبت هوا</Text>
                                                <Text style={ styles.inText }>{this.state.humidity} %</Text>
                                            </Animatable.View>
                                        </LinearGradient>
                                        <LinearGradient colors={['#038387', '#8764B8', '#34495e']} style={styles.linearGradient}>
                                            <Animatable.View style={ styles.bodyContainer }>
                                                <Text style={{textAlign: 'center', fontFamily: 'IRANSansMobile', marginTop: '3%', fontSize: 18}}>فشار هوا</Text>
                                                <Text style={ styles.inText }>{this.state.pressure} hpa</Text>
                                            </Animatable.View>
                                        </LinearGradient>
                                        <LinearGradient colors={['#038387', '#8764B8', '#34495e']} style={styles.linearGradient}>
                                            <Animatable.View style={ styles.bodyContainer }>
                                                <Text style={{textAlign: 'center', fontFamily: 'IRANSansMobile', marginTop: '3%', fontSize: 18}}>سرعت باد</Text>
                                                <Text style={ styles.inText }>{this.state.windSpeed} m/s</Text>
                                            </Animatable.View>
                                        </LinearGradient>
                                </Animatable.View>
                        </View>
                        <View style={ styles.footer }>
                            <Animatable.Text animation="shake" iterationCount="infinite" style={ styles.connection } duration={3000} >{this.state.connection}</Animatable.Text>
                            <Text style={{color: '#1b1b1c'}}
                                  onPress={() => Linking.openURL('https://amirfeqhi.in')}>
                                ────────  Amirfeqhi  ────────
                            </Text>
                        </View>
                </View>
            </ImageBackground>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    scrollContainer: {
        flex: 1,
    },
    header: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    degreeStyle: {
        fontFamily: 'IRANSansMobile',
        fontSize: 40,
        color: '#bdc3c7',
    },
    body: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    bodyContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'

    },
    TextBody: {
        fontFamily: 'IRANSansMobile',
        color: '#e67e22',
    },
    footer: {
        flex: .3,
        alignItems: 'center',

    },
    linearGradient: {
        flex: 1,
        borderRadius: 5,
        marginTop: '3%',
        marginBottom: '3%',
        flexDirection: 'row',
        width: '95%'
    },
    backContainer: {
        flex: 1,
        alignItems: 'center'

    },
    inText: {
        color: '#ecf0f1',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 38,
        fontFamily: 'IRANSansMobile'
    },
    location: {
        color: '#fff',
        textAlign: 'right',
        paddingTop: 5,
        paddingRight: 3,
        ...Platform.select({
           ios: {
               fontFamily: 'IRANSansMobile',
               fontWeight: '500'
           },
           android: {
               fontFamily: 'IRANSansMobile_Bold'
           }
        }),
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },
    connection: {
        color: 'red',
        ...Platform.select({
            ios: {
                fontFamily: 'IRANSansMobile',
                fontWeight: '500'
            },
            android: {
                fontFamily: 'IRANSansMobile_Bold'
            }
        }),
    }
});