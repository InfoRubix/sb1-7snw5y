import { User, File, Stakeholder, FileStage } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Sarah Lee', role: 'PIC', workload: 28, activeFiles: 28 },
  { id: 'u2', name: 'John Smith', role: 'PIC', workload: 24, activeFiles: 24 },
  { id: 'u3', name: 'Maria Garcia', role: 'PIC', workload: 22, activeFiles: 22 },
  { id: 'u4', name: 'David Chen', role: 'PIC', workload: 20, activeFiles: 20 },
  { id: 'u5', name: 'Lisa Wong', role: 'PIC', workload: 18, activeFiles: 18 },
  { id: 'u6', name: 'Ahmad Abdullah', role: 'HOD', workload: 0, activeFiles: 0 },
  { id: 'u7', name: 'Jenny Tan', role: 'RECEPTION', workload: 0, activeFiles: 0 },
  { id: 'u8', name: 'Alice Johnson', role: 'FINANCE', workload: 0, activeFiles: 0 },
  { 
    id: 'u9', 
    name: 'James Wong', 
    role: 'AGENT',
    email: 'james@realestate.com',
    phone: '+60123456789',
    agentCommission: {
      totalCommission: 150000,
      releasedCommission: 75000,
      pendingCommission: 75000
    }
  },
  { 
    id: 'u10', 
    name: 'Client User',
    role: 'CLIENT',
    email: 'client@email.com',
    phone: '+60123456790'
  }
];

export const mockStakeholders: Stakeholder[] = [
  {
    id: 'sh1',
    name: 'James Wong',
    type: 'CLIENT',
    contact: {
      phone: '+60123456790',
      email: 'james@email.com'
    }
  },
  {
    id: 'sh2',
    name: 'CIMB Bank',
    type: 'BANK',
    contact: {
      phone: '+60123456791',
      email: 'loans@cimb.com'
    }
  }
];

export const mockFiles: File[] = [
  {
    id: 'f1',
    fileNumber: 'CV2024001',
    clientName: 'Ahmad Razak',
    propertyDetails: {
      address: '123 Jalan Bukit Bintang, KL',
      titleType: 'Individual',
      price: 850000
    },
    loanDetails: {
      bank: 'CIMB Bank',
      amount: 680000
    },
    openDate: '2024-01-15',
    estimatedCompletionDate: '2024-04-15',
    status: 'ONGOING',
    stage: 'LOAN_PROCESSING',
    assignedTo: 'u1',
    lastUpdated: '2024-03-01',
    stakeholders: [
      {
        id: 'sh1',
        name: 'Ahmad Razak',
        type: 'CLIENT',
        contact: {
          phone: '+60123456790',
          email: 'ahmad@email.com'
        }
      }
    ],
    financials: {
      legalFees: 8500,
      disbursements: 2000,
      paidAmount: 5000,
      outstandingAmount: 5500,
      profitMargin: 15,
      agentCommission: 4250
    },
    documents: [
      {
        id: 'd1',
        name: 'IC Copy',
        type: 'SUBMITTED',
        description: 'Client identification document'
      },
      {
        id: 'd2',
        name: 'Bank Statement',
        type: 'REQUIRED',
        description: '6 months bank statement'
      }
    ],
    updates: [
      {
        id: 'u1',
        date: '2024-03-01',
        message: 'Loan application submitted to bank',
        type: 'STATUS',
        isRead: false
      }
    ],
    agent: 'u9'
  },
  {
    id: 'f2',
    fileNumber: 'CV2024002',
    clientName: 'Sarah Chen',
    propertyDetails: {
      address: '45 Jalan Ampang, KL',
      titleType: 'Strata',
      price: 650000
    },
    loanDetails: {
      bank: 'Maybank',
      amount: 520000
    },
    openDate: '2024-02-01',
    estimatedCompletionDate: '2024-05-01',
    status: 'ONGOING',
    stage: 'TITLE_SEARCH',
    assignedTo: 'u2',
    lastUpdated: '2024-03-02',
    stakeholders: [
      {
        id: 'sh3',
        name: 'Sarah Chen',
        type: 'CLIENT',
        contact: {
          phone: '+60123456792',
          email: 'sarah@email.com'
        }
      }
    ],
    financials: {
      legalFees: 6500,
      disbursements: 1800,
      paidAmount: 4000,
      outstandingAmount: 4300,
      profitMargin: 12,
      agentCommission: 3250
    },
    documents: [
      {
        id: 'd3',
        name: 'Sale & Purchase Agreement',
        type: 'SUBMITTED',
        description: 'Signed SPA'
      }
    ],
    updates: [
      {
        id: 'u2',
        date: '2024-03-02',
        message: 'Title search in progress',
        type: 'STATUS',
        isRead: true
      }
    ],
    agent: 'u9'
  },
  {
    id: 'f3',
    fileNumber: 'CV2024003',
    clientName: 'Michael Tan',
    propertyDetails: {
      address: '88 Mont Kiara, KL',
      titleType: 'Strata',
      price: 1200000
    },
    loanDetails: {
      bank: 'Hong Leong Bank',
      amount: 960000
    },
    openDate: '2024-01-05',
    estimatedCompletionDate: '2024-04-05',
    status: 'ONGOING',
    stage: 'AGREEMENT_PREPARATION',
    assignedTo: 'u3',
    lastUpdated: '2024-03-03',
    stakeholders: [
      {
        id: 'sh4',
        name: 'Michael Tan',
        type: 'CLIENT',
        contact: {
          phone: '+60123456793',
          email: 'michael@email.com'
        }
      }
    ],
    financials: {
      legalFees: 12000,
      disbursements: 3000,
      paidAmount: 8000,
      outstandingAmount: 7000,
      profitMargin: 18,
      agentCommission: 6000
    },
    documents: [
      {
        id: 'd4',
        name: 'All Documents',
        type: 'SUBMITTED',
        description: 'Complete documentation'
      }
    ],
    updates: [
      {
        id: 'u3',
        date: '2024-03-03',
        message: 'Preparing loan agreement',
        type: 'STATUS',
        isRead: true
      }
    ],
    agent: 'u9'
  },
  {
    id: 'f4',
    fileNumber: 'CV2024004',
    clientName: 'Lisa Lim',
    propertyDetails: {
      address: '15 Bangsar South, KL',
      titleType: 'Strata',
      price: 980000
    },
    loanDetails: {
      bank: 'Public Bank',
      amount: 784000
    },
    openDate: '2024-02-15',
    estimatedCompletionDate: '2024-05-15',
    status: 'CLOSED',
    stage: 'REGISTRATION',
    assignedTo: 'u4',
    lastUpdated: '2024-03-04',
    stakeholders: [
      {
        id: 'sh5',
        name: 'Lisa Lim',
        type: 'CLIENT',
        contact: {
          phone: '+60123456794',
          email: 'lisa@email.com'
        }
      }
    ],
    financials: {
      legalFees: 9800,
      disbursements: 2500,
      paidAmount: 12300,
      outstandingAmount: 0,
      profitMargin: 16,
      agentCommission: 4900
    },
    documents: [
      {
        id: 'd5',
        name: 'All Documents',
        type: 'SUBMITTED',
        description: 'Complete documentation'
      }
    ],
    updates: [
      {
        id: 'u4',
        date: '2024-03-04',
        message: 'File completed and closed',
        type: 'STATUS',
        isRead: true
      }
    ],
    agent: 'u9'
  },
  {
    id: 'f5',
    fileNumber: 'CV2024005',
    clientName: 'David Wong',
    propertyDetails: {
      address: '66 KLCC, KL',
      titleType: 'Strata',
      price: 1500000
    },
    loanDetails: {
      bank: 'CIMB Bank',
      amount: 1200000
    },
    openDate: '2024-03-01',
    estimatedCompletionDate: '2024-06-01',
    status: 'ONGOING',
    stage: 'PENDING_DOCUMENTS',
    assignedTo: 'u5',
    lastUpdated: '2024-03-05',
    stakeholders: [
      {
        id: 'sh6',
        name: 'David Wong',
        type: 'CLIENT',
        contact: {
          phone: '+60123456795',
          email: 'david@email.com'
        }
      }
    ],
    financials: {
      legalFees: 15000,
      disbursements: 3500,
      paidAmount: 0,
      outstandingAmount: 18500,
      profitMargin: 20,
      agentCommission: 7500
    },
    documents: [
      {
        id: 'd6',
        name: 'IC Copy',
        type: 'REQUIRED',
        description: 'Client identification document'
      }
    ],
    updates: [
      {
        id: 'u5',
        date: '2024-03-05',
        message: 'Waiting for client documents',
        type: 'STATUS',
        isRead: false
      }
    ],
    agent: 'u9'
  }
];