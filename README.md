# Asesoría y Defensa Laboral

Sitio web corporativo de una sola página (Next.js 16 + React 19 + Tailwind CSS 4)
para el despacho **Asesoría y Defensa Laboral**, con panel administrador para editar
el contenido en vivo, sin necesidad de tocar código.

## Contenido

- Landing de una sola página: banner/carrusel, nosotros (Hector y Fernanda),
  servicios, casos de éxito/testimonios con calificación, blog/foro con "me gusta",
  preguntas frecuentes, formulario de contacto y chatbot flotante propio que
  termina en WhatsApp.
- Scripts de **ManyChat** ya incrustados en el sitio (`src/app/layout.tsx`),
  listos para cuando se publique el widget desde el panel de ManyChat. Mientras
  tanto, el chatbot flotante propio sigue visible para que siempre haya un chat
  funcionando en el sitio.
- Panel administrador en `/admin` para editar en vivo: banner, textos, equipo,
  estadísticas, datos de contacto, FAQs, testimonios, publicaciones del blog,
  flujo del chatbot propio y bandeja de mensajes de contacto.
- SEO: metadatos completos, Open Graph, JSON-LD (LegalService), `sitemap.xml` y
  `robots.txt` generados automáticamente.
- Envío de correo del formulario de contacto vía SMTP (configurable, por ejemplo
  con el correo de cPanel del dominio).
- Persistencia de contenido con **Netlify Blobs** (plan gratuito de Netlify) en
  producción, con respaldo automático en disco para desarrollo local.

## Requisitos

- Node.js 20 o superior
- Cuenta de Netlify (plan gratuito es suficiente)

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # y completa los valores
npm run dev
```

Abre `http://localhost:3000`. El panel admin está en `http://localhost:3000/admin`
(usa la contraseña que pongas en `ADMIN_PASSWORD`).

En local, el contenido editable se guarda automáticamente en la carpeta `.data/`
(ignorada por git) para que puedas probar el panel sin necesidad de Netlify.

## Variables de entorno

Revisa `.env.example` para la lista completa. Las más importantes:

| Variable | Descripción |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública final del sitio (para SEO) |
| `ADMIN_PASSWORD` | Contraseña de acceso a `/admin` |
| `ADMIN_SECRET` | Cadena secreta para firmar la sesión del admin |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | Datos del correo saliente (SMTP de cPanel u otro proveedor) |
| `CONTACT_TO_EMAIL` | Correo que recibe los mensajes del formulario de contacto |

Configúralas en **Netlify > Site configuration > Environment variables** antes o
después del primer deploy (puedes desplegar sin ellas: el formulario de contacto
seguirá guardando los mensajes en el panel admin aunque el correo SMTP no esté
configurado todavía).

## Despliegue en Netlify

1. Sube este repositorio a GitHub (ya incluido: `git remote` apunta a tu repo).
2. En Netlify: **Add new site > Import an existing project** y selecciona el
   repositorio `asesoriaydefensa`.
3. Netlify detecta Next.js automáticamente (usa el plugin `@netlify/plugin-nextjs`
   ya configurado en `netlify.toml`). Build command: `npm run build`.
4. Agrega las variables de entorno de `.env.example` en el panel de Netlify.
5. Despliega. Una vez publicado, conecta tu dominio (comprado en Neubox) desde
   **Domain settings** apuntando los DNS a Netlify, o usando el registro CNAME/A
   que Netlify te indique.

### Netlify Blobs (base de datos gratuita)

No requiere configuración adicional: al desplegar en Netlify, `@netlify/blobs`
se activa automáticamente y ahí se guarda todo el contenido editable del panel
admin (banner, FAQs, testimonios, blog, chatbot, mensajes de contacto).

## Panel administrador

Ruta: `/admin` — protegido con contraseña (`ADMIN_PASSWORD`). Desde ahí se edita:

- **Contenido general**: banner/carrusel (imagen o video + texto + botón), textos
  principales, sección "Nosotros" (Hector y Fernanda), estadísticas y datos de
  contacto (teléfono, WhatsApp, correo, dirección, horarios).
- **Preguntas frecuentes**: agregar, editar, eliminar y reordenar.
- **Testimonios**: aprobar/ocultar los comentarios que dejan los visitantes desde
  el sitio, editarlos o agregar nuevos manualmente.
- **Blog / Foro**: crear, editar, publicar/despublicar o eliminar publicaciones.
- **Chatbot**: editar el saludo, las preguntas rápidas, las respuestas y el
  mensaje que invita a continuar por WhatsApp.
- **Mensajes**: bandeja de entrada de los mensajes enviados desde el formulario
  de contacto.

## Chatbot propio + ManyChat

Hoy el sitio muestra el **chatbot flotante propio** (burbuja abajo a la
derecha, editable desde `/admin`), que simula una conversación y termina
invitando a continuar por WhatsApp.

Los scripts de **ManyChat** (`widget.manychat.com` y `mccdn.me`) ya están
incrustados site-wide en `src/app/layout.tsx` y cargan correctamente (se
confirmó que el pixel de ManyChat registra la visita), pero ManyChat **no
muestra ninguna burbuja todavía** porque el widget no está publicado del lado
de la cuenta de ManyChat. Para activarlo: entrar a manychat.com → Growth
Tools/Automation → Website Widget → publicarlo y revisar que el dominio del
sitio esté autorizado. Cuando esté publicado, avisar para quitar el chatbot
propio y dejar solo el de ManyChat (tener los dos activos a la vez mostraría
dos burbujas superpuestas).

El saludo, las preguntas rápidas y las respuestas del chatbot propio se
configuran desde `/admin` (no dependen de ManyChat). La API key de ManyChat
(`MANYCHAT_API_KEY`) queda documentada en `.env.example` por si más adelante
se necesita una integración desde el servidor; hoy no se usa en el código.

## Estructura del proyecto

```
src/
  app/            Rutas (home, /blog/[slug], /admin, sitemap, robots)
  actions/        Server Actions (contacto, testimonios, likes, admin)
  components/     Componentes de UI, layout, secciones y chatbot
  content/        Contenido semilla (se usa la primera vez o en local)
  lib/            Autenticación, almacenamiento (Netlify Blobs/local), email
```
