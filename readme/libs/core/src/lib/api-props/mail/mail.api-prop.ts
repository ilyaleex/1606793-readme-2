import { UserAPIDesc, UserAPIExample } from "../../enum/api.enum";
import { MailAPIDesc, MailAPIExample } from "../../enum/mail.enum";
import { TAPIProp } from "../api-prop";

export const MailAPIProp: TAPIProp = {
  Email: {
    required: true,
    description: UserAPIDesc.Email,
    example: UserAPIExample.Email
  },
  Name: {
    required: true,
    description: UserAPIDesc.Name,
    example: UserAPIExample.Name
  },
  PostIDs: {
    required: true,
    description: MailAPIDesc.PostIDs,
    example: MailAPIExample.PostIDs
  },
}
