# Diagrama de Clases de Cafrilosa — Diccionario

Este archivo complementa la matriz de clases con una descripción breve, atributos, y una lista de sus métodos, herencia, y relaciones (asociaciones/dependencias).

---
### **MÓDULO DE SEGURIDAD Y ACTORES**

### Usuario

**Descripción:** Clase base que define los atributos de acceso y seguridad para cualquier persona que interactúe con el sistema.

| Atributo | Tipo | Descripción |
|---|---|---|
| id | String | Identificador único del usuario |
| nombreUsuario | String | Nombre de usuario para login |
| contrasena | String | Credencial de acceso cifrada |
| activo | boolean | Estado de la cuenta (activa/inactiva) |
| rol | String | Nivel de permisos asignado |

  * **Métodos:** login(), logout()
  * **Hereda de:** —
  * **Clase padre de:** Supervisor, Vendedor, Repartidor, Bodeguero, ClienteUsuario

-----

### Supervisor

**Descripción:** Usuario encargado de la auditoría en campo y la gestión de excepciones comerciales.

| Atributo | Tipo | Descripción |
|---|---|---|
| — | — | Atributos heredados de `Usuario` |

  * **Métodos:** aprobarExcepcionCredito(), disenarRuta(RutaPlanificada), auditarCarteraEnCampo()
  * **Hereda de:** **Usuario**
  * **Relaciones:** RutaPlanificada

-----

### Vendedor

**Descripción:** Usuario responsable de la gestión comercial, toma de pedidos y cobros en ruta.

| Atributo | Tipo | Descripción |
|---|---|---|
| zonasAsignadas | List\<Zona\> | Zonas geográficas bajo su responsabilidad |
| — | — | Atributos heredados de `Usuario` |

  * **Métodos:** realizarECheckIn(), registrarPedido(), cobrarCartera(), realizarCierreCaja()
  * **Hereda de:** **Usuario**
  * **Relaciones:** Zona (1-1 exclusiva), Pedido (1-*), CierreCaja (1-*), SolicitudDevolucion (verificador)

-----

### Repartidor

**Descripción:** Usuario encargado de la logística de última milla y entrega de mercancía.

| Atributo | Tipo | Descripción |
|---|---|---|
| tipoLicencia | String | Categoría de licencia de conducir |
| — | — | Atributos heredados de `Usuario` |

  * **Métodos:** actualizarEstadoEntrega(), registrarEvidencia(Foto, Firma)
  * **Hereda de:** **Usuario**
  * **Relaciones:** LoteDespacho (Conductor)

-----

### Bodeguero

**Descripción:** Usuario responsable de las operaciones internas de almacén e inventario.

| Atributo | Tipo | Descripción |
|---|---|---|
| — | — | Atributos heredados de `Usuario` |

  * **Métodos:** validarStock(), realizarPicking(), cargarVehiculo(), inspeccionarDevolucion(), gestionarCatalogo()
  * **Hereda de:** **Usuario**
  * **Relaciones:** Inventario, Vehiculo

-----

### ClienteUsuario

**Descripción:** Usuario final externo que accede al sistema para autoservicio.

| Atributo | Tipo | Descripción |
|---|---|---|
| — | — | Atributos heredados de `Usuario` |

  * **Métodos:** verEstadoCuenta(), descargarFactura(), crearPedidoAutoservicio()
  * **Hereda de:** **Usuario**
  * **Relaciones:** TicketIncidencia, SolicitudDevolucion

-----

### **MÓDULO DE GESTIÓN TERRITORIAL**

### Ciudad

**Descripción:** Entidad geográfica macro que agrupa zonas de venta.

| Atributo | Tipo | Descripción |
|---|---|---|
| id | String | Identificador de la ciudad |
| nombre | String | Nombre de la ciudad |
| region | String | Región administrativa a la que pertenece |

  * **Métodos:** —
  * **Relaciones:** Zona (1 contiene \*)

-----

### Zona

**Descripción:** Subdivisión territorial asignada a un vendedor específico.

| Atributo | Tipo | Descripción |
|---|---|---|
| codigo | String | Código único de zona |
| poligonoKML | String | Definición geográfica del área |
| activa | boolean | Estado de la zona |
| fechaVersion | Date | Fecha de la última modificación territorial |

  * **Métodos:** validarSolapamiento()
  * **Relaciones:** Ciudad, Vendedor (1-1), RutaPlanificada (1 contiene \*)

-----

### RutaPlanificada

**Descripción:** Planificación logística de visitas para un día específico.

| Atributo | Tipo | Descripción |
|---|---|---|
| id | String | Identificador de la ruta |
| dia | DiaSemana | Día de la semana asignado |
| frecuencia | String | Frecuencia de visita (semanal, quincenal, etc.) |

  * **Métodos:** optimizarSecuencia(), ajustarPorFeriado(Calendario)
  * **Relaciones:** Zona, Calendario, Cliente (visita programada), LoteDespacho (genera ejecución)

-----

### Calendario

**Descripción:** Gestión de fechas, feriados y días operativos.

| Atributo | Tipo | Descripción |
|---|---|---|
| fecha | Date | Fecha específica |
| esFeriado | boolean | Indica si es día no laborable |
| descripcion | String | Motivo del feriado o nota del día |

  * **Métodos:** validarDiaLaborable()
  * **Relaciones:** RutaPlanificada (Consulta)

-----

### **MÓDULO COMERCIAL Y VENTAS**

### Cliente

**Descripción:** Entidad comercial a la que se le venden productos.

| Atributo | Tipo | Descripción |
|---|---|---|
| ruc | String | Registro Único de Contribuyentes |
| razonSocial | String | Nombre legal de la empresa/persona |
| latitud | double | Coordenada GPS Y |
| longitud | double | Coordenada GPS X |
| tipoCliente | String | Segmentación del cliente |
| estado | String | Estado comercial (activo, bloqueado, etc.) |

  * **Métodos:** validarGeolocalizacion()
  * **Relaciones:** RutaPlanificada, LineaCredito (1-1), Pedido (1-\*)

-----

### LineaCredito

**Descripción:** Definición de las condiciones financieras otorgadas a un cliente.

| Atributo | Tipo | Descripción |
|---|---|---|
| cupoTotal | double | Monto máximo de crédito autorizado |
| saldoUtilizado | double | Deuda actual |
| saldoVencido | double | Monto en mora |
| diasGracia | int | Días adicionales permitidos para pago |

  * **Métodos:** validarDisponibilidad(), bloquearPorMora()
  * **Relaciones:** Cliente (1-1)

-----

### Pedido

**Descripción:** Transacción de venta solicitada por un cliente.

| Atributo | Tipo | Descripción |
|---|---|---|
| numeroPedido | String | Identificador único |
| fechaCreacion | Date | Fecha y hora de la toma del pedido |
| ubicacionVenta | GPS | Coordenadas donde se creó el pedido |
| estado | String | Estado del flujo (aprobado, facturado, etc.) |
| total | double | Valor monetario total |
| pesoTotal | double | Peso total para logística |

  * **Métodos:** validarCupo()
  * **Relaciones:** Cliente (Solicita), Vendedor (Gestiona), DetallePedido (1 contiene \*), Factura (1 genera 1), LoteDespacho (Transportado por), EntregaFinal (Resultado)

-----

### DetallePedido

**Descripción:** Línea individual de productos dentro de un pedido.

| Atributo | Tipo | Descripción |
|---|---|---|
| cantidad | int | Unidades solicitadas |
| peso | double | Peso de la línea |
| precioUnitario | double | Precio por unidad al momento de venta |
| subtotal | double | Precio x Cantidad |

  * **Métodos:** —
  * **Relaciones:** Pedido, Producto, Promocion

-----

### Promocion

**Descripción:** Reglas de negocio para aplicar descuentos o bonificaciones.

| Atributo | Tipo | Descripción |
|---|---|---|
| inicio | Date | Fecha de inicio de vigencia |
| fin | Date | Fecha de fin de vigencia |
| tipo | String | Mecánica de la promoción (descuento, 2x1, etc.) |

  * **Métodos:** aplicarBonificacion(Pedido)
  * **Relaciones:** DetallePedido (Modifica)

-----

### **MÓDULO DE INVENTARIO Y LOGÍSTICA**

### Producto

**Descripción:** Ítem comercializable con características físicas y de conservación.

| Atributo | Tipo | Descripción |
|---|---|---|
| codigoUnico | String | SKU o código de barras |
| nombre | String | Descripción comercial |
| presentacion | String | Unidad de medida/empaque |
| temperaturaRequerida | double | Grados para conservación |
| condicionConservacion | String | Seco, congelado, refrigerado |
| esPerecible | boolean | Indica si tiene caducidad crítica |

  * **Métodos:** —
  * **Relaciones:** DetallePedido, KardexInventario (1-1)

-----

### KardexInventario

**Descripción:** Control de existencias y disponibilidad del producto.

| Atributo | Tipo | Descripción |
|---|---|---|
| stockFisico | int | Cantidad total en bodega |
| stockReservado | int | Cantidad comprometida en pedidos |
| stockMermas | int | Cantidad no apta para venta |

  * **Métodos:** generarAlertaStock()
  * **Relaciones:** Producto, MovimientoInventario (Traza historial)

-----

### LoteDespacho

**Descripción:** Agrupación logística de pedidos para ser transportados en un viaje.

| Atributo | Tipo | Descripción |
|---|---|---|
| numeroManifiesto | String | Identificador del viaje |
| numeroTanda | int | Secuencia de carga |
| horaSalida | Date | Hora programada de salida |
| pesoCargaActual | double | Peso acumulado de los pedidos |

  * **Métodos:** validarCapacidad(), generarHojaRuta()
  * **Relaciones:** RutaPlanificada, Vehiculo (1-1), Pedido (1-\*), Repartidor (Conductor)

-----

### Vehiculo

**Descripción:** Unidad de transporte utilizada para el despacho.

| Atributo | Tipo | Descripción |
|---|---|---|
| placa | String | Identificación del vehículo |
| capacidadKg | double | Capacidad máxima de carga |
| cadenaFrio | boolean | Si posee sistema de refrigeración |
| estadoMantenimiento | String | Estado operativo |

  * **Métodos:** —
  * **Relaciones:** LoteDespacho

-----

### **MÓDULO DE FINANZAS Y SOPORTE**

### Factura

**Descripción:** Documento tributario generado a partir de un pedido.

| Atributo | Tipo | Descripción |
|---|---|---|
| folioFiscal | String | Número autorizado por el SRI |
| jsonIntegracionERP | String | Estructura de datos para contabilidad |
| estadoSRI | String | Estado de autorización fiscal |
| fechaVencimiento | Date | Fecha límite de pago |

  * **Métodos:** sincronizarVisualFAC()
  * **Relaciones:** Pedido (1-1), Pago (Liquida)

-----

### CierreCaja

**Descripción:** Proceso diario de conciliación de valores recaudados por el vendedor.

| Atributo | Tipo | Descripción |
|---|---|---|
| fecha | Date | Fecha del cierre |
| totalCalculadoSistema | double | Lo que el sistema dice que debe tener |
| totalDeclaradoVendedor | double | Lo que el vendedor entrega físicamente |
| diferencia | double | Sobrante o faltante |

  * **Métodos:** validarCuadre()
  * **Relaciones:** Vendedor (Realiza), Pago (Consolida)

-----

### Pago

**Descripción:** Registro de un cobro realizado a un cliente.

| Atributo | Tipo | Descripción |
|---|---|---|
| monto | double | Cantidad abonada |
| formaPago | String | Efectivo, Cheque, Transferencia |
| fotoCheque | Imagen | Evidencia digital si aplica |

  * **Métodos:** asignarAFactura()
  * **Relaciones:** CierreCaja, Factura (1..\* Liquida)

-----

### TicketIncidencia

**Descripción:** Reporte de problemas de servicio o soporte técnico.

| Atributo | Tipo | Descripción |
|---|---|---|
| id | String | Identificador del ticket |
| tipo | String | Categoría del problema |
| descripcion | String | Detalle del incidente |
| estado | String | Abierto, En proceso, Cerrado |

  * **Métodos:** escalarAreaResolutora()
  * **Relaciones:** ClienteUsuario (Reporta)

-----

### SolicitudDevolucion

**Descripción:** Petición formal para retornar productos.

| Atributo | Tipo | Descripción |
|---|---|---|
| id | String | Identificador de la solicitud |
| motivo | String | Razón de la devolución |
| evidenciaCliente | Imagen | Foto del producto dañado/erróneo |

  * **Métodos:** validarVentanaTiempo()
  * **Relaciones:** ClienteUsuario (Solicita), Vendedor (Verifica), InspeccionCalidad (Validación)

-----

### InspeccionCalidad

**Descripción:** Proceso de validación física de una devolución en bodega.

| Atributo | Tipo | Descripción |
|---|---|---|
| fisicoAprobado | boolean | Si el producto existe físicamente |
| sellado | boolean | Si el empaque está íntegro |
| decisionFinal | String | Aceptado/Rechazado |

  * **Métodos:** autorizarNotaCredito()
  * **Relaciones:** SolicitudDevolucion, MovimientoInventario (Genera ajuste)