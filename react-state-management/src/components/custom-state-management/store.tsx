import React, { createContext, useContext, useReducer } from 'react';

interface State {
  user?: string;
  theme: 'light' | 'dark';
}

type Action =
  | { type: 'SET_USER'; payload: string }
  | { type: 'TOGGLE_THEME' };

const initialState: State = {
  user: '',
  theme: 'light'
};

function reducer(state: State, action: Action): State {
  switch(action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
}

interface AppContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | null>(null);

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
