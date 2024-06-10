'use client';
import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import 'styles/App.css';
import 'styles/Contact.css';
import 'styles/MiniCalendar.css';
import 'styles/index.css';

// Define the NoSSR component
const NoSSR: React.FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;

// Dynamically import NoSSR with SSR disabled
const DynamicNoSSR = dynamic(() => Promise.resolve(NoSSR), { ssr: false });

// AppWrappers component
interface AppWrappersProps {
  children: ReactNode;
}

const AppWrappers: React.FC<AppWrappersProps> = ({ children }) => {
  return <DynamicNoSSR>{children}</DynamicNoSSR>;
};

export default AppWrappers;
