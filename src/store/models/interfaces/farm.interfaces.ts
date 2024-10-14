interface Performer {
  id: string
  title: string
}

export interface IFarm {
  farmId: string
  title: string
  number: string
  performer: Performer
  state: string
  type: string
  mode: string
  operation: string
  referenceId: string
  note: string | null
  createdAt: string
  startedAt: string | null
  closedAt: string
  scheduledAt: string
  deadline: string
  automatic: boolean
  requestCount: number
  request: string
  response: string | null
  data: string | null
}

export interface IFarmWithPageable {
  totalElements: number
  content: IFarm[]
}

export interface IReassignFields {
  performerId: string
  performerTitle: string
  automatic: boolean
}

export interface IFarmByState {
  farmId: string
  title: string
  number: string
  performer: Performer
  state: string
  type: string
  mode: string
  operation: string
  referenceType: string
  referenceId: string
  note: string
  createdAt: string
  startedAt: string
  closedAt: string
  scheduledAt: string
  deadline: string
  automatic: boolean
  requestCount: number
  data: any
}

interface Name {
  ky: string
  ru: string
  en: string
}

export interface IDocsListByStatementId {
  uid: string
  name: string
  documentTitle: Name
  contentType: string
  documentType: string
  relation: string
  relationRef: string
  size: number
  hash: string
  status: string
  description: string
  required: boolean
  uploadable: boolean
  createdAt: string
  url: string
}

export interface IFarmObservationStartRequest {
  farmId: string
  referenceId: string
  referenceType: 'RECORD' | 'STATEMENT'
  denyReregistration: boolean
  denyElimination: boolean
  denyNotification: boolean
  notes: string
}
export interface IFarmObservationFinishRequest {
  farmId: string
  referenceId: string
  referenceType: 'RECORD' | 'STATEMENT'
  observationId: string
  notes: string
}
