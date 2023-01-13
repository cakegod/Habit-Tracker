import type { HabitData } from "@data/habits";
import { toggleModal, addHabit, deleteHabit, habits } from "@stores/habits";
import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import { Inputs } from "./Inputs";
import type { InputCategories } from "@data/inputs";

export type InputState = {
  value: string;
  unit: string;
};
type HabitState = {
  [key in InputCategories]: InputState;
};

export type CombinedHabitState = HabitData & HabitState;

function ModalForm({ habit }: { habit: HabitData | CombinedHabitState }) {
  const [data, setData] = useState<CombinedHabitState>({
    cigarettes: {
      value: "",
      unit: "",
    },
    liquid: {
      value: "",
      unit: "ml",
    },
    frequency: {
      value: "3",
      unit: "",
    },
    time: {
      value: "",
      unit: "minutes",
    },
    ...habit,
  });
  const $habits = useStore(habits);

  // Check if the current item exists in the added habits
  const isPresent = !!$habits.find((habit) => habit.id === data.id);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>, habit: HabitData) {
    e.preventDefault();

    // FIXME: Find a better way to handle this bug
    // Small timeout to prevent seeing the modal changing content
    setTimeout(() => addHabit({ ...habit, ...data }), 200);
    toggleModal();
  }

  function handleForm(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    category: InputCategories
  ) {
    const { value, name } = e.target;
    console.log(category, name, value);
    setData({ ...data, [category]: { ...data[category], [name]: value } });
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, habit)}>
      {habit.inputs.map((input) => (
        <Inputs
          key={input.category}
          handler={handleForm}
          input={input}
          inputState={data[input.category]}
        />
      ))}
      <div className="modal-action">
        {isPresent ? (
          <RemoveButton habit={habit as CombinedHabitState} />
        ) : (
          <CancelButton />
        )}
        {isPresent ? <UpdateButton /> : <AddButton />}
      </div>
    </form>
  );
}

function AddButton() {
  return (
    <button className="btn-primary btn grow" type="submit">
      Add Habit
    </button>
  );
}

function UpdateButton() {
  return (
    <button className="btn-success btn grow" type="submit">
      Update
    </button>
  );
}

function RemoveButton({ habit }: { habit: CombinedHabitState }) {
  return (
    <button
      type="button"
      className="btn-ghost btn grow text-error"
      onClick={() => {
        toggleModal(), deleteHabit(habit);
      }}
    >
      Remove
    </button>
  );
}

function CancelButton() {
  return (
    <button
      type="button"
      className="btn-ghost btn grow"
      onClick={() => toggleModal()}
    >
      Cancel
    </button>
  );
}

export default ModalForm;
