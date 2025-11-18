import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

const SupervisorProductCard = ({ product = {}, onPress = () => {}, lowStock, nearExpiration }) => {
  const {
    image,
    name = 'Producto',
    category = 'Categoría',
    presentation = '-',
    price = 0,
    stockActual = 0,
    stockMax = 0,
  } = product;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      {image?.uri ? (
        <Image source={{ uri: image.uri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Producto</Text>
        </View>
      )}
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.meta}>{category} · {presentation}</Text>
        <Text style={styles.price}>$ {Number(price).toFixed(2)}</Text>
        <Text style={styles.stock}>
          Stock: {stockActual} / {stockMax}
        </Text>
        <View style={styles.badgeRow}>
          {lowStock && (
            <View style={[styles.badge, styles.badgeDanger]}>
              <Text style={styles.badgeText}>Bajo stock</Text>
            </View>
          )}
          {nearExpiration && (
            <View style={[styles.badge, styles.badgeWarning]}>
              <Text style={styles.badgeText}>Próximo a vencer</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: 12,
    marginRight: 12,
  },
  placeholder: {
    width: 88,
    height: 88,
    borderRadius: 12,
    backgroundColor: colors.inputBackground,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
  meta: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 6,
  },
  stock: {
    fontSize: 13,
    color: colors.bodyText,
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  badgeDanger: {
    backgroundColor: colors.danger + '22',
  },
  badgeWarning: {
    backgroundColor: colors.warning + '22',
  },
});

export default SupervisorProductCard;
