<p align='center'>
  <img src='https://github.com/user-attachments/assets/899a06d7-01dd-4f33-b0cf-48b36b632b6f' height="150">
</p>

# Historias Épicas y de Usuario

## ¿Qué es una Historia de Usuario?

Una **Historia de Usuario (HU)** es una descripción breve y clara de una necesidad del usuario, escrita desde su perspectiva. Se utiliza para definir **qué** se requiere y **para qué**, sin entrar todavía en detalles técnicos.

Formato típico:

> **Como** _rol_, **quiero** _objetivo_, **para** _beneficio_.

## ¿Qué es una Épica?

Una **Épica (EP)** es un objetivo funcional **más grande** que agrupa varias historias de usuario relacionadas. Sirve para organizar el trabajo por **módulos**, **procesos** o **capacidades del sistema**.

---

## Historias de Usuario — Proyecto Cafrilosa

A continuación, se presentan las **Épicas** del proyecto, junto con sus respectivas **Historias de Usuario**, organizadas por módulos funcionales.

> **Nota:** `N/A` = No aplica.

### Índice de Épicas

- [EP-01 — Gestión de Zonas Geográficas](#ep-01)
- [EP-02 — Gestión de Fuerza de Ventas](#ep-02)
- [EP-03 — Planificación de Rutas](#ep-03)
- [EP-04 — Gestión de Clientes](#ep-04)
- [EP-05 — Gestión de Catálogo y Productos](#ep-05)
- [EP-06 — Toma de Pedidos (Vendedor)](#ep-06)
- [EP-07 — Portal de Cliente (Autogestión)](#ep-07)
- [EP-08 — Gestión de Bodega](#ep-08)
- [EP-09 — Picking y Packing](#ep-09)
- [EP-10 — Facturación y Formalización](#ep-10)
- [EP-11 — Integración Contable](#ep-11)
- [EP-12 — Gestión de Cuentas por Cobrar](#ep-12)
- [EP-13 — Integración ERP](#ep-13)
- [EP-14 — Notas de Crédito y Devoluciones](#ep-14)
- [EP-15 — Logística de Despacho](#ep-15)
- [EP-16 — Ejecución de Entrega (Reparto)](#ep-16)
- [EP-17 — Logística Inversa](#ep-17)
- [EP-18 — Gestión de Cobros en Ruta](#ep-18)
- [EP-19 — Control de Morosidad](#ep-19)
- [EP-20 — Cierre de Caja Diario](#ep-20)
- [EP-21 — Reclamos y Devoluciones (Cliente)](#ep-21)
- [EP-22 — Validación de Reclamos en Sitio](#ep-22)
- [EP-23 — Aprobación de Devoluciones](#ep-23)
- [EP-24 — Reingreso a Inventario](#ep-24)
- [EP-25 — Monitoreo de Rutas en Vivo](#ep-25)
- [EP-26 — Business Intelligence (BI)](#ep-26)
- [EP-27 — Gestión de Promociones](#ep-27)
- [EP-28 — Pedidos Web Cliente (E-commerce B2B)](#ep-28)
- [EP-29 — Finanzas del Cliente](#ep-29)
- [EP-30 — Soporte y PQRS](#ep-30)

---

## <a id="ep-01"></a>ÉPICA EP-01 — Gestión de Zonas Geográficas

**Descripción:** Definir y estructurar las zonas de cobertura geográfica de la empresa para organizar la fuerza de ventas.

### HU-01 — Creación de Zonas Geográficas

**Descripción:** Como Supervisor, quiero dividir la ciudad mediante límites geográficos y crear nuevas zonas, para organizar el territorio de ventas de manera lógica y manejable.

**Criterios de aceptación:**
- El sistema debe permitir trazar límites en un mapa.
- No debe haber superposición de zonas.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** N/A

### HU-02 — Nombramiento y Codificación

**Descripción:** Como Supervisor, quiero asignar un nombre único y un código a cada zona creada, para identificar fácilmente las zonas en reportes y asignaciones.

**Criterios de aceptación:**
- El código debe ser único.
- El nombre debe permitir caracteres alfanuméricos.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** HU-01

### HU-03 — Asociación Regional

**Descripción:** Como Supervisor, quiero asociar las zonas creadas a ciudades o macrorregiones específicas, para mantener una jerarquía geográfica ordenada.

**Criterios de aceptación:**
- Una zona debe pertenecer a una sola ciudad/región.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** HU-01

---

## <a id="ep-02"></a>ÉPICA EP-02 — Gestión de Fuerza de Ventas

**Descripción:** Gestionar la fuerza de ventas asignando responsables a cada territorio.

### HU-04 — Vinculación Vendedor-Zona

**Descripción:** Como Supervisor, quiero asignar una zona de manera exclusiva a un único vendedor, para asegurar que cada cliente tenga un único responsable y evitar conflictos de comisiones.

**Criterios de aceptación:**
- El sistema no debe permitir asignar una zona si ya tiene vendedor activo.
- Notificación al vendedor asignado.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** EP-01

### HU-05 — Transferencia de Cartera

**Descripción:** Como Supervisor, quiero transferir la cartera de clientes y zona de un vendedor a otro, para cubrir vacaciones, despidos o reestructuraciones sin perder el historial.

**Criterios de aceptación:**
- Se debe mantener el historial de pedidos.
- El nuevo vendedor hereda todos los clientes de la zona.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-04

---

## <a id="ep-03"></a>ÉPICA EP-03 — Planificación de Rutas

**Descripción:** Diseñar y optimizar las rutas de visita y reparto diario.

### HU-06 — Configuración de Ruteros

**Descripción:** Como Supervisor, quiero asignar clientes a un rutero específico según el día de la semana, para garantizar que todos los clientes sean visitados en el día correcto.

**Criterios de aceptación:**
- Permitir selección múltiple de clientes.
- Visualizar carga de trabajo por día.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** N/A

### HU-07 — Frecuencia de Visitas

**Descripción:** Como Supervisor, quiero establecer la frecuencia estándar de visitas (semanal, quincenal, etc.), para automatizar la generación de la agenda del vendedor.

**Criterios de aceptación:**
- Opción de configurar periodicidad personalizada.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** HU-06

### HU-08 — Visitas Preferenciales

**Descripción:** Como Supervisor, quiero configurar visitas prioritarias para clientes VIP, para asegurar atención destacada a clientes de alta facturación.

**Criterios de aceptación:**
- Debe permitir asignar una bandera de "Prioridad" al cliente en la ruta.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** N/A

### HU-09 — Gestión de Feriados

**Descripción:** Como Supervisor, quiero ajustar las rutas automáticamente cuando hay días feriados, para no perder días de venta y reprogramar visitas.

**Criterios de aceptación:**
- El sistema debe sugerir fechas alternativas para los días bloqueados.

**Meta:**
- **Prioridad:** Baja
- **Dependencias:** HU-06

### HU-10 — Optimización de Recorrido

**Descripción:** Como Supervisor, quiero calcular la ruta más eficiente y programar la hora de inicio, para ahorrar tiempo y combustible en el desplazamiento del repartidor/vendedor.

**Criterios de aceptación:**
- Integración con API de mapas.
- Ordenar paradas por distancia lógica.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** N/A

---

## <a id="ep-04"></a>ÉPICA EP-04 — Gestión de Clientes

**Descripción:** Gestionar la base de datos de clientes para asegurar información veraz y completa.

### HU-11 — Registro de Clientes y Geolocalización

**Descripción:** Como Vendedor, quiero registrar clientes nuevos capturando su identificación y ubicación exacta, para asegurar que los repartidores lleguen al lugar correcto y facturar legalmente.

**Criterios de aceptación:**
- Validación obligatoria de RUC o Cédula.
- La geolocalización debe capturarse vía GPS obligatorio al crear el cliente.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** N/A

### HU-12 — Clasificación Tributaria

**Descripción:** Como Vendedor, quiero clasificar al cliente según su tipo de facturación (Factura vs. Consumidor Final), para emitir los comprobantes adecuados según la normativa legal.

**Criterios de aceptación:**
- Selección excluyente entre tipo de emisión.
- Validar datos requeridos según el tipo seleccionado.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-11

### HU-13 — Gestión de Centros de Costo

**Descripción:** Como Supervisor, quiero asignar múltiples centros de costo a un mismo cliente y codificarlos, para permitir que cadenas o franquicias gestionen pedidos por sucursal bajo una misma cuenta.

**Criterios de aceptación:**
- Permitir relación 1 a N (Un cliente, varios locales).
- Cada centro de costo debe tener un código único.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** HU-11

### HU-14 — Condiciones Crediticias

**Descripción:** Como Supervisor, quiero definir el cupo máximo de crédito y el plazo de pago para cada cliente, para controlar el riesgo financiero y evitar deudas incobrables.

**Criterios de aceptación:**
- Campos editables solo por perfil Supervisor.
- El sistema debe validar que los pedidos no excedan el cupo.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-11

### HU-15 — Bloqueo Automático por Mora

**Descripción:** Como Supervisor, quiero configurar el bloqueo automático de pedidos si el cliente tiene mora, para impedir nuevas ventas a clientes con deudas vencidas.

**Criterios de aceptación:**
- El bloqueo se activa automáticamente al vencer el plazo de pago.
- Requiere autorización superior para desbloqueo manual.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-14

---

## <a id="ep-05"></a>ÉPICA EP-05 — Gestión de Catálogo y Productos

**Descripción:** Administrar el portafolio de productos para mantener la oferta comercial actualizada.

### HU-16 — Registro y Codificación de Productos

**Descripción:** Como Bodeguero, quiero registrar nuevos productos con un código único en el sistema, para identificar inequívocamente cada ítem en inventario y facturación.

**Criterios de aceptación:**
- El código de producto no puede duplicarse.
- Debe incluir descripción y categoría.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** N/A

### HU-17 — Definición de Presentación

**Descripción:** Como Supervisor, quiero definir las presentaciones de venta (Unidad, Caja, Pack, etc.), para facilitar la venta en diferentes volúmenes y el control de stock.

**Criterios de aceptación:**
- Configuración de factores de conversión (ej. 1 Caja = 12 Unidades).

**Meta:**
- **Prioridad:** Media
- **Dependencias:** HU-16

### HU-18 — Actualización de Precios Base

**Descripción:** Como Cafrilosa / Supervisor, quiero actualizar los precios base de los productos en el catálogo, para asegurar que las ventas se realicen con los valores de mercado correctos.

**Criterios de aceptación:**
- Histórico de cambios de precio.
- Actualización masiva o individual.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-16

---

## <a id="ep-06"></a>ÉPICA EP-06 — Toma de Pedidos (Vendedor)

**Descripción:** Registrar pedidos en tiempo real durante la visita al cliente.

### HU-19 — Check-In con Validación GPS

**Descripción:** Como Vendedor, quiero realizar un "check-in" validado por GPS al llegar donde el cliente, para confirmar que la visita se realizó presencialmente y habilitar la toma del pedido.

**Criterios de aceptación:**
- El sistema debe validar que la ubicación actual coincida con la del cliente (margen 50m).
- Bloquear pedido si no hay check-in.

**Meta:**
- **Prioridad:** Crítica
- **Dependencias:** EP-04

### HU-20 — Selección de Cartera Asignada

**Descripción:** Como Vendedor, quiero visualizar y seleccionar únicamente los clientes que pertenecen a mi zona, para evitar tomar pedidos de clientes que no me corresponden y agilizar la búsqueda.

**Criterios de aceptación:**
- La lista debe filtrar clientes según la zona del vendedor logueado.
- Buscador rápido por nombre o código.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** EP-01, EP-02

### HU-21 — Carga de Productos y Cálculo

**Descripción:** Como Vendedor, quiero seleccionar productos por código e ingresar cantidades, viendo el total calculado, para agilizar la toma del pedido y dar el valor exacto al cliente al instante.

**Criterios de aceptación:**
- Búsqueda por código o nombre.
- Cálculo automático de subtotal e impuestos.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** EP-05

### HU-22 — Validación de Cupo de Crédito

**Descripción:** Como Vendedor, quiero que el sistema verifique automáticamente si el cliente tiene cupo disponible, para no autorizar ventas a crédito si el cliente ha excedido su límite de deuda.

**Criterios de aceptación:**
- Alerta visual si el cupo es insuficiente.
- Bloqueo de cierre de pedido si excede cupo (salvo autorización especial).

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-14

### HU-23 — Definición de Plazo de Crédito

**Descripción:** Como Vendedor, quiero seleccionar el plazo de pago específico para el pedido actual, para acordar condiciones de pago flexibles según la negociación del momento.

**Criterios de aceptación:**
- Menú desplegable con plazos pre-autorizados (8, 15, 30 días).

**Meta:**
- **Prioridad:** Media
- **Dependencias:** N/A

---

## <a id="ep-07"></a>ÉPICA EP-07 — Portal de Cliente (Autogestión)

**Descripción:** Autogestionar mis compras y consultas sin depender de la visita del vendedor.

### HU-24 — Pedidos desde Portal Cliente

**Descripción:** Como Cliente, quiero ingresar a un portal web para crear mis propios pedidos, para reponer stock urgentemente si el vendedor no me ha visitado.

**Criterios de aceptación:**
- Interfaz simplificada para el cliente.
- Mismas validaciones de stock y precio que el vendedor.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** EP-06

### HU-25 — Historial de Pedidos Propios

**Descripción:** Como Cliente, quiero consultar el estado e historial de mis pedidos anteriores, para saber qué he pedido y verificar si ya fue facturado o entregado.

**Criterios de aceptación:**
- Lista ordenada por fecha.
- Detalle de ítems por pedido.

**Meta:**
- **Prioridad:** Baja
- **Dependencias:** HU-24

---

## <a id="ep-08"></a>ÉPICA EP-08 — Gestión de Bodega

**Descripción:** Validar que existe stock físico suficiente antes de procesar cualquier pedido.

### HU-26 — Recepción de Pedidos Pendientes

**Descripción:** Como Bodeguero, quiero visualizar una lista centralizada de todos los pedidos nuevos que llegan, para organizar mi trabajo y atender primero los pedidos más antiguos o urgentes.

**Criterios de aceptación:**
- La lista debe actualizarse en tiempo real.
- Ordenable por fecha y hora de llegada.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** EP-06

### HU-27 — Confirmación de Stock Físico

**Descripción:** Como Bodeguero, quiero confirmar en el sistema si la mercadería solicitada está realmente disponible en el almacén, para evitar facturar productos que no tengo o que están dañados.

**Criterios de aceptación:**
- El sistema debe mostrar el saldo teórico vs. el solicitado.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-26

### HU-28 — Aprobación o Rechazo

**Descripción:** Como Bodeguero, quiero aprobar el pedido si hay stock o rechazarlo si falta mercadería, para liberar el pedido para la siguiente fase o cancelarlo inmediatamente.

**Criterios de aceptación:**
- Si se rechaza, el sistema debe exigir una razón.
- La aprobación descuenta el stock comprometido.

**Meta:**
- **Prioridad:** Crítica
- **Dependencias:** HU-27

### HU-29 — Notificación de Rechazo

**Descripción:** Como Vendedor, quiero recibir una notificación automática si uno de mis pedidos es rechazado por bodega, para informar al cliente rápidamente y gestionar un cambio o devolución.

**Criterios de aceptación:**
- La notificación debe incluir el motivo del rechazo (ej. "Sin Stock").

**Meta:**
- **Prioridad:** Media
- **Dependencias:** HU-28

---

## <a id="ep-09"></a>ÉPICA EP-09 — Picking y Packing

**Descripción:** Realizar el proceso de picking y packing de manera eficiente y sin errores.

### HU-30 — Recolección (Picking)

**Descripción:** Como Bodeguero, quiero ver la ubicación exacta de cada producto dentro del almacén, para no perder tiempo buscando productos en los pasillos incorrectos.

**Criterios de aceptación:**
- El sistema debe indicar Pasillo y Estantería por producto.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** HU-28

### HU-31 — Empaque y Rotulado

**Descripción:** Como Bodeguero, quiero generar e imprimir una etiqueta con los datos del cliente para cada caja, para asegurar que el repartidor entregue el paquete a la persona correcta.

**Criterios de aceptación:**
- La etiqueta debe incluir: Nombre Cliente, Dirección, Zona y Nro. Pedido.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-30

### HU-32 — Confirmación de Preparación

**Descripción:** Como Bodeguero, quiero marcar el pedido como "Listo para Despacho" una vez empacado, para notificar al área de logística que el pedido ya puede ser cargado al camión.

**Criterios de aceptación:**
- Cambio de estado visible para el Supervisor y Repartidor.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-31

---

## <a id="ep-10"></a>ÉPICA EP-10 — Facturación y Formalización

**Descripción:** Formalizar legal y financieramente las ventas realizadas para asegurar el cobro.

### HU-33 — Liquidación a Cartera

**Descripción:** Como Supervisor Financiero, quiero convertir los pedidos entregados en una deuda formal (Cuentas por Cobrar), para iniciar oficialmente el plazo de crédito y gestionar la cobranza.

**Criterios de aceptación:**
- El pedido debe estar en estado "Entregado".
- Se debe generar un registro de deuda asociado al cliente.

**Meta:**
- **Prioridad:** Crítica
- **Dependencias:** EP-16

### HU-34 — Facturación Electrónica (SRI)

**Descripción:** Como Sistema / Supervisor, quiero generar el folio fiscal y transmitir la factura al SRI automáticamente, para cumplir con la normativa tributaria y legalizar la transacción.

**Criterios de aceptación:**
- Validación de estructura XML según ficha técnica SRI.
- Recepción de clave de acceso y autorización.

**Meta:**
- **Prioridad:** Crítica
- **Dependencias:** HU-33

---

## <a id="ep-11"></a>ÉPICA EP-11 — Integración Contable

**Descripción:** Sincronizar las ventas con el sistema contable central para mantener la integridad financiera.

### HU-35 — Homologación de Datos

**Descripción:** Como Sistema, quiero traducir los códigos de ventas a las cuentas contables correspondientes, para asegurar que la información sea compatible con el ERP financiero de Cafrilosa.

**Criterios de aceptación:**
- Mapeo correcto de Centros de Costo y Categorías de Producto.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** EP-05

### HU-36 — Dispersión al Core Financiero

**Descripción:** Como Sistema, quiero enviar automáticamente los asientos contables al Core Financiero de la empresa, para evitar la doble digitación manual y tener contabilidad en tiempo real.

**Criterios de aceptación:**
- Envío vía API/Web Service al ERP.
- Manejo de errores de conexión y reintentos.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-35

### HU-37 — Validación de Asiento

**Descripción:** Como Contador, quiero verificar que el asiento registrado cuadre con el total de la venta diaria, para garantizar que no existan diferencias de centavos ni errores contables.

**Criterios de aceptación:**
- Reporte de conciliación automático.
- Alerta si hay diferencias entre Venta y Contabilidad.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** HU-36

---

## <a id="ep-12"></a>ÉPICA EP-12 — Gestión de Cuentas por Cobrar

**Descripción:** Procesar las cuentas por cobrar generadas para convertirlas en documentos fiscales válidos.

### HU-38 — Recepción de Cuentas Generadas

**Descripción:** Como Supervisor, quiero visualizar una bandeja con las cuentas por cobrar que ya fueron generadas por el sistema, para identificar qué transacciones están listas para ser facturadas.

**Criterios de aceptación:**
- Filtrado por fecha y cliente.
- Estado inicial "Pendiente de Facturación".

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** EP-10

### HU-39 — Validación de Datos Fiscales

**Descripción:** Como Sistema, quiero validar automáticamente los datos fiscales del cliente antes de emitir, para evitar rechazos del SRI por RUCs inválidos o direcciones erróneas.

**Criterios de aceptación:**
- Validación de algoritmo de RUC/Cédula.
- Verificación de campos obligatorios (Email, Dirección).

**Meta:**
- **Prioridad:** Crítica
- **Dependencias:** EP-04

---

## <a id="ep-13"></a>ÉPICA EP-13 — Integración ERP

**Descripción:** Integrar la plataforma operativa con el sistema financiero central (ERP).

### HU-40 — Estructuración de JSON para ERP

**Descripción:** Como Backend, quiero generar un archivo JSON con la estructura exacta que pide el ERP, para que el sistema financiero pueda leer e interpretar la venta sin errores de formato.

**Criterios de aceptación:**
- Cumplir con la documentación de la API del ERP.
- Mapeo correcto de campos (Total, IVA, Cliente).

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** N/A

### HU-41 — Envío a VisualFAC/ADN

**Descripción:** Como Backend, quiero enviar los datos de facturación al sistema financiero (VisualFAC/ADN) vía servicio web, para registrar la venta oficialmente en la contabilidad de la empresa.

**Criterios de aceptación:**
- Gestión de respuestas HTTP (200 OK, 400 Error).
- Reintento automático en caso de fallo de conexión.

**Meta:**
- **Prioridad:** Crítica
- **Dependencias:** HU-40

### HU-42 — Confirmación de Registro ERP

**Descripción:** Como Sistema, quiero recibir y procesar la confirmación de que el ERP registró la factura correctamente, para marcar el proceso como completado en nuestra plataforma.

**Criterios de aceptación:**
- Actualizar estado del pedido a "Facturado".
- Guardar el número de secuencia generado por el ERP.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-41

---

## <a id="ep-14"></a>ÉPICA EP-14 — Notas de Crédito y Devoluciones

**Descripción:** Gestionar las devoluciones de mercadería mediante documentos legales (Notas de Crédito).

### HU-43 — Emisión de Nota de Crédito

**Descripción:** Como Supervisor, quiero generar una nota de crédito cuando se autoriza una devolución de mercadería, para anular legalmente el cobro y ajustar el saldo del cliente.

**Criterios de aceptación:**
- Solo se puede emitir sobre una devolución aprobada.
- Debe especificar el motivo de la devolución.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** N/A

### HU-44 — Vinculación a Factura Original

**Descripción:** Como Sistema, quiero vincular automáticamente la nota de crédito a la factura que la originó, para cumplir con la normativa del SRI que exige referencia al documento modificado.

**Criterios de aceptación:**
- Selección obligatoria de la factura afectada.
- El monto de la nota no puede exceder el saldo de la factura.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-43

### HU-45 — Legalización ante SRI

**Descripción:** Como Sistema, quiero transmitir la nota de crédito al SRI para su autorización electrónica, para que el documento tenga validez tributaria para el cliente.

**Criterios de aceptación:**
- Firma electrónica del documento.
- Recepción de número de autorización del SRI.

**Meta:**
- **Prioridad:** Crítica
- **Dependencias:** HU-44

---

## <a id="ep-15"></a>ÉPICA EP-15 — Logística de Despacho

**Descripción:** Planificar las salidas de mercadería agrupando pedidos de forma eficiente.

### HU-46 — Clasificación por Zonas y Tandas

**Descripción:** Como Supervisor, quiero agrupar automáticamente los pedidos facturados según su zona geográfica, para optimizar el uso de los camiones y no mezclar rutas distantes.

**Criterios de aceptación:**
- Visualización de pedidos pendientes en mapa.
- Agrupación por "clusters" o zonas vecinas.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** EP-01

### HU-47 — Control de Capacidad de Transporte

**Descripción:** Como Sistema, quiero alertar si el volumen/peso de los pedidos excede la capacidad del camión asignado, para evitar sobrecarga de vehículos o que se quede mercadería sin cargar.

**Criterios de aceptación:**
- Cálculo automático de m3 o Kg total del despacho.
- Bloqueo de asignación si excede capacidad del vehículo.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-46

### HU-48 — Asignación de Unidad y Conductor

**Descripción:** Como Supervisor, quiero asignar un vehículo específico y un conductor responsable a cada hoja de ruta, para tener trazabilidad de quién lleva la mercadería.

**Criterios de aceptación:**
- Registro de placa y conductor.
- Generación de Hoja de Ruta digital.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** HU-47

---

## <a id="ep-16"></a>ÉPICA EP-16 — Ejecución de Entrega (Reparto)

**Descripción:** Ejecutar la entrega física asegurando que lo que sale de bodega llega al cliente.

### HU-49 — Verificación de Carga (Check-out)

**Descripción:** Como Bodeguero, quiero validar junto al conductor que la mercadería física coincide con la Hoja de Ruta, para transferir la responsabilidad de los productos al repartidor sin errores.

**Criterios de aceptación:**
- Escaneo de códigos al cargar el camión.
- Firma digital de recepción del conductor.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** EP-15

### HU-50 — Ruteo y Navegación GPS

**Descripción:** Como Repartidor, quiero ver en un mapa mi ruta de entrega con la secuencia óptima de paradas, para llegar más rápido a los clientes y ahorrar combustible.

**Criterios de aceptación:**
- Integración con Google Maps/Waze.
- Marcadores de "Pendiente" y "Entregado".

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** N/A

### HU-51 — Confirmación de Entrega (POD)

**Descripción:** Como Repartidor, quiero registrar la entrega exitosa capturando evidencia (Firma o Foto), para cerrar el ciclo de venta y tener prueba legal de la entrega.

**Criterios de aceptación:**
- Captura de foto obligatoria si no hay firma.
- Geolocalización del punto de entrega.

**Meta:**
- **Prioridad:** Crítica
- **Dependencias:** HU-50

### HU-52 — Registro de Novedades

**Descripción:** Como Repartidor, quiero reportar motivos por los cuales NO se pudo entregar (Cliente ausente, dirección errónea), para justificar el retorno de mercadería a bodega.

**Criterios de aceptación:**
- Menú de motivos predefinidos.
- Reprogramación automática o alerta al supervisor.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** HU-50

---

## <a id="ep-17"></a>ÉPICA EP-17 — Logística Inversa

**Descripción:** Gestionar las devoluciones aprovechando la ruta de entrega.

### HU-53 — Listado de Retiros Autorizados

**Descripción:** Como Repartidor, quiero ver en mi aplicación si tengo que recoger devoluciones en mi ruta, para aprovechar el viaje para traer mercadería devuelta.

**Criterios de aceptación:**
- Alerta visual de "Recolección Pendiente" en el cliente.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** N/A

### HU-54 — Validación de Paquete Sellado

**Descripción:** Como Repartidor, quiero confirmar que recibo el paquete de devolución correctamente sellado, para asegurar que la mercadería devuelta no se manipule en el trayecto.

**Criterios de aceptación:**
- Checkbox de "Sellos Intactos".
- Registro de cantidad de bultos recibidos.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-53

### HU-55 — Evidencia Fotográfica de Retiro

**Descripción:** Como Repartidor, quiero tomar una foto del estado del paquete al momento de recogerlo, para evitar reclamos sobre daños ocurridos durante el transporte de regreso.

**Criterios de aceptación:**
- La foto se adjunta automáticamente a la Nota de Crédito en trámite.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** HU-54

---

## <a id="ep-18"></a>ÉPICA EP-18 — Gestión de Cobros en Ruta

**Descripción:** Registrar los cobros realizados durante la visita para mantener la cuenta del cliente al día.

### HU-56 — Registro de Pago en Visita

**Descripción:** Como Vendedor, quiero ingresar en la app el monto de dinero recibido (Efectivo/Cheque) del cliente, para oficializar que el cliente me ha entregado dinero.

**Criterios de aceptación:**
- Registro del tipo de pago (Efectivo, Cheque, Transferencia).
- Validación de monto mayor a cero.

**Meta:**
- **Prioridad:** Crítica
- **Dependencias:** N/A

### HU-57 — Aplicación a Factura Específica

**Descripción:** Como Vendedor, quiero seleccionar a qué factura(s) pendiente(s) se debe abonar el pago recibido, para que el sistema rebaje la deuda correcta y no la más antigua por defecto (si el cliente lo pide).

**Criterios de aceptación:**
- Listado de facturas con saldo pendiente.
- Control para no abonar más del saldo deudor.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-56

### HU-58 — Emisión de Recibo (Ticket)

**Descripción:** Como Vendedor, quiero generar e imprimir un comprobante de pago físico mediante impresora Bluetooth, para entregar al cliente un respaldo legal inmediato de que me entregó el dinero.

**Criterios de aceptación:**
- Conexión con impresoras térmicas portátiles.
- El ticket debe tener fecha, monto, facturas afectadas y firma digital.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-56

---

## <a id="ep-19"></a>ÉPICA EP-19 — Control de Morosidad

**Descripción:** Controlar la morosidad de la cartera para reducir el riesgo financiero de la empresa.

### HU-59 — Visualización de Estado de Cuenta

**Descripción:** Como Vendedor, quiero ver en pantalla el historial completo de deudas y pagos del cliente antes de venderle, para saber si puedo negociar o si debo exigir el cobro antes de dejar más mercadería.

**Criterios de aceptación:**
- Semáforo de estado (Verde/Amarillo/Rojo) según días de mora.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** EP-04

### HU-60 — Bloqueo por Mora

**Descripción:** Como Sistema, quiero bloquear automáticamente la opción de "Venta a Crédito" si el cliente tiene facturas vencidas, para impedir que la deuda crezca más allá de lo permitido.

**Criterios de aceptación:**
- Configurable por días de vencimiento (ej. > 30 días).
- Mensaje de alerta en la pantalla de pedido.

**Meta:**
- **Prioridad:** Crítica
- **Dependencias:** HU-59

### HU-61 — Alertas de Cartera Vencida

**Descripción:** Como Supervisor, quiero recibir notificaciones sobre clientes que han entrado en mora crítica, para gestionar la cobranza judicial o extrajudicial a tiempo.

**Criterios de aceptación:**
- Reporte diario de clientes que pasaron a "Vencido".

**Meta:**
- **Prioridad:** Media
- **Dependencias:** N/A

---

## <a id="ep-20"></a>ÉPICA EP-20 — Cierre de Caja Diario

**Descripción:** Realizar el cierre de caja diario para asegurar que el dinero físico coincide con el sistema.

### HU-62 — Declaración de Efectivo (Ciego)

**Descripción:** Como Vendedor, quiero ingresar cuánto dinero físico tengo en mi poder al finalizar la ruta sin ver el total del sistema, para realizar un conteo honesto y ciego de lo recaudado.

**Criterios de aceptación:**
- Formulario de ingreso de billetes y monedas.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** EP-18

### HU-63 — Cuadre Diario Automático

**Descripción:** Como Sistema, quiero comparar lo declarado por el vendedor contra la suma de los cobros registrados en la app, para detectar faltantes o sobrantes de dinero inmediatamente.

**Criterios de aceptación:**
- Cálculo automático de diferencia.
- Generación de reporte de cuadre.

**Meta:**
- **Prioridad:** Crítica
- **Dependencias:** HU-62

### HU-64 — Consolidación de Pagos

**Descripción:** Como Tesorero, quiero visualizar y aprobar el cierre de caja de todos los vendedores, para integrar el dinero recaudado a la caja central de la empresa.

**Criterios de aceptación:**
- Vista global de todos los cierres.
- Botón de "Aceptar Cierre" que traslada el saldo a Tesorería.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-63

---

## <a id="ep-21"></a>ÉPICA EP-21 — Reclamos y Devoluciones (Cliente)

**Descripción:** Iniciar formalmente un reclamo de devolución con evidencia clara.

### HU-65 — Creación de Ticket de Devolución

**Descripción:** Como Cliente, quiero crear una solicitud de devolución seleccionando la factura de origen, para que la empresa sepa qué producto quiero devolver y por qué.

**Criterios de aceptación:**
- El sistema debe listar solo facturas dentro del periodo de garantía.
- Selección obligatoria de los ítems a devolver.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** N/A

### HU-66 — Carga de Evidencia Fotográfica

**Descripción:** Como Cliente, quiero subir fotos del producto dañado directamente a la solicitud, para demostrar el estado del producto y justificar el reclamo.

**Criterios de aceptación:**
- Permitir acceso a cámara o galería.
- Mínimo 1 foto obligatoria.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** HU-65

### HU-67 — Motivo de Devolución

**Descripción:** Como Cliente, quiero seleccionar de una lista predefinida la razón de la devolución (Caducado, Dañado, Pedido Erróneo), para ayudar a la empresa a clasificar la falla y mejorar sus procesos.

**Criterios de aceptación:**
- Menú desplegable con motivos estandarizados.

**Meta:**
- **Prioridad:** Baja
- **Dependencias:** HU-65

---

## <a id="ep-22"></a>ÉPICA EP-22 — Validación de Reclamos en Sitio

**Descripción:** Validar presencialmente que el reclamo es legítimo antes de mover logística.

### HU-68 — Validación en Sitio (Visita)

**Descripción:** Como Vendedor, quiero registrar en la app que he verificado físicamente el producto donde el cliente, para confirmar que la cantidad y el estado coinciden con lo reportado en el ticket.

**Criterios de aceptación:**
- Checklist de verificación (Estado, Lote, Caducidad).
- Confirmación de "Aprobado" o "Rechazado" en sitio.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-65

### HU-69 — Etiquetado de Paquete de Retorno

**Descripción:** Como Vendedor, quiero generar un código de identificación para el paquete que será retirado, para que el repartidor sepa exactamente qué caja llevarse y evitar confusiones.

**Criterios de aceptación:**
- Generación de etiqueta digital o ID único visible en el paquete.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** HU-68

---

## <a id="ep-23"></a>ÉPICA EP-23 — Aprobación de Devoluciones

**Descripción:** Controlar qué devoluciones proceden para evitar pérdidas financieras injustificadas.

### HU-70 — Aprobación Final de Devolución

**Descripción:** Como Supervisor, quiero revisar las evidencias y la validación del vendedor para autorizar el proceso, para dar luz verde a la logística y a la emisión de la Nota de Crédito.

**Criterios de aceptación:**
- Vista unificada de Ticket + Fotos + Validación Vendedor.
- Botón de Autorización que dispara la orden de retiro.

**Meta:**
- **Prioridad:** Crítica
- **Dependencias:** HU-68

### HU-71 — Asignación a Logística Inversa

**Descripción:** Como Sistema, quiero asignar automáticamente la tarea de recolección al repartidor de la zona, para aprovechar el viaje del camión para recoger el producto sin costos extra.

**Criterios de aceptación:**
- La tarea debe aparecer en la ruta del chofer (módulo Logística).

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-70

---

## <a id="ep-24"></a>ÉPICA EP-24 — Reingreso a Inventario

**Descripción:** Gestionar el reingreso físico del producto para mantener el inventario cuadrado.

### HU-72 — Recepción e Inspección en Bodega

**Descripción:** Como Bodeguero, quiero escanear el paquete que llega de retorno y verificar su contenido, para confirmar que lo que trajo el camión es lo que se autorizó devolver.

**Criterios de aceptación:**
- Lectura del código generado en la HU-69.
- Alerta si faltan productos en la caja.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-71

### HU-73 — Decisión de Inventario (Disposición)

**Descripción:** Como Bodeguero, quiero registrar si el producto vuelve al stock vendible o se da de baja (basura), para evitar vender productos dañados a otros clientes o inflar el stock real.

**Criterios de aceptación:**
- Opción "Reingreso a Stock" (Suma inventario).
- Opción "Baja/Merma" (Resta inventario y contabiliza pérdida).

**Meta:**
- **Prioridad:** Crítica
- **Dependencias:** HU-72

---

## <a id="ep-25"></a>ÉPICA EP-25 — Monitoreo de Rutas en Vivo

**Descripción:** Monitorear la ejecución de las rutas en tiempo real.

### HU-74 — Rastreo GPS en Mapa en Vivo

**Descripción:** Como Supervisor, quiero visualizar en un mapa la ubicación actual y el recorrido histórico de cada vendedor, para saber si están cumpliendo su ruta o si se han desviado injustificadamente.

**Criterios de aceptación:**
- Mapa interactivo con pines de vendedores.
- Trazado de línea de recorrido vs. ruta planificada.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** N/A

### HU-75 — Validación de Cumplimiento

**Descripción:** Como Sistema, quiero calcular automáticamente el porcentaje de clientes visitados sobre el total planificado, para tener un indicador objetivo del desempeño diario del vendedor.

**Criterios de aceptación:**
- Indicador de barra de progreso (ej. 80% visitado).
- Marca de "No Visitado" para clientes pendientes.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** N/A

### HU-76 — Alerta de Ruta Incompleta

**Descripción:** Como Supervisor, quiero recibir una alerta si un vendedor cierra su día sin haber visitado a todos sus clientes, para investigar la causa inmediatamente y evitar clientes desatendidos.

**Criterios de aceptación:**
- Notificación push/email al final de la jornada.
- Reporte de clientes "saltados".

**Meta:**
- **Prioridad:** Media
- **Dependencias:** HU-75

---

## <a id="ep-26"></a>ÉPICA EP-26 — Business Intelligence (BI)

**Descripción:** Analizar los datos del negocio para tomar decisiones estratégicas.

### HU-77 — Dashboard de Ventas

**Descripción:** Como Gerente, quiero ver reportes gráficos de las ventas desglosadas por vendedor, zona y producto, para identificar quiénes son los mejores vendedores y qué productos rotan más.

**Criterios de aceptación:**
- Gráficos de barras y pasteles exportables.
- Filtros por fecha (Semana, Mes, Año).

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** N/A

### HU-78 — Reporte de Efectividad

**Descripción:** Como Supervisor, quiero medir la efectividad de visita (Ventas realizadas / Visitas totales), para entender si el vendedor está cerrando negocios o solo paseando.

**Criterios de aceptación:**
- Cálculo de KPI: (Pedidos / Visitas) * 100.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** N/A

### HU-79 — Análisis de Cartera Vencida

**Descripción:** Como Supervisor, quiero generar un reporte de los clientes con deudas más antiguas y montos más altos, para focalizar los esfuerzos de cobranza en los clientes críticos.

**Criterios de aceptación:**
- Listado ordenado por "Días de Mora".
- Totalizador de deuda por Zona.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** N/A

### HU-80 — Cobertura de Mercado

**Descripción:** Como Gerente, quiero visualizar en un mapa de calor las zonas donde tenemos presencia y los "huecos" sin ventas, para planificar expansiones a nuevos barrios o ciudades.

**Criterios de aceptación:**
- Mapa de calor basado en coordenadas de clientes activos.

**Meta:**
- **Prioridad:** Baja
- **Dependencias:** N/A

---

## <a id="ep-27"></a>ÉPICA EP-27 — Gestión de Promociones

**Descripción:** Crear estrategias promocionales para aumentar el volumen de ventas.

### HU-81 — Configuración de Promociones (2x1)

**Descripción:** Como Supervisor, quiero crear reglas de promociones automáticas como 2x1, descuentos por volumen o regalos, para incentivar al cliente a comprar más cantidad de la habitual.

**Criterios de aceptación:**
- Configuración flexible: "Compra X, lleva Y".
- Definición de productos participantes.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** EP-05

### HU-82 — Segmentación de Promociones

**Descripción:** Como Supervisor, quiero activar promociones específicas solo para ciertos clientes o zonas VIP, para premiar la fidelidad o atacar mercados específicos sin regalar margen en todo lado.

**Criterios de aceptación:**
- Filtro de inclusión/exclusión de clientes.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** HU-81

### HU-83 — Vigencia Temporal

**Descripción:** Como Supervisor, quiero programar la fecha y hora de inicio y fin de una promoción, para automatizar campañas de fin de semana o temporada sin intervención manual.

**Criterios de aceptación:**
- La promo se activa y desactiva sola según la fecha del servidor.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-81

### HU-84 — Visualización de Ofertas en App

**Descripción:** Como Vendedor, quiero que la aplicación me muestre claramente qué promociones están activas al tomar el pedido, para ofrecer activamente las ofertas al cliente y aumentar el ticket promedio.

**Criterios de aceptación:**
- Pop-up o banner de "Oferta Disponible" al seleccionar el producto.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-81

---

## <a id="ep-28"></a>ÉPICA EP-28 — Pedidos Web Cliente (E-commerce B2B)

**Descripción:** Realizar mis propios pedidos en línea sin esperar la visita del vendedor.

### HU-85 — Catálogo Digital Autoservicio

**Descripción:** Como Cliente, quiero navegar por el catálogo vigente viendo productos, fotos y precios, para conocer qué productos puedo pedir para mi negocio.

**Criterios de aceptación:**
- Visualización tipo cuadrícula con fotos.
- Buscador por nombre o categoría.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** EP-05

### HU-86 — Armado de Carrito (Cantidades)

**Descripción:** Como Cliente, quiero seleccionar las cantidades y presentaciones (Cajas/Unidades) de los productos, para definir el volumen exacto de mi compra.

**Criterios de aceptación:**
- Control de input numérico.
- Visualización inmediata del subtotal.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-85

### HU-87 — Validación de Cupo Personal

**Descripción:** Como Cliente, quiero ver en tiempo real si tengo cupo de crédito disponible mientras armo mi pedido, para no perder tiempo armando un pedido que luego será rechazado por falta de fondos.

**Criterios de aceptación:**
- Barra de estado "Cupo Disponible vs. Usado".
- Alerta si el carrito supera el disponible.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** HU-86

### HU-88 — Confirmación y Envío

**Descripción:** Como Cliente, quiero revisar el resumen final y enviar el pedido a Cafrilosa, para asegurar que mi solicitud entre a la cola de despacho de mañana.

**Criterios de aceptación:**
- Pantalla de resumen antes de confirmar.
- Correo de confirmación automático.

**Meta:**
- **Prioridad:** Crítica
- **Dependencias:** HU-86

---

## <a id="ep-29"></a>ÉPICA EP-29 — Finanzas del Cliente

**Descripción:** Consultar mis deudas y facturas para mantener mis finanzas ordenadas.

### HU-89 — Estado de Cuenta en Vivo

**Descripción:** Como Cliente, quiero visualizar mi saldo total deudor y el detalle de documentos pendientes, para saber exactamente cuánto dinero debo pagar a fin de mes.

**Criterios de aceptación:**
- Tarjeta resumen con "Deuda Total" y "Deuda Vencida".

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** N/A

### HU-90 — Alerta de Facturas Vencidas

**Descripción:** Como Cliente, quiero identificar rápidamente en rojo qué facturas ya expiraron, para priorizar esos pagos y evitar bloqueos de crédito.

**Criterios de aceptación:**
- Listado con semáforo de colores.
- Ordenamiento por días de mora.

**Meta:**
- **Prioridad:** Alta
- **Dependencias:** HU-89

### HU-91 — Descarga de Facturas (PDF/XML)

**Descripción:** Como Cliente, quiero descargar el PDF (RIDE) y XML de mis facturas electrónicas, para entregar estos documentos a mi contador para la declaración de impuestos.

**Criterios de aceptación:**
- Botón de descarga directa por fila de factura.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** HU-89

---

## <a id="ep-30"></a>ÉPICA EP-30 — Soporte y PQRS

**Descripción:** Reportar problemas con mis pedidos o facturas de forma rápida.

### HU-92 — Reporte de Error en Entrega

**Descripción:** Como Cliente, quiero abrir un ticket indicando si me llegó producto trocado, dañado o incompleto, para que la empresa corrija el error sin tener que llamar por teléfono.

**Criterios de aceptación:**
- Formulario simple con selección de pedido afectado.
- Opción de adjuntar foto.

**Meta:**
- **Prioridad:** Media
- **Dependencias:** N/A

### HU-93 — Reporte de Error en Facturación

**Descripción:** Como Cliente, quiero notificar si me cobraron mal un precio o si los datos de la factura están erróneos, para solicitar una Nota de Crédito o refacturación.

**Criterios de aceptación:**
- Selección del tipo de error (Precio/Datos/Cantidad).

**Meta:**
- **Prioridad:** Media
- **Dependencias:** N/A

### HU-94 — Seguimiento de Tickets (PQRS)

**Descripción:** Como Cliente, quiero ver el estado actual de mis reclamos (Abierto, En proceso, Resuelto), para saber si mi problema ya está siendo atendido.

**Criterios de aceptación:**
- Lista de tickets con estatus visible.
- Historial de respuestas de soporte.

**Meta:**
- **Prioridad:** Baja
- **Dependencias:** HU-92, HU-93
