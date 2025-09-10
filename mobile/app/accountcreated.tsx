import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { useRouter } from "expo-router";


const accountcreated = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.replace("/dashboard/home")
  }
  return (
    <ImageBackground
          source={require("../assets/images/bg.png")}
          style={styles.background}
        >
          <View style={styles.container}>
            <View style={styles.imagecontainers}>
              <Image
                source={require("../assets/images/LogoRECAMP_1.png")}
                style={styles.topImage}
              />
            </View>
            <View>
              <Text style={styles.accountCreatedText}> Account Successfully Created!! </Text>
            </View>
            <View style={styles.formBox}>
            <View style={styles.Textcontainer}>
              <Text style={styles.motivationText}> Welcome, Name!
                Your Camping Account has been created! </Text>
            </View>
          </View>
          <TouchableOpacity
              onPress={handleLogin} style={styles.registerBtn}
              >
              <Text style={styles.dashboardtextbtn}>Go to Dashboard</Text>
            </TouchableOpacity>
          </View>
          
        </ImageBackground>
      );
    };
    
    const styles = StyleSheet.create({
      background: {
        flex: 1,
        resizeMode: "cover",
      },
      formBox: {
        backgroundColor: "hsla(29, 52%, 21%, 0.40)",
        marginHorizontal: 20,
        marginTop: 30,
        borderRadius: 15,
        padding: 20,
      },
      container: {
        flex: 1,
      },
      imagecontainers: {
        //
      },
      Textcontainer: {
        //
      },
      accountCreatedText: {
        color: "white",
        textAlign: "center",
        marginTop: 10,
        fontSize: 30,
        fontFamily: "InriaSerif",
        textShadowColor: "#0b0808ff",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
      },
      motivationText: {
        color: "white",
        textAlign: "center",
        marginTop: 10,
        fontSize: 30,
        fontFamily: "JustMeAgain",
        textShadowColor: "#0b0808ff",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
      },
      topImage: {
        width: 131,
        height: 131,
        marginLeft: 125,
        marginTop: 100,
        justifyContent: "center",
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
      dashboardtextbtn: {
        color: "white",
        fontSize: 20,
        fontWeight: 500,
      },
});

export default accountcreated