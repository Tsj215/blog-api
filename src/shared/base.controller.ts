import { UseFilters } from "@nestjs/common";

import { HttpExceptionFilter } from "./filters/http-exception.filter";

@UseFilters(HttpExceptionFilter)
export class BaseControlll {}
