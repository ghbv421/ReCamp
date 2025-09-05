import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router"

const index = () => {
  const router = useRouter();
  return (
    <ImageBackground
          source={require("../assets/images/bg.png")}
          style={styles.background}
        >
    <View style={styles.container}>
      <View style={styles.imagecontainers}>
          <Image
            source={require("../assets/images/logoRECAMP.png")}
            style={styles.topImage}
          />
      </View>
      <View style={styles.Textcontainer}>
                <Text style={styles.welcomeText}> Welcome! </Text>
                <Text style={styles.motivationText}> Ready for Camp? </Text>
              </View>
      <TouchableOpacity style={styles.loginBtn}onPress={() => router.push("/login")}>
                <Text style={styles.logintextbtn}>Sign</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.registerBtn}onPress={() => router.push("/register")}>
                        <Text style={styles.registertextbtn}>Register an Account</Text>
                      </TouchableOpacity>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
  },
  imagecontainers: {
    // blank
  },
  Textcontainer: {
    // blank
  },
  welcomeText: {
    color: "white",
    textAlign: "center",
    marginTop: 25,
    fontSize: 55,
    fontWeight: "900",
  },
  motivationText: {
    color: "white",
    textAlign: "center",
    marginTop: 25,
    fontSize: 50,
    fontWeight: "900",
  },
  topImage: {
    width: 231,
    height: 231,
    marginLeft: 90,
    marginTop: 100,
    alignItems: "center",
  },
  loginBtn: {
    backgroundColor: "#c7a08bff",
    marginHorizontal: 50,
    marginTop: 100,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 5,
  },
  logintextbtn: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerBtn: {
    backgroundColor: "#c7a08bff",
    marginHorizontal: 50,
    marginTop: 30,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 5,
  },
  registertextbtn: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

})

export default index