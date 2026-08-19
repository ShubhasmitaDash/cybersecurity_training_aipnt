import { Scenario, RoleId } from '../../types';
import { MODULE_1_SCENARIOS } from './module1Executive';
import { MODULE_2_SCENARIOS } from './module2Revenue';
import { MODULE_3_SCENARIOS } from './module3Files';
import { MODULE_4_SCENARIOS } from './module4FrontDesk';
import { MODULE_5_SCENARIOS } from './module5Field';

export const ALL_SCENARIOS: Scenario[] = [
  ...MODULE_1_SCENARIOS,
  ...MODULE_2_SCENARIOS,
  ...MODULE_3_SCENARIOS,
  ...MODULE_4_SCENARIOS,
  ...MODULE_5_SCENARIOS
];

export function getScenariosForRole(roleId: RoleId): Scenario[] {
  if (roleId === 'all') {
    return ALL_SCENARIOS;
  }
  return ALL_SCENARIOS.filter(s => s.roleId === roleId);
}

export function getScenariosForModule(moduleId: number): Scenario[] {
  return ALL_SCENARIOS.filter(s => s.moduleId === moduleId);
}

export function getScenarioById(id: string): Scenario | undefined {
  return ALL_SCENARIOS.find(s => s.id === id);
}

export function getNextScenario(currentId: string, roleId: RoleId): Scenario | null {
  const list = getScenariosForRole(roleId);
  const index = list.findIndex(s => s.id === currentId);
  if (index >= 0 && index < list.length - 1) {
    return list[index + 1];
  }
  return null;
}

export function getPreviousScenario(currentId: string, roleId: RoleId): Scenario | null {
  const list = getScenariosForRole(roleId);
  const index = list.findIndex(s => s.id === currentId);
  if (index > 0) {
    return list[index - 1];
  }
  return null;
}
