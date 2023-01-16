import { RouteInfo } from "@nestjs/common/interfaces";
import { RequestMethod } from '@nestjs/common';
import { ValidationArguments } from "class-validator";
import { Path } from "../enum/utils.enum";

export const BlogPrivateRoutes: RouteInfo[] = [
  {
    path: Path.Posts,
    method: RequestMethod.DELETE
  }, {
    path: Path.Posts,
    method: RequestMethod.PATCH
  }, {
    path: Path.Posts,
    method: RequestMethod.POST
  }, {
    path: Path.Posts,
    method: RequestMethod.DELETE
  }, {
    path: Path.Comments,
    method: RequestMethod.POST
  }, {
    path: Path.Comments,
    method: RequestMethod.DELETE
  }, {
    path: Path.Subscribe,
    method: RequestMethod.POST
  }
]

export const ValidationErrorMessage = {
  Length: ({constraints}: ValidationArguments) => `From ${constraints[0]} to ${constraints[1]} symbols`
}


