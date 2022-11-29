import * as React from 'react';
import { IPoint } from './@types/point';

export const PointsContext =  React.createContext<IPoint[] | null>(null);
