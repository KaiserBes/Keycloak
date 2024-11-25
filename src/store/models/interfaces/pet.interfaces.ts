import { IFarm } from "./farm.interfaces";

export interface IOrigin {
  id: number;
  code: string;
  title: string;
  name: string | null;
}

export interface IParent {
  id: number;
  title: string | null;
  gender: string;
  status: string | null;
  age: number | null;
  number: string;
  motherDesc: string | null;
  fatherDesc: string | null;
  state: string | null;
  weight: number | null;
  origin: IOrigin | null;
  petClass: string | null;
  petClassTitle: string;
  birthDate: string | null;
  mother: IParent | null;
  father: IParent | null;
  farmId: number;
  breedId: number;
  suitId: number;
  farmTitle: string;
  breedTitle: string;
  suitTitle: string;
  farm: IFarm;
  notes: string | null;
  certificate: string | null;
  value: string | null;
  shape: string;
  left: IParent | null;
  right: IParent | null;
  color: string;
}

export interface IPet {
  id: number;
  certificateType: string;
  certificateId: string;
  title: string;
  gender: string;
  status: string | null;
  age: number | null;
  number: string;
  motherDesc: string | null;
  fatherDesc: string | null;
  state: string;
  weight: number | null;
  origin: IOrigin | null;
  petClass: string | null;
  petClassTitle: string;
  birthDate: string;
  mother: IParent | null;
  father: IParent | null;
  farmId: number;
  breedId: number;
  suitId: number;
  farmTitle: string;
  breedTitle: string;
  suitTitle: string;
  farm: IFarm;
  notes: string | null;
  certificate: string | null;
  value: string;
  shape: string;
  left: IParent | null;
  right: IParent | null;
  color: string;
  data: any;
}

export interface IDocsListByStatementId {
  uid: string;

  name: string;
  contentType: string;
  documentType: string;
  relation: string;
  relationRef: string;
  size: number;
  hash: string;
  status: string;
  description: string;
  required: boolean;
  uploadable: boolean;
  createdAt: string;
  url: string;
}
