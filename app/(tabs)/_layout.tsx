import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const COLORS = { navy: "#092B4C", teal: "#00A6A6", muted: "#91A3B5", bg: "#FFFFFF", line: "#E5ECF2" };
export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  return <Tabs screenOptions={{ headerShown: false, animation: "shift", tabBarActiveTintColor: COLORS.teal, tabBarInactiveTintColor: COLORS.muted, tabBarLabelStyle: { fontSize: 10, fontWeight: "700" }, tabBarStyle: { height: 62 + bottomPadding, paddingTop: 6, paddingBottom: bottomPadding, backgroundColor: COLORS.bg, borderTopColor: COLORS.line, borderTopWidth: 1 } }}>
    <Tabs.Screen name="index" options={{ title: "الرئيسية", tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} /> }} />
    <Tabs.Screen name="explore" options={{ title: "الفعاليات", tabBarIcon: ({ color, size }) => <MaterialIcons name="calendar-month" size={size} color={color} /> }} />
    <Tabs.Screen name="competitions" options={{ title: "المناقصات", tabBarIcon: ({ color, size }) => <MaterialIcons name="gavel" size={size} color={color} /> }} />
    <Tabs.Screen name="ops" options={{ title: "التشغيل", tabBarIcon: ({ color, size }) => <MaterialIcons name="dashboard" size={size} color={color} /> }} />
    <Tabs.Screen name="profile" options={{ title: "حسابي", tabBarIcon: ({ color, size }) => <MaterialIcons name="person-outline" size={size} color={color} /> }} />
  </Tabs>;
}
