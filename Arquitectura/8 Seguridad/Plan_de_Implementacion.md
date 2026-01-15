# Plan de Implementación

## 1. Introducción

> **Documento de referencia técnica y operativa**
> Este Plan de Implementación funciona como guía de despliegue, documento de control y evidencia formal de buenas prácticas de ingeniería de software y DevOps.

El presente Plan de Implementación describe las actividades, recursos, estrategias y controles necesarios para desplegar en un entorno productivo la **Aplicación Cafrilosa**, una plataforma integral de gestión comercial basada en una arquitectura de microservicios, con clientes web y móviles.

El presente Plan de Implementación describe las actividades, recursos, estrategias y controles necesarios para desplegar en un entorno productivo la **Aplicación Cafrilosa**, una plataforma integral de gestión comercial basada en una arquitectura de microservicios, con clientes web y móviles.

El objetivo del plan es asegurar una transición controlada desde los entornos de desarrollo y prueba hacia producción, minimizando riesgos técnicos y operativos.

---

## 2. Alcance

Este plan abarca la implementación de:
* Infraestructura como Código (IaC): Despliegue de recursos GCP mediante módulos de Terraform (Networking, Database, Cloud Run, API Gateway, Automatización CI/CD).
* Base de datos y migraciones iniciales
* Backend: Despliegue de 6 microservicios NestJS (auth, usuarios, catalog, orders, ventas, warehouse).
* Frontend: Despliegue de SPA Web (Firebase Hosting) y App Móvil (Expo/EAS).
* Seguridad: Configuración de VPC, Cloud NAT, Secret Manager e IAM.

Quedan fuera del alcance:

* Desarrollo de nuevas funcionalidades
* Soporte evolutivo posterior a la etapa de estabilización

---

## 3. Arquitectura de Implementación

### 3.1 Vista Lógica

Arquitectura basada en **microservicios desacoplados**, expuestos mediante un API Gateway y protegidos por autenticación centralizada.

* Clientes Web y Mobile
* API Gateway / Endpoints: Único punto de acceso mediante API Gateway.
* Microservicios independientes
* Base de datos gestionada: DB Relacional centralizada con esquemas lógicos separados por servicio.
* Comunicación: REST sobre HTTPS.

### 3.2 Vista Física

* Cloud Run por microservicio
* Artifact Registry para imágenes Docker
* Cloud SQL con backups automáticos
* Logging, Monitoring y Tracing centralizados

La solución reside en la región us-east1 y consta de:
* Cómputo: Google Cloud Run (Serverless) para cada microservicio.
* Red: VPC Privada con Cloud NAT para salida segura a internet y VPC Access Connector para comunicación interna.
* Seguridad: Secret Manager para gestión de credenciales y Service Accounts con principio de mínimo privilegio.
---

La solución se implementa bajo una arquitectura distribuida:

* **Backend**: Microservicios NestJS contenerizados con Docker y desplegados en Cloud Run, Secret Manager para gestión de credenciales y Service Accounts con principio de mínimo privilegio.
* **Frontend Web**: Aplicación SPA desplegada como sitio estático.
* **Frontend Mobile**: Aplicación móvil compilada y distribuida mediante Expo.
* **Infraestructura**: Aprovisionada mediante Terraform.
* **Base de datos**: Inicializada mediante scripts SQL versionados / Cloud SQL (PostgreSQL 17) configurada con IP Privada exclusivamente..

---

## 4. Estrategia de Implementación

Se adopta una **implementación por fases**, permitiendo validar cada capa del sistema antes de avanzar a la siguiente.

Fases:

1. Aprovisionamiento de infraestructura
2. Despliegue de servicios backend
3. Inicialización de base de datos
4. Despliegue de frontend web
5. Publicación de aplicación móvil
6. Validación integral del sistema

---

## 5. Preparación del Entorno

### 5.1 Infraestructura

* Ejecución de scripts Terraform ubicados en `infra/terraform`
* Configuración de:

  * Networking
  * Cloud Run
  * Artifact Registry
  * API Gateway
  * Bases de datos

### 5.2 Variables de Entorno

* Definición de variables sensibles mediante Secret Manager
* Uso de archivos `.env.example` como referencia

---

## 6. Despliegue del Backend

Cada microservicio cuenta con:

* Dockerfile propio
* Pipeline CI/CD
* Configuración independiente de despliegue

Pasos:
1. Detecta cambios en la rama main.
2. Construye la imagen Docker.
3. Publica la imagen en Artifact Registry.
4. Despliega la revisión en Cloud Run con la Service Account asignada.

### Servicios incluidos:

* auth
* usuarios
* catalog
* orders
* ventas
* warehouse

---

## 7. Inicialización de Base de Datos

* Ejecución de scripts SQL:

  * `01-init-dbs.sql`
  * `04-init-catalog.sql`
  * `05-init-orders.sql`
  
* Validación de:

  * Esquemas
  * Relaciones
  * Datos maestros
  
* Dada la naturaleza de la infraestructura (BD vacía):
  * Esquema: Se delega al ORM (TypeORM) la sincronización inicial de tablas (synchronize: true para primer despliegue o ejecución de migraciones).
  * Datos Semilla: Ejecución controlada de scripts SQL (local-init) mediante conexión segura (Bastion o SQL Proxy) si es necesario.
---

## 8. Despliegue del Frontend

### 8.1 Frontend Web

* Build de producción con Vite
* Configuración de variables de entorno
* Despliegue a Firebase Hosting conectado al proyecto GCP

### 8.2 Frontend Mobile

* Configuración de entornos en Expo
* Compilación mediante EAS
* Distribución a usuarios finales

---

## 9. Pruebas Post-Implementación

* Smoke tests de servicios críticos
* Pruebas de integración end-to-end
* Validación de flujos por rol:

  * Supervisor
  * Vendedor
  * Cliente
  * Bodeguero
  * Transportista


### Matriz de Riesgos y Seguridad (Consolidada)

| Activo / Servicio | Amenaza / Riesgo | Nivel | Medida de Mitigación Implementada |
| :--- | :--- | :--- | :--- |
| **Base de Datos** | Acceso público no autorizado | **Alto** | Configuración de Cloud SQL con `ipv4_enabled = false` (Solo IP Privada). Acceso exclusivo vía VPC Connector. |
| **Microservicios** | Invocación directa desde internet | **Alto** | Eliminación de `allUsers`. Implementación de IAM `roles/run.invoker` restringido exclusivamente a la Service Account del API Gateway. |
| **Credenciales** | Fuga de contraseñas en código | **Alto** | Uso de Secret Manager. Las contraseñas no existen en texto plano en el repositorio ni en `tfvars`. |
| **Red** | Ataques a servidores backend | **Medio** | Uso de Cloud NAT para permitir actualizaciones del sistema sin exponer puertos de entrada a internet. |
| **Auth** | Suplantación de identidad | **Alto** | Implementación de JWT firmados. API Gateway valida la existencia del servicio antes de enrutar. |

---

## 10. Plan de Contingencia

En caso de fallas:

* Rollback de versiones en Cloud Run
* Restauración de backups de base de datos
* Deshabilitación temporal de frontend

---

## 11. Cronograma de Implementación

El cronograma propuesto considera una implementación progresiva, permitiendo validaciones intermedias y mitigación temprana de riesgos.

| Fase | Actividad                                             | Duración Estimada | Responsable         |
| ---- | ----------------------------------------------------- | ----------------- | ------------------- |
| 1    | Aprovisionamiento de infraestructura (Terraform, GCP) | 1 semana          | Infraestructura     |
| 2    | Configuración CI/CD y Artifact Registry               | 3 días            | DevOps              |
| 3    | Despliegue Auth y Usuarios                            | 3 días            | Backend             |
| 4    | Despliegue Catálogo                                   | 3 días            | Backend             |
| 5    | Despliegue Orders y Ventas                            | 3 días            | Backend             |
| 6    | Inicialización y validación de base de datos          | 2 días            | Backend             |
| 7    | Despliegue Frontend Web                               | 2 días            | Frontend            |
| 8    | Build y distribución App Móvil                        | 3 días            | Frontend            |
| 9    | Pruebas integrales y validación por roles             | 1 semana          | QA / Usuarios clave |
| 10   | Puesta en producción y monitoreo inicial              | 1 semana          | Todos               |

---

## 12. Análisis y Matriz de Riesgos de Seguridad

Esta sección presenta un análisis formal de riesgos, orientado a evaluación académica, identificando amenazas relevantes por microservicio, su impacto potencial y las medidas de mitigación propuestas.

### 12.1 Escala de Evaluación

* **Impacto**: Bajo (B), Medio (M), Alto (A)
* **Probabilidad**: Baja (B), Media (M), Alta (A)
* **Nivel de Riesgo**: resultado cualitativo de Impacto × Probabilidad

---

### 12.2 Microservicio Auth

| Riesgo                   | Impacto | Probabilidad | Nivel | Justificación Académica                              | Mitigación                                      |
| ------------------------ | ------- | ------------ | ----- | ---------------------------------------------------- | ----------------------------------------------- |
| Exposición de tokens JWT | A       | M            | Alto  | Compromete identidad y control de acceso del sistema | Tokens de corta duración, refresh tokens, HTTPS |
| Credenciales débiles     | A       | M            | Alto  | Facilita accesos no autorizados                      | Políticas de contraseñas y hashing seguro       |
| Fuerza bruta             | M       | M            | Medio | Riesgo común en sistemas de autenticación            | Rate limiting y auditoría                       |

---

### 12.3 Microservicio Usuarios

| Riesgo                         | Impacto | Probabilidad | Nivel | Justificación Académica                 | Mitigación                              |
| ------------------------------ | ------- | ------------ | ----- | --------------------------------------- | --------------------------------------- |
| Escalada de privilegios        | A       | B            | Medio | Viola el principio de control de acceso | RBAC estricto y validación por endpoint |
| Exposición de datos personales | A       | B            | Medio | Afecta confidencialidad e integridad    | Autorización, logs y cifrado            |

---

### 12.4 Microservicio Catálogo

| Riesgo                        | Impacto | Probabilidad | Nivel | Justificación Académica                | Mitigación                                |
| ----------------------------- | ------- | ------------ | ----- | -------------------------------------- | ----------------------------------------- |
| Manipulación de precios       | A       | B            | Medio | Impacto directo en procesos de negocio | Validaciones de negocio y control por rol |
| Acceso indebido a promociones | M       | B            | Bajo  | Riesgo limitado al ámbito comercial    | Separación de endpoints públicos/privados |

---

### 12.5 Microservicio Orders

| Riesgo                    | Impacto | Probabilidad | Nivel | Justificación Académica         | Mitigación                           |
| ------------------------- | ------- | ------------ | ----- | ------------------------------- | ------------------------------------ |
| Alteración de pedidos     | A       | B            | Medio | Afecta integridad transaccional | Estados inmutables y validaciones    |
| Repetición de solicitudes | M       | M            | Medio | Puede generar inconsistencias   | Idempotencia y control transaccional |

---

### 12.6 Microservicio Ventas

| Riesgo                          | Impacto | Probabilidad | Nivel | Justificación Académica          | Mitigación                      |
| ------------------------------- | ------- | ------------ | ----- | -------------------------------- | ------------------------------- |
| Inconsistencia pedidos/ventas   | A       | B            | Medio | Rompe trazabilidad del proceso   | Sincronización controlada       |
| Acceso a información financiera | A       | B            | Medio | Información sensible del negocio | Restricción por rol y auditoría |

---

### 12.7 Frontend Web y Mobile

| Riesgo                          | Impacto | Probabilidad | Nivel | Justificación Académica          | Mitigación                          |
| ------------------------------- | ------- | ------------ | ----- | -------------------------------- | ----------------------------------- |
| Exposición de tokens en cliente | A       | M            | Alto  | Compromete sesión del usuario    | Almacenamiento seguro y HTTPS       |
| Ataques XSS/CSRF                | M       | M            | Medio | Riesgo común en aplicaciones web | Sanitización y headers de seguridad |

---

### 12.8 Infraestructura y CI/CD

| Riesgo                 | Impacto | Probabilidad | Nivel | Justificación Académica        | Mitigación                     |
| ---------------------- | ------- | ------------ | ----- | ------------------------------ | ------------------------------ |
| Filtración de secretos | A       | B            | Medio | Impacto transversal al sistema | Secret Manager e IAM           |
| Accesos no autorizados | A       | B            | Medio | Compromete toda la plataforma  | Principio de mínimo privilegio |

---

### 12.2 Microservicio Usuarios

**Riesgos:**

* Escalada de privilegios
* Acceso no autorizado a datos personales

**Mitigaciones:**

* Guards de roles estrictos
* Validación de permisos por endpoint
* Logs de auditoría

---

### 12.3 Microservicio Catálogo

**Riesgos:**

* Manipulación de precios
* Acceso indebido a promociones

**Mitigaciones:**

* Autorización basada en roles
* Validación de integridad de datos
* Separación de endpoints públicos y privados

---

### 12.4 Microservicio Orders

**Riesgos:**

* Alteración de pedidos
* Repetición de solicitudes (replay attacks)

**Mitigaciones:**

* Estados inmutables de pedidos
* Validación transaccional
* Control de idempotencia

---

### 12.5 Microservicio Ventas

**Riesgos:**

* Inconsistencia entre pedidos y ventas
* Acceso a información financiera

**Mitigaciones:**

* Sincronización controlada con Orders
* Restricción de acceso por rol
* Logs y monitoreo continuo

---

### 12.6 Frontend Web y Mobile

**Riesgos:**

* Exposición de tokens en cliente
* Ataques XSS o CSRF

**Mitigaciones:**

* Almacenamiento seguro de tokens
* Uso de HTTPS obligatorio
* Sanitización de entradas

---

### 12.7 Infraestructura y CI/CD

**Riesgos:**

* Filtración de secretos
* Accesos no autorizados a la nube

**Mitigaciones:**

* Uso de Secret Manager
* IAM con principio de mínimo privilegio
* Auditoría de pipelines

---

## 13. Capacitación y Soporte Inicial

* Entrega de documentación funcional
* Capacitación por roles
* Soporte intensivo durante el período de estabilización

---

## 14. Criterios de Aceptación

La implementación se considera exitosa cuando:

* Todos los servicios están operativos
* Los usuarios pueden autenticarse y operar según su rol
* No existen errores críticos en producción
* El rendimiento es aceptable bajo carga normal

---

## 15. Responsables

* Equipo de Desarrollo: despliegue y validación técnica
* Equipo de Infraestructura: provisión y monitoreo
* Usuarios clave: validación funcional

---

## 16. Conclusión

Este plan proporciona una guía estructurada para la puesta en producción de la Aplicación Cafrilosa, garantizando control, trazabilidad y reducción de riesgos durante el proceso de implementación.
