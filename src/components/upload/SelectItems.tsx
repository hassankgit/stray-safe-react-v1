import {
  EAnimalAge,
  EAnimalBehavior,
  EAnimalHealth,
  EAnimalSex,
  EAnimalStatus,
} from "@/swagger/swagger";
import { SelectItem } from "../input/select/Select";

type EnumDropdown = {
  placeholder: string;
  description: string;
  items: SelectItem[];
};

type EnumDropdowns = {
  age: EnumDropdown;
  behavior: EnumDropdown;
  sex: EnumDropdown;
  status: EnumDropdown;
  health: EnumDropdown;
};

export const selectItems: EnumDropdowns = {
  age: {
    description: "Was it a baby? Did it look young or old?",
    placeholder: "Choose an age estimate...",
    items: [
      {
        label: "Not sure",
        value: EAnimalAge.UNKNOWN,
      },
      {
        label: "1-3 months",
        value: EAnimalAge.ONE_TO_THREE_MONTHS,
      },
      {
        label: "3-6 months",
        value: EAnimalAge.THREE_TO_SIX_MONTHS,
      },
      {
        label: "6-12 months",
        value: EAnimalAge.SIX_TO_TWELVE_MONTHS,
      },
      {
        label: "1-2 years",
        value: EAnimalAge.ONE_TO_TWO_YEARS,
      },
      {
        label: "2-5 years",
        value: EAnimalAge.TWO_TO_FIVE_YEARS,
      },
      {
        label: "5-10 years",
        value: EAnimalAge.FIVE_TO_TEN_YEARS,
      },
      {
        label: "10+ years",
        value: EAnimalAge.TEN_PLUS_YEARS,
      },
    ],
  },
  behavior: {
    description: "Was the animal friendly? Timid? Aggressive?",
    placeholder: "Choose a behavior...",
    items: [
      {
        label: "Not sure",
        value: EAnimalBehavior.UNKNOWN,
      },
      {
        label: "Friendly",
        value: EAnimalBehavior.FRIENDLY,
      },
      {
        label: "Timid",
        value: EAnimalBehavior.TIMID,
      },
      {
        label: "Aggressive",
        value: EAnimalBehavior.AGGRESSIVE,
      },
    ],
  },

  sex: {
    description: "Boy? Girl? Not sure?",
    placeholder: "Choose a sex...",
    items: [
      {
        label: "Not sure",
        value: EAnimalSex.UNKNOWN,
      },
      {
        label: "Male",
        value: EAnimalSex.MALE,
      },
      {
        label: "Female",
        value: EAnimalSex.FEMALE,
      },
    ],
  },

  status: {
    description: "Is the animal with you? Still out there?",
    placeholder: "Choose an animal status...",
    items: [
      {
        label: "Not sure",
        value: EAnimalStatus.UNKNOWN,
      },
      {
        label: "Still roaming",
        value: EAnimalStatus.STILL_ROAMING,
      },
      {
        label: "Safe with me",
        value: EAnimalStatus.SAFE_WITH_ME,
      },
      {
        label: "Passed away",
        value: EAnimalStatus.DECEASED,
      },
    ],
  },

  health: {
    description: "Did the animal look healthy? Injured?",
    placeholder: "Choose a health status...",
    items: [
      {
        label: "Not sure",
        value: EAnimalHealth.UNKNOWN,
      },
      {
        label: "Healthy",
        value: EAnimalHealth.HEALTHY,
      },
      {
        label: "Hurt or Injured",
        value: EAnimalHealth.INJURED,
      },
    ],
  },
};
