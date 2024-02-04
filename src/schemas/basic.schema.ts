import { Prop } from "@nestjs/mongoose";

export class baseSchema {

    @Prop({required: true})
    updatedAt: Date;

    @Prop({required: true})
    createdAt: Date;

    
}