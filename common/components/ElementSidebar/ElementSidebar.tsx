import React from 'react';

interface ElementSidebarProps {
  children: React.ReactNode;
}

const ElementSidebar = ({ children }: ElementSidebarProps) => {
  if (!children) {
    return null;
  }
  return (
    <div
      className="h-screen bg-n0  w-[20rem] shadow-e4 animate__animated pt-8 animate__slideInLeft animate__slow z-10 rounded-r-lg"
      key={children.toString()}
    >
      {children}
    </div>
  );
};

export default ElementSidebar;
