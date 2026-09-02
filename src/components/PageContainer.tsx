import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
}

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface ContentProps {
  children: React.ReactNode;
  className?: string;
  scrollResetDeps?: React.DependencyList; // list of dependencies that trigger a scroll reset back to top (0)
  scrollableContainerRef?: React.RefObject<HTMLDivElement | null>; // pass if parent needs to save/restore scroll (e.g. on going back from opened article to article list)
}

const PageContainer = ({ children }: PageContainerProps) => {
  return <>{children}</>;
};

const Header = ({ children, className }: HeaderProps) => {
  return <div className={cn('flex flex-shrink-0 flex-col px-4 pb-4', className)}>{children}</div>;
};

const Content = ({
  children,
  className,
  scrollResetDeps = [],
  scrollableContainerRef,
}: ContentProps) => {
  // fall back to an internal ref if no scrollContainerRef is provided
  const internalScrollRef = useRef<HTMLDivElement>(null);
  const activeScrollRef = scrollableContainerRef ?? internalScrollRef;

  // reset scroll position to top whenever on 1st render and whenever deps change (e.g. on search query change)
  useEffect(() => {
    if (activeScrollRef.current) {
      activeScrollRef.current.scrollTop = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, scrollResetDeps);

  return (
    <div ref={activeScrollRef} className={cn('min-h-0 flex-1 overflow-y-auto', className)}>
      {children}
    </div>
  );
};

PageContainer.Header = Header;
PageContainer.Content = Content;

export default PageContainer;
