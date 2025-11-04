<img width="339" height="190" alt="image" src="https://github.com/user-attachments/assets/c388d752-7cb4-4a42-acec-9b96efb07b9b" /><p align="left">
</p>

# Mapa de Capacidades — Plataforma **Cafrilosa**
---

## 📌 Tabla de contenido
- [¿Qué es un Mapa de Capacidades?](#qué-es-un-mapa-de-capacidades)
- [Estructura del Mapa](#estructura-del-mapa)
- [Mapa de Capacidades (Imagen)](#mapa-de-capacidades-imagen)
- [Módulos y Subcapacidades](#módulos-y-subcapacidades)
  - [1. Gestión de Clientes](#1-gestión-de-clientes)
  - [2. Administración de Datos](#2-administración-de-datos)
  - [3. Incorporación de Nuevos Productos](#3-incorporación-de-nuevos-productos)
  - [4. Gestión de Productos](#4-gestión-de-productos)
  - [5. Gestión de Inventarios (Stock)](#5-gestión-de-inventarios-stock)
  - [6. Reabastecimiento Sostenible](#6-reabastecimiento-sostenible)
  - [7. Marketing (Campañas)](#7-marketing-campañas)
  - [8. Ventas (Proceso y Post-venta)](#8-ventas-proceso-y-post-venta)
  - [9. Distribución y Logística](#9-distribución-y-logística)
- [Flujos clave — Vista del Cliente](#flujos-clave--vista-del-cliente)
- [KPIs sugeridos](#kpis-sugeridos)


---

## ¿Qué es un Mapa de Capacidades?
Un **Mapa de Capacidades** organiza, en lenguaje de negocio, **lo que el sistema debe ser capaz de hacer**. Ayuda a alinear a stakeholders, UX/UI y desarrollo; y sirve para priorizar alcance (MVP → releases).

### Estructura del Mapa
- **Módulos (nivel 1):** áreas funcionales (p. ej. Ventas, Inventario).
- **Subcapacidades (nivel 2):** funciones específicas por módulo.
- **Artefactos derivados:** flujos, pantallas, formularios, reglas/validaciones, reportes.

---

## Mapa de Capacidades (Imagen)
![alt text](Capa.jpg)


---



## Módulos y Subcapacidades

### 1. Gestión de Clientes
- **Registro de clientes:** alta, datos de contacto/fiscales.  
- **Actualización de datos:** edición, cambio de responsable, historial.  
- **Verificación/validación:** integridad (correo/teléfono), duplicados.  
- **Categorización y segmentación:** tipo, condiciones comerciales, preferencias.  
- **Estados:** activación, suspensión, reactivación.

### 2. Administración de Datos
- **Gobierno de datos maestros:** clientes, productos, catálogos.  
- **Calidad y consistencia:** normalización, limpieza, reglas de validación.  
- **Auditoría y trazabilidad:** quién/qué/cuándo.

### 3. Incorporación de Nuevos Productos
- **Alta de producto:** nombre, categoría, atributos, características.  
- **Datos comerciales:** precios, impuestos, unidades, empaques.  
- **Aprobación/publicación:** revisión y disponibilidad en catálogo.

### 4. Gestión de Productos
- **Ficha de producto:** descripciones, **imágenes (solo Cafrilosa)**, etiquetas.  
- **Precios y promociones:** vigencias, reglas y excepciones.  
- **Estados:** activo/inactivo, descontinuación, sustituciones.

### 5. Gestión de Inventarios (Stock)
- **Movimientos:** ingresos, salidas, transferencias.  
- **Ajustes y auditorías:** conteos cíclicos, mermas, diferencias.  
- **Lotes/caducidades/ubicaciones:** lote/fecha, estanterías.  
- **Alertas/umbrales:** mínimos, máximos, rotación, obsolescencia.

### 6. Reabastecimiento Sostenible
- **Puntos de reorden / EOQ:** cantidades y frecuencia óptima.  
- **Pronóstico y planeación:** demanda, estacionalidad, cobertura.  
- **Proveedores:** evaluación, pedidos programados, confirmaciones.  
- **Disponibilidad en cadena:** plazos y nivel de servicio.

### 7. Marketing (Campañas)
- **Planeación:** objetivos, segmentación, canales, presupuesto.  
- **Ejecución y seguimiento:** lanzamientos, monitoreo, ajustes.  
- **Cierre y métricas:** desempeño por canal, ROI, lecciones aprendidas.

### 8. Ventas (Proceso y Post-venta)
- **Proceso de venta:** búsqueda/selección, validación de stock, cotización, descuentos, pedido.  
- **Pagos y comprobantes:** registro/validación y emisión de comprobantes.  
- **Post-venta:** confirmaciones, devoluciones, garantías, satisfacción.

### 9. Distribución y Logística
- **Planificación de rutas:** zonas, secuencias, ventanas de entrega.  
- **Preparación y despacho:** picking/packing, documentación, carga.  
- **Ejecución y seguimiento:** tracking, **POD** (prueba de entrega), incidencias.  
- **Control de condiciones:** temperatura/seguridad cuando aplique.

---

## Flujos clave — Vista del Cliente
> El usuario **puede ver** productos sin iniciar sesión. Para **agregar al carrito** o **comprar**, **debe iniciar sesión**.

### 1) Landing pública
- Header (logo Cafrilosa), buscador, categorías.  
- Banners/promos, destacados, footer corporativo.  
- CTA: **Ingresar** / **Crear cuenta**.

### 2) Catálogo (público)
- Filtros (categoría, precio, disponibilidad) y ordenamientos.  
- Vista rápida (sin botón de carrito si no hay sesión).

### 3) Detalle de producto (público)
- Galería de **imágenes de Cafrilosa**, descripción, especificaciones, precio y stock.  
- **Agregar al carrito** → si no hay sesión, redirigir a **Login/Registro**.

### 4) Autenticación
- **Login:** correo + contraseña; “olvidé mi contraseña”.  
- **Registro:** nombre, correo, contraseña, aceptación de términos.  
- Validaciones claras (formato de correo y complejidad de contraseña).

### 5) Carrito (requiere sesión)
- Items, cantidades, subtotal, estimador de envío.  
- Editar/eliminar, “guardar para después”.  
- CTA **Ir a pagar**.

### 6) Checkout (requiere sesión)
- **Paso 1:** Dirección de envío (crear/seleccionar).  
- **Paso 2:** Método de envío (costo/plazo).  
- **Paso 3:** Método de pago (pasarela).  
- **Paso 4:** Revisión y confirmación.  
- Mensajes de error/success bien diseñados (sin 404).

### 7) Pago (pasarela)
- Redirección/embebido seguro.  
- Página **Pago exitoso** con número de pedido.

### 8) Confirmación y seguimiento
- Resumen del pedido, línea de tiempo de estados, comprobante descargable.  
- Link **Rastrear pedido**.

---

## KPIs sugeridos
- **Ventas:** conversión, ticket promedio, abandono de carrito.  
- **Inventario:** rotación, cobertura (días), quiebres, obsolescencia.  
- **Logística:** OTIF, tiempos de preparación/entrega, incidencias.  
- **Marketing:** CTR, CAC, ROI.

---
