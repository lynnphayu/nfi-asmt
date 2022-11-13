import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Document, Model, ObjectId } from 'mongoose';
import { Transaction } from 'src/schemas/transaction';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<
      Transaction & Document<ObjectId, any, any>
    >,
  ) {}

  async getBalance(userId: ObjectId) {
    const transactions = await this.transactionModel.find({ userId });
    return transactions.reduce(
      ({ userId, balance }, cur) => ({
        userId,
        balance: balance + cur.transaction,
      }),
      {
        userId,
        balance: 0,
      },
    );
  }

  async deposit(userId: ObjectId, amount: number) {
    await this.transactionModel.create({ userId, transaction: amount });
    return this.getBalance(userId);
  }

  async withdrawal(userId: ObjectId, amount: number) {
    const balance = await this.getBalance(userId);
    if (balance.balance - amount < 0)
      throw new BadRequestException(null, 'Insufficient balance');
    await this.transactionModel.create({ userId, transaction: -amount });
    return this.getBalance(userId);
  }
}
