import { IsNotEmpty } from "class-validator";

export class Image {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly url: string;
}
