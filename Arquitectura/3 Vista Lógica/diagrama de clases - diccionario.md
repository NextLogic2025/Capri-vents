# Diagrama de Clases de Cafrilosa — Diccionario

Este archivo complementa la matriz de clases con una descripción breve, atributos, y una lista de sus métodos, herencia, y relaciones (asociaciones/dependencias).

---

### Empleado
Descripción: Representa a un empleado genérico de la organización (base para roles específicos).

| Atributo | Tipo | Descripción |
|---|---|---|
| id | string | Identificador único del empleado |
| nombre | string | Nombre completo |
| rol | string | Rol o cargo (ej. Vendedor, Repartidor) |

* **Métodos:** **—**
* **Hereda de:** **—**
* **Clase padre de:** Vendedor, SupervisorVentas, GerenteAlmacen, Repartidor, Marketing

---

### Vendedor
Descripción: Empleado responsable de gestionar clientes y pedidos asignados.

| Atributo | Tipo | Descripción |
|---|---|---|
| pedidosAsignados | lista/ids | Identificadores de pedidos asignados |
| clientesAsignados | lista/ids | Clientes que atiende |

* **Métodos:** tomarPedido(), realizarSeguimientoPostventa(), registrarVisita(), gestionarCobro(), aplicarEncuestaSatisfaccion()
* **Hereda de:** **Empleado**
* **Relaciones:** Pedido, Cliente

---

###  SupervisorVentas
Descripción: Supervisa al equipo de ventas, aprueba pedidos, y gestiona reclamaciones.

| Atributo | Tipo | Descripción |
|---|---|---|
| — | — | Atributos heredados de `Empleado` |

* **Métodos:** clasificarCliente(), aprobarPedido(), implementarBeneficios(), gestionarIncidencia(), aprobarCredito(), resolverReclamo(), analizarDesempeno(), ajustarEstrategia()
* **Hereda de:** **Empleado**
* **Relaciones:** Cliente, Pedido, Incidencia, LineaCredito, Reclamo, Promocion

---

### GerenteAlmacen
Descripción: Responsable del inventario y despacho desde el almacén.

| Atributo | Tipo | Descripción |
|---|---|---|
| — | — | Atributos heredados de `Empleado` |

* **Métodos:** validarStock(), cerrarPedido(), generarGuia(), monitorearInventario()
* **Hereda de:** **Empleado**
* **Relaciones:** Producto, Pedido, GuiaDespacho, Inventario

---

### Repartidor
Descripción: Empleado encargado de la entrega física de pedidos.

| Atributo | Tipo | Descripción |
|---|---|---|
| — | — | Atributos heredados de `Empleado` |

* **Métodos:** cargarProductos(), confirmarEntrega(), registrarObservacion(), reportarIncidencia()
* **Hereda de:** **Empleado**
* **Relaciones:** Pedido, Incidencia

---

### Marketing
Descripción: Área/empleado encargado de promociones y campañas.

| Atributo | Tipo | Descripción |
|---|---|---|
| — | — | Atributos heredados de `Empleado` |

* **Métodos:** enviarPromocion(), medirROI()
* **Hereda de:** **Empleado**
* **Relaciones:** Promocion

---

### Cliente
Descripción: Persona o empresa que realiza pedidos y consume servicios.

| Atributo | Tipo | Descripción |
|---|---|---|
| id | string | Identificador del cliente |
| nombre | string | Nombre o razón social |
| cedulaRUC | string | Documento de identificación |
| razonSocial | string | Nombre legal (si aplica) |
| direccion | string | Dirección principal de entrega/facturación |
| telefono | string | Teléfono de contacto |
| correo | string | Email de contacto |
| contactoPrincipal | string | Nombre del contacto principal |
| categoriaTamano | string | Clasificación por tamaño (ej. PYME, Corporativo) |
| categoriaFrecuencia | string | Clasificación por frecuencia de compra |
| estado | string | Estado actual del cliente (activo, inactivo, moroso) |
| historialPedidos | lista | Referencia a pedidos anteriores |
| beneficiosAcumulados | lista | Beneficios o puntos acumulados |
| creditoDisponible | float | Límite de crédito disponible |
| scoreCumplimiento | float | Puntuación de cumplimiento de pago |
| npsScore | int | Puntuación de Satisfacción Neta |

* **Métodos:** registrarDatos(), clasificarPerfil(), recibirNotificacion(), evaluarSatisfaccion(), actualizarEtiquetaCobro(), generarReclamo()
* **Relaciones:** Pedido (1–*), Beneficio (1–*), LineaCredito (1–1), Reclamo (1–*), Incidencia (1–*)

---

### Pedido
Descripción: Representa una orden de compra realizada por un cliente.

| Atributo | Tipo | Descripción |
|---|---|---|
| numero | string | Identificador único del pedido |
| productos | lista | Lista de líneas de pedido o ids de producto |
| cantidades | lista | Cantidades correspondientes por producto |
| fechaEntrega | date | Fecha de entrega solicitada |
| nivelUrgencia | string | Prioridad del pedido |
| precioTotal | float | Monto total antes/después de descuentos |
| descuentoAplicado | float | Monto del descuento aplicado |
| estado | string | Estado del pedido (pendiente, pagado, enviado, etc.) |
| direccionEnvio | string | Dirección donde se debe enviar |
| log, lat | float | Coordenadas geográficas de envío |
| pesoTotal, volumenTotal | float | Peso y volumen total del pedido |
| vendedor | string | Referencia al `Vendedor` asignado |
| pago | string | Referencia al `Pago` asociado |
| incidencias | lista | Referencia a `Incidencia` asociadas |

* **Métodos:** registrarProductos(), aplicarDescuentos(), actualizarEstado(), confirmarEntrega(), calcularPesoVolumen(), gestionarIncidencia()
* **Relaciones:** Cliente, Producto (1–*), Vendedor (1–1), Ruta (1–1), Factura (1–1), GuiaDespacho (1–1), Pago (1–1), Incidencia (1–*), Reclamo (1–*)

---

### Producto
Descripción: Ítem vendible con atributos de trazabilidad y conservación.

| Atributo | Tipo | Descripción |
|---|---|---|
| codigo | string | Código o SKU del producto |
| nombre | string | Nombre comercial |
| lote | string | Identificación del lote |
| fechaVencimiento | date | Fecha de caducidad (si aplica) |
| temperaturaRequerida | string | Condición de temperatura para transporte/almacenaje |
| condicionConservacion | string | Condiciones generales de conservación |
| pesoUnitario | float | Peso por unidad |
| volumenUnitario | float | Volumen por unidad |
| margenNeto | float | Margen de beneficio neto esperado |
| indiceRotacion | float | Métrica de qué tan rápido se vende |

* **Métodos:** verificarFrescura(), comprobarTemperatura(), analizarRotacion()
* **Relaciones:** Pedido, Inventario, MovimientoInventario

---

### Ruta
Descripción: Ruta de reparto que agrupa pedidos y define ventanas horarias.

| Atributo | Tipo | Descripción |
|---|---|---|
| id | string | Identificador de la ruta |
| zonaGeografica | string | Área cubierta por la ruta |
| ventanaHoraria | string | Horario de entrega previsto |
| nivelUrgencia | string | Nivel de urgencia de los pedidos agrupados |
| cargaTotal | float | Peso/volumen total de la carga |
| pedidosAsignados | lista | Pedidos asignados a la ruta |

* **Métodos:** asignarVehiculo(), programarReparto(), calcularCarga()
* **Relaciones:** Pedido, Vehiculo

---

### Vehiculo
Descripción: Medio de transporte para entregas.

| Atributo | Tipo | Descripción |
|---|---|---|
| id | string | Identificador del vehículo |
| placa | string | Matrícula |
| choferAsignado | string | Id del empleado conductor |
| cadenaFrio | boolean | Indica si tiene refrigeración |
| capacidadPeso | float | Capacidad máxima de peso |
| capacidadVolumen | float | Capacidad de volumen |

* **Métodos:** monitorearTemperatura()
* **Relaciones:** Ruta

---

### Factura
Descripción: Documento fiscal asociado a un pedido.

| Atributo | Tipo | Descripción |
|---|---|---|
| pedido | string | Referencia al pedido |
| numero | string | Número de factura |
| monto | float | Monto facturado (sin impuestos) |
| iva | float | Monto de impuesto (IVA) |
| total | float | Monto total (con impuestos) |
| fechaEmision | date | Fecha de emisión |
| fechaVencimiento | date | Fecha límite de pago |
| estado | string | Estado de la factura (pagada, pendiente) |

* **Métodos:** generarElectronica()
* **Relaciones:** Pedido

---

### GuiaDespacho
Descripción: Documento de despacho que acompaña entregas.

| Atributo | Tipo | Descripción |
|---|---|---|
| numero | string | Número de guía |
| numeroBultos | int | Cantidad de bultos |
| pesoTotal | float | Peso total de la guía |
| rutaAsignada | string | Ruta usada para la entrega |

* **Métodos:** generarGuia()
* **Relaciones:** Pedido

---

### Beneficio
Descripción: Beneficio o incentivo aplicable a clientes o pedidos.

| Atributo | Tipo | Descripción |
|---|---|---|
| id | string | Identificador del beneficio |
| tipo | string | Tipo (descuento, bonificación) |
| valor | float | Valor o porcentaje |
| motivo | string | Razón por la cual se aplica el beneficio |

* **Métodos:** aplicarBonificacion()
* **Relaciones:** Cliente, Promocion

---

### Promoción
Descripción: Promoción comercial aplicada a productos o clientes.

| Atributo | Tipo | Descripción |
|---|---|---|
| id | string | Identificador de la promoción |
| descripcion | string | Texto descriptivo |
| fechaInicio | date | Fecha inicio |
| fechaFin | date | Fecha fin |
| roi | float | Retorno de inversión (medido) |

* **Métodos:** enviarInformacion(), medirPerformance()
* **Relaciones:** Beneficio

---

### Pago
Descripción: Información sobre el pago asociado a un pedido.

| Atributo | Tipo | Descripción |
|---|---|---|
| metodo | string | Método de pago (tarjeta, efectivo, etc.) |
| estado | string | Estado del pago (pendiente, aprobado) |
| monto | float | Monto pagado |
| fechaPago | date | Fecha en que se realizó el pago |

* **Métodos:** procesarPago(), emitirRecibo()
* **Relaciones:** Pedido

---

### LineaCredito
Descripción: Límite de crédito y condiciones asociadas a un cliente.

| Atributo | Tipo | Descripción |
|---|---|---|
| limite | float | Límite total autorizado |
| plazoDias | int | Plazo en días para pago |
| scoreCumplimiento | float | Puntuación usada para calcular el límite |
| disponible | float | Monto disponible actualmente |

* **Métodos:** evaluarSolicitud(), actualizarLimite(), monitorearUso()
* **Relaciones:** Cliente, SupervisorVentas

---

### Inventario
Descripción: Registro de stock y niveles críticos por producto.

| Atributo | Tipo | Descripción |
|---|---|---|
| producto | string | Referencia al `Producto` |
| stockActual | int | Cantidad disponible |
| umbralMin | int | Nivel mínimo de stock para alerta |
| umbralMax | int | Nivel máximo seguro |
| indiceRotacion | float | Métrica de rotación del producto en inventario |

* **Métodos:** monitorearNivel(), generarAlerta(), analizarRotacion()
* **Relaciones:** Producto, MovimientoInventario

---

### MovimientoInventario
Descripción: Registro de entradas/salidas del inventario.

| Atributo | Tipo | Descripción |
|---|---|---|
| tipo | string | Tipo de movimiento (entrada/salida) |
| cantidad | int | Cantidad afectada |
| fecha | date | Fecha del movimiento |
| producto | string | Producto afectado |

* **Métodos:** registrarMovimiento(), validarContraNegativo()
* **Relaciones:** Inventario, Pedido

---

### Incidencia
Descripción: Evento que indica una anomalía o problema (entrega, calidad, etc.).

| Atributo | Tipo | Descripción |
|---|---|---|
| id | string | Identificador de la incidencia |
| tipo | string | Tipo de incidencia |
| descripcion | string | Descripción detallada |
| evidencia | string/list | Referencia a archivos o notas |
| estado | string | Estado del proceso de resolución |

* **Métodos:** registrarIncidencia(), generarNotaCredito(), escalar()
* **Relaciones:** Cliente, Pedido

---

### Reclamo
Descripción: Petición formal del cliente por un problema o devolución.

| Atributo | Tipo | Descripción |
|---|---|---|
| id | string | Identificador del reclamo |
| motivo | string | Motivo declarado por el cliente |
| evidencia | string/list | Documentos adjuntos o pruebas |
| estado | string | Estado de gestión del reclamo |

* **Métodos:** aprobarDevolucion(), emitirNotaCredito(), coordinarReposicion()
* **Relaciones:** Cliente, Pedido

---
