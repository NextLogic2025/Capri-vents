<p align="right">
  <img src="https://i.postimg.cc/13qQdqZs/utpllogo.png" alt="Logo UTPL" width="150"/>
</p>

# Modelo de Datos

1. Visión General del Modelo
El sistema implementa una Arquitectura de Datos Distribuida basada en el patrón Database-per-Service (Base de Datos por Servicio). Se han definido 8 dominios de datos autónomos (Auth, User, Catalog, Zone, Order, Credit, Route, Billing), alojados en infraestructura Google Cloud SQL (PostgreSQL 17).

Esta arquitectura rompe con el modelo monolítico tradicional para garantizar la escalabilidad horizontal, el desacoplamiento funcional y la resiliencia operativa, asegurando que la gestión de pedidos no se vea comprometida por procesos auxiliares.

2. Alineación con DAMA-DMBOK (Data Management Body of Knowledge)
El diseño propuesto cumple con las Áreas de Conocimiento clave del DMBOK:

A. Arquitectura de Datos (Data Architecture)
Diseño: Se utiliza un enfoque descentralizado donde cada microservicio es "propietario" de sus datos.

Interoperabilidad: La integración no se realiza a nivel de base de datos (evitando el anti-patrón de base de datos compartida), sino mediante interfaces API y un modelo de consistencia eventual utilizando el patrón Transactional Outbox.

B. Gestión de Datos Maestros y de Referencia (MDM & Reference Data)
Golden Records: Los servicios CATALOG-SERVICE y USER-SERVICE actúan como la "Fuente de Verdad" (Golden Source) para productos y actores respectivamente.

Datos de Referencia: Se estandarizan los estados y tipos mediante el uso de ENUMs en PostgreSQL (ej. estado_pedido, tipo_cliente), garantizando la integridad semántica en todo el ecosistema.

C. Seguridad de Datos (Data Security)
Aislamiento: El uso de esquemas (schema app, schema audit) y roles de conexión específicos por servicio implementa el principio de "mínimo privilegio".

Protección: Las credenciales y tokens se almacenan utilizando algoritmos de hashing robustos (Argon2id), cumpliendo con estándares de privacidad modernos.

3. Alineación con ISO 8000 (Calidad de Datos)
El modelo de datos implementa controles técnicos nativos para satisfacer los principios de la norma ISO 8000-110 y siguientes:

A. Calidad Sintáctica y Semántica (ISO 8000-61)
Tipado Fuerte: Se hace uso estricto de tipos de datos PostgreSQL (UUID, TIMESTAMPTZ, NUMERIC) para evitar ambigüedades.

Restricciones (Constraints): Se implementan reglas de negocio directamente en la base de datos (CHECK items_pedido > 0, UNIQUE SKU, NOT NULL) para prevenir la entrada de "datos sucios" desde el origen.

B. Proveniencia y Trazabilidad (Data Provenance)
Auditoría Nativa: Cada tabla transaccional incluye metadatos obligatorios (creado_en, actualizado_en, creado_por, version). Esto permite reconstruir el linaje del dato: quién lo creó, cuándo y qué versión es, cumpliendo con los requisitos de trazabilidad.

C. Portabilidad de Datos
Estándares Abiertos: Al utilizar PostgreSQL y formatos JSONB para el intercambio de mensajes, se garantiza que los datos son independientes de la plataforma tecnológica (Vendor Lock-in reducido), facilitando su intercambio y archivo a largo plazo.

4. Conclusión Técnica
La arquitectura de datos de CAFRILOSA no solo soporta las operaciones transaccionales de venta y distribución, sino que establece un Gobierno de Datos implícito en su diseño.

Al separar los contextos (Microservicios), validar la calidad en la entrada (Constraints ISO 8000) y gestionar el ciclo de vida de la información mediante estándares (DMBOK), el sistema asegura una base sólida, auditable y escalable para la transformación digital de la empresa.
## Diagrama Entidad-Relación
# Cafrilosa_Auth
<img width="2052" height="1923" alt="Diagrama De Auth" src="https://github.com/user-attachments/assets/7ad394ac-8251-4c8b-8125-2ff8d57bc85b" />

# Cafrilosa_Catalogo
<img width="2052" height="1923" alt="Diagrama De Catalogo" src="https://github.com/user-attachments/assets/99091320-d305-447e-880d-29d3ccc40960" />

# Cafrilosa_Creditos
<img width="2052" height="1923" alt="Diagrama De Creditos" src="https://github.com/user-attachments/assets/bb54b657-9e83-478e-a746-cfe2618df540" />

# Cafrilosa_Pedidos
<img width="2052" height="1923" alt="Diagrama De Pedidos" src="https://github.com/user-attachments/assets/70b8443f-f470-4768-a501-2e505673c558" />

# Cafrilosa_Rutas
<img width="2052" height="1923" alt="Diagrama De Rutas" src="https://github.com/user-attachments/assets/05132808-bf5a-4c55-afcb-4a08ee249b74" />

# Cafrilosa_Usuarios
<img width="2052" height="1923" alt="Diagrama De Usuarios" src="https://github.com/user-attachments/assets/3c6a0dd3-7638-40e2-aa13-7cda69c97d34" />

# Cafrilosa_Zonas
<img width="2052" height="1923" alt="Diagrama De Zonas" src="https://github.com/user-attachments/assets/a988ec31-a2e9-4808-b13d-36894cc539e3" />
# Cafrilosa_Entregas
<img width="2052" height="1923" alt="Diagrama De Entregas" src="https://github.com/user-attachments/assets/6fc96f3d-986f-4478-8589-4d0649d7cdee" />

