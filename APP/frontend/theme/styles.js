import { StyleSheet } from 'react-native';
import colors from './colors';

const baseShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 5,
};

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  centeredScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: 24,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    ...baseShadow,
  },
  sectionCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    ...baseShadow,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.textDark,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textLight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 14,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...baseShadow,
  },
  primaryButtonDisabled: {
    backgroundColor: colors.muted,
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    borderColor: colors.primary,
    borderWidth: 1.5,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 15,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: colors.danger,
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.textDark,
    fontSize: 16,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.borderSoft,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: colors.cardBackground,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 12,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.textDark,
    fontWeight: '600',
    fontSize: 14,
  },
  chipTextActive: {
    color: '#fff',
  },
  shadow: baseShadow,
});

export default globalStyles;
