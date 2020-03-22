import { IsNotEmpty } from "class-validator";

export class Image {
  id?: number;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly url: string;
}
