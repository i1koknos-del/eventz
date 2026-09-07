import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { BrandHeader } from "@/components/brand-header";

const COLORS = {
  navy: "#092B4C",
  teal: "#00A6A6",
  coral: "#FF625A",
  gold: "#F4B942",
  ink: "#102A43",
  muted: "#6B7C93",
  line: "#E5ECF2",
  surface: "#FFFFFF",
  pale: "#F5F8FB",
};

const events = [
  { id: "riyadh-tech", title: "مؤتمر التقنية والتحول الرقمي", date: "18 سبتمبر 2026", city: "الرياض", type: "مؤتمر", color: COLORS.teal, attendees: "500+" },
  { id: "future-mobility", title: "معرض مستقبل التنقل", date: "02 أكتوبر 2026", city: "جدة", type: "معرض", color: COLORS.coral, attendees: "1.2K" },
  { id: "design-week", title: "أسبوع التصميم السعودي", date: "21 أكتوبر 2026", city: "الرياض", type: "مهرجان", color: COLORS.gold, attendees: "800+" },
];

function BrandMark() {
  return <BrandHeader />;
}

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => events.filter((event) => event.title.includes(query) || event.city.includes(query)), [query]);

  return (
    <ScreenContainer containerClassName="bg-[#F5F8FB]" className="px-5">
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 36 }}
        ListHeaderComponent={
          <View>
            <View style={styles.topBar}>
              <BrandMark />
              <Pressable style={styles.iconButton} onPress={() => router.push("/profile")}>
                <MaterialIcons name="notifications-none" size={24} color={COLORS.navy} />
                <View style={styles.notificationDot} />
              </Pressable>
            </View>

            <View style={styles.heroCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.eyebrow}>غرفة عملياتك الرقمية</Text>
                <Text style={styles.heroTitle}>خلّ فعاليتك تمشي{`\n`}بوضوح وثقة.</Text>
                <Text style={styles.heroBody}>خطط، نسّق، نفّذ وتابع كل التفاصيل من منصة واحدة.</Text>
                <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]} onPress={() => router.push("/ops" as any)}>
                  <Text style={styles.primaryButtonText}>افتح لوحة التشغيل</Text>
                  <MaterialIcons name="arrow-back" size={18} color="#FFF" />
                </Pressable>
              </View>
              <View style={styles.heroOrb}><MaterialIcons name="event-available" size={48} color={COLORS.navy} /></View>
            </View>

            <Text style={styles.sectionTitle}>نظرة سريعة</Text>
            <View style={styles.statsRow}>
              <View style={styles.statCard}><Text style={styles.statNumber}>03</Text><Text style={styles.statLabel}>فعاليات نشطة</Text><View style={[styles.statIcon, { backgroundColor: "#E4F8F5" }]}><MaterialIcons name="event" size={16} color={COLORS.teal} /></View></View>
              <View style={styles.statCard}><Text style={styles.statNumber}>86%</Text><Text style={styles.statLabel}>نسبة الإنجاز</Text><View style={[styles.statIcon, { backgroundColor: "#FFF4D9" }]}><MaterialIcons name="trending-up" size={16} color="#C58B00" /></View></View>
              <View style={styles.statCard}><Text style={styles.statNumber}>24</Text><Text style={styles.statLabel}>مهمة اليوم</Text><View style={[styles.statIcon, { backgroundColor: "#FFE9E7" }]}><MaterialIcons name="checklist" size={16} color={COLORS.coral} /></View></View>
            </View>

            <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>اختصارات</Text><Text style={styles.linkText}>إدارة كاملة</Text></View>
            <View style={styles.quickGrid}>
              <Pressable style={styles.quickCard} onPress={() => router.push("/ops" as any)}><View style={[styles.quickIcon, { backgroundColor: "#E6F8F7" }]}><MaterialIcons name="assignment" size={21} color={COLORS.teal} /></View><Text style={styles.quickTitle}>مهام التشغيل</Text><Text style={styles.quickMeta}>08 تحتاج متابعة</Text></Pressable>
              <Pressable style={styles.quickCard} onPress={() => router.push("/explore" as any)}><View style={[styles.quickIcon, { backgroundColor: "#FFF1D8" }]}><MaterialIcons name="calendar-month" size={21} color="#C58B00" /></View><Text style={styles.quickTitle}>تقويم الفعاليات</Text><Text style={styles.quickMeta}>استعرض 2026</Text></Pressable>
              <Pressable style={styles.quickCard} onPress={() => router.push("/ops" as any)}><View style={[styles.quickIcon, { backgroundColor: "#EAF0FF" }]}><MaterialIcons name="people-outline" size={21} color="#5674D8" /></View><Text style={styles.quickTitle}>الضيوف والحضور</Text><Text style={styles.quickMeta}>1,240 مسجلاً</Text></Pressable>
              <Pressable style={styles.quickCard} onPress={() => router.push("/ops" as any)}><View style={[styles.quickIcon, { backgroundColor: "#FFE9E7" }]}><MaterialIcons name="receipt-long" size={21} color={COLORS.coral} /></View><Text style={styles.quickTitle}>المصروفات</Text><Text style={styles.quickMeta}>تحت المراجعة</Text></Pressable>
            </View>

            <Pressable style={({ pressed }) => [styles.tenderBanner, pressed && styles.pressed]} onPress={() => router.push("/competitions" as any)}>
              <View style={styles.tenderIcon}><MaterialIcons name="gavel" size={24} color={COLORS.navy} /></View>
              <View style={{ flex: 1 }}><Text style={styles.tenderKicker}>فرص جديدة لأعمالك</Text><Text style={styles.tenderTitle}>المناقصات</Text><Text style={styles.tenderMeta}>اطرح طلبًا أو تابع عروض الشركات من مكان واحد</Text></View>
              <MaterialIcons name="arrow-back" size={20} color={COLORS.teal} />
            </Pressable>

            <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>فعاليات قادمة</Text><Pressable onPress={() => router.push("/explore" as any)}><Text style={styles.linkText}>عرض الكل</Text></Pressable></View>
            <View style={styles.searchBox}><MaterialIcons name="search" size={21} color={COLORS.muted} /><TextInput value={query} onChangeText={setQuery} placeholder="ابحث عن فعالية أو مدينة" placeholderTextColor="#9AA9B8" style={styles.searchInput} /></View>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable style={({ pressed }) => [styles.eventCard, pressed && styles.pressed]} onPress={() => router.push((`/event/${item.id}`) as any)}>
            <View style={[styles.eventAccent, { backgroundColor: item.color }]} />
            <View style={{ flex: 1 }}><View style={styles.eventTitleRow}><Text style={styles.eventTitle}>{item.title}</Text><MaterialIcons name="chevron-left" size={21} color={COLORS.muted} /></View><Text style={styles.eventMeta}>{item.date}  •  {item.city}</Text><View style={styles.eventFooter}><View style={styles.tag}><Text style={styles.tagText}>{item.type}</Text></View><Text style={styles.attendeeText}><MaterialIcons name="people-outline" size={15} color={COLORS.muted} /> {item.attendees} مسجل</Text></View></View>
          </Pressable>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>لا توجد فعاليات مطابقة للبحث.</Text>}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center", paddingTop: 6, paddingBottom: 18 },
  iconButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: COLORS.surface, alignItems: "center", justifyContent: "center", position: "relative" },
  notificationDot: { position: "absolute", width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.coral, top: 9, right: 10 },
  heroCard: { backgroundColor: COLORS.navy, borderRadius: 24, padding: 20, flexDirection: "row-reverse", overflow: "hidden", minHeight: 205 },
  eyebrow: { color: "#7DE3DB", fontSize: 12, fontWeight: "700", marginBottom: 8, textAlign: "right" },
  heroTitle: { color: "#FFFFFF", fontSize: 25, fontWeight: "800", lineHeight: 33, textAlign: "right" },
  heroBody: { color: "#C2D2E1", fontSize: 12, lineHeight: 19, marginTop: 8, textAlign: "right" },
  heroOrb: { width: 78, height: 78, borderRadius: 40, backgroundColor: COLORS.gold, alignItems: "center", justifyContent: "center", marginTop: 24, marginLeft: -7 },
  primaryButton: { backgroundColor: COLORS.teal, alignSelf: "flex-end", borderRadius: 12, paddingHorizontal: 13, paddingVertical: 10, flexDirection: "row-reverse", alignItems: "center", gap: 7, marginTop: 15 },
  primaryButtonText: { color: "#FFF", fontSize: 12, fontWeight: "800" },
  pressed: { opacity: 0.78, transform: [{ scale: 0.985 }] },
  sectionTitle: { color: COLORS.ink, fontSize: 17, fontWeight: "800", textAlign: "right", marginTop: 24, marginBottom: 12 },
  statsRow: { flexDirection: "row-reverse", gap: 9 },
  statCard: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 16, padding: 12, minHeight: 92, alignItems: "flex-end", shadowColor: "#0A2342", shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
  statNumber: { fontSize: 20, fontWeight: "800", color: COLORS.navy },
  statLabel: { fontSize: 10, color: COLORS.muted, marginTop: 4 },
  statIcon: { position: "absolute", left: 10, bottom: 10, borderRadius: 8, padding: 5 },
  sectionHeader: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" },
  linkText: { color: COLORS.teal, fontSize: 12, fontWeight: "700" },
  quickGrid: { flexDirection: "row-reverse", flexWrap: "wrap", gap: 10 },
  quickCard: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 13, width: "48.4%", minHeight: 104, shadowColor: "#0A2342", shadowOpacity: 0.035, shadowRadius: 7, elevation: 1 },
  quickIcon: { width: 36, height: 36, borderRadius: 11, alignItems: "center", justifyContent: "center", marginBottom: 9, alignSelf: "flex-end" },
  quickTitle: { color: COLORS.ink, fontSize: 12, fontWeight: "800", textAlign: "right" },
  quickMeta: { color: COLORS.muted, fontSize: 10, marginTop: 3, textAlign: "right" },
  tenderBanner: { flexDirection: "row-reverse", alignItems: "center", gap: 11, backgroundColor: "#E4F8F5", borderRadius: 17, padding: 14, marginTop: 18, borderWidth: 1, borderColor: "#B9EBE5" },
  tenderIcon: { width: 44, height: 44, borderRadius: 13, backgroundColor: COLORS.gold, alignItems: "center", justifyContent: "center" },
  tenderKicker: { color: COLORS.teal, fontSize: 10, fontWeight: "800", textAlign: "right" },
  tenderTitle: { color: COLORS.navy, fontSize: 14, fontWeight: "800", textAlign: "right", marginTop: 3 },
  tenderMeta: { color: COLORS.muted, fontSize: 9, textAlign: "right", marginTop: 3 },
  searchBox: { height: 46, borderRadius: 14, backgroundColor: COLORS.surface, flexDirection: "row-reverse", alignItems: "center", paddingHorizontal: 13, gap: 8, borderWidth: 1, borderColor: COLORS.line, marginBottom: 12 },
  searchInput: { flex: 1, color: COLORS.ink, fontSize: 12, textAlign: "right" },
  eventCard: { backgroundColor: COLORS.surface, borderRadius: 17, padding: 14, marginBottom: 10, flexDirection: "row-reverse", gap: 12, shadowColor: "#0A2342", shadowOpacity: 0.035, shadowRadius: 7, elevation: 1 },
  eventAccent: { width: 7, borderRadius: 4, minHeight: 84 },
  eventTitleRow: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", gap: 6 },
  eventTitle: { color: COLORS.ink, fontSize: 13, fontWeight: "800", flex: 1, textAlign: "right" },
  eventMeta: { color: COLORS.muted, fontSize: 11, textAlign: "right", marginTop: 6 },
  eventFooter: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", marginTop: 10 },
  tag: { backgroundColor: "#EEF8F7", borderRadius: 7, paddingHorizontal: 8, paddingVertical: 4 },
  tagText: { color: COLORS.teal, fontSize: 10, fontWeight: "700" },
  attendeeText: { color: COLORS.muted, fontSize: 10 },
  emptyText: { textAlign: "center", color: COLORS.muted, padding: 30 },
});
