import { useLanguage } from "@/context";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const OPTIONS = [
  { code: "AR" as const, label: "العربية", flag: "🇲🇦" },
  { code: "FR" as const, label: "Français", flag: "🇫🇷" },
  { code: "EN" as const, label: "English", flag: "🇬🇧" },
];

export default function LanguageModal() {
  const { visible, closeLanguageModal, setLang, lang } = useLanguage();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={closeLanguageModal}>
      <Pressable style={styles.overlay} onPress={closeLanguageModal}>
        <Pressable style={styles.box} onPress={() => {}}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Sélectionner la langue</Text>
            <TouchableOpacity onPress={closeLanguageModal} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {OPTIONS.map((o) => {
            const selected = o.code === lang;
            return (
              <TouchableOpacity
                key={o.code}
                style={[styles.option, selected && styles.optionSelected]}
                onPress={() => {
                  setLang(o.code);
                  closeLanguageModal();
                }}
              >
                <Text style={styles.flag}>{o.flag}</Text>
                <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{o.label}</Text>
                <Text style={[styles.check, selected && styles.checkVisible]}>{selected ? "✓" : ""}</Text>
              </TouchableOpacity>
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },
  box: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  closeBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
  },
  closeText: {
    fontSize: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    marginTop: 10,
  },
  optionSelected: {
    backgroundColor: "#FBECEE",
    borderWidth: 2,
    borderColor: "#7A1F16",
  },
  flag: {
    fontSize: 20,
    marginRight: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
  },
  optionTextSelected: {
    color: "#7A1F16",
    fontWeight: "700",
  },
  check: {
    width: 18,
    textAlign: "right",
    color: "#7A1F16",
    fontWeight: "800",
  },
  checkVisible: {},
});
