import { Image, StyleSheet, View } from "react-native";

export function BrandHeader() {
  return <View style={styles.wrapper}><Image source={require("../assets/images/eventz-approved-logo.png")} style={styles.logo} resizeMode="contain" /></View>;
}
const styles = StyleSheet.create({ wrapper: { alignItems: "flex-end", height: 52, marginBottom: 2 }, logo: { width: 52, height: 52 } });
