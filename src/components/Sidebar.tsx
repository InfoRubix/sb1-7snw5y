import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderPlus,
  FileText,
  DollarSign,
  Scale
} from 'lucide-react';
import { useStore } from '../store';

export default function Sidebar() {
  const { currentUser } = useStore();
  const isReceptionist = currentUser?.role === 'RECEPTION';
  const isPIC = currentUser?.role === 'PIC';
  const isFinance = currentUser?.role === 'FINANCE';

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow bg-primary pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Scale className="h-8 w-8 text-accent" />
            <span className="ml-2 text-accent text-lg font-semibold">AH-LPMS</span>
          </div>

          <nav className="mt-8 flex-1 flex flex-col space-y-1" aria-label="Sidebar">
            {isReceptionist ? (
              <>
                <NavLink
                  to="/file-entry"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-primary-light text-accent'
                        : 'text-gray-300 hover:bg-primary-light hover:text-accent'
                    }`
                  }
                >
                  <FolderPlus className="mr-3 h-6 w-6" />
                  New File Entry
                </NavLink>
                <NavLink
                  to="/existing-files"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-primary-light text-accent'
                        : 'text-gray-300 hover:bg-primary-light hover:text-accent'
                    }`
                  }
                >
                  <FileText className="mr-3 h-6 w-6" />
                  Existing Files
                </NavLink>
              </>
            ) : isPIC ? (
              <NavLink
                to="/pic-workspace"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-primary-light text-accent'
                      : 'text-gray-300 hover:bg-primary-light hover:text-accent'
                  }`
                }
              >
                <FileText className="mr-3 h-6 w-6" />
                File Progress
              </NavLink>
            ) : isFinance ? (
              <NavLink
                to="/finance"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-primary-light text-accent'
                      : 'text-gray-300 hover:bg-primary-light hover:text-accent'
                  }`
                }
              >
                <DollarSign className="mr-3 h-6 w-6" />
                Financial Dashboard
              </NavLink>
            ) : (
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-primary-light text-accent'
                      : 'text-gray-300 hover:bg-primary-light hover:text-accent'
                  }`
                }
              >
                <LayoutDashboard className="mr-3 h-6 w-6" />
                Dashboard
              </NavLink>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}