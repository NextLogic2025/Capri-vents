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

## 1) Módulo Gestión Cliente

<img width="1231" height="1734" alt="image" src="https://github.com/user-attachments/assets/1f0621b9-2006-488c-93ea-d2ec996f1f1c" />


### Propósito
Gestionar el ciclo de vida del cliente, desde la identificación de oportunidades y prospección, hasta su registro formal, clasificación y fidelización continua.

### Actores
* Personal, Supervisor de Ventas, Analista Comercial, Vendedor, Marketing
* Cafrilosa (sistema/ente externo), SRI (ente fiscal externo), Cliente

### Submódulos y Casos de Uso

| Submódulo | Caso de Uso Principal | Actores Principales | Incluye (<<include>>) |
| :--- | :--- | :--- | :--- |
| *Prospectar Clientes* | *Identificar nuevos clientes potenciales* | Personal, Sup. Ventas, Analista, Cafrilosa | • Analizar el mercado local y la competencia.<br>• Recibir referencias de clientes actuales. |
| | *Evaluar viabilidad comercial* | Personal, Sup. Ventas, Analista | • Revisar capacidad de pago.<br>• Validar requisitos legales o sanitarios. |
| *Registrar y Clasificar* | *Ingresar Datos del Cliente* | Cliente, Personal, Sup. Ventas, Analista | • Verificar validez fiscal (SRI).<br>• Ingresar datos (razón social, dirección, etc.). |
| | *Clasificar cliente según perfil comercial* | Personal, Sup. Ventas, Analista, Cafrilosa | • Asignar canal de venta (mayorista, minorista).<br>• Categorizar según tamaño y frecuencia. |
| *Fidelizar Clientes* | *Mantener comunicación continua* | Personal, Sup. Ventas, Vendedor, Mkt, Cliente | • Enviar información sobre promociones.<br>• Realizar seguimiento postventa. |
| | *Implementar programas de beneficios* | Personal, Sup. Ventas, Vendedor, Marketing | • Aplicar bonificaciones por volumen.<br>• Otorgar descuentos por antigüedad. |

---

## 2) Módulo Gestión de Pedidos

<img width="1231" height="1778" alt="image" src="https://github.com/user-attachments/assets/fe8bd66b-e587-4ffb-8829-27154243dded" />


### Propósito
Controlar la toma de pedidos por diversos canales, coordinar su preparación con logística y realizar el seguimiento hasta el cierre administrativo.

### Actores
* Personal, Supervisor de Ventas, Gerente de Almacén
* Logística, Cliente, Almacén, Repartidor

### Submódulos y Casos de Uso

| Submódulo | Caso de Uso Principal | Actores Principales | Incluye (<<include>>) |
| :--- | :--- | :--- | :--- |
| *Recibir Pedido* | *Tomar pedido durante visita o por canal digital* | Personal, Sup. Ventas, Gte. Almacén, Personal (recepción) | • Registrar productos y cantidades en sistema.<br>• Confirmar fechas de entrega disponibles. |
| | *Validar condiciones comerciales* | Personal, Sup. Ventas, Gte. Almacén, Logística, Cliente | • Verificar precios vigentes y descuentos.<br>• Confirmar crédito disponible. |
| *Coordinar Pedido* | *Enviar pedido a planta o almacén* | Cliente*, Almacén, Repartidor | • Priorizar pedidos según zona/urgencia.<br>• Validar disponibilidad de stock o capacidad. |
| | *Confirmar fecha y modo de entrega* | Personal, Sup. Ventas, Gte. Almacén, Almacén, Repartidor, Cliente | • Programar reparto según ruta.<br>• Confirmar al cliente la fecha estimada. |
| *Controlar Pedido* | *Realizar seguimiento del estado del pedido* | Personal, Sup. Ventas, Gte. Almacén, Almacén | • Verificar preparación, empaque y despacho.<br>• Informar retrasos o cambios al cliente. |
| | *Ejecutar cierre administrativo del pedido* | Personal, Sup. Ventas, Gte. Almacén, Cliente | • Confirmar facturación y despacho finalizado.<br>• Registrar cierre del pedido en ERP/CRM. |
(Nota: En el diagrama, "Cliente" inicia "Enviar pedido a planta", lo cual puede representar pedidos de autogestión).

---

## 3) Módulo Gestión de Entregas

<img width="1254" height="1664" alt="image" src="https://github.com/user-attachments/assets/f474002d-f23f-4585-91f0-0607098edc59" />


### Propósito
Asegurar la correcta preparación, embalaje, transporte y entrega final de los productos, gestionando cualquier incidencia en el proceso.

### Actores
* Personal, Supervisor de Ventas, Repartidor
* Almacén, Cliente

### Submódulos y Casos de Uso

| Submódulo | Caso de Uso Principal | Actores Principales | Incluye (<<include>>) |
| :--- | :--- | :--- | :--- |
| *Preparar Pedido* | *Verificar producto y lote* | Personal, Sup. Ventas, Repartidor, Almacén | • Confirmar frescura y fecha de vencimiento.<br>• Comprobar temperatura/condición. |
| | *Embalar y documentar* | Personal, Sup. Ventas, Repartidor | • Generar guías de despacho.<br>• Etiquetar bultos por cliente o zona. |
| *Distribuir y Entregar* | *Cargar y transportar productos* | Personal, Sup. Ventas, Repartidor, Personal (logística) | • Asignar vehículo y chofer según ruta.<br>• Respetar cadena de frío durante reparto. |
| | *Confirmar entrega al cliente* | Personal, Sup. Ventas, Repartidor, Cliente | • Obtener firma o confirmación de recepción.<br>• Registrar observaciones o rechazos. |
| *Gestionar Incidencias* | *Reportar problemas de entrega* | Personal, Sup. Ventas, Repartidor, Cliente | • Clasificar incidente.<br>• Registrar evidencia y datos en el sistema. |
| | *Coordinar solución* | Personal, Sup. Ventas, Repartidor | • Generar nota de crédito o programar reposición.<br>• Escalar casos recurrentes a supervisión. |

---

## 4) Módulo Gestión de Cobros y Créditos

<img width="1282" height="1664" alt="image" src="https://github.com/user-attachments/assets/0ee6519f-8f07-46a2-9616-d12417bdceb0" />


### Propósito
Administrar la cartera de clientes, ejecutar la cobranza de manera efectiva y evaluar el otorgamiento de créditos comerciales.

### Actores
* Personal, Supervisor de Ventas, Vendedor
* Gerente de Ventas, Logística, Cliente

### Submódulos y Casos de Uso

| Submódulo | Caso de Uso Principal | Actores Principales | Incluye (<<include>>) |
| :--- | :--- | :--- | :--- |
| *Controlar Cuentas por Cobrar* | *Monitorear facturas pendientes* | Personal, Sup. Ventas, Personal (admin) | • Identificar facturas vencidas por rango.<br>• Evaluar riesgo de incobrabilidad. |
| | *Clasificar clientes por estado de pago* | Personal, Sup. Ventas, Gte. Ventas | • Etiquetar cliente (Puntual, Atrasado, Moroso).<br>• Notificar estado al Ejecutivo de Cuentas. |
| *Ejecutar Cobros* | *Coordinar rutas de cobranza* | Personal, Sup. Ventas, Vendedor, Logística | • Asignar cobros a vendedores por zona.<br>• Priorizar visitas por antigüedad de deuda. |
| | *Registrar pagos recibidos* | Personal, Sup. Ventas, Vendedor, Cliente | • Validar montos, medio de pago y fecha.<br>• Emitir recibo oficial y actualizar cuenta. |
| *Gestionar Créditos* | *Evaluar solicitud de crédito* | Supervisor de Ventas | • Verificar historial y capacidad de pago.<br>• Definir límite y plazo autorizado. |
| | *Controlar cumplimiento de condiciones* | Supervisor de Ventas | • Revisar periodicidad de pagos.<br>• Actualizar límites según comportamiento. |

---

## 5) Módulo Postventa y Servicio al Cliente

<img width="1098" height="1664" alt="image" src="https://github.com/user-attachments/assets/cfdb8065-ca52-42fa-a5c6-a623f4ef990c" />


### Propósito
Atender reclamos de manera eficiente, medir la satisfacción del cliente y ejecutar acciones de fidelización continua.

### Actores
* Supervisor de Ventas
* Vendedor, Cliente

### Submódulos y Casos de Uso

| Submódulo | Caso de Uso Principal | Actores Principales | Incluye (<<include>>) |
| :--- | :--- | :--- | :--- |
| *Atender Reclamos* | *Recibir reclamo por producto o servicio* | Sup. Ventas, Vendedor | • Identificar pedido y motivo del reclamo.<br>• Documentar evidencia del problema. |
| | *Resolver reclamo* | Sup. Ventas | • Aprobar o rechazar devolución.<br>• Coordinar reposición o emitir nota de crédito. |
| *Dar Seguimiento a la Satisfacción* | *Aplicar encuestas o llamadas* | Sup. Ventas, Cliente | • Programar envíos/llamadas en CRM.<br>• Recopilar respuestas (NPS/CSAT) y comentarios. |
| | *Analizar resultados y retroalimentar* | Sup. Ventas | • Consolidar métricas y detectar causas raíz.<br>• Comunicar hallazgos y proponer correctivos. |
| *Fidelizar de Forma Continua* | *Implementar programas de retención* | Sup. Ventas, Cliente | • Definir criterios de elegibilidad.<br>• Asignar beneficios y notificar al cliente. |
| | *Ofertar beneficios y promociones* | Sup. Ventas | • Aplicar descuentos o beneficios por volumen.<br>• Lanzar promociones periódicas y medir performance. |

---

## 6) Módulo Control y Análisis Comercial

<img width="1104" height="1664" alt="image" src="https://github.com/user-attachments/assets/d9a798a2-2f17-4ae8-bf59-e94a4a7b93b1" />

### Propósito
Proveer herramientas para la medición del desempeño de ventas, análisis de mercado y toma de decisiones estratégicas gerenciales.

### Actores
* Supervisor de Ventas
* Gerente

### Submódulos y Casos de Uso

| Submódulo | Caso de Uso Principal | Actores Principales | Incluye (<<include>>) |
| :--- | :--- | :--- | :--- |
| *Medir Desempeño Comercial* | *Evaluar cumplimiento de metas* | Sup. Ventas, Gerente | • Comparar ventas reales vs. objetivos.<br>• Medir rentabilidad por canal o producto. |
| | *Monitorear actividad de ventas* | Sup. Ventas, Gerente | • Seguimiento de visitas y pedidos por vendedor.<br>• Controlar frecuencia de cobro y detectar desvíos. |
| *Analizar Mercado y Promociones* | *Identificar tendencias de consumo* | Sup. Ventas, Gerente | • Evaluar demanda de nuevos productos.<br>• Monitorear movimientos de competencia. |
| | *Analizar eficiencia de promociones* | Sup. Ventas, Gerente | • Medir impacto en ventas.<br>• Ajustar estrategias comerciales. |
| *Reportar y Decidir Gerencialmente* | *Elaborar informes de resultados* | Sup. Ventas, Gerente | • Generar reporte de ventas por zona/canal.<br>• Analizar clientes inactivos y proponer reactivación. |
| | *Tomar decisiones estratégicas* | Sup. Ventas, Gerente | • Redefinir metas o políticas de precio.<br>• Planificar nuevas campañas y asignar responsables. |


---


## 7) Módulo Gestión de Productos

### Diagrama: Registro y Mantenimiento

<img width="1591" height="1600" alt="image" src="https://github.com/user-attachments/assets/b972eae4-ba3c-43ce-a586-662e7bf295c9" />

<img width="1600" height="1340" alt="image" src="https://github.com/user-attachments/assets/da961d5e-e8c6-4120-9a5a-0ae37a511af2" />

<img width="1503" height="1600" alt="image" src="https://github.com/user-attachments/assets/e2225f9f-e57e-4c68-9bc4-cf3802d24e43" />


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
