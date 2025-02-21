import { User } from "@prisma/client";
import { BaseModel, TableNames } from "../base";

export class UserModel extends BaseModel<User> {
  tableName: TableNames = "user";
}
