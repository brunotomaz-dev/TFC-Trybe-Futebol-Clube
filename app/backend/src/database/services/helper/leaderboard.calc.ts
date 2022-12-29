import { winsLosses } from './types';

export const goalsBalance = (gp: number, gc: number) => gp - gc;

export const totalPoints = (goalsHome: number, goalsAway: number) => {
  const goals = goalsBalance(goalsHome, goalsAway);
  if (goals < 0) {
    return 0;
  }
  return goals > 0 ? 3 : 1;
};

export const efficiency = (h: number, a: number, t: number, j: number): number => {
  const p = totalPoints(h, a) + t;

  const calcEfficiency = (p / (j * 3)) * 100;

  return Number(calcEfficiency.toFixed(2));
};

export const efficiencyTotal = (p: number, j: number): number => {
  const calcEfficiency = (p / (j * 3)) * 100;

  return Number(calcEfficiency.toFixed(2));
};

export const winOrLose = (gp: number, gc: number, filter: winsLosses) => {
  const goals = goalsBalance(gp, gc);

  switch (filter) {
    case 'wins':
      return goals > 0 ? 1 : 0;
      break;
    case 'losses':
      return goals < 0 ? 1 : 0;
      break;
    default:
      return goals === 0 ? 1 : 0;
      break;
  }
};
