import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Seed Web Projects
  const webProjects = [
    {
      name: 'Curso Intensivo de Español',
      description: 'Curso intensivo de español de un mes para estudiantes de nivel intermedio y avanzado',
      url: 'https://elcorreveidile.github.io/Curso-Intensivo-Espanol/',
      category: 'educacion',
      order: 1,
    },
    {
      name: 'Producción e Interacción Oral',
      description: 'Curso de tres meses enfocado en mejorar las habilidades de producción oral en español',
      url: 'https://elcorreveidile.github.io/Produccion-Oral/',
      category: 'educacion',
      order: 2,
    },
    {
      name: 'Literatura hasta el XVIII',
      description: 'Curso completo de literatura española desde los orígenes hasta el siglo XVIII',
      url: 'https://elcorreveidile.github.io/Literatura/',
      category: 'educacion',
      order: 3,
    },
    {
      name: 'UGT CLM Granada',
      description: 'Web oficial del sindicato UGT Castilla-La Mancha en Granada',
      url: 'https://ugtclmgranada.org',
      category: 'institucional',
      order: 4,
    },
    {
      name: 'La Wikiclase (antigua)',
      description: 'Versión anterior de La Wikiclase - plataforma educativa',
      url: 'https://lawikiclase.com',
      category: 'educacion',
      order: 5,
    },
    {
      name: 'Clases por Zoom - Moodle',
      description: 'Plataforma Moodle con cursos online de español y literatura',
      url: 'https://clasesporzoom.com',
      category: 'educacion',
      order: 6,
    },
    {
      name: 'BlaBlaEle - Escuela de Idiomas',
      description: 'Web corporativa de la escuela de idiomas BlaBlaEle',
      url: 'https://web.blablaele.com',
      category: 'empresa',
      order: 7,
    },
    {
      name: 'Clínica Lingüística y Cultural',
      description: 'Proyecto metodológico innovador para la enseñanza de idiomas',
      url: 'https://web.blablaele.com/es/clinica-linguistica-y-cultural',
      category: 'metodologia',
      order: 8,
    },
    {
      name: 'Juan Blas Láinez - Web Personal',
      description: 'Web personal oficial de Juan Blas Láinez',
      url: 'https://jblainez.es',
      category: 'personal',
      order: 9,
    },
    {
      name: 'Juan Blas Láinez - Blog',
      description: 'Blog personal con contenido sobre literatura, educación y poesía',
      url: 'https://jblainez.wordpress.com',
      category: 'personal',
      order: 10,
    },
    {
      name: 'CEELEEME - Español como Lengua Extranjera',
      description: 'Recursos y contenidos sobre la enseñanza del español como lengua extranjera',
      url: 'https://ceeleeme.wordpress.com',
      category: 'educacion',
      order: 11,
    },
    {
      name: 'De Tapas por Granada',
      description: 'Webquest educativa sobre la cultura gastronómica de Granada',
      url: 'https://detapasporgranada.wordpress.com',
      category: 'cultura',
      order: 12,
    },
    {
      name: 'Olvidos de Granada',
      description: 'Revista cultural sobre historia, literatura y cultura de Granada',
      url: 'https://olvidosdegranada.es',
      category: 'cultura',
      order: 13,
    },
  ];

  console.log('📦 Creating web projects...');
  for (const project of webProjects) {
    await prisma.webProject.upsert({
      where: { url: project.url },
      update: project,
      create: project,
    });
  }

  console.log('✅ Seed completed successfully!');
  console.log(`   - ${webProjects.length} web projects created`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
