Mapa de Capacidades — Plataforma Cafrilosa
Tabla de contenido

¿Qué es un Mapa de Capacidades?

Estructura del Mapa

Resumen de Módulos

Detalle por Módulo

1. Gestión de Clientes

2. Administración de Datos

3. Incorporación de Nuevos Productos

4. Gestión de Productos

5. Gestión de Inventarios (Stock)

6. Reabastecimiento Sostenible

7. Marketing (Campañas)

8. Ventas (Proceso y Post-venta)

9. Distribución y Logística

Capacidades Transversales

Flujos clave — Vista del Cliente

KPIs sugeridos

Glosario

Alcance MVP y Próximas Iteraciones

Notas

¿Qué es un Mapa de Capacidades?

Un Mapa de Capacidades describe, en lenguaje de negocio, lo que el sistema debe ser capaz de hacer para cumplir sus objetivos. Alinea a stakeholders, UX/UI y desarrollo, y sirve para priorizar el alcance (MVP → releases).

Estructura del Mapa

Módulos (nivel 1): áreas funcionales de alto nivel (p. ej., Ventas, Inventario).

Subcapacidades (nivel 2): funciones específicas dentro de cada módulo.

Artefactos derivados: flujos, pantallas, formularios, reglas/validaciones y reportes.

Resumen de Módulos

Gestión de Clientes

Administración de Datos

Incorporación de Nuevos Productos

Gestión de Productos

Gestión de Inventarios (Stock)

Reabastecimiento Sostenible

Marketing (Campañas)

Ventas (Proceso y Post-venta)

Distribución y Logística (Ruteo, Ejecución, Seguimiento)

Detalle por Módulo
1. Gestión de Clientes

Registro de clientes: alta, datos de contacto y fiscales.

Actualización de datos: edición, cambio de responsable, historial.

Verificación/validación: integridad (correo/teléfono), duplicados.

Categorización y segmentación: tipo de cliente, condiciones comerciales.

Estados del cliente: activación, suspensión, reactivación.

2. Administración de Datos

Gobierno de datos maestros: clientes, productos, catálogos.

Calidad y consistencia: normalización, limpieza, reglas de validación.

Trazabilidad: auditoría de cambios (quién/qué/cuándo).

3. Incorporación de Nuevos Productos

Alta de producto: nombre, categoría, atributos, características.

Datos comerciales: precios base, impuestos, unidades, empaques.

Aprobación/publicación: revisión y disponibilidad en catálogo.

4. Gestión de Productos

Mantenimiento de ficha: descripciones, imágenes (solo material Cafrilosa), etiquetas.

Precios y promociones: vigencias, reglas, excepciones.

Estados: activo/inactivo, descontinuación, sustituciones.

5. Gestión de Inventarios (Stock)

Movimientos: ingresos, salidas, transferencias.

Ajustes y auditorías: conteos cíclicos, mermas, diferencias.

Lotes/caducidades/ubicaciones: control por lote/fecha, estanterías.

Alertas/umbrales: mínimos, máximos, rotación, obsolescencia.

6. Reabastecimiento Sostenible

Puntos de reorden: cálculo de cantidades y EOQ.

Pronósticos: demanda, estacionalidad, cobertura.

Proveedores: evaluación, pedidos programados, confirmaciones.

Disponibilidad en cadena: plazos y nivel de servicio.

7. Marketing (Campañas)

Planeación: objetivos, segmentación, canales, presupuesto.

Ejecución: lanzamientos, seguimiento en tiempo real.

Cierre: desempeño por canal, ROI, lecciones aprendidas.

8. Ventas (Proceso y Post-venta)

Proceso de venta: búsqueda/selección, validación de stock, cotización, descuentos, pedido.

Pagos y comprobantes: registro/validación de pagos, emisión de comprobantes.

Post-venta: confirmaciones, devoluciones, garantías, satisfacción.

9. Distribución y Logística

Planificación de rutas: zonas, secuencias, ventanas de entrega.

Preparación y despacho: picking/packing, documentación, carga.

Ejecución/seguimiento: tracking, prueba de entrega (POD), incidencias.

Control de condiciones: temperatura/seguridad cuando aplique.

Capacidades Transversales

Seguridad y permisos: roles y autorizaciones por módulo/acción.

Reportes y analítica: tableros por área (ventas, rotación, fill rate, cobertura).

Integraciones: ERP/contabilidad, pasarelas de pago, mensajería y carriers.

Cumplimiento: fiscal, sanitario o sectorial según portafolio.

Flujos clave — Vista del Cliente

El usuario puede ver productos sin iniciar sesión. Para agregar al carrito o comprar, debe iniciar sesión.

Landing pública

Header (logo Cafrilosa, buscador, categorías).

Banners/promos, destacados, footer corporativo.

CTA: Ingresar / Crear cuenta.

Catálogo (público)

Listado con filtros (categoría, precio, disponibilidad) y ordenamientos.

Vista rápida (sin botón de carrito si no hay sesión).

Detalle de producto (público)

Galería de imágenes (solo imágenes de Cafrilosa).

Especificaciones, precio y stock.

Agregar al carrito → si no hay sesión, redirigir a Login/Registro.

Autenticación

Login: email + contraseña; “olvidé mi contraseña”.

Registro: nombre, email, contraseña, aceptación de términos.

Validaciones claras (formato email, complejidad de contraseña).

Carrito (requiere sesión)

Items, cantidades, subtotal, estimador de envío.

Editar/eliminar, “guardar para después”.

CTA Ir a pagar.

Checkout (requiere sesión)

Paso 1: Dirección de envío (gestión/selección).

Paso 2: Método de envío (plazo/costo).

Paso 3: Método de pago (pasarela).

Paso 4: Revisión y confirmación (sin errores 404).

Pago (pasarela)

Redirección/embebido seguro.

Página de Pago exitoso con número de pedido (sin not found).

Confirmación y seguimiento

Resumen, línea de tiempo de estados, comprobante descargable.

Enlace Rastrear pedido.

KPIs sugeridos

Ventas: conversión, ticket promedio, abandono de carrito.

Inventario: rotación, cobertura (días), quiebres, obsolescencia.

Logística: OTIF, tiempos de preparación/entrega, incidencias.

Marketing: CTR, CAC, ROI.

Glosario

POD: Proof of Delivery (prueba de entrega).

EOQ: Economic Order Quantity (cantidad económica de pedido).

OTIF: Entrega a tiempo y completa.

Cobertura: Días que el stock actual satisface la demanda.

Alcance MVP y Próximas Iteraciones

MVP (recomendado):

Landing, Catálogo, Detalle de producto.

Registro/Login.

Carrito, Checkout y Pago (flujo completo).

Confirmación y seguimiento básico.

Gestión mínima de productos/precios en backoffice.

Próximas iteraciones:

Campañas avanzadas y reglas de promociones.

Pronósticos y reabastecimiento automático.

Ruteo optimizado y tracking en tiempo real.

Tableros de analítica y reportes avanzados.