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
## 1. Tabla: usuarios
| Campo            | Tipo              | Descripción                                      |
|------------------|-------------------|--------------------------------------------------|
| id               | UUID (PK)         | Identificador único del usuario                  |
| nombre_usuario   | TEXT, único       | Login del usuario                                |
| contrasena       | TEXT              | Hash de contraseña (bcrypt)                      |
| nombre_completo  | TEXT              | Nombre completo                                  |
| rol              | TEXT              | supervisor / vendedor / repartidor / bodeguero / cliente |
| activo           | BOOLEAN           | Estado de la cuenta                              |
| created_at       | TIMESTAMPTZ       | Fecha de creación                                |
| updated_at       | TIMESTAMPTZ       | Última actualización                             |

## 2. Tabla: ciudades
| Campo   | Tipo        | Descripción                          |
|---------|-------------|--------------------------------------|
| id      | UUID (PK)   | Identificador único                  |
| nombre  | TEXT        | Nombre de la ciudad                  |
| region  | TEXT        | Región o provincia                   |

## 3. Tabla: zonas
| Campo           | Tipo                    | Descripción                              |
|-----------------|-------------------------|------------------------------------------|
| id              | UUID (PK)               | Identificador único                      |
| codigo          | TEXT, único             | Código interno (ej: ZN-001)              |
| nombre          | TEXT                    | Nombre descriptivo                       |
| poligono        | GEOGRAPHY(POLYGON,4326) | Área geográfica (PostGIS)                |
| activa          | BOOLEAN                 | Estado de la zona                        |
| fecha_version   | DATE                    | Fecha de versión del polígono            |
| ciudad_id       | UUID (FK → ciudades)    | Ciudad a la que pertenece                |

## 4. Tabla: asignacion_zonas
| Campo        | Tipo              | Descripción                              |
|--------------|-------------------|------------------------------------------|
| zona_id      | UUID (PK, FK → zonas)    | Zona asignada (exclusiva)                |
| vendedor_id  | UUID (FK → usuarios)     | Vendedor asignado (relación 1:1)         |
| desde        | DATE                     | Fecha desde cuando está asignada         |

## 5. Tabla: rutas_planificadas
| Campo          | Tipo           | Descripción                              |
|----------------|----------------|------------------------------------------|
| id             | UUID (PK)      | Identificador único                      |
| zona_id        | UUID (FK → zonas) | Zona base de la ruta                  |
| dia_semana     | INT (1-7)      | Día de la semana (1=Lunes)               |
| frecuencia     | TEXT           | semanal / quincenal / mensual            |
| activo         | BOOLEAN        | Ruta activa                              |

## 6. Tabla: clientes
| Campo          | Tipo                    | Descripción                              |
|----------------|-------------------------|------------------------------------------|
| id             | UUID (PK)               | Identificador único                      |
| ruc            | TEXT, único             | RUC o cédula                             |
| razon_social   | TEXT                    | Nombre del cliente                       |
| ubicacion      | GEOGRAPHY(POINT,4326)   | Coordenadas GPS                          |
| tipo_cliente   | TEXT                    | mayorista / minorista / autoservicio     |
| estado         | TEXT                    | activo / inactivo / bloqueado            |
| zona_id        | UUID (FK → zonas)       | Zona geográfica asignada                 |
| vendedor_id    | UUID (FK → usuarios)    | Vendedor responsable                     |
| created_at     | TIMESTAMPTZ             | Fecha de creación                        |

## 7. Tabla: lineas_credito
| Campo            | Tipo           | Descripción                              |
|------------------|----------------|------------------------------------------|
| cliente_id       | UUID (PK, FK → clientes) | Cliente (relación 1:1)                 |
| cupo_total       | DECIMAL(12,2)  | Cupo máximo aprobado                     |
| saldo_utilizado  | DECIMAL(12,2)  | Cupo usado                               |
| saldo_vencido    | DECIMAL(12,2)  | Saldo vencido                            |
| dias_gracia      | INT            | Días de gracia permitidos                |
| bloqueado        | BOOLEAN        | Bloqueado por mora                       |

## 8. Tabla: productos
| Campo                | Tipo           | Descripción                              |
|----------------------|----------------|------------------------------------------|
| id                   | UUID (PK)      | Identificador único                      |
| codigo               | TEXT, único    | Código interno del producto              |
| nombre               | TEXT           | Nombre comercial                         |
| presentacion         | TEXT           | Formato (caja, bolsa, etc.)              |
| temperatura_requerida| DECIMAL(5,2)   | Temperatura ideal                        |
| es_perecible         | BOOLEAN        | Requiere cadena de frío                  |
| peso_kg              | DECIMAL(8,3)   | Peso promedio por unidad                 |
| activo               | BOOLEAN        | Producto activo                          |

## 9. Tabla: kardex
| Campo             | Tipo           | Descripción                              |
|-------------------|----------------|------------------------------------------|
| producto_id       | UUID (PK, FK → productos) | Producto (1:1)                        |
| stock_fisico      | INT            | Stock real en bodega                     |
| stock_reservado   | INT            | Reservado por pedidos                    |
| stock_mermas      | INT            | Mermas acumuladas                        |

## 10. Tabla: movimientos_inventario
| Campo        | Tipo           | Descripción                              |
|--------------|----------------|------------------------------------------|
| id           | UUID (PK)      | Identificador único                      |
| producto_id  | UUID (FK → productos) | Producto afectado                   |
| tipo         | TEXT           | entrada / salida / ajuste / merma        |
| cantidad     | INT            | Cantidad (+ o -)                         |
| motivo       | TEXT           | Razón del movimiento                     |
| pedido_id    | UUID           | Pedido relacionado (opcional)            |

## 11. Tabla: pedidos
| Campo              | Tipo                    | Descripción                              |
|--------------------|-------------------------|------------------------------------------|
| id                 | UUID (PK)               | Identificador único                      |
| numero_pedido      | TEXT, único             | Número secuencial                        |
| cliente_id         | UUID (FK → clientes)    | Cliente solicitante                      |
| vendedor_id        | UUID (FK → usuarios)    | Vendedor que registra                    |
| fecha_creacion     | TIMESTAMPTZ             | Fecha y hora del pedido                  |
| ubicacion_venta    | GEOGRAPHY(POINT,4326)   | GPS donde se tomó                        |
| estado             | TEXT                    | borrador / confirmado / entregado / etc |
| total              | DECIMAL(12,2)           | Total monetario                          |
| peso_total         | DECIMAL(10,3)           | Peso total en kg                         |
| factura_id         | UUID                    | Factura generada                         |
| lote_despacho_id   | UUID                    | Lote de entrega                          |

## 12. Tabla: detalles_pedido
| Campo           | Tipo           | Descripción                              |
|-----------------|----------------|------------------------------------------|
| id              | UUID (PK)      | Identificador único                      |
| pedido_id       | UUID (FK → pedidos)   | Pedido padre                      |
| producto_id     | UUID (FK → productos) | Producto vendido                  |
| cantidad        | INT            | Cantidad solicitada                      |
| precio_unitario | DECIMAL(12,2)  | Precio aplicado                          |
| subtotal        | DECIMAL(12,2)  | cantidad × precio (calculado)            |

## 13. Tabla: vehiculos
| Campo         | Tipo           | Descripción                              |
|---------------|----------------|------------------------------------------|
| id            | UUID (PK)      | Identificador único                      |
| placa         | TEXT, único    | Placa del vehículo                       |
| capacidad_kg  | DECIMAL(8,2)   | Capacidad máxima                         |
| cadena_frio   | BOOLEAN        | Tiene refrigeración                      |
| activo        | BOOLEAN        | Vehículo disponible                      |

## 14. Tabla: lotes_despacho
| Campo             | Tipo           | Descripción                              |
|-------------------|----------------|------------------------------------------|
| id                | UUID (PK)      | Identificador único                      |
| numero_manifiesto | TEXT, único    | Número del manifiesto                    |
| repartidor_id     | UUID (FK → usuarios) | Repartidor asignado                |
| vehiculo_id       | UUID (FK → vehiculos) | Vehículo usado                     |
| fecha             | DATE           | Fecha del despacho                       |
| hora_salida       | TIME           | Hora de salida                           |
| estado            | TEXT           | programado / en_ruta / finalizado        |

## 15. Tabla: entregas
| Campo           | Tipo           | Descripción                              |
|-----------------|----------------|------------------------------------------|
| pedido_id       | UUID (PK, FK → pedidos) | Pedido entregado                 |
| hora_llegada    | TIMESTAMPTZ    | Hora real de entrega                     |
| estado          | TEXT           | entregado / fallido / reagendado         |
| foto_evidencia  | TEXT           | URL de foto (Storage)                    |
| firma_cliente   | TEXT           | URL de firma (Storage)                   |

## 16. Tabla: facturas
| Campo           | Tipo           | Descripción                              |
|-----------------|----------------|------------------------------------------|
| id              | UUID (PK)      | Identificador único                      |
| pedido_id       | UUID (UK, FK → pedidos) | Pedido facturado (1:1)           |
| folio_fiscal    | TEXT, único    | Número de factura SRI                    |
| fecha_emision   | DATE           | Fecha de emisión                         |
| estado_sri      | TEXT           | autorizada / rechazada / pendiente       |

## 17. Tabla: pagos
| Campo           | Tipo           | Descripción                              |
|-----------------|----------------|------------------------------------------|
| id              | UUID (PK)      | Identificador único                      |
| factura_id      | UUID           | Factura pagada                           |
| monto           | DECIMAL(12,2)  | Monto del pago                           |
| forma_pago      | TEXT           | efectivo / transferencia / tarjeta       |
| foto_comprobante| TEXT           | URL del comprobante                      |

## 18. Tabla: cierres_caja
| Campo             | Tipo           | Descripción                              |
|-------------------|----------------|------------------------------------------|
| id                | UUID (PK)      | Identificador único                      |
| vendedor_id       | UUID (FK → usuarios) | Vendedor que cierra                |
| fecha             | DATE           | Fecha del cierre                         |
| total_sistema     | DECIMAL(12,2)  | Total calculado por sistema              |
| total_declarado   | DECIMAL(12,2)  | Total contado por vendedor               |
| diferencia        | DECIMAL(12,2)  | Diferencia (calculada)                   |

## 19. Tabla: tickets_incidencia
| Campo      | Tipo           | Descripción                              |
|------------|----------------|------------------------------------------|
| id         | UUID (PK)      | Identificador único                      |
| cliente_id | UUID (FK → clientes) | Cliente que reporta                 |
| tipo       | TEXT           | falla_producto / demora / facturación    |
| estado     | TEXT           | nuevo / en_proceso / resuelto            |

## 20. Tabla: solicitudes_devolucion
| Campo         | Tipo           | Descripción                              |
|---------------|----------------|------------------------------------------|
| id            | UUID (PK)      | Identificador único                      |
| pedido_id     | UUID           | Pedido relacionado                       |
| cliente_id    | UUID (FK → clientes) | Cliente solicitante                 |
| motivo        | TEXT           | Motivo de la devolución                  |
| estado        | TEXT           | pendiente / aprobada / rechazada         |

## 21. Tabla: inspecciones_calidad
| Campo           | Tipo           | Descripción                              |
|-----------------|----------------|------------------------------------------|
| id              | UUID (PK)      | Identificador único                      |
| solicitud_id    | UUID (FK → solicitudes_devolucion) | Devolución inspeccionada       |
| fisico_aprobado | BOOLEAN        | Estado físico del producto               |
| decision        | TEXT           | aprobada / rechazada / nota_credito      ||

