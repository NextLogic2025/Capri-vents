<p align="right">
  <img src="https://i.postimg.cc/13qQdqZs/utpllogo.png" alt="Logo UTPL" width="150"/>
</p>

# Módulos y descripciones de Casos de Uso del sistema

Este documento resume y documenta los seis diagramas de casos de uso actualizados del sistema. Incluye: propósito del módulo, límite del sistema, actores, y la descripción de los casos de uso con sus relaciones <<include>>.

---
## ¿Qué es un diagrama de casos de uso?

Un diagrama de casos de uso (UML) muestra qué hace el sistema desde la perspectiva de sus actores (personas o sistemas externos). Permite acordar el alcance, comunicar requisitos y priorizar funcionalidades sin entrar en la implementación.
---
## Elementos básicos

* *Actor*: rol externo que interactúa con el sistema (persona o sistema).
* *Caso de uso*: funcionalidad que el sistema ofrece al actor.
* *Relaciones*:
    * *Asociación*: actor ↔ caso de uso (línea sólida).
    * **<<include>>**: un caso de uso principal requiere la ejecución de otro obligatorio (línea discontinua con flecha).

---

# 1) Módulo Gestión Cliente
## Registro y Mantenimeinto

<img width="1231" height="1734" alt="image" src="https://github.com/user-attachments/assets/1ee1a08c-993f-4b37-8a4e-0f5599bb2079" />

## Fidealizar Cliente
<img width="1231" height="1734" alt="image" src="https://github.com/user-attachments/assets/77679e05-6c09-4634-b860-e6f67e85c6b9" />


### Propósito
Gestionar el registro formal de clientes asegurando la integridad de datos fiscales y crediticios, así como ejecutar estrategias de fidelización mediante comunicación continua y programas de beneficios.

### Actores
* **Internos:** Personal (Agrupación de: Marketing, Supervisor de Ventas, Vendedor).
* **Externos:** Cliente, SRI (Servicio de Rentas Internas).
* **Sistemas:** Cafrilosa (ERP/Sistema central).

### Submódulos y Casos de Uso

| Submódulo | Caso de Uso Principal | Actores Principales | Incluye (`<<include>>`) |
| :--- | :--- | :--- | :--- |
| **Registro y Mantenimiento** | *Ingresar Datos del Cliente* | Cliente, SRI, Cafrilosa | • Ingresar datos (dirección, teléfono, correo, contacto).<br>• Verificar validez de información fiscal en el sistema SRI. |
| | *Clasificación de Cliente* | Cafrilosa (Sistema) | • Vincular Políticas de Crédito y Descuentos. |
| **Fidelizar Clientes** | *Mantener comunicación continua* | Personal (Mkt, Sup. Ventas, Vendedor), Cliente | • Enviar información sobre promociones y nuevos productos.<br>• Realizar seguimiento postventa para medir satisfacción. |
| | *Implementar programas de beneficios* | Personal (Mkt, Sup. Ventas, Vendedor), Cliente | • Aplicar bonificaciones por volumen de compra.<br>• Otorgar descuentos por antigüedad o cumplimiento de condiciones. |

---

# 2) Módulo Gestión de Pedidos

## Recepcción de Pedidos

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/038a5434-4f03-4bdf-9147-fa0bc53055ab" />

## Coordinar Pedido con Logística

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/3145718a-44d3-4aa0-bb63-008b32216530" />

## Controlar Pedido

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/80c8052d-e108-4516-9a67-e0b418c23f9d" />

### Propósito
Centralizar la recepción de órdenes de compra desde distintos canales, validando en tiempo real las condiciones comerciales (crédito/stock) y coordinando la logística interna hasta el cierre administrativo de la venta.

### Actores
* **Internos:** Personal (Agrupación de: Supervisor de Ventas, Gerente de Almacén).
* **Áreas de Soporte:** Logística, Almacén.
* **Externos:** Cliente.

### Submódulos y Casos de Uso

| Submódulo | Caso de Uso Principal | Actores Principales | Incluye (`<<include>>`) |
| :--- | :--- | :--- | :--- |
| **Recepción de Pedido** | *Tomar Pedido* | Personal (Sup. Ventas, Gte. Almacén), Logística | • Registrar productos, cantidades y condiciones de venta.<br>• Confirmar fechas de entrega disponibles según la programación logística. |
| | *Validar Condiciones de Venta* | Personal (Sup. Ventas, Gte. Almacén), Cliente | • Verificación de Stock, Precios y Descuentos.<br>• Confirmar crédito disponible antes de aprobar el pedido. |
| **Coordinar Pedido con Logística** | *Enviar pedido a planta o almacén* | Cliente*, Almacén | • Validar disponibilidad de stock o producción. |
| | *Confirmar fecha y modo de entrega* | Personal (Sup. Ventas, Gte. Almacén), Logística | • Programar reparto según ruta establecida. |
| **Controlar Pedido** | *Seguimiento del Status del Pedido* | Personal (Sup. Ventas, Gte. Almacén), Almacén | • Monitorear preparación, despacho y entrega.<br>• Informar retrasos o cambios al cliente o área comercial. |
| | *Ejecutar cierre administrativo del pedido* | Personal (Sup. Ventas, Gte. Almacén), Cliente | • Confirmar facturación y despacho finalizado.<br>• Registrar cierre del pedido en el ERP y CRM. |

*(Nota: El caso "Enviar pedido a planta" iniciado por el Cliente representa el flujo de autogestión o pedidos web que entran directo a la cola de almacén).*
---

# 3) Módulo Gestión de Entregas

## Preparar Pedido

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/ae9621af-0793-4ef0-89da-c8a096c48c3b" />

## Distribuir y entrgar pedido

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/96e64844-bf2f-45d0-bc68-8d25147881d8" />

## Gestionar Incidencias

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/c1494208-dd02-4d15-95ee-3b6e5efca1ff" />

### Propósito
Garantizar la integridad y puntualidad en el despacho de productos, asegurando la calidad (frescura/lote) desde la preparación hasta la entrega final y gestionando cualquier devolución o incidencia con el cliente.

### Actores
* **Internos:** Personal (Agrupación de: Supervisor de Ventas, Logística, Repartidor).
* **Áreas de Soporte:** Almacén.
* **Externos:** Cliente.

### Submódulos y Casos de Uso

| Submódulo | Caso de Uso Principal | Actores Principales | Incluye (`<<include>>`) |
| :--- | :--- | :--- | :--- |
| **Preparar Pedido** | *Verificar producto y lote* | Personal (Sup. Ventas, Logística), Almacén | • Confirmar frescura y fecha de vencimiento. |
| | *Embalar y documentar* | Personal (Sup. Ventas, Logística), Almacén | • Generar guías de despacho y etiquetas por Zona.<br>• Verificar Correspondencia entre Pedido y Carga. |
| **Distribuir y Entregar Pedido** | *Cargar y transportar productos* | Personal (Sup. Ventas, Repartidor), Sup. Ventas | • Asignar chofer según ruta. |
| | *Confirmar entrega al cliente* | Personal (Sup. Ventas, Repartidor), Cliente | • Obtener firma o confirmación de recepción.<br>• Registrar observaciones o rechazos parciales. |
| **Gestionar Incidencias** | *Reportar problemas* | Personal (Sup. Ventas, Repartidor), Cliente | • Asignar tipo de incidencia.<br>• Registrar evidencia y datos del pedido. |
| | *Coordinar solución* | Personal (Sup. Ventas, Repartidor), Cliente | • Emitir nota de crédito o Reposición.<br>• Analizar Causas Recurrentes y Mejorar el Proceso. |
---

# 4) Módulo Gestión de Cobros y Créditos

## Controlar Cuentas por cobrar 

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/e997fd39-9e92-43f6-8372-b2e8b194b74a" />

## Ejecutar Cobros

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/3b6472aa-97e6-4126-9618-e2a0f1c1ea05" />

## Gestionar Créditos comerciales

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/3a34dd1e-c66f-4c50-8053-ad187de605e2" />


### Propósito
Asegurar la liquidez de la empresa mediante el monitoreo de la cartera, la ejecución eficiente de rutas de cobranza y la evaluación rigurosa del riesgo crediticio para minimizar la incobrabilidad.

### Actores
* **Internos:** Personal (Agrupación de: Supervisor de Ventas, Vendedor).
* **Gerenciales:** Gerente de Ventas.
* **Soporte:** Logística.
* **Externos:** Cliente.

### Submódulos y Casos de Uso

| Submódulo | Caso de Uso Principal | Actores Principales | Incluye (`<<include>>`) |
| :--- | :--- | :--- | :--- |
| **Controlar Cuentas por Cobrar** | *Monitorear facturas pendientes* | Personal (Sup. Ventas), Gerente de Ventas | • Identificar facturas vencidas por rango de días.<br>• Evaluar riesgo de incobrabilidad. |
| | *Clasificar clientes por estado de pago* | Personal (Sup. Ventas), Gerente de Ventas | • Etiquetar cliente como Puntual, Atrasado o Moroso.<br>• Notificar estado y acciones sugeridas al Ejecutivo de Cuentas. |
| **Ejecutar Cobros** | *Coordinar rutas de cobranza* | Personal (Sup. Ventas, Vendedor), Logística | • Asignar cobros a vendedores o cobradores por zona.<br>• Priorizar visitas por antigüedad de deuda y riesgo. |
| | *Registrar pagos recibidos* | Personal (Sup. Ventas, Vendedor), Cliente | • Validar montos, medio de pago y fecha de operación.<br>• Emitir recibo oficial y actualizar estado de cuenta. |
| **Gestionar Créditos Comerciales** | *Evaluar solicitud de crédito* | Supervisor de Ventas | • Verificar historial y capacidad de pago.<br>• Definir límite y plazo autorizado según política. |
| | *Controlar cumplimiento de condiciones* | Supervisor de Ventas | • Revisar periodicidad de pagos y comportamiento de cartera.<br>• Actualizar límites según comportamiento. |

---

## 5) Módulo Postventa y Servicio al Cliente


## Atender Reclamos

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/d9ce87c7-bfd8-466d-837b-8ed869799400" />

## Dar seguimiento a la Satisfacción

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/2f3c9ef8-ae60-4cd7-bd22-add434d3a7ac" />

## Fidealizar de Froma Continua

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/8fbd5761-73ae-4544-8a52-7e04a3784187" />

### Propósito
Gestionar la resolución efectiva de reclamos para recuperar la confianza del cliente, medir sistemáticamente la satisfacción del servicio y ejecutar estrategias de retención para maximizar el ciclo de vida del cliente (LTV).

### Actores
* **Internos:** Supervisor de Ventas, Vendedor.
* **Externos:** Cliente.

### Submódulos y Casos de Uso

| Submódulo | Caso de Uso Principal | Actores Principales | Incluye (`<<include>>`) |
| :--- | :--- | :--- | :--- |
| **Atender Reclamos** | *Recibir reclamo por producto o servicio* | Supervisor de Ventas, Vendedor | • Identificar pedido y motivo del reclamo.<br>• Documentar evidencia del problema. |
| | *Resolver reclamo* | Supervisor de Ventas | • Aprobar o rechazar la devolución conforme a política y evidencia. |
| **Dar Seguimiento a la Satisfacción** | *Aplicar encuestas o llamadas de seguimiento* | Supervisor de Ventas, Cliente | • Programar envíos/llamadas en CRM.<br>• Recopilar respuestas (NPS/CSAT) y comentarios abiertos. |
| | *Analizar resultados y retroalimentar al equipo* | Supervisor de Ventas | • Consolidar métricas y detectar causas raíz de insatisfacción.<br>• Comunicar hallazgos y proponer acciones correctivas a Comercial/Operaciones. |
| **Fidelizar de Forma Continua** | *Implementar programas de retención* | Supervisor de Ventas, Cliente | • Definir criterios de elegibilidad.<br>• Asignar beneficios y notificar al cliente. |
| | *Ofertar beneficios y promociones para clientes activos* | Supervisor de Ventas, Cliente | • Aplicar descuentos o beneficios por volumen.<br>• Lanzar promociones periódicas segmentadas y medir su performance. |

---

## 6) Módulo Control y Análisis Comercial

## Medir desempeño Comercial

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/88a904d8-b4f9-4115-af34-f1473afffc9d" />

## Analizar Mercado y Promociones

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/e6827c7f-a9b3-474d-a909-d7e4114969be" />

## Reportar y Decidir Gerencialmente

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/b80a4ade-dfcb-4381-9096-44420c75b7b9" />

### Propósito
Proveer inteligencia de negocio mediante la medición de KPIs, el análisis de tendencias de mercado y la generación de reportes gerenciales que fundamenten la toma de decisiones estratégicas y la mejora continua.

### Actores
* **Internos:** Supervisor de Ventas.
* **Gerenciales:** Gerente.

### Submódulos y Casos de Uso

| Submódulo | Caso de Uso Principal | Actores Principales | Incluye (`<<include>>`) |
| :--- | :--- | :--- | :--- |
| **Medir Desempeño Comercial** | *Evaluar cumplimiento de metas* | Supervisor de Ventas, Gerente | • Comparar ventas reales vs. objetivos por zona/canal/producto.<br>• Medir rentabilidad por canal o producto. |
| | *Monitorear actividad de ventas* | Supervisor de Ventas, Gerente | • Seguimiento de visitas y pedidos por vendedor.<br>• Controlar la frecuencia de cobro y detectar desvíos. |
| **Analizar Mercado y Promociones** | *Identificar tendencias de consumo* | Supervisor de Ventas, Gerente | • Evaluar demanda de nuevos productos por segmento/canal.<br>• Monitorear movimientos de competencia. |
| | *Analizar eficiencia de promociones* | Supervisor de Ventas, Gerente | • Medir impacto en ventas.<br>• Ajustar estrategias comerciales. |
| **Reportar y Decidir Gerencialmente** | *Elaborar informes de resultados* | Supervisor de Ventas, Gerente | • Generar reporte de ventas por zona o canal.<br>• Analizar clientes inactivos y proponer acciones de reactivación. |
| | *Tomar decisiones estratégicas* | Supervisor de Ventas, Gerente | • Redefinir metas o políticas de precio según desempeño y mercado.<br>• Planificar nuevas campañas comerciales y asignar responsables/fechas. |

---


## 7) Módulo Gestión de Productos

### Diagrama: Registro y Mantenimiento
<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/ad484122-8b2b-4416-a3ea-875c578251cc" />

### Propósito
Proveer la funcionalidad para crear, modificar y gestionar el ciclo de vida de los productos en el catálogo del sistema.

### Actores
* Supervisor
* Almacen (Sistema)

### Submódulos y Casos de Uso

| Submódulo | Caso de Uso Principal | Actores Principales | Incluye (<<include>>) |
| :--- | :--- | :--- | :--- |
| *Registro y Mantenimiento* | *Registrar Productos* | Supervisor | • Ingresar datos básicos del producto<br>• Asignar precio y categoría inicial<br>• Definir condiciones de conservación<br>• Validar unicidad de código y guardar en Cafrilosa |
| | *Actualizar Productos* | Supervisor | • Modificar atributos existentes<br>• Propagar cambios a pedidos pendientes<br>• Registrar historial de modificaciones<br>• Notificar los cambios |
| | *Desactivar Producto* | Supervisor | • Generar alerta desactivación<br>• Archivar para auditoría<br>• Bloquear nuevos pedidos<br>• Marcar como inactivo |


### Diagrama: Control de Inventario y Monitoreo

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/da961d5e-e8c6-4120-9a5a-0ae37a511af2" />

### Propósito (Control de Inventario)
Gestionar los movimientos de stock, actualizar los niveles de inventario en tiempo real y definir los umbrales de reabastecimiento.

### Actores (Control de Inventario)
* Supervisor

### Submódulos y Casos de Uso (Control de Inventario)

| Submódulo | Caso de Uso Principal | Actores Principales | Incluye (<<include>>) |
| :--- | :--- | :--- | :--- |
| *Control de Inventario* | *Gestionar Movimientos de Stock*<br>(*Monitorear Niveles de Inventario*) | Supervisor | • Registrar Salida por Venta o Despacho<br>• Registrar Entrada de Productos |
| | *Actualizar Inventario Tiempo Real* | Supervisor | • Monitoreo en Tiempo Real<br>• Definir Umbrales Mínimos/Máximos |

---

### Diagrama: Monitoreo de Alertas

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/e2225f9f-e57e-4c68-9bc4-cf3802d24e43" />

### Propósito (Monitoreo y Alertas)
Controlar la trazabilidad de los productos por lote, gestionar sus fechas de vencimiento, analizar la rotación y generar alertas automáticas.

### Actores (Monitoreo y Alertas)
* Supervisor

### Submódulos y Casos de Uso (Monitoreo y Alertas)

| Submódulo | Caso de Uso Principal | Actores Principales | Incluye (<<include>>) |
| :--- | :--- | :--- | :--- |
| *Monitoreo y Alertas* | *Verificar Fechas de Vencimiento* | Supervisor | • Rastrear Trazabilidad por Lote<br>• Asociar Lotes a Pedidos Específicos<br>• Asignar Lote a Nuevos Ingresos |
| | *Analizar Rotación de Inventario*<br>(*Incluido en Gestionar Movimientos*) | Supervisor | • Calcular indice de rotación<br>• Generar recomendaciones<br>• Identificar baja rotación |
| | *Integrar Alertas Automáticas*<br>(*Extendido desde Actualizar Inventario*) | Supervisor | • Analizar Tendencias de Consumo<br>• (*Generar alertas de stock bajo/vencimiento*) |

