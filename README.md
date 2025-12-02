# La Wikiclase

Arquitectura inicial propuesta para La Wikiclase, un hub que unifica tus sitios y habilita cursos con pagos, autenticación robusta y generación de PDFs.

## Objetivos
- Landing y catálogo de cursos con alto rendimiento y SEO.
- Backend modular para auth, cursos, matrículas y pagos Stripe.
- Generación de certificados, facturas y contenidos en PDF.
- Base escalable y responsiva en móviles.

## Stack propuesto
- **Monorepo**: Turborepo con workspaces (pnpm) para compartir tipos y utilidades.
- **Frontend**: Next.js 14 (App Router) + React, Tailwind CSS y componentes accesibles (shadcn/ui). SSR/SSG para SEO en landing y detalle de curso.
- **Backend**: NestJS con Fastify, Prisma ORM hacia PostgreSQL.
- **Autenticación**: OAuth2/OIDC (p. ej. Auth0/Clerk) con sesiones seguras; soporte a roles (admin, instructor, estudiante). Tokens de acceso y refresh con rotación.
- **Pagos**: Stripe Checkout alojado inicialmente; opción Payment Elements para incrustar. Webhooks para confirmar matrícula y emitir factura.
- **PDF**: Servicio interno con Playwright/Puppeteer renderizando plantillas HTML (certificados, facturas, contenidos). Almacenamiento temporal en S3-compatible.
- **Infra**: Frontend en Vercel; backend en Fly.io/Render con Docker. PostgreSQL administrado (Supabase/RDS). Caché Redis opcional para sesiones y catálogo.
- **Observabilidad**: Logging estructurado (pino), métricas y tracing OpenTelemetry.

## Estructura de carpetas (propuesta)
```
/ (repo raíz)
  apps/
    web/         # Next.js (frontend)
    api/         # NestJS (backend)
  packages/
    ui/          # Design system compartido
    config/      # ESLint/Prettier/tsconfig compartidos
    utils/       # Funciones y tipos compartidos
  infra/
    docker/      # Dockerfiles y compose para dev
    terraform/   # (opcional) IaC para Fly.io/Render
  docs/
    architecture.md
```

## Próximos pasos
1. Inicializar Turborepo con pnpm workspaces y configuración de lint/test.
2. Bootstrap de `apps/web` con Next.js 14, Tailwind y shadcn/ui; rutas: landing, catálogo, detalle de curso, panel de usuario.
3. Bootstrap de `apps/api` con NestJS + Prisma; módulos: auth (OAuth), users, courses, enrollments, payments (Stripe), pdf.
4. Definir esquemas Prisma y migraciones iniciales en PostgreSQL.
5. Integrar Stripe (Checkout) y webhooks de pago; matricular usuarios al confirmar.
6. Implementar servicio de PDFs y plantillas base (certificado, factura, lección).
7. Configurar despliegues (Vercel para web, Fly.io/Render para api) y observabilidad.

## Notas
- SEO: usar metadata dinámica en Next.js, OpenGraph, sitemap/robots; SSR/SSG para cursos y landing.
- Agente SEO: se puede integrar más adelante con APIs (ej. HeyGen) para generar contenido audiovisual y respuestas.
- Moodle: integración a nivel de LTI o sincronización de usuarios/cursos según necesidad.
