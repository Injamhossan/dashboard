import React from 'react';
import { 
  LayoutGrid, 
  CheckSquare, 
  Calendar, 
  BarChart2, 
  Users, 
  Settings, 
  LifeBuoy, 
  LogOut
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import promoBg from '../assets/image1.jpg';
import { AuthContext } from '../providers/AuthProvider';

const Sidebar = ({ onClose }) => {
  const { logOut } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut().then(() => {
      navigate('/login');
    }).catch(console.error);
  };

  const menuItems = [
    { icon: <LayoutGrid size={22} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <CheckSquare size={22} />, label: 'Tasks', path: '/tasks', badge: '12+' },
    { icon: <Calendar size={22} />, label: 'Calendar', path: '/calendar' },
    { icon: <BarChart2 size={22} />, label: 'Analytics', path: '/analytics' },
    { icon: <Users size={22} />, label: 'Team', path: '/team' },
  ];

  const generalItems = [
    { icon: <Settings size={22} />, label: 'Settings', path: '/settings' },
    { icon: <LifeBuoy size={22} />, label: 'Help', path: '/help' },
    { icon: <LogOut size={22} />, label: 'Logout', action: handleLogout },
  ];

  return (
    <aside className="w-[256px] bg-[#f5f6f8] h-full border border-gray-100/50 flex flex-col py-2 overflow-y-auto custom-scrollbar rounded-3xl shadow-sm">
      {/* Sidebar Application Branding */}
      <div className="flex items-center gap-3 px-6 mb-5 shrink-0">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 31C24.732 31 31 24.732 31 17C31 9.268 24.732 3 17 3C9.268 3 3 9.268 3 17C3 24.732 9.268 31 17 31Z" stroke="#15803D" strokeWidth="3" />
          <path d="M10 13C10 18.5 13.5 22 17 22C20.5 22 24 18.5 24 13" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <circle cx="17" cy="18" r="3" fill="#15803D" />
        </svg>
        <span className="text-[26px] font-medium font-outfit text-black tracking-tight mt-1">Donezo</span>
      </div>

      {/* Primary Navigation Links */}
      <div className="mb-8 shrink-0">
        <p className="text-[12px] font-medium text-gray-400 px-6 mb-4 font-outfit uppercase tracking-wider">Menu</p>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `relative flex items-center justify-between px-6 py-2 transition-colors ${
                  isActive ? 'text-black' : 'text-[#9ca3af] hover:text-gray-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active Route Visual Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[6px] h-8 bg-[#15803D] rounded-r-[6px]" />
                  )}
                  
                  <div className="flex items-center gap-4">
                    <span className={isActive ? 'text-[#15803D]' : 'text-[#a1a5ab]'}>
                      {React.cloneElement(item.icon, { strokeWidth: isActive ? 2 : 1.5 })}
                    </span>
                    <span className={`text-[17px] mt-0.5 ${isActive ? 'font-medium' : 'font-light'}`}>
                      {item.label}
                    </span>
                  </div>

                  {item.badge && (
                    <span className="text-[11px] font-semibold bg-[#0F4C3A] text-white px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Secondary Application Settings */}
      <div className="mb-2 shrink-0">
        <p className="text-[12px] font-medium text-gray-400 px-6 mb-4 font-outfit uppercase tracking-wider">General</p>
        <nav className="space-y-1">
          {generalItems.map((item) => (
            item.action ? (
              <button
                key={item.label}
                onClick={(e) => {
                  item.action(e);
                  if (onClose) onClose();
                }}
                className="w-full relative flex items-center gap-4 px-6 py-3 transition-colors text-[#9ca3af] hover:text-[#0F4C3A] hover:bg-gray-50/50 cursor-pointer"
              >
                <span className="text-[#a1a5ab]">
                   {React.cloneElement(item.icon, { strokeWidth: 1.5 })}
                </span>
                <span className="text-[15px] mt-0.5 font-light">
                  {item.label}
                </span> 
              </button>
            ) : (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `relative flex items-center gap-4 px-6 py-3 transition-colors ${
                  isActive ? 'text-black' : 'text-[#9ca3af] hover:text-gray-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[6px] h-8 bg-[#15803D] rounded-r-[6px]" />
                  )}
                  <span className={isActive ? 'text-[#15803D]' : 'text-[#a1a5ab]'}>
                     {React.cloneElement(item.icon, { strokeWidth: isActive ? 2 : 1.5 })}
                  </span>
                  <span className={`text-[15px] mt-0.5 ${isActive ? 'font-medium' : 'font-light'}`}>
                    {item.label}
                  </span> 
                </>
              )}
            </NavLink>
            )
          ))}
        </nav>
      </div>

      {/* Mobile Application Promo Modal */}
      <div className="mt-auto px-6 shrink-0 pt-2">
        <div 
            className="w-full rounded-[24px] overflow-hidden relative flex flex-col justify-end p-5 pt-8 shadow-sm"
            style={{
                backgroundImage: `url(${promoBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '220px'
            }}
        >
          {/* Embedded Promo Logo Vector */}
          <div className="absolute top-5 left-5 w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 31C24.732 31 31 24.732 31 17C31 9.268 24.732 3 17 3C9.268 3 3 9.268 3 17C3 24.732 9.268 31 17 31Z" stroke="#15803D" strokeWidth="4" />
                <path d="M10 13C10 18.5 13.5 22 17 22C20.5 22 24 18.5 24 13" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
                <circle cx="17" cy="18" r="4" fill="#15803D" />
            </svg>
          </div>

          <div className="relative z-10 text-white mt-4">
            <h4 className="text-[17px] font-medium leading-tight mb-1">Download our<br/>Mobile App</h4>
            <p className="text-[11px] text-gray-300 font-light mb-4">Get easy in another way</p>
            <button className="w-full bg-[#15803D] hover:bg-[#0F4C3A] text-white py-2.5 rounded-full text-[13px] font-semibold transition-colors">
              Download
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
