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

## 1. Tabla: empleados

| Campo       | Tipo        | Descripción                       |
| ----------- | ----------- | --------------------------------- |
| id_empleado | UUID (PK)   | Identificador único del empleado. |
| nombre      | TEXT        | Nombre completo del empleado.     |
| email       | TEXT, único | Correo institucional.             |
| telefono    | TEXT        | Teléfono de contacto.             |
| rol         | TEXT        | Rol asignado en el sistema.       |

## 2. Tabla: roles

| Campo       | Tipo      | Descripción                  |
| ----------- | --------- | ---------------------------- |
| id_rol      | UUID (PK) | Identificador único del rol. |
| nombre      | TEXT      | Nombre del rol.              |
| descripcion | TEXT      | Descripción del rol.         |

## 3. Tabla: permisos 

| Campo       | Tipo      | Descripción                      |
| ----------- | --------- | -------------------------------- |
| id_permiso  | UUID (PK) | Identificador único del permiso. |
| nombre      | TEXT      | Nombre del permiso.              |
| descripcion | TEXT      | Detalle del permiso.             |

## 4. Tabla: roles_permisos
   
| Campo      | Tipo                            | Descripción                |
| ---------- | ------------------------------- | -------------------------- |
| id_rol     | UUID (FK → roles.id_rol)        | Rol que recibe el permiso. |
| id_permiso | UUID (FK → permisos.id_permiso) | Permiso asignado.          |

## 5. Tabla: auditoria

| Campo        | Tipo      | Descripción                              |
| ------------ | --------- | ---------------------------------------- |
| id_auditoria | UUID (PK) | Identificador del registro de auditoría. |
| tabla        | TEXT      | Nombre de la tabla afectada.             |
| operacion    | TEXT      | INSERT, UPDATE o DELETE.                 |
| registro_id  | UUID      | Identificador del registro afectado.     |
| usuario      | TEXT      | Usuario que realizó la acción.           |
| fecha        | TIMESTAMP | Fecha y hora del evento.                 |


## 6. Tabla: clientes

| Campo                | Tipo      | Descripción                    |
| -------------------- | --------- | ------------------------------ |
| id_cliente           | UUID (PK) | Identificador del cliente.     |
| nombre               | TEXT      | Nombre comercial o personal.   |
| cedula_ruc           | TEXT      | Identificación tributaria.     |
| razon_social         | TEXT      | Nombre jurídico.               |
| direccion            | TEXT      | Dirección principal.           |
| telefono             | TEXT      | Teléfono de contacto.          |
| correo               | TEXT      | Correo electrónico.            |
| categoria_tamano     | TEXT      | Pequeño, Mediano o Grande.     |
| categoria_frecuencia | TEXT      | Ocasional o Recurrente.        |
| estado               | TEXT      | Activo, Inactivo, Moroso, etc. |
| credito_disponible   | NUMERIC   | Monto disponible del crédito.  |
| score_cumplimiento   | NUMERIC   | Puntaje interno del cliente.   |
| nps_score            | NUMERIC   | Net Promoter Score.            |


## 7. Tabla: productos

| Campo                  | Tipo      | Descripción                           |
| ---------------------- | --------- | ------------------------------------- |
| id_producto            | UUID (PK) | Identificador del producto.           |
| codigo                 | TEXT      | Código interno único.                 |
| nombre                 | TEXT      | Nombre del producto.                  |
| lote                   | TEXT      | Lote de fabricación.                  |
| fecha_vencimiento      | DATE      | Fecha de caducidad.                   |
| temperatura_requerida  | NUMERIC   | Temperatura óptima.                   |
| condicion_conservacion | TEXT      | Condición de almacenamiento.          |
| peso_unitario          | NUMERIC   | Peso del producto.                    |
| volumen_unitario       | NUMERIC   | Volumen del producto.                 |
| margen_neto            | NUMERIC   | Margen de utilidad.                   |
| indice_rotacion        | NUMERIC   | Frecuencia de rotación de inventario. |


## 8. Tabla: inventario

| Campo           | Tipo                              | Descripción                      |
| --------------- | --------------------------------- | -------------------------------- |
| id_inventario   | UUID (PK)                         | Identificador del inventario.    |
| id_producto     | UUID (FK → productos.id_producto) | Producto controlado.             |
| stock_actual    | INT                               | Cantidad disponible.             |
| umbral_min      | INT                               | Mínimo permitido.                |
| umbral_max      | INT                               | Máximo permitido.                |
| indice_rotacion | NUMERIC                           | Rotación histórica del producto. |


## 9. Tabla: movimientos_inventario

| Campo         | Tipo                              | Descripción                   |
| ------------- | --------------------------------- | ----------------------------- |
| id_movimiento | UUID (PK)                         | Identificador del movimiento. |
| id_producto   | UUID (FK → productos.id_producto) | Producto afectado.            |
| tipo          | TEXT                              | Entrada o Salida.             |
| cantidad      | INT                               | Cantidad del movimiento.      |
| fecha         | TIMESTAMP                         | Fecha del movimiento.         |


## 10. Tabla: pedidos

| Campo              | Tipo                            | Descripción                           |
| ------------------ | ------------------------------- | ------------------------------------- |
| id_pedido          | UUID (PK)                       | Identificador del pedido.             |
| numero             | TEXT                            | Número interno único.                 |
| id_cliente         | UUID (FK → clientes.id_cliente) | Cliente que realiza el pedido.        |
| fecha_entrega      | DATE                            | Fecha programada de entrega.          |
| nivel_urgencia     | TEXT                            | Normal, Urgente.                      |
| precio_total       | NUMERIC                         | Total sin descuentos.                 |
| descuento_aplicado | NUMERIC                         | Descuento otorgado.                   |
| estado             | TEXT                            | Aprobado, Programado, Entregado, etc. |
| direccion_envio    | TEXT                            | Dirección de entrega.                 |
| log                | TEXT                            | Coordenada longitud.                  |
| lat                | TEXT                            | Coordenada latitud.                   |
| peso_total         | NUMERIC                         | Peso consolidado.                     |
| volumen_total      | NUMERIC                         | Volumen consolidado.                  |


## 11. Tabla: pedidos_productos

| Campo       | Tipo                              | Descripción            |
| ----------- | --------------------------------- | ---------------------- |
| id_pedido   | UUID (FK → pedidos.id_pedido)     | Pedido asociado.       |
| id_producto | UUID (FK → productos.id_producto) | Producto incluido.     |
| cantidad    | INT                               | Cantidad del producto. |

## 12. Tabla: pagos

| Campo      | Tipo                          | Descripción                               |
| ---------- | ----------------------------- | ----------------------------------------- |
| id_pago    | UUID (PK)                     | Identificador del pago.                   |
| id_pedido  | UUID (FK → pedidos.id_pedido) | Pedido pagado.                            |
| metodo     | TEXT                          | Transferencia, Efectivo, Débito, Crédito. |
| estado     | TEXT                          | Pendiente, Procesado, Fallido.            |
| monto      | NUMERIC                       | Monto pagado.                             |
| fecha_pago | TIMESTAMP                     | Fecha del pago.                           |

## 13. Tabla: facturas

| Campo             | Tipo                          | Descripción                        |
| ----------------- | ----------------------------- | ---------------------------------- |
| id_factura        | UUID (PK)                     | Identificador único de la factura. |
| id_pedido         | UUID (FK → pedidos.id_pedido) | Pedido facturado.                  |
| numero            | TEXT                          | Número de factura.                 |
| monto             | NUMERIC                       | Subtotal.                          |
| iva               | NUMERIC                       | Impuesto aplicado.                 |
| total             | NUMERIC                       | Total a pagar.                     |
| fecha_emision     | DATE                          | Fecha de emisión.                  |
| fecha_vencimiento | DATE                          | Fecha límite de pago.              |
| estado            | TEXT                          | Emitida, Pagada, Vencida.          |

## 14. Tabla: guias_despacho

| Campo         | Tipo                          | Descripción               |
| ------------- | ----------------------------- | ------------------------- |
| id_guia       | UUID (PK)                     | Identificador de la guía. |
| id_pedido     | UUID (FK → pedidos.id_pedido) | Pedido relacionado.       |
| numero        | TEXT                          | Número de guía.           |
| numero_bultos | INT                           | Cantidad de bultos.       |
| peso_total    | NUMERIC                       | Peso total.               |
| ruta_asignada | TEXT                          | Ruta asignada.            |

## 15. Tabla: lineas_credito

| Campo              | Tipo                            | Descripción                           |
| ------------------ | ------------------------------- | ------------------------------------- |
| id_linea_credito   | UUID (PK)                       | Identificador de la línea de crédito. |
| id_cliente         | UUID (FK → clientes.id_cliente) | Cliente beneficiario.                 |
| limite             | NUMERIC                         | Límite de crédito aprobado.           |
| plazo_dias         | INT                             | Plazo para pagar.                     |
| score_cumplimiento | NUMERIC                         | Puntaje calculado.                    |
| disponible         | NUMERIC                         | Crédito restante.                     |

## 16. Tabla: beneficios

| Campo        | Tipo                            | Descripción                        |
| ------------ | ------------------------------- | ---------------------------------- |
| id_beneficio | UUID (PK)                       | Identificador del beneficio.       |
| id_cliente   | UUID (FK → clientes.id_cliente) | Cliente beneficiado.               |
| tipo         | TEXT                            | Bonificación, puntos, evento, etc. |
| valor        | NUMERIC                         | Valor del beneficio.               |
| motivo       | TEXT                            | Motivo otorgado.                   |

## 17. Tabla: promociones

| Campo        | Tipo      | Descripción                 |
| ------------ | --------- | --------------------------- |
| id_promocion | UUID (PK) | Identificador de promoción. |
| descripcion  | TEXT      | Detalle de la promoción.    |
| fecha_inicio | DATE      | Inicio.                     |
| fecha_fin    | DATE      | Fin.                        |
| roi          | NUMERIC   | Retorno estimado.           |

## 18. Tabla: reclamos

| Campo      | Tipo                            | Descripción                |
| ---------- | ------------------------------- | -------------------------- |
| id_reclamo | UUID (PK)                       | Identificador del reclamo. |
| id_cliente | UUID (FK → clientes.id_cliente) | Cliente afectado.          |
| id_pedido  | UUID (FK → pedidos.id_pedido)   | Pedido en disputa.         |
| motivo     | TEXT                            | Causa del reclamo.         |
| evidencia  | TEXT                            | Archivo o URL.             |
| estado     | TEXT                            | Recibido, Resuelto.        |

## 19. Tabla: incidencias

| Campo         | Tipo                            | Descripción                    |
| ------------- | ------------------------------- | ------------------------------ |
| id_incidencia | UUID (PK)                       | Identificador de incidencia.   |
| id_pedido     | UUID (FK → pedidos.id_pedido)   | Pedido involucrado.            |
| id_cliente    | UUID (FK → clientes.id_cliente) | Cliente afectado.              |
| tipo          | TEXT                            | Logística, calidad, comercial. |
| descripcion   | TEXT                            | Detalle del problema.          |
| evidencia     | TEXT                            | Adjuntos.                      |
| estado        | TEXT                            | Registrada, Resuelta.          |

## 20. Tabla: rutas

| Campo           | Tipo      | Descripción            |
| --------------- | --------- | ---------------------- |
| id_ruta         | UUID (PK) | Identificador de ruta. |
| zona_geografica | TEXT      | Zona de reparto.       |
| ventana_horaria | TEXT      | Horario asignado.      |
| nivel_urgencia  | TEXT      | Prioridad.             |
| carga_total     | NUMERIC   | Carga asignada.        |

## 21. Tabla: vehiculos

| Campo             | Tipo      | Descripción                 |
| ----------------- | --------- | --------------------------- |
| id_vehiculo       | UUID (PK) | Identificador del vehículo. |
| placa             | TEXT      | Placa del vehículo.         |
| chofer_asignado   | TEXT      | Nombre del chofer.          |
| cadena_frio       | BOOLEAN   | Si maneja cadena de frío.   |
| capacidad_peso    | NUMERIC   | Máximo peso soportado.      |
| capacidad_volumen | NUMERIC   | Máximo volumen soportado.   |


## 22. Tabla: sesiones 

| Campo        | Tipo                              | Descripción              |
| ------------ | --------------------------------- | ------------------------ |
| id_sesion    | UUID (PK)                         | Identificador de sesión. |
| id_empleado  | UUID (FK → empleados.id_empleado) | Usuario autenticado.     |
| token        | TEXT                              | Token de sesión.         |
| ip           | TEXT                              | IP del usuario.          |
| fecha_inicio | TIMESTAMP                         | Inicio de sesión.        |
| fecha_fin    | TIMESTAMP                         | Fin de sesión.           |

## 23. Tabla: tokens_api 

| Campo        | Tipo      | Descripción              |
| ------------ | --------- | ------------------------ |
| id_token_api | UUID (PK) | Identificador del token. |
| token        | TEXT      | Token de API.            |
| usuario      | TEXT      | Usuario relacionado.     |
| permisos     | TEXT      | Permisos asociados.      |
| expiracion   | TIMESTAMP | Fecha de expiración.     |
| estado       | TEXT      | Activo / Inactivo.       |

