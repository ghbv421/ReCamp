    import React from "react";
    import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    } from "react-native";

const Termpol = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Terms and policy</Text>

        <Text style={styles.sectionTitle}>Terms</Text>
        <View style={styles.card}>
          <Text style={styles.text}>
            Note: These terms and conditions do not apply to seasonal camping.
            Please refer to the rental agreement.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Policy</Text>
        <View style={styles.card}>
          <Text style={styles.text}>
            At the time of booking, the customer must pay the full amount. The
            credit card used when booking is the guarantor of all sites reserved
            for the period of the stay.{"\n\n"}
            The reserved site is not guaranteed, as some changes can be made
            without notice. However, the services requested when booking such as
            water, electricity and sewers will be respected if a change of site
            must be made.{"\n\n"}
            Maximum occupancy of 6 people including 2 adults and 4 children. Only
            one piece of equipment (tent, trailer tent, motorhome) per site. The
            minimum age to book is 18 years old.
          </Text>
        </View>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: {
    width: "90%",
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 8,
    color: "#000",
  },
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: "#000",
  },
  stars: {
    alignItems: "center",
    marginTop: 10,
  },
  star: {
    fontSize: 28,
    color: "#000",
  },
});

export default Termpol;
