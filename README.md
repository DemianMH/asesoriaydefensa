# Asesoría y Defensa Laboral

Sitio web corporativo de una sola página (Next.js 16 + React 19 + Tailwind CSS 4)
para el despacho **Asesoría y Defensa Laboral**, con panel administrador para editar
el contenido en vivo, sin necesidad de tocar código.

## Contenido

- Landing de una sola página: banner/carrusel, nosotros (Hector y Fernanda),
  servicios, casos de éxito/testimonios con calificación, blog/foro con "me gusta",
  preguntas frecuentes y formulario de contacto.
- Chatbot flotante integrado con **ManyChat** (widget cargado en todo el sitio;
  el flujo de conversación se administra desde el panel de ManyChat, no desde
  este repo).
- Panel administrador en `/admin` para editar en vivo: banner, textos, equipo,
  estadísticas, datos de contacto, FAQs, testimonios, publicaciones del blog
  y bandeja de mensajes de contacto.
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
admin (banner, FAQs, testimonios, blog, mensajes de contacto).

## Panel administrador

Ruta: `/admin` — protegido con contraseña (`ADMIN_PASSWORD`). Desde ahí se edita:

- **Contenido general**: banner/carrusel (imagen o video + texto + botón), textos
  principales, sección "Nosotros" (Hector y Fernanda), estadísticas y datos de
  contacto (teléfono, WhatsApp, correo, dirección, horarios).
- **Preguntas frecuentes**: agregar, editar, eliminar y reordenar.
- **Testimonios**: aprobar/ocultar los comentarios que dejan los visitantes desde
  el sitio, editarlos o agregar nuevos manualmente.
- **Blog / Foro**: crear, editar, publicar/despublicar o eliminar publicaciones.
- **Mensajes**: bandeja de entrada de los mensajes enviados desde el formulario
  de contacto.

## Chatbot (ManyChat)

El widget de ManyChat se carga en `src/app/layout.tsx` (scripts de
`widget.manychat.com` y `mccdn.me`) y aparece en todas las páginas del sitio.
El saludo, las preguntas rápidas y las respuestas del bot **se configuran desde
el panel de ManyChat** (manychat.com), no desde este repositorio ni desde
`/admin`. La API key de ManyChat (`MANYCHAT_API_KEY`) queda documentada en
`.env.example` por si más adelante se necesita una integración desde el
servidor (por ejemplo, enviar automáticamente los mensajes del formulario de
contacto a ManyChat); hoy no se usa en el código.

## Estructura del proyecto

```
src/
  app/            Rutas (home, /blog/[slug], /admin, sitemap, robots)
  actions/        Server Actions (contacto, testimonios, likes, admin)
  components/     Componentes de UI, layout y secciones
  content/        Contenido semilla (se usa la primera vez o en local)
  lib/            Autenticación, almacenamiento (Netlify Blobs/local), email
```
