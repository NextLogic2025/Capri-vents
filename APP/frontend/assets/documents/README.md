# Documentos PDF - Instrucciones

## 📋 Archivos Requeridos

Para que la funcionalidad de visualización de PDFs funcione correctamente, necesitas proporcionar las URLs de tus documentos:

1. **Términos y Condiciones**
2. **Política de Privacidad**

## 🔧 Configuración

### Opción 1: Usar Google Drive (Recomendado)

Esta es la forma más fácil y confiable:

1. **Sube tus PDFs a Google Drive**
2. **Haz clic derecho en el archivo** → "Obtener enlace"
3. **Cambia el permiso a "Cualquier persona con el enlace"**
4. **Copia el ID del archivo** de la URL. Por ejemplo:
   - URL: `https://drive.google.com/file/d/1ABC123xyz456/view?usp=sharing`
   - ID: `1ABC123xyz456`
5. **Abre el archivo** `frontend/components/PDFViewerModal.js`
6. **Reemplaza las URLs** en la configuración:

```javascript
const pdfConfig = {
  terminos: {
    title: 'Términos y Condiciones',
    uri: 'https://drive.google.com/file/d/TU_ID_AQUI/preview',
  },
  privacidad: {
    title: 'Política de Privacidad',
    uri: 'https://drive.google.com/file/d/TU_ID_AQUI/preview',
  },
};
```

### Opción 2: Usar un Servidor Propio

Si tienes tus PDFs alojados en un servidor:

```javascript
const pdfConfig = {
  terminos: {
    title: 'Términos y Condiciones',
    uri: 'https://tu-servidor.com/documentos/terminos.pdf',
  },
  privacidad: {
    title: 'Política de Privacidad',
    uri: 'https://tu-servidor.com/documentos/privacidad.pdf',
  },
};
```

### Opción 3: Usar Dropbox

1. Sube tus PDFs a Dropbox
2. Obtén el enlace compartido
3. Cambia `www.dropbox.com` por `dl.dropboxusercontent.com` en la URL
4. Usa esa URL en la configuración

## 🎯 Ubicación del Archivo a Modificar

**Archivo:** `c:\Users\Denis\Desktop\Capri-vents\APP\frontend\components\PDFViewerModal.js`

**Líneas a modificar:** Aproximadamente líneas 24-44 (la sección `pdfConfig`)

## ✅ Verificación

Después de configurar las URLs:

1. **Reinicia el servidor Expo** (presiona `r` en la terminal)
2. **Navega a la pantalla de registro**
3. **Haz clic en "Términos y Condiciones"** → Debe abrir el modal con tu PDF
4. **Haz clic en "Política de Privacidad"** → Debe abrir el modal con tu PDF
5. **Verifica que el botón de cerrar funcione**

## 🚨 Solución de Problemas

### El PDF no se carga

- Verifica que la URL sea pública y accesible
- Asegúrate de que el enlace termine en `.pdf` o use el formato de Google Drive correcto
- Revisa la consola para ver mensajes de error

### El modal no se abre

- Verifica que `react-native-webview` esté instalado correctamente
- Reinicia el servidor Expo

### Error en dispositivos móviles

- Asegúrate de que la URL sea HTTPS (no HTTP)
- Verifica que el PDF no sea demasiado grande (máximo 5MB recomendado)

## 📝 Notas Importantes

- **URLs públicas**: Los PDFs deben estar en URLs públicas accesibles desde internet
- **HTTPS requerido**: Las URLs deben usar HTTPS para funcionar en producción
- **Tamaño del archivo**: Mantén los PDFs lo más ligeros posible (2-3 MB máximo)
- **Formato**: Los archivos deben ser PDFs válidos

## 🔄 Alternativa: Archivos Locales (Avanzado)

Si prefieres usar archivos locales en lugar de URLs, necesitarás:
1. Instalar `expo-file-system` y `expo-document-picker`
2. Modificar el componente para usar archivos locales
3. Configurar el bundler de Expo para incluir los PDFs

Esta opción es más compleja y no se recomienda para principiantes.
