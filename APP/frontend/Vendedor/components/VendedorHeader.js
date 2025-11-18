import React from 'react';
import ScreenHeader from '../../Cliente/components/ScreenHeader';

const VendedorHeader = ({
  name = 'Vendedor Demo',
  title = 'Bienvenido',
  subtitle = 'Pedidos',
  notificationsCount = 0,
  onPressNotifications = () => {},
  style,
}) => (
  <ScreenHeader
    greeting={`Hola, ${name}`}
    title={title}
    sectionLabel={subtitle}
    icon="notifications-outline"
    onIconPress={onPressNotifications}
    notificationsCount={notificationsCount}
    style={style}
  />
);

export default VendedorHeader;
