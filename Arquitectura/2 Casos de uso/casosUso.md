<p align="right">
  <img src="https://i.postimg.cc/13qQdqZs/utpllogo.png" alt="Logo UTPL" width="150"/>
</p>

# Módulos y descripciones de Casos de Uso del sistema

Este .md resume y documenta los seis diagramas de casos de uso del sistema. Incluye: propósito del módulo, límite del sistema, actores, y la descripción de los casos de uso con sus relaciones `<<include>>` y `<<extend>>`.

---

## ¿Qué es un diagrama de casos de uso?

Un diagrama de casos de uso (UML) muestra qué hace el sistema desde la perspectiva de sus actores (personas o sistemas externos). Permite acordar el alcance, comunicar requisitos y priorizar funcionalidades sin entrar en la implementación.

---

## Elementos básicos

* **Actor**: rol externo que interactúa con el sistema (persona o sistema).
* **Caso de uso**: funcionalidad que el sistema ofrece al actor.
* **Relaciones**:
    * **Asociación**: actor ↔ caso de uso.
    * **`<<include>>`**: un caso de uso reutiliza a otro obligatorio.
    * **`<<extend>>`**: comportamiento opcional/condicional que amplía a otro.
    * **Generalización**: herencia entre actores o casos.

---

## 1) Módulo Gestión de Clientes

![Gestión de Clientes](./imgs/gestion_clientes.png)

### Propósito
Registrar clientes nuevos y mantener su información actualizada, garantizando trazabilidad y validaciones fiscales/contables.

### Límite del sistema
Submódulos Registrar Clientes y Actualización de Datos.

### Actores
* Cliente
* SRI (sistema externo para validaciones fiscales)
* Carfilosa (área/sistema interno)
* Personal y Contadora (para validaciones de actualización)

### Submódulo: Registrar Clientes

**Casos de uso y relaciones**
* **Recopilar información básica**
    * `<<include>>` Verificar datos fiscales y referencias comerciales (SRI)
    * `<<include>>` Registrar datos maestros del cliente (Carfilosa)
    * `<<include>>` Asignar código interno de cliente y canal correspondiente (Carfilosa)

**Descripción corta**

| *Caso de uso* | *Actores* | *Flujo normal (resumen)* |
| :--- | :--- | :--- |
| **Recopilar información básica** | Cliente | Capturar datos personales/empresa y canal. |
| **Verificar datos fiscales y referencias comerciales** | SRI | Consultar RUC/identificador y referencias; devolver estado. |
| **Registrar datos maestros del cliente** | Carfilosa | Persistir datos validados y parámetros comerciales. |
| **Asignar código interno de cliente y canal correspondiente** | Carfilosa | Generar código único y asociar canal (retail, mayorista, etc.). |

### Submódulo: Actualización de Datos

**Caso principal**
* **Actualizar Información de Cliente**
    * `<<include>>` Controlar Historial de información (Carfilosa)
    * `<<include>>` Registro de cambios en historial de cliente
    * `<<include>>` Validación de actualizaciones con área contable y logística (Personal/Contadora)

**Descripción corta**

| *Caso de uso* | *Actores* | *Flujo normal (resumen)* |
| :--- | :--- | :--- |
| **Actualizar Información de Cliente** | Cliente, Personal | Cliente solicita cambio; Personal valida; se actualiza y registra trazabilidad. |
| **Controlar Historial de información** | Carfilosa | Consultar y auditar cambios. |
| **Registro de cambios en historial de cliente** | — | Guardar quién, qué y cuándo. |
| **Validación de actualizaciones con área contable y logística** | Personal, Contadora | Aprobar/observar cambios que afecten crédito, impuestos o entregas. |

---

## 2) Módulo Gestión de Productos

![Gestión de Productos](./imgs/gestion_productos.png)

### Propósito
Administrar alta, mantenimiento y baja de productos, sincronizando con almacén.

### Actores
* Personal, Gerente de Almacén, Marketing
* Almacén (sistema/área externo al módulo)

### A) Incorporación de Nuevos Productos

**Caso principal: Registrar productos**
* `<<include>>` Ingresar datos
* `<<include>>` Asignar Códigos de Productos
* `<<include>>` Verificar disponibilidad inicial (Almacén)

| *Caso de uso* | *Actores* | *Resumen* |
| :--- | :--- | :--- |
| **Registrar productos** | Personal | Alta de ítems con atributos comerciales y logísticos. |
| **Ingresar datos** | — | Nombre, categoría, unidad, presentación, precios base. |
| **Asignar Códigos de Productos** | — | SKU/código interno y códigos de barra. |
| **Verificar disponibilidad inicial** | Almacén | Confirmar stock inicial o fecha de disponibilidad. |

### B) Actualizar información de productos

**Casos:**
* Revisar precios y disponibilidad
* Modificar descripciones o imágenes según retroalimentación
* `<<include>>` Sincronizar cambios (Almacén)

| *Caso de uso* | *Actores* | *Resumen* |
| :--- | :--- | :--- |
| **Revisar precios y disponibilidad** | Personal, Gerente de Almacén | Ajuste por lista de precios/stock. |
| **Modificar descripciones o imágenes según retroalimentación** | Marketing, Personal | Mejoras de catálogo y SEO. |
| **Sincronizar cambios** | Almacén | Propagar cambios a inventario/ventas. |

### C) Retirar productos obsoletos

**Casos:**
* Identificar productos con baja rotación
    * `<<include>>` Notificar a producción para detener elaboración
    * `<<include>>` Eliminar del catálogo de la app y archivar datos históricos (Almacén)

| *Caso de uso* | *Actores* | *Resumen* |
| :--- | :--- | :--- |
| **Identificar productos con baja rotación** | Personal, Gerente de Almacén | KPI de rotación y margen. |
| **Notificar a producción para detener elaboración** | — | Aviso formal y fecha de corte. |
| **Eliminar del catálogo de la app y archivar datos históricos** | Almacén | Ocultar/retirar y conservar histórico. |

---

## 3) Módulo Gestión de Inventarios

![Gestión de Inventarios](./imgs/gestion_inventarios.png)

### Propósito
Control continuo de stock y reabastecimiento con criterios de sustentabilidad y caducidad.

### Actores
* Personal, Gerente de Almacén, Almacén (sistema)

### A) Monitoreo de Stock

**Caso principal: Registrar entradas y salidas de stock**
* `<<include>>` Actualizar inventario al completar lotes
* `<<include>>` Detectar unidades vendidas o enviadas diariamente
* `<<include>>` Generar reportes semanales para revisión
* `<<extend>>` Ajustar alertas de reabastecimiento

| *Caso de uso* | *Actores* | *Resumen* |
| :--- | :--- | :--- |
| **Registrar entradas y salidas de stock** | Personal | Movimientos por compras, producción, ventas, devoluciones. |
| **Actualizar inventario al completar lotes** | — | Cierre de lote → alta en stock disponible. |
| **Detectar unidades vendidas o enviadas diariamente** | Almacén | Integración con ventas/despacho. |
| **Generar reportes semanales para revisión** | Gerente de Almacén | KPIs, quiebres, mermas. |
| **Ajustar alertas de reabastecimiento (extend)** | Gerente de Almacén | Ajuste de puntos de pedido y stocks de seguridad. |

### B) Reabastecimiento Sostenible

**Caso principal: Reabastecimiento Sostenible**
* `<<include>>` Identificar niveles bajos
* `<<include>>` Confirmar disponibilidad
* `<<include>>` Actualizar inventario al reabastecer
* `<<extend>>` Clasificar productos por fecha de caducidad
* `<<extend>>` Desechar productos expirados

**Caso relacionado:**
* Optimizar rotación de inventario (`<<extend>>` del flujo de reabastecimiento)

| *Caso de uso* | *Actores* | *Resumen* |
| :--- | :--- | :--- |
| **Reabastecimiento Sostenible** | Personal, Gerente | Ordenar según demanda y capacidad. |
| **Identificar niveles bajos** | — | Puntos de reposición por SKU. |
| **Confirmar disponibilidad** | Almacén | Validar proveedores/lotes. |
| **Actualizar inventario al reabastecer** | — | Entradas y ajustes de reservas. |
| **Clasificar por fecha de caducidad (extend)** | — | FEFO/rotación. |
| **Desechar productos expirados (extend)** | — | Bajas con trazabilidad. |
| **Optimizar rotación de inventario (extend)** | Gerente | Parametrizar políticas de rotación. |

---

## 4) Módulo Gestión de Marketing

![Gestión de Marketing](./imgs/gestion_marketing.png)

### Propósito
Planificar y ejecutar campañas basadas en audiencias y catálogo actualizado.

### Actores
* Personal, Gerente de Almacén, Marketing, Cliente
* Campaña (plataforma/sistema de campañas)

### A) Planificación de Campañas

**Casos:**
* **Definir audiencias objetivo**
    * `<<include>>` Segmentar clientes por preferencias
    * `<<include>>` Recopilar feedback
    * `<<include>>` Priorizar grupos
* **Crear contenido promocional**
    * `<<include>>` Redactar descripciones
    * `<<include>>` Fotos de productos
    * `<<include>>` Programar publicaciones

| *Caso de uso* | *Actores* | *Resumen* |
| :--- | :--- | :--- |
| **Definir audiencias objetivo** | Personal | Segmentar por preferencias, historial y canales. |
| **Recopilar feedback** | Campaña | Importar reseñas/encuestas. |
| **Priorizar grupos** | — | Seleccionar targets de alto impacto. |
| **Crear contenido promocional** | Marketing, Personal | Piezas, copys, creatividades. |
| **Redactar descripciones / Fotos de productos / Programar publicaciones** | Campaña | Preparar y calendarizar. |

### B) Ejecución de Campañas

**Caso principal: Lanzar Campañas**
* `<<include>>` Enviar notificación
* `<<include>>` Ejecutar Campaña
* `<<include>>` Medir tasa de apertura

| *Caso de uso* | *Actores* | *Resumen* |
| :--- | :--- | :--- |
| **Lanzar Campañas** | Marketing, Personal | Activar envíos por canal (email, push, redes). |
| **Enviar notificación** | Campaña, Cliente | Disparos por segmento. |
| **Ejecutar Campaña** | Campaña | Orquestación y seguimiento. |
| **Medir tasa de apertura** | Campaña | Métricas de apertura/clic/conversión. |

---

## 5) Módulo Gestión de Ventas

![Gestión de Ventas](./imgs/gestion_ventas.png)

### Propósito
Procesar pedidos y pagos de forma segura y preparar los envíos.

### Actores
* Cliente, Personal, Gerente de Almacén
* Almacén (sistema), Pasarela de Pago

### A) Proceso Ventas

**Casos:**
* **Recepcionar y Validar Pedidos**
    * `<<include>>` Realizar Pedido
    * `<<include>>` Verificar stock en almacén (Almacén)
    * `<<include>>` Generar orden de picking en almacén (Almacén)
* **Procesar Pagos Seguros**
    * `<<include>>` Validar Transacción (Pasarela de Pago)
    * `<<include>>` Emitir Comprobante

| *Caso de uso* | *Actores* | *Resumen* |
| :--- | :--- | :--- |
| **Recepcionar y Validar Pedidos** | Cliente, Almacén | Capturar pedido; validar disponibilidad; emitir orden de picking. |
| **Realizar Pedido** | Cliente | Selección y confirmación de carrito. |
| **Verificar stock en almacén** | Almacén | Disponibilidad y reservas. |
| **Generar orden de picking en almacén** | Almacén | Lista de preparación por ubicación. |
| **Procesar Pagos Seguros** | Pasarela de Pago | Cobro, antifraude y conciliación. |
| **Validar Transacción** | Pasarela de Pago | Autorización/declinación. |
| **Emitir Comprobante** | — | Factura/recibo electrónico. |

### B) Gestión Post-Ventas

**Caso principal: Confirmar y preparar pedidos para envío**
* `<<include>>` Recibir lista de picking
* `<<include>>` Escanear salida y se actualiza estado
* `<<include>>` Empacar y etiquetar con QR de rastreo (Almacén)

| *Caso de uso* | *Actores* | *Resumen* |
| :--- | :--- | :--- |
| **Confirmar y preparar pedidos para envío** | Personal, Gerente | Verificar pago/picking; preparar despacho. |
| **Recibir lista de picking** | Almacén | Tareas de preparación. |
| **Escanear salida y se actualiza estado** | Almacén | Trazabilidad de despacho. |
| **Empacar y etiquetar con QR de rastreo** | Almacén | Etiquetas y guía de envío. |

---

## 6) Módulo Gestión de Distribución y Logística

![Gestión de Distribución y Logística](./imgs/gestion_logistica.png)

### Propósito
Planificar rutas, asegurar cadena de frío y dar trazabilidad a la entrega.

### Actores
* Personal, Supervisor de Logística, Coordinador de Almacén/Distribución, Director/Repartidor
* Carfilosa (sistema/área)

### A) Planificación de Rutas

**Casos:**
* **Asignar rutas óptimas por zona**
    * `<<include>>` Asignar rutas
    * `<<include>>` Generar rutas diarias para flota propia y terceros (Carfilosa)
* **Coordinar embalaje con cadena de frío**
    * `<<include>>` Seleccionar caja
    * `<<include>>` Registrar temperatura (Carfilosa)

| *Caso de uso* | *Actores* | *Resumen* |
| :--- | :--- | :--- |
| **Asignar rutas óptimas por zona** | Personal, Supervisor | Optimización por zona, ventanas y capacidad. |
| **Generar rutas diarias para flota propia y terceros** | Carfilosa | Integración con proveedores de transporte. |
| **Coordinar embalaje con cadena de frío** | Personal, Coordinador | Selección de insumos, validación de cadena de frío. |
| **Seleccionar caja / Registrar temperatura** | Carfilosa | Registro antes de salida y durante tránsito. |

### B) Ejecución y Seguimiento

**Caso principal: Ejecución y Seguimiento**
* `<<include>>` Escanear QR al cargar y entregar
* `<<include>>` Registrar prueba de entrega

| *Caso de uso* | *Actores* | *Resumen* |
| :--- | :--- | :--- |
| **Ejecución y Seguimiento** | Personal, Director/Repartidor, Carfilosa | Monitoreo del viaje y eventos. |
| **Escanear QR al cargar y entregar** | — | Confirmar carga y entrega en puntos de control. |
| **Registrar prueba de entrega** | — | Firma/foto/geo-posición como evidencia. |