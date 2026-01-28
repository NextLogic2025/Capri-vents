# 🏛️ Arquitectura Técnica del Sistema Cafrisales

Este documento proporciona un desglose profundo de la arquitectura de despliegue del ecosistema **Cafrisales**. El sistema implementa una arquitectura de **Microservicios Serverless** distribuida en **Google Cloud Platform (GCP)**, orquestada mediante Infraestructura como Código (IaC) con **Terraform**.

El diseño prioriza el desacoplamiento estricto, la seguridad perimetral y la escalabilidad automática.

https://drive.google.com/file/d/1Z7Gn6rGeCyA8bditPT4BQPkKVCqUwJNH/view?usp=sharing

---

## 1. Capa de Cliente y Entrada (Frontend & Gateway)
Esta capa es el único punto de contacto con el mundo exterior. Gestiona la presentación, la seguridad TLS y el enrutamiento de tráfico.

<img width="4204" height="3692" alt="image" src="https://github.com/user-attachments/assets/123ae334-7fbf-41a0-8b56-32b3ecfb69d0" />

*(Referencia visual: Clientes, API Manager Container y Envoy Proxy)*

### 📱 Dispositivos Cliente
* **Mobile Device (Android Runtime - ART):**
    * **Tecnología:** React Native (Expo).
    * **Artefacto:** Archivo binario `.apk` ejecutado sobre la máquina virtual ART de Android.
    * **Comunicación:** Realiza peticiones asíncronas seguras vía **HTTPS (Puerto 443)** hacia el Gateway.
* **Web Client (Admin UI):**
    * **Tecnología:** React.js.
    * **Hosting:** Alojado en **Firebase Hosting**, aprovechando la red CDN global de Google para entrega de activos estáticos (`html`, `css`, `js`) con baja latencia.

### 🛡️ API Manager Container (Google Cloud API Gateway)
Actúa como la "puerta frontal" del backend. Ningún microservicio expone su IP pública directamente; todo pasa por aquí.
* **OpenAPI 3.0.4 (YAML):** Contrato estricto que define rutas, verbos HTTP y esquemas de validación de datos antes de procesar la petición.
* **Envoy Proxy (Runtime):** El núcleo del Gateway. Un proxy de alto rendimiento que intercepta el tráfico entrante (Port 443), gestiona SSL/TLS y realiza el balanceo de carga hacia los servicios Cloud Run.
* **Service Control API:** Módulo de telemetría que reporta métricas, logs de acceso y verifica la validez de las API Keys en tiempo real.

---

## 2. Capa de Lógica de Negocio (Microservicios Serverless)
El núcleo del procesamiento reside en contenedores *stateless* ejecutados en **Google Cloud Run**.

<img width="11688" height="2920" alt="image" src="https://github.com/user-attachments/assets/af856dd0-47ae-4287-a9d0-e456b8d6fac1" />

*(Referencia visual: Controladores de Cloud Run y Lógica Interna)*

### ☁️ Cloud Run Services
Cada dominio de negocio es un servicio aislado que escala automáticamente de 0 a N instancias según la demanda (CPU/Memoria).

* **Auth Service:** Gestiona la emisión y validación de tokens JWT.
* **Catalog Service:** Mantiene el estado de productos e inventario.
* **Zone Service:** Procesa lógica geoespacial para determinar zonas de venta.
* **Order & Credit Services:** Gestionan transacciones y estados financieros.
* **Delivery & Route Services:** Optimizan la logística de entrega.
* **Notification Service:**
    * **Componente Interno:** `NotificationController`.
    * Orquesta el envío de alertas push/email a los usuarios.
* **Componentes Internos Específicos:**
    * Algunos servicios incluyen generadores especializados (ej. `XML Builder` y `XAdES Signer` para facturación electrónica) encapsulados dentro del contenedor.

---

## 3. Capa de Red y Persistencia (Networking & Data)
Esta capa establece un perímetro de seguridad alrededor de los datos, haciéndolos inaccesibles desde internet pública.

<img width="9328" height="3452" alt="image" src="https://github.com/user-attachments/assets/87b00ebf-f349-4af6-bd74-50093be87d67" />

*(Referencia visual: VPC Access Connector, Traffic Bridge y Esquema de BD)*

### 🌉 Serverless VPC Access (El Puente)
Dado que Cloud Run es un servicio externo a la VPC, se utiliza este componente para "tunelizar" el tráfico hacia la red privada.
* **Subnet Router:** Enrutador virtual (rango `192.168.40.0/28`) que direcciona los paquetes desde los contenedores.
* **Traffic Bridge:** Componente que encapsula las peticiones y las transporta a través de la VPC (`cafrisales-vpc`) hacia la instancia de base de datos.
* **Connector Instance:** Instancias `e2-micro` gestionadas que mantienen el túnel abierto y escalan según el throughput de red.

### 💾 Database System (Cloud SQL)
* **Motor:** PostgreSQL 17 (Enterprise Edition).
* **Seguridad:** Configurada exclusivamente con **IP Privada**. Solo accesible vía el conector VPC.
* **Arquitectura de Datos:** *Logical Separation*.
    * Aunque residen en una instancia física (`Instance Master`), cada servicio posee su propia base de datos lógica (`auth_service_db`, `user_service_db`, etc.), impidiendo que un servicio acceda a las tablas de otro (Desacoplamiento).

---

## 4. Pipeline de CI/CD y Construcción
El ciclo de vida del desarrollo está automatizado mediante disparadores (Triggers) y construcción de contenedores.

<img width="10448" height="4716" alt="image" src="https://github.com/user-attachments/assets/f022eecb-ed9d-45b7-b49d-67858247b807" />

*(Referencia visual: Cloud Build Triggers y Docker Pool)*

### 🏗️ Cloud Build Triggers
Monitorizan el repositorio en busca de cambios (Push to `main`). Existe un Trigger independiente por cada microservicio (`Trigger Auth`, `Trigger Catalog`, etc.) para asegurar que solo se reconstruye lo que cambió.

### 🐳 Docker Pool (Artifact Registry)
* **Docker Images:** El resultado del proceso de build son imágenes inmutables etiquetadas (ej. `auth-image:latest`).
* Estas imágenes se almacenan en el registro privado y son las que Cloud Run descarga para desplegar nuevas versiones.

---

## 5. Gestión de Código Fuente (Source Code)
El origen de la verdad para toda la infraestructura y lógica.

<img width="3648" height="2420" alt="image" src="https://github.com/user-attachments/assets/1b0f24bb-e54c-45d5-ad3b-1d223789d175" />

*(Referencia visual: GitHub, Webhooks y External Cloud)*

* **GitHub Repositories:**
    * `backendCafrisales`: Contiene el código fuente de los microservicios (Python/Node) y la infraestructura Terraform.
    * `frontendCafrisales`: Contiene el código React y React Native.
* **External Cloud (Expo EAS):** Servicio externo conectado al repo frontend encargado de compilar los binarios nativos (`.apk`) para Android, ya que este proceso requiere entornos de compilación móvil específicos.
* **Webhooks:** Notifican a Cloud Build y a Firebase Hosting cuando hay una nueva versión lista para desplegar.

---

## 📂 Estructura del Proyecto (Infraestructura)
La organización del código Terraform (`/infra/terraform`) refleja directamente la arquitectura mencionada:

![Estructura de Carpetas](./docs/images/image_ce55b7.png)

* `api_gateway/`: Configuración del OpenAPI y Envoy Proxy (Capa 1).
* `cloud_run/`: Definición de los servicios contenedores (Capa 2).
* `database/`: Instancia SQL, usuarios y bases de datos lógicas (Capa 3).
* `networking/`: VPC, Subnets y Serverless Connector (Capa 3).
* `cloud_build/` & `artifact_registry/`: Configuración del Pipeline CI/CD (Capa 4).
* `firebase/`: Hosting web (Capa 1).


---

## 🔄 Pipeline de Automatización (CI/CD)
El flujo de desarrollo está completamente automatizado utilizando **Google Cloud Build**, asegurando entregas rápidas y consistentes.

### ⚙️ Flujo de Trabajo
1.  **Source Code:** El código se aloja en repositorios de GitHub (`frontendCafrisales` y `backendCafrisales`).
2.  **Triggers:** Al detectar un `Push` a la rama `main`, Cloud Build activa los disparadores correspondientes.
3.  **Build:**
    * Se compilan las imágenes Docker para cada microservicio modificado.
    * Se ejecutan pruebas unitarias (si aplica).
4.  **Registry:** Las imágenes construidas se almacenan en el **Container Registry** (o Artifact Registry).
5.  **Deploy:**
    * **Backend:** Cloud Build despliega las nuevas imágenes en **Cloud Run** (Actualización de revisión).
    * **Frontend:** Se despliegan los activos estáticos optimizados en **Firebase Hosting**.

---

## 🛠️ Stack Tecnológico

| Componente | Tecnología |
| :--- | :--- |
| **Infraestructura como Código** | Terraform |
| **Nube Pública** | Google Cloud Platform (GCP) |
| **Contenedores** | Docker |
| **Orquestación Serverless** | Cloud Run (Knative managed) |
| **Base de Datos** | PostgreSQL 17 (Cloud SQL) |
| **Definición de API** | REST (OpenAPI 3.0) |
| **Frontend Web** | React.js |
| **Frontend Móvil** | React Native (Expo) |
| **Lenguajes Backend** | Python / Node.js (según microservicio) |
