import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoServerError } from 'mongodb';
import { Document, Model, ObjectId } from 'mongoose';
import { User } from 'src/schemas';
import { TransactionService } from 'src/transaction/transaction.service';
import CreateUserDto from './dto/create-user.dto';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User & Document<ObjectId, any, any>>,
    private readonly transaction: TransactionService,
  ) {}

  async userCheck(userId: ObjectId) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException(null, 'Invalid user');
  }

  register(data: CreateUserDto) {
    return this.userModel
      .create(data)
      .then((data) => {
        return { ...data.toJSON(), balance: 0 };
      })
      .catch((e) => {
        if (e instanceof MongoServerError) {
          if (e.code === 11000)
            throw new BadRequestException(null, 'Username is already occupied');
          else throw new InternalServerErrorException(null, e.errmsg);
        }
      });
  }

  getBalance(userId: ObjectId) {
    return this.userCheck(userId).then(() =>
      this.transaction.getBalance(userId),
    );
  }

  async deposit(userId: ObjectId, data: TransactionDto) {
    return this.userCheck(userId).then(() =>
      this.transaction.deposit(userId, data.amount),
    );
  }

  async withdrawal(userId: ObjectId, data: TransactionDto) {
    return this.userCheck(userId).then(() =>
      this.transaction.withdrawal(userId, data.amount),
    );
  }
}
