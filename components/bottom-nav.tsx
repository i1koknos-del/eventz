import { MaterialIcons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useRef } from "react";

const C = { navy: "#092B4C", teal: "#00A6A6", muted: "#91A3B5", bg: "#FFFFFF", line: "#E5ECF2", activeBg: "#E4F8F5" };
const items = [
  { label: "الرئيسية", icon: "home" as const, route: "/(tabs)" },
  { label: "حسابي", icon: "person-outline" as const, route: "/(tabs)/profile" },
  { label: "التشغيل", icon: "dashboard" as const, route: "/(tabs)/ops" },
  { label: "الفعاليات", icon: "calendar-month" as const, route: "/(tabs)/explore" },
];

export function BottomNav() {
  const pathname = usePathname();
  const scales = useRef(items.map(() => new Animated.Value(1))).current;
  const animatePress = (index: number) => {
    Animated.sequence([
      Animated.timing(scales[index], { toValue: 0.88, duration: 80, useNativeDriver: true }),
      Animated.spring(scales[index], { toValue: 1, friction: 6, tension: 180, useNativeDriver: true }),
    ]).start();
  };
  return <View style={styles.bar}>{items.map((item, index) => {
    const active = pathname.includes(item.route.replace("/(tabs)", "")) || (item.route === "/(tabs)" && (pathname === "/" || pathname === "/(tabs)"));
    return <Pressable key={item.label} onPress={() => { animatePress(index); router.replace(item.route as any); }} style={({ pressed }) => [styles.item, active && styles.activeItem, pressed && styles.pressed]}>
      {active && <View style={styles.activeIndicator} />}
      <Animated.View style={{ transform: [{ scale: scales[index] }] }}><View style={[styles.iconWrap, active && styles.activeIconWrap]}><MaterialIcons name={item.icon} size={21} color={active ? C.teal : C.muted} /></View></Animated.View>
      <Text style={[styles.label, active && styles.activeLabel]}>{item.label}</Text>
    </Pressable>;
  })}</View>;
}

const styles = StyleSheet.create({
  bar: { position: "absolute", bottom: 0, left: 0, right: 0, height: 66, backgroundColor: C.bg, borderTopWidth: 1, borderTopColor: C.line, flexDirection: "row-reverse", justifyContent: "space-around", alignItems: "center", paddingHorizontal: 8, zIndex: 20, shadowColor: "#092B4C", shadowOpacity: 0.08, shadowRadius: 10, elevation: 10 },
  item: { alignItems: "center", justifyContent: "center", gap: 2, minWidth: 70, height: 56, borderRadius: 14, position: "relative" },
  activeItem: { backgroundColor: "#F0FBF9" },
  activeIndicator: { position: "absolute", top: -1, width: 24, height: 3, borderRadius: 2, backgroundColor: C.teal },
  iconWrap: { width: 32, height: 29, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  activeIconWrap: { backgroundColor: C.activeBg },
  label: { color: C.muted, fontSize: 9, fontWeight: "800" },
  activeLabel: { color: C.teal, fontWeight: "900" },
  pressed: { opacity: 0.72, transform: [{ scale: 0.96 }] },
});
