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
import { Field, Form, Input } from "@base-ui-components/react";
import { api } from "../../app/api";
import { useEffect, useState } from "react";
import { FaDog } from "react-icons/fa6";

type UploadSightingFormProps = {
  url: string | null;
  coordinates?: Coordinates;
  dateTime?: string;
};

console.log(new Date());
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
          className={styles.login}
          errors={errors}
          onClearErrors={setErrors}
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);

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
            </Field.Root>

            <Field.Root name="species" className={styles.input_wrapper}>
              <Field.Label className={styles.input_label}>Species</Field.Label>
              <Field.Control placeholder="Ex. Cat" className={styles.input} />
            </Field.Root>

            <Field.Root name="breed" className={styles.input_wrapper}>
              <Field.Label className={styles.input_label}>Breed</Field.Label>
              <Field.Control placeholder="Ex. Tabby" className={styles.input} />
            </Field.Root>

            <Field.Root name="breed" className={styles.input_wrapper}>
              <Field.Label className={styles.input_label}>
                Time and Date of Sighting
              </Field.Label>
              {/* 
              <input
                type="datetime-local"
                // id="datetime-local-input"
              /> */}
              {/* <Field.Control
                type="datetime-local"
                className={styles.input}
                defaultValue={dateAsString}
                onClick={(e) => e.currentTarget.showPicker()}
              /> */}
              <Field.Control
                type="datetime-local"
                value={dateTime}
                onChange={handleChange}
                onClick={(e) => e.currentTarget.showPicker()}
                className={styles.input}
              />
            </Field.Root>

            <Field.Root name="test">
              <Field.Control
                placeholder="Password"
                type="password"
                className={styles.input}
              />
              <Field.Error className={styles.error} />
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
