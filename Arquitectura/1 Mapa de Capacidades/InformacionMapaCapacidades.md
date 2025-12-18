<img width="339" height="190" alt="image" src="https://github.com/user-attachments/assets/c388d752-7cb4-4a42-acec-9b96efb07b9b" /><p align="left">
</p>

# Mapa de Capacidades — Plataforma **Cafrilosa**
---

## 📌 Tabla de contenido
- [¿Qué es un Mapa de Capacidades?](#qué-es-un-mapa-de-capacidades)
- [Estructura del Mapa](#estructura-del-mapa)
- [Módulos y Subcapacidades](#módulos-y-subcapacidades)
  - [1. Planificación Comercial](#1-planificación-comercial)
  - [2. Gestión de Clientes](#2-gestión-de-clientes)
  - [3. Gestión de Productos](#3-gestión-de-productos)
  - [4. Gestión de Pedidos](#4-gestión-de-pedidos)
  - [5. Gestión de Entregas](#5-gestión-de-entregas)
  - [6. Gestión de Cobros y Créditos](#6-gestión-de-cobros-y-créditos)
  - [7. Postventa y Servicio al Cliente](#7-postventa-y-servicio-al-cliente)
  - [8. Control y Análisis Comercial](#8-control-y-análisis-comercial)

---

## ¿Qué es un Mapa de Capacidades?

Un Mapa de Capacidades es una herramienta visual que ayuda a estructurar y definir las funciones y habilidades esenciales de un sistema o aplicación. Su propósito es ofrecer una visión clara de las capacidades que un sistema debe tener para cumplir sus objetivos. 
En el contexto de la aplicación de ventas de Cafrilosa, un mapa de capacidades permite identificar las áreas clave de funcionalidad, agrupar las actividades comerciales relacionadas y visualizar cómo se interconectan los diferentes módulos del sistema.

## Estructura del Mapa de Capacidades

Un mapa de capacidades generalmente se divide en módulos o áreas de alto nivel (Capacidades Nivel 1) que representan conjuntos de funcionalidades interrelacionadas. Cada módulo tiene una serie de subfunciones o componentes (Capacidades Nivel 2 y 3) que especifican en mayor detalle las capacidades que el sistema debe proporcionar. 
Estos módulos suelen estar organizados de manera jerárquica y permiten a los desarrolladores, diseñadores y stakeholders entender el alcance de las funcionalidades de la aplicación. Este mapa para Cafrilosa se organiza en 8 módulos principales.

---

# Mapa de Capacidades del Sistema  
**ERP Comercial - Arquitectura por Capas (3 Niveles)**

> **Nivel 1:** Módulo  
> **Nivel 2:** Componente
> **Nivel 3:** Función
> **Nivel 4:** Tarea específica 

---

## Descripción de los Módulos



<img width="636" height="1564" alt="image" src="https://github.com/user-attachments/assets/2e288584-d708-4237-aead-79a7dadf784f" />


### 1. Planificación Comercial

**Objetivo:** Establecer la estrategia, reglas de negocio y objetivos que guiarán la operación comercial.

**Capacidades:**

* **Definir Estrategia de Ventas:**
    * **Establecer Objetivos Comerciales** - Definir metas de ventas, cobertura y participación por zona, canal y producto.
    * **Diseñar Politicas de Precios y Descuentos** - Crear y administrar listas de precios y reglas de descuento por canal, volumen o condiciones de pago.
    * **Planificar Promociones y Campañas** - Definir objetivos, mecánicas (ej. 2x1, combos) y vigencia de campañas para impulsar la rotación de stock.
* **Asignar Rutas y Zonas de Venta:**
    * **Determinar Cobertura Geográfica** - Mapear y asignar territorios (zonas, barrios) a la fuerza de ventas para evitar solapamientos.
    * **Definir Frecuencia de Visitas** - Establecer la periodicidad de visitas a clientes según su clasificación (ej. semanal para clientes A, mensual para C).
* **Capacitar Fuerza de Ventas:**
    * **Actualizar Conocimientos de Producto** - Informar a la fuerza de ventas sobre nuevos productos, beneficios, cambios de formato o precios.
    * **Capacitar en Técnicas de Venta y Servicio al Cliente** - Entrenar al equipo en habilidades de negociación, cierre de ventas, manejo de objeciones y protocolos de atención.




---

<img width="595" height="863" alt="image" src="https://github.com/user-attachments/assets/a85a7f3b-0f0f-411e-b05d-1cfce73cd999" />


### 2. Gestión de Clientes

**Objetivo:** Administrar el ciclo de vida completo del cliente, desde su captación hasta su retención.

**Capacidades:**

* **Registro y Clasificación de Clientes:**
    * **Ingresar Datos del Cliente (razón social, dirección, contacto)** - Crear la ficha maestra del cliente en el sistema con su información fiscal, de contacto y de entrega.
    * **Clasificar según Canal, Tamaño y Frecuencia de Compra** - Segmentar clientes (ej. A, B, C; Mayorista, Minorista, HORECA) para priorizar esfuerzos y asignar condiciones.
* **Fidelización de Clientes:**
    * **Mantener Comunicación Continua** - Enviar notificaciones de promociones, lanzamientos, beneficios o estados de cuenta.
    * **Implementar Programas de Beneficios** - Gestionar bonificaciones por volumen de compra, antigüedad o cumplimiento de pago.




---

<img width="1068" height="1461" alt="productos" src="https://github.com/user-attachments/assets/fbeb1780-31bb-414c-8b97-5a87805c9e69" />

### 3. Gestión de Productos

**Objetivo:** Administrar el catálogo de productos y asegurar la disponibilidad y trazabilidad del stock para satisfacer la demanda.

**Capacidades:**

* **Registro y Mantenimiento:**
    * **Registro de Producto** - Crear nuevos productos (SKUs) en el sistema con sus datos maestros (descripción, precio base, unidad de medida, fotos).
    * **Actualización de datos** - Modificar atributos existentes de un producto (ej. cambiar precio, descripción, estado 'activo'/'inactivo').
* **Control de Inventario:**
    * **Gestionar stock entradas/salidas** - Registrar movimientos de inventario (compras, ventas, mermas, ajustes) actualizando el stock disponible en tiempo real.
    * **Asignar y rastrear lotes** - Vincular productos a un lote específico desde su recepción para controlar su trazabilidad y fecha de vencimiento.
    * **Monitorear niveles de inventario** - Consultar la disponibilidad de stock en tiempo real y definir niveles mínimos y máximos de seguridad.
* **Monitoreo y Alertas:**
    * **Verificar fechas de vencimiento** - Monitorear productos próximos a vencer para gestionar su rotación prioritaria (FEFO - First Expires, First Out).
    * **Generar alertas por stock bajo o vencimientos** - Notificar automáticamente cuando el stock llegue a un punto de reorden o esté por caducar.
    * **Análisis de rotación** - Calcular indicadores de rotación (días de inventario) e identificar productos de bajo movimiento u obsoletos.




---

<img width="909" height="776" alt="image" src="https://github.com/user-attachments/assets/1cd7046b-736b-417d-b6d1-8f0e7d854955" />

### 4. Gestión de Pedidos

**Objetivo:** Manejar el proceso de captura, validación y procesamiento de las órdenes de compra de manera eficiente.

**Capacidades:**

* **Recepción de Pedidos:**
    * **Tomar Pedido Durante Visita o por Canal Digital** - Registrar productos y cantidades desde la app móvil del vendedor o el portal web del cliente.
    * **Validar Condiciones Comerciales** - Aplicar automáticamente precios, descuentos, promociones vigentes y verificar el stock disponible en tiempo real.
* **Coordinación con Logística:**
    * **Enviar Pedido a Planta o Almacén** - Transmitir la orden aprobada (comercial y crediticiamente) al sistema de almacén (WMS) para iniciar el picking.
    * **Confirmar Fecha y Modo de Entrega** - Validar la disponibilidad de inventario y agendar el pedido en una ruta de reparto y fecha de entrega.
* **Control de Pedidos:**
    * **Seguimiento del Estado del Pedido** - Monitorear y comunicar las etapas del pedido (Recibido, Aprobado, En Preparación, En Ruta, Entregado).
    * **Cierre Administrativo del Pedido** - Confirmar la entrega final y la facturación para completar el ciclo del pedido en el sistema.




---

<img width="961" height="761" alt="image" src="https://github.com/user-attachments/assets/3646440e-c236-42b6-8a5f-41e424c34875" />

### 5. Gestión de Entregas

**Objetivo:** Asegurar que los pedidos preparados sean despachados y entregados al cliente de forma eficiente y puntual.

**Capacidades:**

* **Preparación del Pedido:**
    * **Verificación de Producto y Lote** - Escanear y validar que los productos, lotes y fechas de vencimiento del picking coincidan con el pedido.
    * **Embalaje y Documentación** - Empacar los productos (manteniendo cadena de frío) y generar las guías de despacho y etiquetas de ruta.
* **Distribución y Entrega:**
    * **Cargar y Transportar Productos** - Asegurar la carga en el vehículo, optimizar la ruta y mantener las condiciones de seguridad y refrigeración.
    * **Confirmar Entrega al Cliente** - Registrar en la app móvil la entrega exitosa (o parcial) capturando firma, foto u observaciones del cliente.
* **Gestión de Incidencias:**
    * **Reportar Problemas de Entrega** - Documentar en tiempo real incidencias como producto dañado, faltante, rechazo del cliente o dirección incorrecta.
    * **Coordinar Solución** - Gestionar la acción correctiva ante una incidencia (ej. programar reposición, devolución o emitir nota de crédito).




---

<img width="1028" height="780" alt="image" src="https://github.com/user-attachments/assets/215945bd-8aa6-44bb-b70a-ce985095fae0" />

### 6. Gestión de Cobros y Créditos

**Objetivo:** Administrar la salud financiera de las transacciones, gestionando las líneas de crédito y asegurando el recaudo de la cartera.

**Capacidades:**

* **Control de Cuentas por Cobrar:**
    * **Monitorear Facturas Pendientes** - Generar reportes de antigüedad de saldos para identificar deudas vencidas y gestionar la cartera.
    * **Clasificar Clientes por Estado de Pago** - Etiquetar clientes (Al día, Atrasado, Moroso) para aplicar acciones de cobranza o bloquear pedidos.
* **Ejecución de Cobros:**
    * **Coordinar Rutas de Cobranza** - Planificar visitas de cobradores o vendedores para el recaudo de pagos en efectivo o cheques.
    * **Registrar Pagos Recibidos** - Ingresar pagos (efectivo, transferencia, cheque) en el sistema y aplicarlos a las facturas correspondientes.
* **Gestión de Créditos Comerciales:**
    * **Evaluar Solicitud de Crédito** - Analizar el historial del cliente y documentos para aprobar, rechazar o modificar una línea de crédito.
    * **Controlar Cumplimiento de Condiciones** - Monitorear el uso del cupo de crédito, plazos de pago y alertar sobre incumplimientos o excesos.




---

<img width="1068" height="781" alt="image" src="https://github.com/user-attachments/assets/294cae3c-6024-4671-9b75-978ae6e8eef6" />

### 7. Postventa y Servicio al Cliente

**Objetivo:** Brindar soporte al cliente después de la venta para resolver problemas y medir su nivel de satisfacción.

**Capacidades:**

* **Atención de Reclamos:**
    * **Recibir Reclamos por Producto o Servicio** - Registrar quejas o solicitudes del cliente (sobre calidad, entrega, facturación) asignando un número de caso.
    * **Resolver Reclamo** - Investigar la causa raíz del problema, coordinar con áreas internas y autorizar la solución (reposición, nota de crédito).
* **Seguimiento de Satisfacción:**
    * **Aplicar Encuestas o Llamadas de Seguimiento** - Medir la satisfacción del cliente (ej. NPS) después de una entrega o la resolución de un caso.
    * **Analizar Resultados y Retroalimentar al Equipo** - Identificar puntos críticos recurrentes en el servicio y proponer mejoras a las áreas involucradas (Logística, Ventas).
* **Fidelización Continua:**
    * **Implementar Programas de Retención.** - Diseñar y ejecutar acciones (descuentos especiales, bonos) para premiar la lealtad y recurrencia de los clientes activos.




---

<img width="1063" height="735" alt="image" src="https://github.com/user-attachments/assets/4e37c54c-8fd2-4641-a92f-9307b41fb598" />

### 8. Control y Análisis Comercial

**Objetivo:** Proveer la inteligencia de negocio necesaria para la toma de decisiones estratégicas, midiendo el rendimiento de la operación.

**Capacidades:**

* **Medición del Desempeño:**
    * **Evaluar Cumplimiento de Metas** - Comparar las ventas reales contra los objetivos (KPIs) definidos para vendedores, zonas y productos.
    * **Monitorear Actividad de Ventas** - Hacer seguimiento al número de visitas efectivas, pedidos registrados y cobros realizados por la fuerza de ventas.
* **Análisis del Mercado:**
    * **Identificar Tendencias de Consumo** - Analizar qué productos, categorías o presentaciones están creciendo o decreciendo en ventas.
    * **Analizar Eficiencia de Promociones** - Medir el retorno de la inversión (ROI) de las campañas y su impacto real en el volumen de ventas.
* **Reportes Gerenciales:**
    * **Elaborar Informes de Resultados** - Consolidar KPIs en dashboards visuales (ventas por zona, rentabilidad por cliente, etc.) para la gerencia.
    * **Tomar Decisiones Estratégicas** - Usar los informes para redefinir metas, ajustar precios, o enfocar esfuerzos en zonas/clientes de alto potencial.
