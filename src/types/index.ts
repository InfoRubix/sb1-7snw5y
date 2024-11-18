export interface User {
  id: string;
  name: string;
  role: 'HOD' | 'PIC' | 'RECEPTION' | 'FINANCE' | 'CLIENT' | 'AGENT';
  workload?: number;
  activeFiles?: number;
  email?: string;
  phone?: string;
  agentCommission?: {
    totalCommission: number;
    releasedCommission: number;
    pendingCommission: number;
  };
}

export interface File {
  id: string;
  fileNumber: string;
  clientName: string;
  propertyDetails: {
    address: string;
    titleType: string;
    price: number;
  };
  loanDetails: {
    bank: string;
    amount: number;
  };
  openDate: string;
  estimatedCompletionDate: string;
  status: 'ONGOING' | 'CANCELLED' | 'CLOSED' | 'SAFEKEEPING';
  stage: FileStage;
  assignedTo: string;
  lastUpdated: string;
  stakeholders: Stakeholder[];
  financials: {
    legalFees: number;
    disbursements: number;
    paidAmount: number;
    outstandingAmount: number;
    profitMargin: number;
    agentCommission?: number;
  };
  documents: Document[];
  updates: Update[];
  agent?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'REQUIRED' | 'SUBMITTED' | 'PENDING';
  description: string;
  dueDate?: string;
  submittedDate?: string;
}

export interface Update {
  id: string;
  date: string;
  message: string;
  type: 'STATUS' | 'DOCUMENT' | 'PAYMENT';
  isRead: boolean;
}

export interface Stakeholder {
  id: string;
  name: string;
  type: 'CLIENT' | 'BANK' | 'AGENT' | 'OTHER';
  contact: {
    phone: string;
    email: string;
  };
}

export type FileStage =
  | 'PENDING_DOCUMENTS'
  | 'LOAN_PROCESSING'
  | 'TITLE_SEARCH'
  | 'AGREEMENT_PREPARATION'
  | 'EXECUTION'
  | 'COMPLETION'
  | 'REGISTRATION';