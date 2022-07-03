import { Event } from "./Event";

export interface Period {
  id: number;
  label?: string;
  slug?: string;
  position: number;
  length: number;
  color: string;
  events: Event[];
}