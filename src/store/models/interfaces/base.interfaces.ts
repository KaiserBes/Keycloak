import { Links } from "./general.interfaces";

export interface IOrganizationTypes {
  id: number;
  value: string;
  links: Links[];
}
export interface IReference {
  id: string;
  type: string;
  title: Title;
  description: string;
}

export interface Title {
  ky: string;
  ru: string;
  en: string;
}

export interface ILocality {
  key: number;
  value: string;
  localityTitle: string;
}

export interface ITreeData {
  pId: string;
  id: string;
  value: string;
  title: string;
  selectable: boolean;
  isLeaf: boolean;
}
export interface IDashboard {
  type: string;
  count: number;
}

export interface ISuit {
  id: number;
  title: string;
}

export interface ICountry {
  id: number;
  code: string;
  title: string;
  name: Title;
}
