import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Animated, Easing, Image, Platform, StyleSheet, Text, View } from "react-native";
import "@/lib/_core/nativewind-pressable";
import { ThemeProvider } from "@/lib/theme-provider";
import {
  SafeAreaFrameContext,
  SafeAreaInsetsContext,
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import type { EdgeInsets, Metrics, Rect } from "react-native-safe-area-context";

import { trpc, createTRPCClient } from "@/lib/trpc";
import { initManusRuntime, subscribeSafeAreaInsets } from "@/lib/_core/manus-runtime";

const DEFAULT_WEB_INSETS: EdgeInsets = { top: 0, right: 0, bottom: 0, left: 0 };
const DEFAULT_WEB_FRAME: Rect = { x: 0, y: 0, width: 0, height: 0 };

function LaunchSplash({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const opacity = useState(() => new Animated.Value(1))[0];
  const scale = useState(() => new Animated.Value(0.94))[0];
  const progress = useState(() => new Animated.Value(0.18))[0];

  useEffect(() => {
    const loaderLoop = Animated.loop(Animated.sequence([
      Animated.timing(progress, { toValue: 0.88, duration: 1500, easing: Easing.inOut(Easing.cubic), useNativeDriver: false }),
      Animated.timing(progress, { toValue: 0.28, duration: 700, easing: Easing.inOut(Easing.cubic), useNativeDriver: false }),
    ]));
    loaderLoop.start();
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 650, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.sequence([
        Animated.delay(2000),
        Animated.timing(opacity, { toValue: 0, duration: 650, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
    ]).start(({ finished }) => {
      if (finished) setVisible(false);
    });
    return () => loaderLoop.stop();
  }, [opacity, progress, scale]);

  return (
    <View style={{ flex: 1 }}>
      {children}
      {visible && (
        <View style={styles.launchOverlay}>
          <Animated.View style={{ opacity, transform: [{ scale }] }}>
            <Image source={require("../assets/images/eventz-approved-logo.png")} style={styles.launchLogo} resizeMode="contain" />
            <View style={styles.launchLoader}><Animated.View style={[styles.launchLoaderFill, { width: progress.interpolate({ inputRange: [0, 1], outputRange: ["18%", "88%"] }) }]} /></View>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

export default function RootLayout() {
  const initialInsets = initialWindowMetrics?.insets ?? DEFAULT_WEB_INSETS;
  const initialFrame = initialWindowMetrics?.frame ?? DEFAULT_WEB_FRAME;

  const [insets, setInsets] = useState<EdgeInsets>(initialInsets);
  const [frame, setFrame] = useState<Rect>(initialFrame);

  // Initialize Manus runtime for cookie injection from parent container
  useEffect(() => {
    initManusRuntime();
  }, []);

  const handleSafeAreaUpdate = useCallback((metrics: Metrics) => {
    setInsets(metrics.insets);
    setFrame(metrics.frame);
  }, []);

  useEffect(() => {
    if (Platform.OS !== "web") return;
    const unsubscribe = subscribeSafeAreaInsets(handleSafeAreaUpdate);
    return () => unsubscribe();
  }, [handleSafeAreaUpdate]);

  // Create clients once and reuse them
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Disable automatic refetching on window focus for mobile
            refetchOnWindowFocus: false,
            // Retry failed requests once
            retry: 1,
          },
        },
      }),
  );
  const [trpcClient] = useState(() => createTRPCClient());

  // Ensure minimum 8px padding for top and bottom on mobile
  const providerInitialMetrics = useMemo(() => {
    const metrics = initialWindowMetrics ?? { insets: initialInsets, frame: initialFrame };
    return {
      ...metrics,
      insets: {
        ...metrics.insets,
        top: Math.max(metrics.insets.top, 16),
        bottom: Math.max(metrics.insets.bottom, 12),
      },
    };
  }, [initialInsets, initialFrame]);

  const content = (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {/* Default to hiding native headers so raw route segments don't appear (e.g. "(tabs)", "products/[id]"). */}
          {/* If a screen needs the native header, explicitly enable it and set a human title via Stack.Screen options. */}
          {/* in order for ios apps tab switching to work properly, use presentation: "fullScreenModal" for login page, whenever you decide to use presentation: "modal*/}
          <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="roles/operator" />
            <Stack.Screen name="roles/attendee" />
            <Stack.Screen name="roles/exhibitor" />
            <Stack.Screen name="oauth/callback" />
          </Stack>
          <StatusBar style="auto" />
        </QueryClientProvider>
      </trpc.Provider>
    </GestureHandlerRootView>
  );

  const shouldOverrideSafeArea = Platform.OS === "web";

  if (shouldOverrideSafeArea) {
    return (
      <ThemeProvider>
        <SafeAreaProvider initialMetrics={providerInitialMetrics}>
          <SafeAreaFrameContext.Provider value={frame}>
            <SafeAreaInsetsContext.Provider value={insets}>
              <LaunchSplash>{content}</LaunchSplash>
            </SafeAreaInsetsContext.Provider>
          </SafeAreaFrameContext.Provider>
        </SafeAreaProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <SafeAreaProvider initialMetrics={providerInitialMetrics}><LaunchSplash>{content}</LaunchSplash></SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  launchOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#F5F8FB",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  launchLogo: { width: 260, height: 260 },
  launchLoader: { width: 92, height: 4, borderRadius: 2, backgroundColor: "#D7E5EA", overflow: "hidden", marginTop: -8 },
  launchLoaderFill: { height: "100%", backgroundColor: "#00A6A6", borderRadius: 2 },
});
