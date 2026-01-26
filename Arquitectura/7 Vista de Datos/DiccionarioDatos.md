<p align="right">
  <img src="https://i.postimg.cc/13qQdqZs/utpllogo.png" alt="Logo UTPL" width="150"/>
</p>

## 10.2. Diccionario de Datos
El presente Diccionario de Datos documenta la estructura física de los 8 microservicios que componen el ecosistema CAFRILOSA. Este documento cumple con los estándares de metadatos (alineado a DAMA-DMBOK) para garantizar la comprensión semántica y técnica de la información.

Cada tabla describe sus atributos, tipos de datos (basados en PostgreSQL 17), restricciones de integridad (PK, FK, Unique, Check) y su propósito en el negocio. Es la referencia técnica definitiva para desarrolladores y administradores de base de datos.
## 1. MICROSERVICIO: AUTH-SERVICE (cafrilosa_auth)

### Tabla: app.credenciales
Gestión de contraseñas y estado de acceso.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **usuario_id** | `UUID` | PK | Identificador único del usuario (vincula con User-Service). |
| **email** | `CITEXT` | UNIQUE, NOT NULL | Correo electrónico (case-insensitive). |
| **password_hash** | `TEXT` | NOT NULL | Hash de la contraseña (Argon2id). |
| **estado** | `ENUM` | NOT NULL | 'activo', 'bloqueado', 'suspendido'. |
| **bloqueado_motivo** | `ENUM` | NULL | Razón del bloqueo (ej. 'intentos_fallidos'). |
| **ultimo_login_en** | `TIMESTAMPTZ` | NULL | Fecha y hora del último acceso exitoso. |

### Tabla: app.sesiones
Control de Refresh Tokens y dispositivos.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **id** | `UUID` | PK | Identificador único de la sesión. |
| **usuario_id** | `UUID` | NOT NULL | Usuario dueño de la sesión. |
| **refresh_hash** | `TEXT` | UNIQUE, NOT NULL | Hash del token de refresco (para detectar robo). |
| **dispositivo_meta** | `JSONB` | DEFAULT '{}' | Metadatos del dispositivo (OS, Browser). |
| **expira_en** | `TIMESTAMPTZ` | NOT NULL | Fecha de caducidad del token. |
| **revocado_en** | `TIMESTAMPTZ` | NULL | Si no es NULL, la sesión fue cerrada/invalidada. |

---

## 2. MICROSERVICIO: USER-SERVICE (cafrilosa_usuarios)

### Tabla: app.usuarios
Directorio base de actores del sistema.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **id** | `UUID` | PK | Identificador global del usuario. |
| **email** | `CITEXT` | UNIQUE, NOT NULL | Correo electrónico principal. |
| **rol** | `ENUM` | NOT NULL | 'cliente', 'vendedor', 'bodeguero', etc. |
| **estado** | `ENUM` | NOT NULL | 'activo', 'inactivo', 'suspendido'. |

### Tabla: app.perfiles_usuario
Información demográfica.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **usuario_id** | `UUID` | PK, FK -> usuarios | Vínculo 1:1 con la tabla usuarios. |
| **nombres** | `VARCHAR(100)` | NOT NULL | Nombres del usuario. |
| **apellidos** | `VARCHAR(100)` | NOT NULL | Apellidos del usuario. |
| **telefono** | `VARCHAR(30)` | NULL | Teléfono de contacto. |
| **preferencias** | `JSONB` | DEFAULT '{}' | Configuración de UI/Notificaciones. |

### Tabla: app.clientes
Datos comerciales para clientes.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **usuario_id** | `UUID` | PK, FK -> usuarios | Vínculo 1:1 con usuario. |
| **canal_id** | `UUID` | FK -> canales | Canal comercial (Mayorista/Minorista). |
| **zona_id** | `UUID` | NOT NULL | ID lógico de la Zona (Zone-Service). |
| **ruc** | `VARCHAR(50)` | NULL | RUC para facturación. |
| **vendedor_asignado_id** | `UUID` | NULL | ID lógico del Vendedor asignado. |
| **latitud** | `NUMERIC(9,6)` | NULL | Coordenada geográfica. |
| **longitud** | `NUMERIC(9,6)` | NULL | Coordenada geográfica. |

---

## 3. MICROSERVICIO: CATALOG-SERVICE (cafrilosa_catalogo)

### Tabla: app.productos
Definición abstracta del producto.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **id** | `UUID` | PK | Identificador único. |
| **categoria_id** | `UUID` | FK -> categorias | Categoría a la que pertenece. |
| **nombre** | `VARCHAR(255)` | NOT NULL | Nombre comercial del producto. |
| **slug** | `VARCHAR(255)` | UNIQUE, NOT NULL | URL-friendly ID. |
| **activo** | `BOOLEAN` | DEFAULT true | Si el producto está habilitado. |

### Tabla: app.skus
Unidades de venta (Stock Keeping Unit).

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **id** | `UUID` | PK | Identificador único del SKU. |
| **producto_id** | `UUID` | FK -> productos | Producto padre. |
| **codigo_sku** | `VARCHAR(50)` | UNIQUE, NOT NULL | Código interno (ej. SAL-VIE-500). |
| **peso_gramos** | `INT` | CHECK > 0 | Peso para cálculo logístico. |
| **tipo_empaque** | `VARCHAR(50)` | NOT NULL | Ej. 'Paquete', 'Caja', 'Unidad'. |

### Tabla: app.precios_sku
Historial y vigencia de precios.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **id** | `UUID` | PK | Identificador del precio. |
| **sku_id** | `UUID` | FK -> skus | SKU al que aplica. |
| **precio** | `NUMERIC(12,2)` | CHECK >= 0 | Valor monetario. |
| **vigente_hasta** | `TIMESTAMPTZ` | NULL | Si es NULL, es el precio ACTUAL. |
| **(Índice)** | | UNIQUE (sku_id) | Solo un precio activo (vigente_hasta IS NULL). |

---

## 4. MICROSERVICIO: ZONE-SERVICE (cafrilosa_zonas)

### Tabla: app.zonas
Territorios de venta y distribución.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **id** | `UUID` | PK | Identificador de la zona. |
| **codigo** | `VARCHAR(20)` | UNIQUE, NOT NULL | Código corto (ej. Z-NORTE). |
| **nombre** | `VARCHAR(100)` | NOT NULL | Nombre descriptivo. |
| **zona_geom** | `GEOMETRY` | Opcional (PostGIS) | Polígono geográfico de la zona. |

### Tabla: app.horarios_zona
Reglas de operación por día.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **zona_id** | `UUID` | FK -> zonas | Zona configurada. |
| **dia_semana** | `INT` | CHECK 0-6 | 0=Domingo, 1=Lunes, etc. |
| **entregas_habilitadas** | `BOOLEAN` | NOT NULL | ¿Se puede entregar mercancía este día? |
| **visitas_habilitadas** | `BOOLEAN` | NOT NULL | ¿El vendedor visita este día? |

---

## 5. MICROSERVICIO: ORDER-SERVICE (cafrilosa_pedidos)

### Tabla: app.pedidos
Cabecera transaccional.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **id** | `UUID` | PK | Identificador del pedido. |
| **numero_pedido** | `VARCHAR(50)` | UNIQUE | Código legible para humanos. |
| **cliente_id** | `UUID` | NOT NULL | ID lógico del Cliente. |
| **estado** | `ENUM` | NOT NULL | Pendiente, Validado, En Ruta, Entregado. |
| **total** | `NUMERIC(12,2)` | CHECK >= 0 | Monto total a pagar. |
| **fecha_entrega_sugerida** | `DATE` | NULL | Fecha solicitada por el cliente. |

### Tabla: app.items_pedido
Detalle de productos.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **pedido_id** | `UUID` | FK -> pedidos | Pedido padre. |
| **sku_id** | `UUID` | NOT NULL | ID lógico del SKU. |
| **cantidad_solicitada** | `INT` | CHECK > 0 | Cantidad pedida. |
| **precio_unitario_base** | `NUMERIC(12,2)` | NOT NULL | Snapshot del precio al momento de compra. |
| **precio_unitario_final** | `NUMERIC(12,2)` | NOT NULL | Precio luego de descuentos. |

### Tabla: app.items_validacion_bodega
Resultado de la revisión de inventario.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **validacion_id** | `UUID` | FK -> validaciones | Versión de la validación. |
| **estado_resultado** | `ENUM` | NOT NULL | 'aprobado', 'sustituido', 'rechazado'. |
| **cantidad_aprobada** | `INT` | NULL | Cantidad real que se despachará. |
| **sku_aprobado_id** | `UUID` | NULL | Si se sustituye, el ID del nuevo SKU. |

---

## 6. MICROSERVICIO: CREDIT-SERVICE (cafrilosa_creditos)

### Tabla: app.aprobaciones_credito
Registro de deuda.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **id** | `UUID` | PK | Identificador del crédito. |
| **pedido_id** | `UUID` | UNIQUE, NOT NULL | Pedido asociado. |
| **monto_aprobado** | `NUMERIC(12,2)` | CHECK > 0 | Monto total de la deuda. |
| **estado** | `ENUM` | NOT NULL | 'activo', 'pagado', 'vencido'. |
| **fecha_vencimiento** | `DATE` | NOT NULL | Fecha límite de pago. |

### Tabla: app.pagos_credito
Abonos realizados.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **aprobacion_credito_id** | `UUID` | FK -> aprobaciones | Crédito al que abona. |
| **monto_pago** | `NUMERIC(12,2)` | CHECK > 0 | Valor abonado. |
| **fecha_pago** | `DATE` | NOT NULL | Fecha del pago. |
| **referencia** | `VARCHAR(80)` | NULL | Nro de recibo o transferencia. |

---

## 7. MICROSERVICIO: ROUTE-SERVICE (cafrilosa_rutas)

### Tabla: app.vehiculos
Flota de transporte.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **id** | `UUID` | PK | Identificador del vehículo. |
| **placa** | `VARCHAR(20)` | UNIQUE | Placa del vehículo. |
| **capacidad_kg** | `INT` | NULL | Capacidad de carga. |
| **estado** | `ENUM` | NOT NULL | 'disponible', 'asignado', 'mantenimiento'. |

### Tabla: app.ruteros_logisticos
Hoja de ruta para camiones.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **id** | `UUID` | PK | Identificador del rutero. |
| **fecha_rutero** | `DATE` | NOT NULL | Fecha de ejecución. |
| **vehiculo_id** | `UUID` | FK -> vehiculos | Vehículo asignado. |
| **transportista_id** | `UUID` | NOT NULL | ID lógico del conductor. |
| **estado** | `ENUM` | NOT NULL | 'borrador', 'en_curso', 'completado'. |

### Tabla: app.paradas_rutero_logistico
Secuencia de entrega.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **rutero_id** | `UUID` | FK -> ruteros_log | Rutero padre. |
| **pedido_id** | `UUID` | UNIQUE | ID lógico del Pedido a entregar. |
| **orden_entrega** | `INT` | NOT NULL | Número secuencial en la ruta (1, 2, 3...). |

---

## 8. MICROSERVICIO: BILLING-SERVICE (cafrilosa_facturacion)

### Tabla: app.documentos_fiscales
Facturación electrónica SRI.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| **id** | `UUID` | PK | Identificador del documento. |
| **pedido_id** | `UUID` | NOT NULL | ID lógico del Pedido facturado. |
| **tipo** | `ENUM` | NOT NULL | 'factura', 'nota_credito'. |
| **clave_acceso** | `CHAR(49)` | UNIQUE | Clave de 49 dígitos del SRI. |
| **estado** | `ENUM` | NOT NULL | 'borrador', 'enviado_sri', 'autorizado'. |
| **xml_firmado_url** | `TEXT` | NULL | Link al XML firmado. |
| **ride_pdf_url** | `TEXT` | NULL | Link al PDF (RIDE). |
