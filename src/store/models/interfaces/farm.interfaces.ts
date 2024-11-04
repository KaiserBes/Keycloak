interface Performer {
  id: string;
  title: string;
}

export interface IFarm {
  id: number;
  performer: Performer;
  type: string;
  title: string;
  localityTitle: string;
  request: string;
  response: string | null;
  localityId: number;
  place: string;
  personId: string;
  personTitle: string;
  personAddress: string;
  personContacts: string;
  data: string | null;
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
  farmId: string;
  title: string;
  number: string;
  performer: Performer;
  state: string;
  type: string;
  mode: string;
  operation: string;
  referenceType: string;
  referenceId: string;
  note: string;
  createdAt: string;
  startedAt: string;
  closedAt: string;
  scheduledAt: string;
  deadline: string;
  automatic: boolean;
  requestCount: number;
  data: any;
}
