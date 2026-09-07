from pathlib import Path
root = Path('/home/ubuntu/eventz-mobile-prototype')
# Promote the new implementation files into the Expo Router routes.
files = {
    root / 'app/(tabs)/index-new.tsx': root / 'app/(tabs)/index.tsx',
    root / 'app/(tabs)/explore-new.tsx': root / 'app/(tabs)/explore.tsx',
    root / 'app/(tabs)/ops-new.tsx': root / 'app/(tabs)/ops.tsx',
    root / 'app/(tabs)/profile-new.tsx': root / 'app/(tabs)/profile.tsx',
    root / 'app/(tabs)/_layout-new.tsx': root / 'app/(tabs)/_layout.tsx',
    root / 'app/event/[id]-new.tsx': root / 'app/event/[id].tsx',
    root / 'theme.config-new.js': root / 'theme.config.js',
}
for src, dst in files.items():
    dst.write_text(src.read_text())

p = root / 'app/(tabs)/index.tsx'
s = p.read_text()
s = s.replace('router.push("/ops")', 'router.push("/ops" as any)')
s = s.replace('router.push("/explore")', 'router.push("/explore" as any)')
s = s.replace('router.push(`/event/${item.id}`)', 'router.push((`/event/${item.id}`) as any)')
# Remove accidental duplicate style property from generated screen.
needle = '  sectionHeader: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" },\n  sectionHeader: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" },'
s = s.replace(needle, '  sectionHeader: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" },')
p.write_text(s)
print('prototype files promoted and fixed')
