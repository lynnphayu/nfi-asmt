import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas';
import { TransactionModule } from 'src/transaction/transaction.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TransactionModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
