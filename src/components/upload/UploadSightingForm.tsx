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
import { Field, Form } from "@base-ui-components/react";
import { api } from "../../app/api";
import { useState } from "react";

type UploadSightingFormProps = {
  url: string;
  coordinates?: Coordinates;
  dateTime?: string;
};

export default function UploadSightingForm(props: UploadSightingFormProps) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Heading1 text="Image Preview" />
      <img
        className={styles.image}
        src={props.url ?? ""}
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
          text="It's much beter to have less information than wrong
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
            <Field.Root name="username">
              <Field.Control
                placeholder="Email or username"
                className={styles.input}
              />
            </Field.Root>
            <Field.Root name="password">
              <Field.Control
                placeholder="Password"
                type="password"
                className={styles.input}
              />
              <Field.Error className={styles.error} />
            </Field.Root>
          </div>
          <button type="submit" className={styles.submit} disabled={loading}>
            {!loading ? "Login" : <FaDog className={styles.submit_loading} />}
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
