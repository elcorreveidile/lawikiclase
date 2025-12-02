import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { PaymentsModule } from './payments/payments.module';
import { PdfModule } from './pdf/pdf.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { PrismaService } from './common/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
    CoursesModule,
    EnrollmentsModule,
    PaymentsModule,
    PdfModule,
    AnalyticsModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
