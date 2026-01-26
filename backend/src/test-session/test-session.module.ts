import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestSessionService } from './test-session.service';
import { TestSessionController } from './test-session.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AIModule } from '../ai/ai.module';
import { ExamsModule } from '../exams/exams.module';
import { UsersModule } from '../users/users.module';
import { PaymentsModule } from '../payments/payments.module';
import { Model } from '../exams/entities/model.entity';
import { PassesModule } from '../passes/passes.module';

@Module({
    imports: [
        AIModule,
        TypeOrmModule.forFeature([Model]),
        ConfigModule,
        forwardRef(() => ExamsModule),
        UsersModule,
        PaymentsModule,
        PassesModule,
    ],
    controllers: [TestSessionController],
    providers: [TestSessionService],
    exports: [TestSessionService]
})
export class TestSessionModule { }
