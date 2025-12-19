<p align="right">
  <img src="https://i.postimg.cc/13qQdqZs/utpllogo.png" alt="Logo UTPL" width="150"/>
</p>

# Diccionaro de Datos

El diccionario de datos aporta una serie de beneficios esenciales para la correcta gestión, documentación y uso de la información dentro de un sistema. Al describir cada atributo, tipo de dato, relación y restricción, permite que todos los actores involucrados comprendan de forma clara el significado, propósito y reglas asociadas a los datos.
Entre sus beneficios principales destacan:

**Uniformidad**: evita interpretaciones incorrectas al proporcionar definiciones formales y estandarizadas.

**Control de calidad**: apoya el cumplimiento de los principios de la ISO 8000, garantizando consistencia y precisión.

**Facilidad de mantenimiento**: permite modificar, ampliar o corregir la base de datos sin afectar la integridad global.

**Mejor comunicación**: sirve como herramienta de referencia para desarrolladores, analistas y auditores.

**Trazabilidad y gobernanza**: fortalece los procesos definidos por DAMA-DMBOK, facilitando la gestión del ciclo de vida de los datos.

En conjunto, el diccionario de datos se convierte en un elemento esencial para asegurar que el sistema funcione de manera ordenada, eficiente y alineada con las mejores prácticas internacionales de gestión de datos.

Este diccionario de datos describe cada tabla y atributo del sistema CafriLosa, garantizando uniformidad, control de calidad, facilidad de mantenimiento, mejor comunicación entre desarrolladores y alineación con estándares internacionales como ISO 8000 y DAMA-DMBOK.

## 1. Tabla: rol_usuario
| Campo | Tipo                  | Restricciones      | Descripción                                                                 |
|-------|-----------------------|--------------------|-----------------------------------------------------------------------------|
| rol   | VARCHAR(20)           | PK                 | Rol del usuario: 'cliente', 'vendedor', 'bodeguero', 'supervisor', 'transportista' |

## 2. Tabla: estado_pedido
| Campo  | Tipo                  | Restricciones | Descripción                                                                 |
|--------|-----------------------|---------------|-----------------------------------------------------------------------------|
| estado | VARCHAR(30)           | PK            | Estados posibles del pedido: Pendiente, En Revisión, Aprobado, Parcial, Rechazado, Preparando, Despachado, En Ruta, Entregado, Problema, Cancelado |

## 3. Tabla: estado_entrega
| Campo  | Tipo                  | Restricciones | Descripción                                                                 |
|--------|-----------------------|---------------|-----------------------------------------------------------------------------|
| estado | VARCHAR(30)           | PK            | Estados de entrega/parada: Pendiente, En Ruta, Entregado, No Entregado, Reprogramado |

## 4. Tabla: estado_devolucion
| Campo  | Tipo                  | Restricciones | Descripción                                                                 |
|--------|-----------------------|---------------|-----------------------------------------------------------------------------|
| estado | VARCHAR(40)           | PK            | Estados de devolución: Pendiente validación, Aprobada, Sellada/Etiquetada, Recogida, Rechazada, Completada |

## 5. Tabla: estado_factura
| Campo  | Tipo                  | Restricciones | Descripción                                                                 |
|--------|-----------------------|---------------|-----------------------------------------------------------------------------|
| estado | VARCHAR(20)           | PK            | Estados de factura: Pendiente, Vencida, Parcial, Pagada                     |

## 6. Tabla: estado_solicitud_cliente
| Campo  | Tipo                  | Restricciones | Descripción                                                                 |
|--------|-----------------------|---------------|-----------------------------------------------------------------------------|
| estado | VARCHAR(20)           | PK            | Estados de solicitud de nuevo cliente: Pendiente, Aprobada, Rechazada      |

## 7. Tabla: nivel_riesgo
| Campo | Tipo                  | Restricciones | Descripción                                                                 |
|-------|-----------------------|---------------|-----------------------------------------------------------------------------|
| nivel | VARCHAR(20)           | PK            | Nivel de riesgo del cliente: Bajo, Medio, Alto, Crítico                     |

## 8. Tabla: estado_ticket
| Campo  | Tipo                  | Restricciones | Descripción                                                                 |
|--------|-----------------------|---------------|-----------------------------------------------------------------------------|
| estado | VARCHAR(20)           | PK            | Estados de ticket: Abierto, En proceso, Cerrado                             |

## 9. Tabla: tipo_cliente
| Campo | Tipo                  | Restricciones | Descripción                                                                 |
|-------|-----------------------|---------------|-----------------------------------------------------------------------------|
| tipo  | VARCHAR(30)           | PK            | Tipo de cliente: Mayorista, Minorista                                       |

## 10. Tabla: categoria_producto
| Campo     | Tipo                  | Restricciones | Descripción                                                                 |
|-----------|-----------------------|---------------|-----------------------------------------------------------------------------|
| categoria | VARCHAR(50)           | PK            | Categorías de productos: Salchichas, Jamones, Cerdo, Otros                  |

## 11. Tabla: usuarios
| Campo       | Tipo                  | Restricciones            | Descripción                                                                 |
|-------------|-----------------------|--------------------------|-----------------------------------------------------------------------------|
| id          | CHAR(36)              | PK, DEFAULT UUID()       | Identificador único del usuario                                             |
| email       | VARCHAR(100)          | Único, NOT NULL          | Correo electrónico (usado como login)                                       |
| contrasena  | VARCHAR(255)          | NOT NULL                 | Hash de la contraseña (recomendado bcrypt)                                  |
| nombre      | VARCHAR(100)          | NOT NULL                 | Nombre del usuario                                                          |
| apellido    | VARCHAR(100)          | NOT NULL                 | Apellido del usuario                                                        |
| telefono    | VARCHAR(20)           | NULL                     | Teléfono de contacto                                                        |
| rol         | VARCHAR(20)           | NOT NULL, FK → rol_usuario | Rol del usuario                                                             |
| activo      | TINYINT(1)            | DEFAULT 1                | Estado de la cuenta (1 = activo)                                            |
| created_at  | DATETIME              | DEFAULT CURRENT_TIMESTAMP| Fecha de creación del registro                                              |

## 12. Tabla: supervisores
| Campo      | Tipo         | Restricciones                  | Descripción                                      |
|------------|--------------|--------------------------------|--------------------------------------------------|
| usuario_id | CHAR(36)     | PK, FK → usuarios (ON DELETE CASCADE) | Usuario con rol 'supervisor'                     |

## 13. Tabla: vendedores
| Campo                | Tipo            | Restricciones                  | Descripción                                      |
|----------------------|-----------------|--------------------------------|--------------------------------------------------|
| usuario_id           | CHAR(36)        | PK, FK → usuarios (ON DELETE CASCADE) | Usuario con rol 'vendedor'                       |
| meta_ventas_mensual  | DECIMAL(12,2)   | DEFAULT 50000.00               | Meta mensual de ventas                           |

## 14. Tabla: bodegueros
| Campo      | Tipo         | Restricciones                  | Descripción                                      |
|------------|--------------|--------------------------------|--------------------------------------------------|
| usuario_id | CHAR(36)     | PK, FK → usuarios (ON DELETE CASCADE) | Usuario con rol 'bodeguero'                      |

## 15. Tabla: transportistas
| Campo           | Tipo         | Restricciones                  | Descripción                                      |
|-----------------|--------------|--------------------------------|--------------------------------------------------|
| usuario_id      | CHAR(36)     | PK, FK → usuarios (ON DELETE CASCADE) | Usuario con rol 'transportista'                  |
| licencia        | VARCHAR(50)  | NULL                           | Tipo de licencia de conducir                     |
| vehiculo_placa  | VARCHAR(20)  | NULL                           | Placa del vehículo asignado                      |

## 16. Tabla: zonas
| Campo        | Tipo            | Restricciones                  | Descripción                                      |
|--------------|-----------------|--------------------------------|--------------------------------------------------|
| id           | CHAR(36)        | PK, DEFAULT UUID()             | Identificador único de la zona                   |
| codigo       | VARCHAR(20)     | Único, NOT NULL                | Código de zona (ej: Z001)                        |
| nombre       | VARCHAR(100)    | NOT NULL                       | Nombre de la zona (Norte, Sur, Centro, etc.)     |
| estado       | VARCHAR(20)     | DEFAULT 'Activa'               | Estado: Activa, Atención, Crítica                |
| dias_activos | VARCHAR(100)    | DEFAULT 'Lunes a Viernes'      | Días de operación                                |

## 17. Tabla: zona_vendedor
| Campo       | Tipo         | Restricciones                  | Descripción                                      |
|-------------|--------------|--------------------------------|--------------------------------------------------|
| zona_id     | CHAR(36)     | PK, FK → zonas (ON DELETE CASCADE) | Zona asignada                                    |
| vendedor_id | CHAR(36)     | PK, FK → vendedores (ON DELETE CASCADE) | Vendedor asignado a la zona                      |

## 18. Tabla: clientes
| Campo                     | Tipo             | Restricciones                           | Descripción                                                                 |
|---------------------------|------------------|-----------------------------------------|-----------------------------------------------------------------------------|
| id                        | CHAR(36)         | PK, DEFAULT UUID()                      | Identificador único del cliente                                             |
| usuario_id                | CHAR(36)         | Único, FK → usuarios (ON DELETE SET NULL) | Usuario asociado (para acceso app cliente)                                  |
| zona_id                   | CHAR(36)         | NOT NULL, FK → zonas                    | Zona asignada                                                               |
| ruc                       | VARCHAR(20)      | Único, NOT NULL                         | RUC del cliente                                                             |
| razon_social              | VARCHAR(200)     | NOT NULL                                | Razón social                                                                |
| nombre_comercial          | VARCHAR(200)     | NULL                                    | Nombre comercial                                                            |
| tipo_cliente              | VARCHAR(30)      | DEFAULT 'Minorista', FK → tipo_cliente  | Mayorista o Minorista                                                       |
| email_facturacion         | VARCHAR(100)     | NULL                                    | Email para facturación electrónica                                          |
| limite_credito_propuesto  | DECIMAL(12,2)    | NULL                                    | Límite propuesto en solicitud                                               |
| limite_credito_aprobado   | DECIMAL(12,2)    | DEFAULT 0.00                            | Límite aprobado por supervisor                                              |
| plazo_dias                | INT              | DEFAULT 30                              | Plazo de crédito en días                                                    |
| estimado_mensual          | DECIMAL(12,2)    | NULL                                    | Estimado de compra mensual                                                  |
| saldo_pendiente           | DECIMAL(12,2)    | DEFAULT 0.00                            | Saldo pendiente actual                                                      |
| riesgo                    | VARCHAR(20)      | DEFAULT 'Bajo', FK → nivel_riesgo       | Nivel de riesgo crediticio                                                  |
| estado_solicitud          | VARCHAR(20)      | DEFAULT 'Aprobada', FK → estado_solicitud_cliente | Estado de la solicitud (para nuevos clientes)                               |
| solicitado_por            | CHAR(36)         | FK → vendedores                         | Vendedor que solicitó el cliente                                            |
| aprobado_por              | CHAR(36)         | FK → supervisores                       | Supervisor que aprobó                                                       |
| fecha_aprobacion          | DATETIME         | NULL                                    | Fecha de aprobación                                                         |

## 19. Tabla: direcciones_entrega
| Campo             | Tipo            | Restricciones                  | Descripción                                      |
|-------------------|-----------------|--------------------------------|--------------------------------------------------|
| id                | CHAR(36)        | PK, DEFAULT UUID()             | Identificador único                              |
| cliente_id        | CHAR(36)        | NOT NULL, FK → clientes (ON DELETE CASCADE) | Cliente propietario                              |
| alias             | VARCHAR(50)     | NULL                           | Nombre corto (Casa, Oficina, etc.)               |
| direccion         | TEXT            | NOT NULL                       | Dirección completa                               |
| numero            | VARCHAR(50)     | NULL                           | Número de casa/departamento                      |
| piso_depto        | VARCHAR(50)     | NULL                           | Piso o departamento                              |
| ciudad            | VARCHAR(100)    | NULL                           | Ciudad                                           |
| provincia         | VARCHAR(100)    | NULL                           | Provincia                                        |
| codigo_postal     | VARCHAR(20)     | NULL                           | Código postal                                    |
| referencia        | TEXT            | NULL                           | Referencias adicionales                          |
| es_predeterminada | TINYINT(1)      | DEFAULT 0                      | 1 = dirección principal                          |

## 20. Tabla: productos
| Campo              | Tipo            | Restricciones                  | Descripción                                      |
|--------------------|-----------------|--------------------------------|--------------------------------------------------|
| id                 | CHAR(36)        | PK, DEFAULT UUID()             | Identificador único del producto                 |
| codigo             | VARCHAR(50)     | Único, NOT NULL                | Código interno                                   |
| nombre             | VARCHAR(200)    | NOT NULL                       | Nombre del producto                              |
| categoria          | VARCHAR(50)     | NOT NULL, FK → categoria_producto | Categoría                                        |
| presentacion       | VARCHAR(100)    | NULL                           | Presentación (ej: 500g, 1kg)                     |
| precio             | DECIMAL(10,2)   | NOT NULL                       | Precio unitario actual                           |
| stock_actual       | INT             | DEFAULT 0                      | Stock disponible                                 |
| stock_reservado    | INT             | DEFAULT 0                      | Stock reservado por pedidos aprobados            |
| descripcion        | TEXT            | NULL                           | Descripción detallada                            |
| ingredientes       | TEXT            | NULL                           | Lista de ingredientes                            |
| info_nutricional   | TEXT            | NULL                           | Información nutricional                          |
| imagen_url         | VARCHAR(500)    | NULL                           | URL de la imagen del producto                    |

## 21. Tabla: pedidos
| Campo                   | Tipo            | Restricciones                  | Descripción                                      |
|-------------------------|-----------------|--------------------------------|--------------------------------------------------|
| id                      | CHAR(36)        | PK, DEFAULT UUID()             | Identificador único                              |
| numero_pedido           | VARCHAR(50)     | Único, NOT NULL                | Número secuencial del pedido                     |
| cliente_id              | CHAR(36)        | NOT NULL, FK → clientes        | Cliente                                          |
| vendedor_id             | CHAR(36)        | NOT NULL, FK → vendedores      | Vendedor que tomó el pedido                      |
| bodeguero_revisor_id    | CHAR(36)        | FK → bodegueros                | Bodeguero que revisó stock                       |
| transportista_id        | CHAR(36)        | FK → transportistas            | Transportista asignado                           |
| direccion_entrega_id    | CHAR(36)        | FK → direcciones_entrega       | Dirección de entrega                             |
| fecha_creacion          | DATETIME        | DEFAULT CURRENT_TIMESTAMP      | Fecha de creación                                |
| fecha_revision          | DATETIME        | NULL                           | Fecha de revisión en bodega                      |
| fecha_despacho          | DATETIME        | NULL                           | Fecha de despacho                                |
| estado                  | VARCHAR(30)     | DEFAULT 'Pendiente', FK → estado_pedido | Estado actual del pedido                         |
| subtotal                | DECIMAL(12,2)   | NOT NULL                       | Subtotal antes de IVA                            |
| iva                     | DECIMAL(12,2)   | NOT NULL                       | Valor del IVA                                    |
| total                   | DECIMAL(12,2)   | NOT NULL                       | Total final                                      |
| forma_pago              | VARCHAR(50)     | NULL                           | Forma de pago                                    |
| notas                   | TEXT            | NULL                           | Notas generales                                  |
| tomado_en_campo         | TINYINT(1)      | DEFAULT 0                      | 1 = tomado por vendedor en visita                |
| notas_revision          | TEXT            | NULL                           | Notas del bodeguero (motivo rechazo/parcial)     |

## 22. Tabla: detalles_pedido
| Campo                  | Tipo            | Restricciones                  | Descripción                                      |
|------------------------|-----------------|--------------------------------|--------------------------------------------------|
| id                     | CHAR(36)        | PK, DEFAULT UUID()             | Identificador único                              |
| pedido_id              | CHAR(36)        | NOT NULL, FK → pedidos (ON DELETE CASCADE) | Pedido al que pertenece                          |
| producto_id            | CHAR(36)        | NOT NULL, FK → productos       | Producto                                         |
| cantidad_solicitada    | INT             | NOT NULL                       | Cantidad solicitada                              |
| cantidad_aprobada      | INT             | NULL                           | Cantidad aprobada por bodega                     |
| peso                   | DECIMAL(8,2)    | NULL                           | Peso total del ítem (kg)                         |
| precio_unitario        | DECIMAL(10,2)   | NOT NULL                       | Precio al momento del pedido                     |
| subtotal_solicitado    | DECIMAL(12,2)   | NOT NULL                       | Subtotal solicitado                              |
| subtotal_aprobado      | DECIMAL(12,2)   | NULL                           | Subtotal aprobado                                |
| estado_item            | VARCHAR(20)     | DEFAULT 'Pendiente'            | Estado del ítem (Pendiente, OK, Sin stock, Parcial) |

## 23. Tabla: rutas_entrega
| Campo                  | Tipo            | Restricciones                  | Descripción                                      |
|------------------------|-----------------|--------------------------------|--------------------------------------------------|
| id                     | CHAR(36)        | PK, DEFAULT UUID()             | Identificador de ruta diaria                     |
| transportista_id       | CHAR(36)        | NOT NULL, FK → transportistas  | Transportista asignado                           |
| fecha                  | DATE            | NOT NULL                       | Fecha de la ruta                                 |
| progreso_porcentaje    | INT             | DEFAULT 0                      | Porcentaje de avance                             |
| paradas_totales        | INT             | DEFAULT 0                      | Total de paradas                                 |
| paradas_completadas    | INT             | DEFAULT 0                      | Paradas completadas                              |
| tiempo_estimado        | VARCHAR(20)     | NULL                           | Tiempo estimado total                            |

## 24. Tabla: paradas_entrega
| Campo                | Tipo            | Restricciones                  | Descripción                                      |
|----------------------|-----------------|--------------------------------|--------------------------------------------------|
| id                   | CHAR(36)        | PK, DEFAULT UUID()             | Identificador de parada                          |
| ruta_id              | CHAR(36)        | NOT NULL, FK → rutas_entrega (ON DELETE CASCADE) | Ruta a la que pertenece                          |
| pedido_id            | CHAR(36)        | NOT NULL, FK → pedidos         | Pedido a entregar                                |
| orden                | INT             | NOT NULL                       | Orden en la ruta                                 |
| estado               | VARCHAR(30)     | DEFAULT 'Pendiente', FK → estado_entrega | Estado de la entrega                             |
| fecha_entrega        | DATETIME        | NULL                           | Fecha/hora real de entrega                       |
| notas                | TEXT            | NULL                           | Notas del transportista                          |
| foto_evidencia       | VARCHAR(500)    | NULL                           | URL de foto de entrega                           |
| firma_cliente        | VARCHAR(500)    | NULL                           | URL de firma digital del cliente                 |
| motivo_no_entrega    | TEXT            | NULL                           | Motivo si no se entregó                          |

## 25. Tabla: facturas
| Campo                | Tipo            | Restricciones                  | Descripción                                      |
|----------------------|-----------------|--------------------------------|--------------------------------------------------|
| id                   | CHAR(36)        | PK, DEFAULT UUID()             | Identificador único                              |
| pedido_id            | CHAR(36)        | Único, NOT NULL, FK → pedidos (ON DELETE CASCADE) | Pedido facturado                                 |
| numero_factura       | VARCHAR(50)     | Único, NOT NULL                | Número de factura                                |
| fecha_emision        | DATE            | NOT NULL                       | Fecha de emisión                                 |
| fecha_vencimiento    | DATE            | NOT NULL                       | Fecha de vencimiento                             |
| monto_original       | DECIMAL(12,2)   | NOT NULL                       | Monto total original                             |
| saldo_pendiente      | DECIMAL(12,2)   | NOT NULL                       | Saldo pendiente                                  |
| estado               | VARCHAR(20)     | DEFAULT 'Pendiente', FK → estado_factura | Estado de pago                                   |
| clave_acceso         | VARCHAR(49)     | Único, NULL                    | Clave de acceso SRI (49 dígitos)                 |
| numero_autorizacion  | VARCHAR(49)     | NULL                           | Número de autorización SRI                       |
| fecha_autorizacion   | DATETIME        | NULL                           | Fecha de autorización SRI                        |
| estado_sri           | VARCHAR(30)     | DEFAULT 'PENDIENTE'            | Estado en SRI                                    |
| xml_firmado          | LONGTEXT        | NULL                           | XML firmado enviado al SRI                       |
| ride_pdf             | VARCHAR(500)    | NULL                           | URL del RIDE (PDF)                               |
| mensajes_sri         | TEXT            | NULL                           | Mensajes/respuestas del SRI                      |

## 26. Tabla: devoluciones
| Campo                 | Tipo            | Restricciones                  | Descripción                                      |
|-----------------------|-----------------|--------------------------------|--------------------------------------------------|
| id                    | CHAR(36)        | PK, DEFAULT UUID()             | Identificador único                              |
| numero_devolucion     | VARCHAR(50)     | Único, NOT NULL                | Número secuencial                                |
| factura_id            | CHAR(36)        | NOT NULL, FK → facturas        | Factura relacionada                              |
| cliente_id            | CHAR(36)        | NOT NULL, FK → clientes        | Cliente que devuelve                             |
| vendedor_id           | CHAR(36)        | NOT NULL, FK → vendedores      | Vendedor que autoriza                            |
| transportista_id      | CHAR(36)        | NULL, FK → transportistas      | Transportista que recoge                         |
| fecha_solicitud       | DATETIME        | DEFAULT CURRENT_TIMESTAMP      | Fecha de solicitud                               |
| motivo                | TEXT            | NOT NULL                       | Motivo de devolución                             |
| cantidad              | INT             | NOT NULL                       | Cantidad devuelta                                |
| producto_nombre       | VARCHAR(200)    | NOT NULL                       | Nombre del producto devuelto                     |
| monto                 | DECIMAL(12,2)   | NOT NULL                       | Monto a acreditar                                |
| estado                | VARCHAR(40)     | DEFAULT 'Pendiente validación', FK → estado_devolucion | Estado actual                                    |
| fecha_recoleccion     | DATETIME        | NULL                           | Fecha de recolección                             |
| sellada_etiquetada    | TINYINT(1)      | DEFAULT 0                      | 1 = paquete sellado y etiquetado                 |
| notas_recoleccion     | TEXT            | NULL                           | Notas del transportista                          |

## 27. Tabla: tickets
| Campo            | Tipo            | Restricciones                  | Descripción                                      |
|------------------|-----------------|--------------------------------|--------------------------------------------------|
| id               | CHAR(36)        | PK, DEFAULT UUID()             | Identificador único                              |
| numero_ticket    | VARCHAR(50)     | Único, NOT NULL                | Número secuencial                                |
| usuario_id       | CHAR(36)        | NOT NULL, FK → usuarios        | Usuario que crea el ticket                       |
| pedido_id        | CHAR(36)        | NULL, FK → pedidos             | Pedido relacionado (opcional)                    |
| asunto           | VARCHAR(200)    | NOT NULL                       | Asunto del ticket                                |
| descripcion      | TEXT            | NOT NULL                       | Descripción detallada                            |
| foto_evidencia   | VARCHAR(500)    | NULL                           | URL de foto adjunta                              |
| estado           | VARCHAR(20)     | DEFAULT 'Abierto', FK → estado_ticket | Estado del ticket                                |
| fecha_creacion   | DATETIME        | DEFAULT CURRENT_TIMESTAMP      | Fecha de creación                                |

## 28. Tabla: actividad_log
| Campo           | Tipo            | Restricciones                  | Descripción                                      |
|-----------------|-----------------|--------------------------------|--------------------------------------------------|
| id              | CHAR(36)        | PK, DEFAULT UUID()             | Identificador único                              |
| usuario_id      | CHAR(36)        | NOT NULL, FK → usuarios        | Usuario que generó la actividad                  |
| tipo_actividad  | VARCHAR(50)     | NOT NULL                       | Tipo: Orden, Pago, Visita, Entrega, etc.         |
| descripcion     | TEXT            | NULL                           | Descripción de la actividad                      |
| monto           | DECIMAL(12,2)   | NULL                           | Monto relacionado (si aplica)                    |
| fecha           | DATETIME        | DEFAULT CURRENT_TIMESTAMP      | Fecha y hora de la actividad                     |
