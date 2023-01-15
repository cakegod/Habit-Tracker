import type { HabitData } from "@data/habits";
import { useStore } from "@nanostores/react";
import { habits, toggleModal } from "@stores/habits";
import { formatLiquidPerWeek, formatTimePerWeek } from "@util/calculate";
import type React from "react";

export default function HabitsDrawer() {
  const $habits = useStore(habits);
  return $habits.length > 0 ? (
    <Container>
      {$habits.map((habit) => (
        <Habit key={habit.name} habit={habit} />
      ))}
    </Container>
  ) : null;
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute bottom-0 left-0 z-10 grid max-h-[25%] w-full grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] gap-2 self-start overflow-auto bg-base-300 p-2">
      {children}
    </div>
  );
}

function Habit({ habit }: { habit: HabitData }) {
  const { id, icon, name, inputs } = habit;
  const time = inputs.find((input) => input.name === "time");
  const frequency = inputs.find((input) => input.name === "frequency");
  const liquid = inputs.find((input) => input.name === "liquid");
  const generic = inputs.find((input) => input.name === "generic");

  return (
    <button
      className="btn flex h-24 max-h-full grow flex-col gap-1 p-2 normal-case"
      onClick={() => toggleModal(habit)}
      key={id}
    >
      <Title icon={icon} name={name} />
      {time && frequency && (
        <>
          <Badge>
            {formatTimePerWeek(
              Number(frequency.selectedOption),
              Number(time.value),
              time.selectedOption
            )}
          </Badge>
          <Badge>{`${frequency.selectedOption} times / week`}</Badge>
        </>
      )}

      {liquid && (
        <>
          <Badge>
            {`${formatLiquidPerWeek(
              Number(liquid.value),
              liquid.selectedOption
            )}`}
          </Badge>
          <Badge>daily</Badge>
        </>
      )}
      {generic && (
        <>
          {/* Temporary */}
          <Badge>{`${generic.value * 7} ${
            generic.selectedOption
          } / week`}</Badge>
          <Badge>daily</Badge>
        </>
      )}
    </button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="badge-info badge badge-sm ">{children}</span>;
}

function Title({ icon, name }: { icon: string; name: string }) {
  return (
    <div className="flex text-base">
      <span>{icon}</span>
      <p>{name}</p>
    </div>
  );
}
