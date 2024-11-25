interface Performer {
  id: string;
  title: string;
}

export interface IFarm {
  id: number;
  title: string;
  values: string;
  localityTitle: string;
  localityId: number;
  place: string;
  personId: string;
  personTitle: string;
  personAddress: string;
  personContacts: string;
}

export interface IReassignFields {
  performerId: string;
  performerTitle: string;
  automatic: boolean;
}

export interface IFarmWithPageable {
  totalElements: number;
  content: IFarm[];
}

export interface IFarmByState {
  farmId: number;
  title: string;
  localityTitle: string;
  localityId: number;
  personAddress: string;
  number: string;
  personId: string;
  performer: Performer;
  personContacts: string;
  data: any;
}
