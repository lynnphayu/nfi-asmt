import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ParseObjectIdPipe } from 'src/common/parse-object-id.pipe';
import CreateUserDto from './dto/create-user.dto';
import { TransactionDto } from './dto/transaction.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Post()
  register(@Body() data: CreateUserDto) {
    return this.user.register(data);
  }

  @Get('/:id')
  getBalance(@Param('id', ParseObjectIdPipe) userId: ObjectId) {
    return this.user.getBalance(userId);
  }

  @Patch('/:id/deposit')
  deposit(
    @Param('id', ParseObjectIdPipe) userId: ObjectId,
    @Body() data: TransactionDto,
  ) {
    return this.user.deposit(userId, data);
  }

  @Patch('/:id/withdrawal')
  withdrawal(
    @Param('id', ParseObjectIdPipe) userId: ObjectId,
    @Body() data: TransactionDto,
  ) {
    return this.user.withdrawal(userId, data);
  }
}
