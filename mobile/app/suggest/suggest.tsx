import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const Suggest = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Suggestions</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Enter Text"
          placeholderTextColor="#555"
          multiline={true}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 345,
    height: 600,
    alignItems: "center",
    backgroundColor: "#00000050",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 20,
    color: "#000",
  },
  textInput: {
    width: 310,
    height: 364,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 15,
    textAlignVertical: "top",
    marginBottom: 20,
    fontSize: 20,
  },
  button: {
    backgroundColor: "#ED8E45",
    width: 169,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#000000ff",
    fontSize: 20,
    
  },
});

export default Suggest;
