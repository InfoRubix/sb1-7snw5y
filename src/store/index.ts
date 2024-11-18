import { create } from 'zustand';
import { mockFiles, mockUsers, mockStakeholders } from './mockData';
import { File, User, Stakeholder } from '../types';

interface Store {
  files: File[];
  users: User[];
  stakeholders: Stakeholder[];
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
  getFilesByPIC: (picId: string) => File[];
  getFilesByStage: (stage: string) => File[];
  getFileStatistics: () => {
    totalActive: number;
    pastDue: number;
    activePICs: number;
    monthlyRevenue: number;
  };
}

export const useStore = create<Store>((set, get) => ({
  files: mockFiles,
  users: mockUsers,
  stakeholders: mockStakeholders,
  currentUser: null, // Start with no user logged in

  setCurrentUser: (user: User | null) => set({ currentUser: user }),
  
  logout: () => set({ currentUser: null }),

  getFilesByPIC: (picId: string) => {
    return get().files.filter(file => file.assignedTo === picId);
  },

  getFilesByStage: (stage: string) => {
    return get().files.filter(file => file.stage === stage);
  },

  getFileStatistics: () => {
    const files = get().files;
    const today = new Date();
    
    return {
      totalActive: files.filter(f => f.status === 'ONGOING').length,
      pastDue: files.filter(f => {
        const dueDate = new Date(f.estimatedCompletionDate);
        return f.status === 'ONGOING' && dueDate < today;
      }).length,
      activePICs: get().users.filter(u => u.role === 'PIC' && u.activeFiles > 0).length,
      monthlyRevenue: files.reduce((sum, file) => sum + (file.propertyDetails.price * 0.01), 0)
    };
  }
}));