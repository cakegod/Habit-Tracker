import { inputs } from "./inputs";

export type HabitData = {
  name: string;
  icon: string;
  id: string;
  inputs: (typeof inputs)[keyof typeof inputs][];
  avoid: boolean;
};

// TODO: add more habits
export const habitsData: HabitData[] = [
  {
    name: "Meditate",
    icon: "🧘‍♀️",
    id: "1",
    inputs: [inputs.time, inputs.frequency],
    avoid: false,
  },
  {
    name: "Exercise",
    icon: "🏋️‍♂️",
    id: "2",
    inputs: [inputs.time, inputs.frequency],
    avoid: false,
  },
  {
    name: "Read",
    icon: "📖",
    id: "3",
    inputs: [inputs.time, inputs.frequency],
    avoid: false,
  },
  {
    name: "Write",
    icon: "📝",
    id: "4",
    inputs: [inputs.time, inputs.frequency],
    avoid: false,
  },
  {
    name: "Drink Water",
    icon: "💧",
    id: "5",
    inputs: [inputs.liquid],
    avoid: false,
  },
  {
    name: "Sleep Well",
    icon: "🛌",
    id: "6",
    inputs: [inputs.time, inputs.frequency],
    avoid: false,
  },
  {
    name: "Code",
    icon: "👨‍💻",
    id: "7",
    inputs: [inputs.time, inputs.frequency],
    avoid: false,
  },
  {
    name: "Smoke",
    icon: "🚬",
    id: "8",
    inputs: [inputs.cigarettes],
    avoid: true,
  },
	{
    name: "Smartphone",
    icon: "📱",
    id: "9",
    inputs: [inputs.smartphone],
    avoid: true,
  },
];
