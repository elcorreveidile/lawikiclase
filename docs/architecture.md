# Arquitectura inicial de La Wikiclase

Este documento detalla decisiones clave basadas en tus preferencias (React/Next.js, PostgreSQL, Stripe, autenticación robusta) y el objetivo de un hub de cursos con buena experiencia móvil y SEO.

## Principios
- **SEO y performance**: SSR/SSG en Next.js para landing y detalle de cursos; edge caching en Vercel.
- **Escalabilidad y modularidad**: monorepo con separación clara de apps (web/api) y paquetes compartidos.
- **Seguridad**: OAuth2/OIDC, sesiones con refresh tokens rotados, CSP/helmet, rate limiting y saneamiento de datos.
- **Pagos confiables**: Stripe con webhooks verificables y reconciliación en la base de datos.
- **Observabilidad**: logs estructurados, métricas y tracing desde el inicio.

## Componentes
- **Frontend (`apps/web`)**
  - Next.js 14 App Router (TypeScript) con Tailwind + shadcn/ui.
  - Rutas: `/` (landing), `/cursos`, `/cursos/[slug]`, `/dashboard` (usuario), `/auth/*`.
  - SSR/SSG: landing y catálogo SSG con revalidación; detalle de curso ISR; dashboard SSR protegida.
  - SEO: metadata API de Next.js, sitemap y robots, OpenGraph/Twitter cards.
  - Integraciones: Stripe Payment Elements opcional en detalle de curso; reproductor de vídeo/HeyGen para agente.

- **Backend (`apps/api`)**
  - NestJS + Fastify, Prisma hacia PostgreSQL.
  - Módulos: `auth`, `users`, `courses`, `enrollments`, `payments`, `pdf`, `analytics` (tracking de visitantes/algoritmos).
  - Auth: OAuth2/OIDC (Auth0/Clerk) + JWT firmados; refresh token rotation; roles (admin, instructor, estudiante).
  - Stripe: Checkout hosted (fase 1) con webhooks `checkout.session.completed`; transición a Payment Elements en fase 2.
  - PDFs: servicio con Playwright/Puppeteer renderizando plantillas HTML; colas (BullMQ/Redis) para generación asíncrona.
  - Integración Moodle: módulo opcional via LTI 1.3 para sincronizar cursos/usuarios.

- **Paquetes compartidos (`packages/`)**
  - `ui`: componentes de diseño y tokens de estilo.
  - `config`: ESLint/Prettier/tsconfig y scripts compartidos.
  - `utils`: helpers de dominio (roles, formatos de precio, tipos compartidos).

## Datos y modelos (borrador)
- `User`: id, email, nombre, rol, proveedor OAuth, avatar.
- `Course`: id, slug, título, descripción, precio, estado (borrador/publicado), instructorId.
- `Lesson`: id, courseId, título, contenido rich, orden, recursos.
- `Enrollment`: id, userId, courseId, estado (pendiente/pagado/cancelado), progreso.
- `Payment`: id, enrollmentId, stripeSessionId, monto, moneda, estado, reciboURL.
- `Certificate`: id, enrollmentId, pdfUrl, emitidoEn.

## Flujo de pago y matrícula
1. Usuario autenticado inicia checkout (Stripe Checkout hosted).
2. Webhook `checkout.session.completed` confirma pago.
3. Backend marca `Enrollment` como pagado y genera factura PDF.
4. Al completar curso, se dispara generación de certificado PDF.

## Analytics y agente
- Tracking de eventos (visita, scroll, clics) en frontend; envío a backend `analytics` para segmentación.
- Algoritmos de recomendación básicos (cursos sugeridos) y triggers para agente HeyGen en páginas clave.

## DevOps
- **Despliegue**: Vercel (web) con preview per-branch; Fly.io/Render (api) con Docker; variables en `.env` gestionadas en cada plataforma.
- **CI**: lint + tests + build por workspace (Turborepo cache). Migraciones Prisma en pre-deploy.
- **Infra opcional**: Terraform en `infra/terraform` para Postgres gestionado y Redis.

## Próximas tareas sugeridas
- Inicializar Turborepo y workspaces.
- Crear esqueletos `apps/web` y `apps/api` con configs compartidas.
- Añadir lint/format/test base y CI.
- Definir esquema Prisma inicial y seeds mínimos.
