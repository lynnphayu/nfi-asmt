import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { User } from './user';

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  userId: ObjectId;

  @Prop({ type: Number, required: true })
  transaction: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
