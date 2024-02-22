import { Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

export class baseSchema extends Document {

    @Prop({required: true})
    updatedAt: Date;

    @Prop({required: true})
    createdAt: Date;

    @Prop({required: false})
    deletedAt: Date | null;

}