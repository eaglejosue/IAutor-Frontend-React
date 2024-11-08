import { BaseModel } from "./base.model";
import { UserModel } from "./user.model";

export class OwnerModel extends BaseModel {
  userId?: number;
  firstName!: string;
  lastName!: string;
  type!: string;
  cpf?: string;
  cnpj?: string;
  cnpjRespName?: string;
  cnpjRespCpf?: string;
  profileImgUrl?: string;
  profileNavImgUrl?: string;
  fansCount?: number;
  postedVideosCount?: number;
  paidVideosCount?: number;
  socialUserName!: string;
  twitter?: string;
  instagram?: string;
  tikTok?: string;
  personType!: string;
  address?: string;
  cep?: string;
  city?: string;
  district?: string;
  state?: string;
  telephone?: string;
  bank?: string;
  bankAg?: string;
  bankAccountNumber?: string;
  bankAccountType?: string;
  iuguAccountVerified!: boolean;

  email!: string;
  password?: string;
  fullname!: string;
  doc!: string;

  user?: UserModel;

  constructor(j?: any) {
    super(j);
    if (j) {
      this.userId = j.userId;
      this.firstName = j.firstName;
      this.lastName = j.lastName;
      this.type = j.type;
      this.cpf = j.cpf;
      this.cnpj = j.cnpj;
      this.cnpjRespName = j.cnpjRespCpf;
      this.cnpjRespCpf = j.cnpjRespCpf;
      this.profileImgUrl = j.profileImgUrl;
      this.profileNavImgUrl = j.profileNavImgUrl;
      this.fansCount = j.fansCount;
      this.postedVideosCount = j.postedVideosCount;
      this.paidVideosCount = j.paidVideosCount;
      this.socialUserName = j.socialUserName;
      this.twitter = j.twitter;
      this.instagram = j.instagram;
      this.tikTok = j.tikTok;
      this.personType = j.personType;
      this.address = j.address;
      this.cep = j.cep;
      this.city = j.city;
      this.district = j.district;
      this.state = j.state;
      this.telephone = j.telephone;
      this.bank = j.bank;
      this.bankAg = j.bankAg;
      this.bankAccountNumber = j.bankAccountNumber;
      this.bankAccountType = j.bankAccountType;
      this.iuguAccountVerified = j.iuguAccountVerified;

      this.email = j.email;
      this.password = j.password;
      this.fullname = j.fullname;
      this.doc = j.doc;

      this.user = j.user;
    }
  }
}
