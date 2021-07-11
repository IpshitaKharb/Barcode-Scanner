import React from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'

export default class ScanScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
    }
  }
  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === 'granted',
      buttonState: 'clicked',
      scanned: false,
    })
  }

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal',
    })
  }
  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions
    const scanned = this.state.scanned
    const buttonState = this.state.buttonState

    if (buttonState === 'clicked' && hasCameraPermissions) {
      return (
        <View style={[styles.container]}>
          <BarCodeScanner
            style={[StyleSheet.absoluteFillObject]}
            onBarCodeScanned={() => {
              alert('Barcode Scanned 😄')
            }}
          />
        </View>
      )
    } else if (buttonState === 'normal') {
      return (
        <View style={[styles.container]}>
          <Image
            style={[styles.image]}
            source={require('../screens/Scanner.png')}
          />
          <Text style={[styles.text, { color: '#000' }]}>BARCODE SCANNER</Text>

          <LinearGradient
            style={[styles.button]}
            colors={['#8cfc03', '#03fc17']}
          >
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                this.getCameraPermissions()
              }}
            >
              <Text style={[styles.text]}>SCAN</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    padding: 8,
    color: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignSelf: 'center',
  },
})
