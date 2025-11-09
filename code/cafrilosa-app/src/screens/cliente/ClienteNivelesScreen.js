import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import PrimaryButton from "../../components/ui/PrimaryButton";

const currentLevel = {
  name: "Gold",
  points: 1850,
  discountPercent: 10,
  nextLevelName: "Platinum",
  pointsToNextLevel: 1150,
};

const currentBenefits = [
  "Envio express gratis",
  "10% de descuento en todas las compras",
  "Acceso anticipado a productos nuevos",
  "Regalos mensuales exclusivos",
  "Atencion prioritaria VIP",
  "Descuentos en fechas especiales",
];

const earnRules = [
  {
    id: "buy",
    title: "Por cada compra",
    description: "1 punto por cada $1 gastado",
    icon: "bag-handle-outline",
    color: "#DBEAFE",
    iconColor: "#1D4ED8",
  },
  {
    id: "review",
    title: "Resenas de productos",
    description: "+50 puntos por resena",
    icon: "star-outline",
    color: "#DCFCE7",
    iconColor: "#15803D",
  },
  {
    id: "friends",
    title: "Referir amigos",
    description: "+200 puntos por cada referido",
    icon: "people-outline",
    color: "#EDE9FE",
    iconColor: "#7C3AED",
  },
];

const levels = [
  {
    id: "bronze",
    iconColor: "#CD7F32",
    name: "Bronce",
    rangeText: "Nivel inicial hasta 500 puntos",
    discountText: "0% de descuento",
    benefits: [
      "Envio estandar gratis en compras sobre $50",
      "Acceso a catalogo completo",
      "Notificaciones de productos nuevos",
    ],
    extraBenefitsText: "",
    isCurrent: false,
    locked: false,
  },
  {
    id: "silver",
    iconColor: "#A8A8A8",
    name: "Plata",
    rangeText: "Desde 500 puntos hasta 1500 puntos",
    discountText: "5% de descuento",
    benefits: [
      "Envio gratis en todas las compras",
      "5% de descuento en compras",
      "Acceso a promociones exclusivas",
    ],
    extraBenefitsText: "+1 beneficios mas",
    isCurrent: false,
    locked: false,
  },
  {
    id: "gold",
    iconColor: "#F4B400",
    name: "Gold",
    rangeText: "Desde 1500 puntos hasta 3000 puntos",
    discountText: "10% de descuento",
    benefits: [
      "Envio express gratis",
      "10% de descuento en todas las compras",
      "Acceso anticipado a productos nuevos",
    ],
    extraBenefitsText: "+3 beneficios mas",
    isCurrent: true,
    locked: false,
  },
  {
    id: "platinum",
    iconColor: "#60A5FA",
    name: "Platinum",
    rangeText: "Desde 3000 puntos hasta 5000 puntos",
    discountText: "15% de descuento",
    benefits: [
      "Entrega en el mismo dia sin costo",
      "15% de descuento permanente",
      "Gerente de cuenta dedicado",
    ],
    extraBenefitsText: "+4 beneficios mas",
    isCurrent: false,
    locked: true,
  },
  {
    id: "diamond",
    iconColor: "#A855F7",
    name: "Diamond",
    rangeText: "Desde 5000 puntos",
    discountText: "20% de descuento",
    benefits: [
      "Entrega personalizada 24/7",
      "20% de descuento permanente",
      "Consultor gastronomico personal",
    ],
    extraBenefitsText: "+5 beneficios mas",
    isCurrent: false,
    locked: true,
  },
];

const ClienteNivelesScreen = ({ navigation }) => {
  const progress =
    currentLevel.points + currentLevel.pointsToNextLevel === 0
      ? 0
      : currentLevel.points / (currentLevel.points + currentLevel.pointsToNextLevel);

  // TODO: conectar con backend aqui para obtener el nivel real del usuario y sus puntos
  // TODO: conectar con backend aqui para obtener la configuracion real de niveles y beneficios
  // TODO: conectar con backend aqui para registrar eventos cuando el usuario abre esta seccion

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mi Nivel y Beneficios</Text>
          <View style={styles.headerPlaceholder} />
        </View>
        <Text style={styles.headerSubtitle}>
          Revisa tus puntos acumulados y beneficios del programa Cafrilosa.
        </Text>

        <View style={styles.levelCard}>
          <Text style={styles.levelCardLabel}>Tu nivel actual</Text>
          <View style={styles.levelMainRow}>
            <View style={styles.levelIcon}>
              <MaterialCommunityIcons name="crown" size={26} color="#B45309" />
            </View>
            <Text style={styles.levelName}>{currentLevel.name}</Text>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsBadgeLabel}>Puntos</Text>
              <Text style={styles.pointsBadgeValue}>{currentLevel.points} pts</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min(progress, 1) * 100}%` }]} />
          </View>
          <Text style={styles.progressLabel}>
            {currentLevel.pointsToNextLevel} puntos para {currentLevel.nextLevelName} 💎
          </Text>
          <View style={styles.discountBox}>
            <Text style={styles.discountLabel}>% Descuento actual</Text>
            <Text style={styles.discountValue}>{currentLevel.discountPercent}%</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Tus beneficios actuales</Text>
          {currentBenefits.map((benefit) => (
            <View key={benefit} style={styles.benefitRow}>
              <View style={styles.benefitIcon}>
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              </View>
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>?Como ganar puntos?</Text>
          {earnRules.map((rule) => (
            <View key={rule.id} style={[styles.ruleCard, { backgroundColor: rule.color }]}>
              <View style={[styles.ruleIcon, { backgroundColor: "#FFFFFF" }]}>
                <Ionicons name={rule.icon} size={20} color={rule.iconColor} />
              </View>
              <View>
                <Text style={styles.ruleTitle}>{rule.title}</Text>
                <Text style={styles.ruleDescription}>{rule.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.levelsSection}>
          <Text style={styles.levelsTitle}>Todos los niveles</Text>
          {levels.map((level) => (
            <View
              key={level.id}
              style={[
                styles.levelItem,
                level.isCurrent && styles.levelItemCurrent,
                level.locked && styles.levelItemLocked,
              ]}
            >
              <View style={styles.levelItemHeader}>
                <View style={[styles.levelMedal, { backgroundColor: `${level.iconColor}22` }]}>
                  <MaterialCommunityIcons name="medal-outline" size={20} color={level.iconColor} />
                </View>
                <Text
                  style={[
                    styles.levelItemName,
                    level.isCurrent && styles.levelItemNameCurrent,
                    level.locked && styles.levelItemNameLocked,
                  ]}
                >
                  {level.name}
                </Text>
                {level.isCurrent ? (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>Nivel Actual</Text>
                  </View>
                ) : null}
                {level.locked ? (
                  <Ionicons name="lock-closed-outline" size={16} color="#9CA3AF" style={styles.lockIcon} />
                ) : null}
              </View>
              <Text
                style={[
                  styles.levelRange,
                  level.locked && styles.levelItemNameLocked,
                ]}
              >
                {level.rangeText}
              </Text>
              <Text style={styles.levelDiscount}>{level.discountText}</Text>
              <View style={styles.levelBenefits}>
                {level.benefits.map((benefit) => (
                  <View key={benefit} style={styles.levelBenefitRow}>
                    <View style={styles.levelBenefitDot} />
                    <Text style={styles.levelBenefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
              {level.extraBenefitsText ? (
                <Text style={styles.extraBenefits}>{level.extraBenefitsText}</Text>
              ) : null}
            </View>
          ))}
        </View>

        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>?Sigue comprando!</Text>
          <Text style={styles.ctaSubtitle}>
            Acumula mas puntos y desbloquea beneficios exclusivos.
          </Text>
          <PrimaryButton
            title="Explorar Productos"
            onPress={() => {
              navigation.navigate("ClienteHome");
              // TODO: en el futuro, podriamos navegar a una seccion especifica de productos recomendados
            }}
            style={styles.ctaButton}
            textStyle={styles.ctaButtonText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  content: {
    padding: 24,
    paddingBottom: 60,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  headerPlaceholder: {
    width: 44,
    height: 44,
  },
  headerSubtitle: {
    marginTop: 12,
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 20,
  },
  levelCard: {
    backgroundColor: "#FFD54F",
    borderRadius: 28,
    padding: 20,
    marginTop: 20,
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  levelCardLabel: {
    textTransform: "uppercase",
    fontSize: 12,
    color: "#7C2D12",
    fontWeight: "600",
  },
  levelMainRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  levelIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  levelName: {
    flex: 1,
    fontSize: 26,
    fontWeight: "700",
    color: "#7C2D12",
    marginLeft: 14,
  },
  pointsBadge: {
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: "flex-end",
  },
  pointsBadgeLabel: {
    fontSize: 11,
    color: "#7C2D12",
  },
  pointsBadgeValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#7C2D12",
  },
  progressBar: {
    marginTop: 18,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 999,
    height: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FB923C",
    borderRadius: 999,
  },
  progressLabel: {
    marginTop: 10,
    color: "#7C2D12",
    fontWeight: "600",
  },
  discountBox: {
    marginTop: 16,
    backgroundColor: "rgba(255, 255, 255, 0.55)",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  discountLabel: {
    color: "#7C2D12",
    fontSize: 13,
  },
  discountValue: {
    color: "#7C2D12",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  benefitIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  benefitText: {
    flex: 1,
    color: "#374151",
    fontSize: 14,
  },
  ruleCard: {
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ruleIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  ruleTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  ruleDescription: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 4,
  },
  levelsSection: {
    marginTop: 24,
  },
  levelsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  levelItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  levelItemCurrent: {
    borderColor: "#F59E0B",
    backgroundColor: "#FFFBEB",
  },
  levelItemLocked: {
    opacity: 0.7,
  },
  levelItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  levelMedal: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  levelItemName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  levelItemNameCurrent: {
    color: "#B45309",
  },
  levelItemNameLocked: {
    color: "#9CA3AF",
  },
  currentBadge: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#DCFCE7",
  },
  currentBadgeText: {
    color: "#15803D",
    fontSize: 12,
    fontWeight: "700",
  },
  lockIcon: {
    marginLeft: "auto",
  },
  levelRange: {
    marginTop: 8,
    color: "#6B7280",
  },
  levelDiscount: {
    marginTop: 6,
    color: "#DC2626",
    fontWeight: "700",
  },
  levelBenefits: {
    marginTop: 12,
  },
  levelBenefitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  levelBenefitDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F97316",
    marginRight: 10,
  },
  levelBenefitText: {
    color: "#4B5563",
    flex: 1,
  },
  extraBenefits: {
    color: "#9CA3AF",
    fontSize: 13,
    marginTop: 4,
  },
  ctaCard: {
    marginTop: 12,
    backgroundColor: "#DC2626",
    borderRadius: 26,
    padding: 24,
    alignItems: "center",
  },
  ctaTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  ctaSubtitle: {
    color: "#FECACA",
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
  },
  ctaButton: {
    backgroundColor: "#FFFFFF",
    marginVertical: 18,
  },
  ctaButtonText: {
    color: "#DC2626",
    fontWeight: "700",
  },
});

export default ClienteNivelesScreen;
