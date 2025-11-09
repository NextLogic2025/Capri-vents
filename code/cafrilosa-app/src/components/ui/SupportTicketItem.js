import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const statusColors = {
  Abierto: "#F97316",
  "En Proceso": "#FCD34D",
  Resuelto: "#34D399",
};

const SupportTicketItem = ({ ticket, onPress }) => {
  const statusColor = statusColors[ticket.status] || "#9CA3AF";

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.code}>{ticket.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: `${statusColor}1A` }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{ticket.status}</Text>
        </View>
      </View>
      <View style={styles.tagsRow}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{ticket.type}</Text>
        </View>
        <View style={[styles.tag, styles.priorityTag]}>
          <Text style={styles.tagText}>{ticket.priority}</Text>
        </View>
      </View>
      <Text style={styles.title}>{ticket.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {ticket.description}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.date}>{ticket.createdAt}</Text>
        <Text style={styles.replies}>{ticket.repliesCount} respuestas</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  code: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  tagsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  priorityTag: {
    backgroundColor: "#FEE2E2",
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  replies: {
    fontSize: 13,
    fontWeight: "700",
    color: "#F97316",
  },
});

export default SupportTicketItem;
