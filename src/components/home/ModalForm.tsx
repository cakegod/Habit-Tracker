import Button from "@components/Button";
import type { Habit } from "@data/habits";
import { toggleModal, addHabit } from "@stores/habits";
import React, { useState } from "react";
import FrequencyForm from "./FrequencyForm";
import LiquidForm from "./LiquidForm";
import TimeForm from "./TimeForm";

export interface HabitData {
  time: {
    value: "" | number;
    type: "minutes" | "duration";
  };
  frequency: {
    value: number;
  };
  liquid: {
    value: "" | number;
    type: "ml" | "l";
  };
}

function ModalForm({ habit }: { habit: Habit }) {
  const [data, setData] = useState<HabitData>({
    time: {
      value: "",
      type: "minutes",
    },
    frequency: {
      value: 3,
    },
    liquid: {
      value: "",
      type: "ml",
    },
  });

  const forms = {
    time: (
      <TimeForm
        handler={handleTime}
        value={data.time.value}
        type={data.time.type}
        key={0}
      />
    ),
    frequency: (
      <FrequencyForm
        handler={handleFrequency}
        value={data.frequency.value}
        key={1}
      />
    ),
    liquid: (
      <LiquidForm
        handler={handleLiquid}
        value={data.liquid.value}
        type={data.liquid.type}
        key={2}
      />
    ),
  };

  // Frequency.value * 52 * time.value
  function handleSubmit(e: React.FormEvent<HTMLFormElement>, habit: Habit) {
    e.preventDefault();
    addHabit({ ...habit, ...data });
    toggleModal();

    // test
    if (data.time.type === "minutes") {
      alert(
        `${Math.round(
          (data.frequency.value * 52 * data.time.value) / 60
        )} hours`
      );
    } else
      alert(`${Math.round(data.frequency.value * 52 * data.time.value)} hours`);
  }

  function handleTime(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { value, name } = e.target;
    setData({ ...data, time: { ...data.time, [name]: value } });
  }

  function handleFrequency(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { value, name } = e.target;
    setData({ ...data, frequency: { ...data.frequency, [name]: value } });
  }

  function handleLiquid(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { value, name } = e.target;
    setData({ ...data, liquid: { ...data.liquid, [name]: value } });
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, habit)}>
      {habit.forms.map((form) => forms[form])}
      <div className="modal-action">
        <Button intent="ghost" handler={() => toggleModal()}>
          Cancel
        </Button>
        <Button type="submit" intent="primary">
          Add habit
        </Button>
      </div>
    </form>
  );
}

export default ModalForm;
