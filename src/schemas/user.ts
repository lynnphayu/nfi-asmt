import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  // @Prop({ type: Number, required: true, default: 0 })
  // balance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
