import { useAppContext, AppProvider } from './store';
import './index.css';

function UserProfile() {
  const { state, dispatch } = useAppContext();

  return (
    <div className="user-profile-card">
      <p className="user-info">当前用户: {state.user || '未登录'}</p>
      <div className="button-container">
        <button
          className="login-btn"
          onClick={() => dispatch({ type: 'SET_USER', payload: 'hello' })}
        >
          登录
        </button>
      </div>
    </div>
  );
}

function ThemeSwitcher() {
  const { state, dispatch } = useAppContext();

  return (
    <div className="button-container">
      <button
        className="theme-switcher"
        onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
      >
        当前主题: {state.theme === 'light' ? '浅色' : '深色'}
      </button>
    </div>
  );
}

// 顶层应用
function CustomStateManagementContent() {
  const { state } = useAppContext();

  return (
    <div
      className="custom-state-container"
      data-theme={state.theme}
    >
      <UserProfile />
      <ThemeSwitcher />
    </div>
  );
}

export default function CustomStateManagement() {
  return (
    <AppProvider>
      <CustomStateManagementContent />
    </AppProvider>
  );
}
