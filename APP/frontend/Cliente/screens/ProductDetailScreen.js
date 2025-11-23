import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import colors from '../../theme/colors';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext } from '../../context/AppContext';

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params || {};
  const { addToCart } = useAppContext();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <View style={styles.empty}>
        <Text>No encontramos este producto.</Text>
      </View>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < quantity; i += 1) {
      addToCart(product);
    }
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} color={colors.darkText} />
      </TouchableOpacity>
      <Image
        source={product.image}
        defaultSource={require('../../assets/images/logo-cafrilosa.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.stock}>Stock: {product.stockActual}/{product.stockMax}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)} <Text style={styles.presentation}>/ {product.presentation}</Text></Text>
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Descripcion</Text>
        <Text style={styles.description}>{product.description || 'Producto de nuestro catalogo Cafrilosa.'}</Text>
      </View>
      <View style={styles.bottomBar}>
        <View style={styles.quantityWrapper}>
          <TouchableOpacity
            onPress={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            style={styles.qtyButton}
          >
            <Text style={styles.qtySymbol}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity((prev) => prev + 1)}
            style={styles.qtyButton}
          >
            <Text style={styles.qtySymbol}>+</Text>
          </TouchableOpacity>
        </View>
        <PrimaryButton
          title={`Agregar $${(product.price * quantity).toFixed(2)}`}
          onPress={handleAdd}
          style={styles.addButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: {
    width: '100%',
    height: 280,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  category: {
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.darkText,
  },
  stock: {
    marginTop: 4,
    color: colors.textLight,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 8,
  },
  presentation: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '400',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.darkText,
    marginBottom: 6,
  },
  description: {
    color: colors.textLight,
    lineHeight: 20,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  qtyButton: {
    paddingHorizontal: 8,
  },
  qtySymbol: {
    fontSize: 20,
    color: colors.darkText,
  },
  qtyValue: {
    fontWeight: '700',
    fontSize: 18,
    marginHorizontal: 12,
    color: colors.darkText,
  },
  addButton: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 36,
    left: 16,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductDetailScreen;
