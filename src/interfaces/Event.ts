import { Period } from "./Period";

export interface Event {
  id: number;
  title?: string;
  text: string;
  published: boolean;
  period: Period;
  periodId: number;
  position: number;
}