import React from 'react';
import ScreenHeader from '../../Cliente/components/ScreenHeader';

const SupervisorHeader = ({
  name = 'Supervisor Demo',
  title = 'Bienvenido',
  subtitle = '',
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

export default SupervisorHeader;
