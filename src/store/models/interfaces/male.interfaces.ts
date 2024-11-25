interface OriginName {
  ky: string;
  ru: string;
  en: string;
}

interface Origin {
  id: number;
  code: string;
  title: string;
  name: OriginName;
}

interface Farm {
  id: number;
  title: string;
  localityId: number;
  localityTitle: string;
  place: string;
  personId: string;
  personTitle: string;
  personAddress: string;
  personContacts: string;
}

interface Certificate {
  uid: string;
  name: string;
  type: string;
  status: string;
}

interface Side {
  value: string;
  id: number;
  shape: string;
  left: string;
  right: string;
  color: string;
}

interface IMale {
  id: number;
  title: string;
  gender: "UNKNOWN" | "MALE" | "FEMALE";
  status: string;
  age: number;
  number: string;
  motherDesc: string;
  fatherDesc: string;
  state: string;
  weight: number;
  origin: Origin;
  petClass: string;
  petClassTitle: string;
  birthDate: string;
  mother: string;
  father: string;
  farmId: number;
  breedId: number;
  suitId: number;
  farmTitle: string;
  breedTitle: string;
  suitTitle: string;
  farm: Farm;
  notes: string;
  certificate: Certificate[];
  value: string;
  shape: string;
  left: Side;
  right: Side;
  color: string;
}
