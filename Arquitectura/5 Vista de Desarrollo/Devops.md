# Pipeline DevOps - Herramientas por Fase

## 1. FASE CODE (Desarrollo)

### Herramientas de Control de Versión y Colaboración
- **GitHub**: Sistema de control de versiones distribuido para gestionar el código fuente
- **VS Code**: Editor de código principal para el desarrollo de aplicaciones

### Herramientas de Calidad de Código
- **ESLint**: Herramienta de linting para identificar y reportar patrones problemáticos en JavaScript
- **Prettier**: Formateador de código automático para mantener consistencia de estilo
- **Husky**: Framework para gestionar Git hooks
- **Lint-staged**: Ejecuta linters en archivos staged de Git

### Stack Tecnológico
- **Node.js**: Runtime de JavaScript para el backend
- **React Native**: Framework para desarrollo de aplicaciones móviles
- **Antigravity**: Herramienta de desarrollo personalizada

---

## 2. FASE BUILD (Compilación y Construcción)

### Herramientas de Compilación
- **Cloud Build**: Servicio de compilación automatizado de Google Cloud
- **Fastlane**: Herramienta para automatizar compilaciones y pruebas de aplicaciones móviles
- **Artifact Registry**: Registro de contenedores y artefactos para almacenar imágenes compiladas

### Herramientas de Emulación Local
- **GCP Local Emulators**: Emuladores locales de servicios de Google Cloud para desarrollo
- **Lint-staged**: Valida código durante la construcción

---

## 3. FASE TEST (Pruebas)

### Frameworks de Testing
- **Jest**: Framework de testing unitario y de integración para JavaScript
- **Cypress**: Framework de testing end-to-end (E2E) para aplicaciones web

### Herramientas de Validación
- **Postman**: Plataforma para testing de APIs REST
- **CV**: Herramienta de validación personalizada

### Registro de Artefactos
- **Cloud Build**: Ejecuta suites de pruebas automatizadas
- **Artifact Registry**: Almacena artefactos de pruebas

---

## 4. FASE DEPLOY (Despliegue)

### Servicios de Computación
- **Cloud Run**: Plataforma serverless para ejecutar contenedores

### Gestión de API y Acceso
- **Cloud Endpoints**: Servicio para exponer APIs backend de forma segura
- **API Gateway**: Gateway de API para enrutar y controlar acceso a servicios
- **Cloud Identity Platform**: Gestión centralizada de identidades y autenticación

### Bases de Datos
- **Cloud SQL (PostgreSQL)**: Base de datos relacional administrada
- **Cloud Memorystore (Redis)**: Servicio de caché en memoria para sesiones y datos

---

## 5. FASE MONITOR (Monitoreo y Observabilidad)

### Logging y Monitoreo
- **Cloud Logging**: Agregación centralizada de logs de aplicaciones
- **Cloud Monitoring**: Monitoreo de métricas, alertas y dashboards
- **Sentry**: Plataforma de error tracking y performance monitoring

### Control de Versiones y Release
- **GitHub Tags**: Etiquetado de versiones y releases en repositorio
- **GitHub**: Gestión de cambios y changelog

---

## Flujo Completo del Pipeline

```
CODE → BUILD → TEST → DEPLOY → MONITOR → (Feedback a CODE)
```

### Ciclo Continuo
1. **Desarrolladores** trabajan en VS Code usando Git/GitHub
2. **ESLint y Prettier** validan calidad de código automáticamente
3. **Cloud Build** compila y empaqueta aplicaciones
4. **Jest, Cypress y Postman** ejecutan suites de pruebas
5. **Cloud Run** despliega contenedores en producción
6. **Cloud Logging y Sentry** monitorizan aplicación en tiempo real
7. Los **errores y métricas** retroalimentan el ciclo de desarrollo
