import { IsNotEmpty } from "class-validator";

export class Tag {
  @IsNotEmpty()
  readonly id: number;

  @IsNotEmpty()
  readonly content: string;
}
