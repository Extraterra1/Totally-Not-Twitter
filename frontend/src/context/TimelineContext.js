import { createContext, useContext } from 'react';

export const TimelineContext = createContext();

export const useTimeline = () => {
  return useContext(TimelineContext);
};
