import styles from "./UploadSightingForm.module.scss";
import Heading1 from "../headings/heading1/Heading1";
import Heading4 from "../headings/heading4/Heading4";
import {
  Coordinates,
  CreateSightingRequest,
  EAnimalAge,
  EAnimalBehavior,
  EAnimalHealth,
  EAnimalSex,
  EAnimalStatus,
} from "@/swagger/swagger";
import { Field, Form, Input, Select } from "@base-ui-components/react";
import { api } from "../../app/api";
import { useEffect, useState } from "react";
import { FaDog } from "react-icons/fa6";
import CustomSelect, { SelectItem } from "../input/select/Select";
import { selectItems } from "./SelectItems";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";

type UploadSightingFormProps = {
  url: string | null;
  coordinates?: Coordinates;
  dateTime?: string;
};

export default function UploadSightingForm(props: UploadSightingFormProps) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const value = props.dateTime ? new Date(props.dateTime) : new Date();

    const toInputFormat = (date: Date) => {
      return date.toISOString().slice(0, 16);
    };

    setDateTime(toInputFormat(value));
  }, [props]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTime(e.target.value);
  };

  return (
    <>
      <Heading1 text="Image Preview" />
      <img
        className={styles.image}
        src={props.url ?? "/images/fileupload_coral_labelled.png"}
        alt="user uploaded image"
      />
      <div className={styles.sublabel_wrapper}>
        <Heading4
          className={styles.sublabel}
          text="If you aren't sure about certain information regarding
          the animal you saw, don't hesitate to leave it blank."
        />
        <Heading4
          className={styles.sublabel}
          text="It's much better to have less information than wrong
              information. Thank You!"
        />
        <Form
          className={styles.form}
          errors={errors}
          onClearErrors={setErrors}
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);

            // testing
            console.log("age:", formData.get("age"));
            console.log("sex:", formData.get("sex"));
            console.log("status:", formData.get("status"));
            console.log("behavior:", formData.get("behavior"));
            console.log("health:", formData.get("health"));

            const sightingCreateRequest: CreateSightingRequest = {
              name: formData.get("name") as string,
              species: formData.get("species") as string,
              breed: formData.get("breed") as string,
              dateTime: formData.get("dateTime") as string,
              coordinates: {
                latitude: -39.962614,
                longitude: -75.194317,
              },
              location: formData.get("location") as string,
              imageUrl: props.url,
              age: formData.get("age") as EAnimalAge,
              sex: formData.get("sex") as EAnimalSex,
              status: formData.get("status") as EAnimalStatus,
              behavior: formData.get("behavior") as EAnimalBehavior,
              health: formData.get("health") as EAnimalHealth,
              notes: formData.get("notes") as string,
            };

            console.log(sightingCreateRequest);
            // setLoading(true);
            // const res = await handleSightingCreate(sightingCreateRequest);
            // if (!res.success) {
            //   const serverErrors = {
            //     username: res.error,
            //     password: res.error,
            //   };
            //   setErrors(serverErrors);
            // } else {
            //   router.push("/home");
            // }

            // setLoading(false);
          }}
        >
          <div className={styles.input_section}>
            <Field.Root name="name" className={styles.input_wrapper}>
              <Field.Label className={styles.input_label}>Name</Field.Label>
              <Field.Control
                placeholder="Ex. Hercules"
                className={styles.input}
              />
              <Field.Description className={styles.input_sublabel}>
                The name of the animal (check collars or signs nearby if
                applicable)
              </Field.Description>
            </Field.Root>

            <Field.Root name="species" className={styles.input_wrapper}>
              <Field.Label className={styles.input_label}>Species</Field.Label>
              <Field.Control placeholder="Ex. Cat" className={styles.input} />
              <Field.Description className={styles.input_sublabel}>
                The species of the animal (cat, dog, cockatiel, etc.)
              </Field.Description>
            </Field.Root>

            <Field.Root name="breed" className={styles.input_wrapper}>
              <Field.Label className={styles.input_label}>Breed</Field.Label>
              <Field.Control placeholder="Ex. Tabby" className={styles.input} />
              <Field.Description className={styles.input_sublabel}>
                The breed of the animal (Tabby, British Shorthair, etc.)
              </Field.Description>
            </Field.Root>

            <Field.Root name="dateTime" className={styles.input_wrapper}>
              <Field.Label className={styles.input_label}>
                Time and Date of Sighting
              </Field.Label>
              <Field.Control
                name="dateTime"
                type="datetime-local"
                value={dateTime}
                onChange={handleChange}
                onClick={(e) => e.currentTarget.showPicker()}
                className={styles.input}
              />
              <Field.Description className={styles.input_sublabel}>
                When did you see this animal?
              </Field.Description>
            </Field.Root>

            <Field.Root name="age" className={styles.input_wrapper}>
              <Field.Label className={styles.input_label}>Age</Field.Label>
              <CustomSelect
                name="age"
                placeholder={selectItems.age.placeholder}
                items={selectItems.age.items}
                defaultValue={selectItems.age.items[0].value}
              />
              <Field.Description className={styles.input_sublabel}>
                {selectItems.age.description}
              </Field.Description>
            </Field.Root>

            <Field.Root name="sex" className={styles.input_wrapper}>
              <Field.Label className={styles.input_label}>Sex</Field.Label>
              <CustomSelect
                name="sex"
                placeholder={selectItems.sex.placeholder}
                items={selectItems.sex.items}
                defaultValue={selectItems.sex.items[0].value}
              />
              <Field.Description className={styles.input_sublabel}>
                {selectItems.sex.description}
              </Field.Description>
            </Field.Root>

            <Field.Root name="status" className={styles.input_wrapper}>
              <Field.Label className={styles.input_label}>Status</Field.Label>
              <CustomSelect
                name="status"
                placeholder={selectItems.status.placeholder}
                items={selectItems.status.items}
                defaultValue={selectItems.status.items[0].value}
              />
              <Field.Description className={styles.input_sublabel}>
                {selectItems.status.description}
              </Field.Description>
            </Field.Root>

            <Field.Root name="behavior" className={styles.input_wrapper}>
              <Field.Label className={styles.input_label}>Behavior</Field.Label>
              <CustomSelect
                name="behavior"
                placeholder={selectItems.behavior.placeholder}
                items={selectItems.behavior.items}
                defaultValue={selectItems.behavior.items[0].value}
              />
              <Field.Description className={styles.input_sublabel}>
                {selectItems.behavior.description}
              </Field.Description>
            </Field.Root>

            <Field.Root name="health" className={styles.input_wrapper}>
              <Field.Label className={styles.input_label}>Health</Field.Label>
              <CustomSelect
                name="health"
                placeholder={selectItems.health.placeholder}
                items={selectItems.health.items}
                defaultValue={selectItems.health.items[0].value}
              />
              <Field.Description className={styles.input_sublabel}>
                {selectItems.health.description}
              </Field.Description>
            </Field.Root>

            <Field.Root name="notes" className={styles.input_wrapper}>
              <Field.Label className={styles.input_label}>Notes</Field.Label>
              <Field.Control placeholder="" className={styles.input} />
              <Field.Description className={styles.input_sublabel}>
                Be sure to include any additional information! (i.e. this might
                be someone’s lost pet, it has a sibling, it has babies, etc.)
              </Field.Description>
            </Field.Root>
          </div>
          <button type="submit" className={styles.submit} disabled={loading}>
            {!loading ? (
              "Submit sighting"
            ) : (
              <FaDog className={styles.submit_loading} />
            )}
          </button>
        </Form>
      </div>
    </>
  );
}

async function handleSightingCreate(request: CreateSightingRequest) {
  const res = await api.sighting.createSighting(request);

  if (res.ok) {
    return {
      success: true,
    };
  } else {
    return {
      success: false,
      error: res.error?.Message || "",
    };
  }
}
