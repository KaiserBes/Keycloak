interface Performer {
  id: string;
  title: string;
}

export interface IFarm {
  farmId: string;
  performer: Performer;
  type: string;
  title: string;
  localityTitle: string;
  request: string;
  response: string | null;
  data: string | null;
}

export interface IFarmWithPageable {
  totalElements: number;
  content: IFarm[];
}
