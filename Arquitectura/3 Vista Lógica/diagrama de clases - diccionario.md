# Diagrama de Clases de Cafrilosa — Diccionario

Este archivo complementa la matriz de clases con una descripción breve, atributos, y una lista de sus métodos, herencia, y relaciones (asociaciones/dependencias).

---

### **MÓDULO DE GESTIÓN TERRITORIAL**

### Ciudad

**Descripción:** Entidad que representa la agrupación regional de nivel superior donde la empresa tiene operaciones.

| Atributo | Tipo | Descripción |
| --- | --- | --- |
| id | String | Identificador único de la ciudad |
| nombre | String | Nombre oficial de la urbe |
| region | String | Zona geográfica (ej. Costa, Sierra) |

* **Métodos:** —
* **Hereda de:** —
* **Relaciones:** Contiene múltiples **Zonas** (1-*).

---

### Zona

**Descripción:** Área geográfica delimitada (mediante polígonos KML) asignada exclusivamente a un vendedor.

| Atributo | Tipo | Descripción |
| --- | --- | --- |
| codigo | String | Código único de identificación de zona |
| poligonoKML | String | Datos vectoriales para el trazado del mapa |
| activa | boolean | Estado operativo de la zona |
| fechaVersion | Date | Fecha de la última modificación del perímetro |

* **Métodos:** validarSolapamiento()
* **Hereda de:** —
* **Relaciones:** Ciudad (pertenece), **Vendedor** (asignación exclusiva), **RutaPlanificada** (contiene).

---

### Calendario

**Descripción:** Maestro de control cronológico utilizado para validar la operatividad de las rutas y días laborables.

| Atributo | Tipo | Descripción |
| --- | --- | --- |
| fecha | Date | Fecha específica |
| esFeriado | boolean | Indica si el día es no laborable |
| descripcion | String | Motivo del feriado o nota del día |

* **Métodos:** validarDiaLaborable()
* **Hereda de:** —
* **Relaciones:** Consultada por **RutaPlanificada**.

---

### RutaPlanificada

**Descripción:** Planificación de la secuencia de visitas que debe realizar el vendedor en un día específico.

| Atributo | Tipo | Descripción |
| --- | --- | --- |
| id | String | ID de la planificación |
| dia | DiaSemana | Día asignado de la semana |
| frecuencia | String | Periodicidad de la visita (Semanal/Quincenal) |

* **Métodos:** optimizarSecuencia(), ajustarPorFeriado(Calendario)
* **Hereda de:** —
* **Relaciones:** Zona (pertenece), **Cliente** (visita programada), **Calendario** (consulta).

---

### **MÓDULO COMERCIAL Y VENTAS**

### Cliente

**Descripción:** Persona natural o jurídica que adquiere productos y posee una ubicación geográfica validada.

| Atributo | Tipo | Descripción |
| --- | --- | --- |
| ruc | String | Registro único de contribuyente |
| razonSocial | String | Nombre comercial o legal |
| latitud | double | Coordenada geográfica de ubicación |
| longitud | double | Coordenada geográfica de ubicación |
| tipoCliente | String | Clasificación (ej. Distribuidor, Minorista) |
| estado | String | Situación del cliente (Activo/Inactivo) |

* **Métodos:** validarGeolocalizacion()
* **Hereda de:** —
* **Relaciones:** RutaPlanificada (visitado), **LineaCredito** (posee), **Pedido** (solicita).

---

### LineaCredito

**Descripción:** Entidad que controla los límites financieros y el estado de morosidad de un cliente.

| Atributo | Tipo | Descripción |
| --- | --- | --- |
| cupoTotal | double | Monto máximo de crédito permitido |
| saldoUtilizado | double | Deuda actual del cliente |
| saldoVencido | double | Monto de facturas con fecha de pago expirada |
| diasGracia | int | Días adicionales permitidos antes del bloqueo |

* **Métodos:** validarDisponibilidad(), bloquearPorMora()
* **Hereda de:** —
* **Relaciones:** Asociada de forma exclusiva a **Cliente**.

---

### Pedido

**Descripción:** Documento transaccional que captura la intención de compra y las condiciones de entrega.

| Atributo | Tipo | Descripción |
| --- | --- | --- |
| numeroPedido | String | Identificador único de transacción |
| fechaCreacion | Date | Fecha y hora del registro |
| ubicacionVenta | GPS | Lugar exacto donde se registró el pedido |
| estado | String | Estatus actual (Pendiente, Facturado, etc.) |
| total | double | Valor monetario final de la orden |
| pesoTotal | double | Suma del peso de los productos (kg) |

* **Métodos:** validarCupo()
* **Hereda de:** —
* **Relaciones:** Cliente (solicita), **Vendedor** (gestiona), **DetallePedido** (composición), **Factura** (genera).

---

### **MÓDULO DE INVENTARIO Y PRODUCTO**

### Producto

**Descripción:** Artículo físico disponible para la venta con especificaciones técnicas de conservación.

| Atributo | Tipo | Descripción |
| --- | --- | --- |
| codigoUnico | String | SKU o código de barras |
| nombre | String | Nombre comercial |
| presentacion | String | Formato de empaque (ej. Caja x12) |
| temperaturaRequerida | double | Grados necesarios para transporte |
| condicionConservacion | String | Notas sobre manejo de carga |
| esPerecible | boolean | Indica si tiene fecha de caducidad |

* **Métodos:** —
* **Hereda de:** —
* **Relaciones:** **KardexInventario** (asociación), DetallePedido (referenciado).

---

### **MÓDULO DE LOGÍSTICA**

### LoteDespacho

**Descripción:** Consolidado de pedidos (Manifiesto de carga) asignados a un vehículo y repartidor.

| Atributo | Tipo | Descripción |
| --- | --- | --- |
| numeroManifiesto | String | ID legal de despacho |
| numeroTanda | int | Orden de salida (ej. Primer viaje) |
| horaSalida | Date | Hora programada de despacho |
| pesoCargaActual | double | Peso real cargado en el vehículo |

* **Métodos:** validarCapacidad(), generarHojaRuta()
* **Hereda de:** —
* **Relaciones:** **Vehiculo** (utiliza), **Repartidor** (conduce), Pedido (transporta).

---

### **MÓDULO DE FINANZAS**

### Factura

**Descripción:** Comprobante legal de venta integrado con el ERP y el organismo tributario (SRI).

| Atributo | Tipo | Descripción |
| --- | --- | --- |
| folioFiscal | String | Clave de acceso / Autorización SRI |
| jsonIntegracionERP | String | Estructura de datos para el sistema contable |
| estadoSRI | String | Respuesta del ente tributario |
| fechaVencimiento | Date | Límite de pago para el cliente |

* **Métodos:** sincronizarVisualFAC()
* **Hereda de:** —
* **Relaciones:** Pedido (origen), **Pago** (liquidación).

---

### **MÓDULO DE POSVENTA Y SOPORTE**

### TicketIncidencia

**Descripción:** Registro de reclamos o problemas reportados por el cliente o vendedor.

| Atributo | Tipo | Descripción |
| --- | --- | --- |
| id | String | ID de seguimiento |
| tipo | String | Categoría (Logística/Administrativa) |
| descripcion | String | Detalle del problema |
| estado | String | Estatus de resolución |

* **Métodos:** escalarAreaResolutora()
* **Hereda de:** —
* **Relaciones:** Reportado por **ClienteUsuario**.
