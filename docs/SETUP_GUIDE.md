# 🚀 Guía de Configuración - La Wikiclase

Esta guía te ayudará a poner en marcha **La Wikiclase** paso a paso.

## 📋 Requisitos Previos

- **Node.js** 20 o superior
- **pnpm** 10.13.1 (incluido con el proyecto)
- **PostgreSQL** 15 o superior (local o remoto)
- **Git** para control de versiones

## 🏗️ Arquitectura del Proyecto

```
la-wikiclase/
├── apps/
│   ├── web/          # Frontend Next.js 14
│   └── api/          # Backend NestJS con Fastify
├── packages/
│   ├── ui/           # Componentes UI compartidos
│   ├── config/       # Configuraciones compartidas
│   └── utils/        # Utilidades y tipos compartidos
├── docs/             # Documentación del proyecto
└── turbo.json        # Configuración de Turborepo
```

## 🎯 Stack Tecnológico

### Frontend (`apps/web`)
- **Framework**: Next.js 14 con App Router
- **Estilos**: Tailwind CSS
- **UI Components**: Sistema propio basado en shadcn/ui
- **Autenticación**: Clerk
- **Pagos**: Stripe
- **Iconos**: Lucide React

### Backend (`apps/api`)
- **Framework**: NestJS con Fastify
- **ORM**: Prisma
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT con Clerk
- **Pagos**: Stripe (webhooks)
- **PDFs**: Puppeteer
- **Jobs**: Bull con Redis

### Packages Compartidos
- **@lawikiclase/ui**: Componentes React reutilizables
- **@lawikiclase/config**: Configuraciones TypeScript y ESLint
- **@lawikiclase/utils**: Tipos, formateadores y validadores

## 🔧 Instalación

### 1. Clonar y configurar dependencias

```bash
# Las dependencias ya están instaladas
pnpm install
```

### 2. Configurar variables de entorno

#### Frontend (`apps/web/.env.local`)

```bash
# Copia el archivo de ejemplo
cp apps/web/.env.local.example apps/web/.env.local
```

Edita `apps/web/.env.local` y completa:

```env
# Clerk - Obtén las claves en https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Stripe - Obtén las claves en https://dashboard.stripe.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# OpenAI para el chatbot - https://platform.openai.com
OPENAI_API_KEY=sk-...

# HeyGen para videos - https://app.heygen.com
HEYGEN_API_KEY=...

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### Backend (`apps/api/.env`)

```bash
# Copia el archivo de ejemplo
cp apps/api/.env.example apps/api/.env
```

Edita `apps/api/.env` y completa:

```env
# PostgreSQL - Tu base de datos local
DATABASE_URL="postgresql://tu_usuario:tu_password@localhost:5432/lawikiclase?schema=public"

# JWT Secret (genera uno aleatorio)
JWT_SECRET=tu-secret-super-seguro-aqui-cambialo

# Clerk
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...  # Lo obtendrás al configurar webhooks

# OpenAI
OPENAI_API_KEY=sk-...

# HeyGen
HEYGEN_API_KEY=...

# Redis (opcional, para desarrollo puedes omitirlo)
REDIS_HOST=localhost
REDIS_PORT=6379

# Configuración del servidor
PORT=3001
NODE_ENV=development
```

### 3. Configurar Base de Datos PostgreSQL

```bash
# Crear base de datos (desde tu terminal de PostgreSQL)
createdb lawikiclase

# Ejecutar migraciones de Prisma
cd apps/api
pnpm migrate

# Ejecutar seed para crear los 13 proyectos web
pnpm seed
```

### 4. Generar cliente de Prisma

```bash
cd apps/api
pnpm prisma:generate
```

## 🚀 Ejecutar el Proyecto

### Desarrollo (todos los servicios)

```bash
# Desde la raíz del proyecto
pnpm dev
```

Esto iniciará:
- 🌐 Frontend: http://localhost:3000
- 🔧 Backend API: http://localhost:3001
- 📚 Swagger Docs: http://localhost:3001/api/docs

### Desarrollo Individual

```bash
# Solo frontend
cd apps/web
pnpm dev

# Solo backend
cd apps/api
pnpm dev
```

## 🗄️ Gestión de Base de Datos

### Prisma Studio (Interfaz visual)

```bash
cd apps/api
pnpm prisma:studio
```

Abre en: http://localhost:5555

### Crear nueva migración

```bash
cd apps/api
# Después de modificar schema.prisma
pnpm migrate
```

### Reset de base de datos (¡cuidado!)

```bash
cd apps/api
npx prisma migrate reset
pnpm seed
```

## 🔑 Configurar Servicios Externos

### 1. Clerk (Autenticación)

1. Crea cuenta en https://clerk.com
2. Crea una aplicación nueva
3. Copia las API keys a `.env.local` y `.env`
4. Configura URLs permitidas:
   - Development: `http://localhost:3000`
   - Production: tu dominio

### 2. Stripe (Pagos)

1. Crea cuenta en https://stripe.com
2. Activa modo test
3. Copia las API keys a `.env.local` y `.env`
4. Configura webhooks:
   - URL: `http://localhost:3001/api/payments/webhook` (desarrollo)
   - Eventos: `checkout.session.completed`, `payment_intent.succeeded`
5. Copia el webhook secret a `.env`

### 3. OpenAI (Chatbot IA)

1. Crea cuenta en https://platform.openai.com
2. Genera API key
3. Añade crédito a tu cuenta
4. Copia la key a `.env.local` y `.env`

### 4. HeyGen (Videos IA)

1. Crea cuenta en https://heygen.com
2. Genera API key desde el dashboard
3. Copia la key a `.env.local` y `.env`

## 📦 Scripts Útiles

```bash
# Desde la raíz
pnpm dev          # Ejecutar todo en modo desarrollo
pnpm build        # Construir todo para producción
pnpm lint         # Verificar código con ESLint
pnpm test         # Ejecutar tests

# Frontend específico
cd apps/web
pnpm dev          # Desarrollo
pnpm build        # Build de producción
pnpm start        # Ejecutar build

# Backend específico
cd apps/api
pnpm dev          # Desarrollo con hot-reload
pnpm build        # Build de producción
pnpm start:prod   # Ejecutar build
```

## 🎨 Estructura de Datos

### Modelos Principales

- **User**: Usuarios del sistema (estudiantes, instructores, admin)
- **Course**: Cursos disponibles con precio y contenido
- **Lesson**: Lecciones dentro de cada curso
- **Enrollment**: Matrículas de usuarios en cursos
- **Payment**: Pagos realizados via Stripe
- **Certificate**: Certificados generados al completar cursos
- **WebProject**: Tus 13 proyectos web integrados
- **Analytics**: Tracking de eventos y comportamiento

## 🌐 Despliegue

### Frontend (Vercel)

```bash
# Conecta tu repositorio a Vercel
# Configurar variables de entorno en Vercel dashboard
# Deploy automático en cada push
```

### Backend (Fly.io / Render)

```bash
# Opción 1: Fly.io
fly launch
fly deploy

# Opción 2: Render
# Conecta tu repo y configura:
# Build Command: cd apps/api && pnpm build
# Start Command: cd apps/api && pnpm start:prod
```

## 🐛 Troubleshooting

### Error: Cannot connect to database

```bash
# Verifica que PostgreSQL esté corriendo
pg_isready

# Verifica la URL de conexión en .env
echo $DATABASE_URL
```

### Error: Module not found

```bash
# Reinstala dependencias
pnpm install
```

### Error: Prisma client not generated

```bash
cd apps/api
pnpm prisma:generate
```

## 📚 Próximos Pasos

1. ✅ Configuración base completada
2. 🔜 Implementar autenticación con Clerk
3. 🔜 Crear páginas de cursos
4. 🔜 Integrar Stripe para pagos
5. 🔜 Desarrollar sistema de PDFs
6. 🔜 Crear sección de tus 13 webs
7. 🔜 Implementar chatbot IA
8. 🔜 Integrar HeyGen para videos

## 📞 Soporte

Si encuentras algún problema, revisa:
- Esta documentación
- `docs/architecture.md` para detalles técnicos
- El código tiene comentarios explicativos

---

¡Felicidades! 🎉 La arquitectura base está lista. Ahora podemos empezar a desarrollar las funcionalidades principales.
