import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { BrandHeader } from "@/components/brand-header";

const C = { navy: "#092B4C", teal: "#00A6A6", coral: "#FF625A", gold: "#F4B942", ink: "#102A43", muted: "#6B7C93", line: "#E5ECF2", bg: "#F5F8FB" };
const allEvents = [
  { id: "riyadh-tech", title: "مؤتمر التقنية والتحول الرقمي", date: "18 سبتمبر 2026", month: "سبتمبر", city: "الرياض", type: "مؤتمر", color: C.teal, status: "التسجيل مفتوح", attendees: "500+" },
  { id: "future-mobility", title: "معرض مستقبل التنقل", date: "02 أكتوبر 2026", month: "أكتوبر", city: "جدة", type: "معرض", color: C.coral, status: "التسجيل مفتوح", attendees: "1.2K" },
  { id: "design-week", title: "أسبوع التصميم السعودي", date: "21 أكتوبر 2026", month: "أكتوبر", city: "الرياض", type: "مهرجان", color: C.gold, status: "قريباً", attendees: "800+" },
  { id: "health-forum", title: "المنتدى السعودي للصحة الرقمية", date: "06 نوفمبر 2026", month: "نوفمبر", city: "الدمام", type: "منتدى", color: "#5674D8", status: "التسجيل مفتوح", attendees: "650+" },
];

export default function ExploreScreen() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("الكل");
  const filters = ["الكل", "الرياض", "جدة", "مؤتمرات", "معارض"];
  const filtered = useMemo(() => allEvents.filter((e) => (activeFilter === "الكل" || e.city === activeFilter || (activeFilter === "مؤتمرات" && e.type === "مؤتمر") || (activeFilter === "معارض" && e.type === "معرض")) && (e.title.includes(query) || e.city.includes(query))), [activeFilter, query]);
  return (
    <ScreenContainer containerClassName="bg-[#F5F8FB]" className="px-5">
      <FlatList data={filtered} keyExtractor={(item) => item.id} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 35 }}
        ListHeaderComponent={<View>
          <View style={styles.header}><View><Text style={styles.kicker}>دليل الفعاليات</Text><Text style={styles.title}>فعاليات 2026</Text></View><View style={styles.calendarIcon}><MaterialIcons name="calendar-month" size={25} color={C.teal} /></View></View>
          <Text style={styles.subtitle}>اكتشف، سجّل، وكن جزءاً من الفعاليات التي تهمك.</Text>
          <View style={styles.search}><MaterialIcons name="search" size={21} color={C.muted} /><TextInput value={query} onChangeText={setQuery} placeholder="ابحث عن فعالية، مدينة، أو مجال" placeholderTextColor="#9AA9B8" style={styles.input} /></View>
          <View style={styles.filterRow}>{filters.map((f) => <Pressable key={f} onPress={() => setActiveFilter(f)} style={[styles.filter, activeFilter === f && styles.filterActive]}><Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text></Pressable>)}</View>
          <View style={styles.yearRow}><Text style={styles.count}>{filtered.length} فعاليات</Text><Text style={styles.year}>التقويم السنوي <MaterialIcons name="chevron-left" size={17} color={C.navy} /></Text></View>
        </View>}
        renderItem={({ item }) => <Pressable style={({ pressed }) => [styles.card, pressed && { opacity: 0.8 }]} onPress={() => router.push(`/event/${item.id}`)}><View style={[styles.colorBar, { backgroundColor: item.color }]} /><View style={styles.cardBody}><View style={styles.cardTop}><View style={[styles.status, item.status === "قريباً" && { backgroundColor: "#FFF4D9" }]}><Text style={[styles.statusText, item.status === "قريباً" && { color: "#B77F00" }]}>{item.status}</Text></View><Text style={styles.type}>{item.type}</Text></View><Text style={styles.cardTitle}>{item.title}</Text><View style={styles.infoLine}><MaterialIcons name="calendar-today" size={15} color={C.muted} /><Text style={styles.infoText}>{item.date}</Text><MaterialIcons name="location-on" size={15} color={C.muted} /><Text style={styles.infoText}>{item.city}</Text></View><View style={styles.cardBottom}><Text style={styles.people}><MaterialIcons name="people-outline" size={15} color={C.muted} /> {item.attendees} مسجل</Text><Text style={styles.details}>التفاصيل <MaterialIcons name="arrow-back" size={14} color={C.teal} /></Text></View></View></Pressable>}
      />
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  header: { flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center", paddingTop: 8 }, kicker: { color: C.teal, fontSize: 12, fontWeight: "700", textAlign: "right" }, title: { color: C.navy, fontSize: 27, fontWeight: "800", marginTop: 5, textAlign: "right" }, subtitle: { color: C.muted, fontSize: 12, lineHeight: 20, textAlign: "right", marginTop: 9 }, calendarIcon: { width: 49, height: 49, borderRadius: 16, backgroundColor: "#E4F8F5", alignItems: "center", justifyContent: "center" }, search: { height: 46, backgroundColor: "#FFF", borderRadius: 14, borderWidth: 1, borderColor: C.line, flexDirection: "row-reverse", alignItems: "center", paddingHorizontal: 13, gap: 8, marginTop: 18 }, input: { flex: 1, textAlign: "right", fontSize: 12, color: C.ink }, filterRow: { flexDirection: "row-reverse", gap: 8, marginTop: 14 }, filter: { paddingHorizontal: 13, paddingVertical: 8, borderRadius: 9, backgroundColor: "#FFF", borderWidth: 1, borderColor: C.line }, filterActive: { backgroundColor: C.navy, borderColor: C.navy }, filterText: { color: C.muted, fontSize: 11, fontWeight: "700" }, filterTextActive: { color: "#FFF" }, yearRow: { flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center", marginTop: 22, marginBottom: 11 }, year: { color: C.ink, fontSize: 15, fontWeight: "800" }, count: { color: C.muted, fontSize: 11 }, card: { backgroundColor: "#FFF", borderRadius: 17, flexDirection: "row-reverse", overflow: "hidden", marginBottom: 11, shadowColor: "#0A2342", shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 }, colorBar: { width: 7 }, cardBody: { flex: 1, padding: 14 }, cardTop: { flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center" }, type: { color: C.muted, fontSize: 11, fontWeight: "700" }, status: { backgroundColor: "#E4F8F5", borderRadius: 7, paddingHorizontal: 8, paddingVertical: 4 }, statusText: { color: C.teal, fontSize: 10, fontWeight: "700" }, cardTitle: { color: C.ink, fontSize: 14, fontWeight: "800", textAlign: "right", marginTop: 10 }, infoLine: { flexDirection: "row-reverse", alignItems: "center", gap: 5, marginTop: 10 }, infoText: { color: C.muted, fontSize: 10, marginLeft: 6 }, cardBottom: { flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center", marginTop: 14 }, people: { color: C.muted, fontSize: 10 }, details: { color: C.teal, fontSize: 11, fontWeight: "800" },
});
