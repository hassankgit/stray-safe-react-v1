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
import { useEffect, useState } from "react";
import { FaDog } from "react-icons/fa6";
import CustomSelect from "../input/select/Select";
import { selectItems } from "./SelectItems";
import { useRouter } from "next/navigation";
import AddressAutocomplete from "../input/address_autocomplete/AddressAutocomplete";

type UploadSightingFormProps = {
  url: string | null;
  coordinates?: Coordinates;
  dateTime?: string;
};

export default function UploadSightingForm(props: UploadSightingFormProps) {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState<Coordinates>(
    props.coordinates ?? { latitude: 0, longitude: 0 }
  );

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

  useEffect(() => {
    if (!props.coordinates?.latitude || !props.coordinates?.longitude) return;

    const geocoder = new window.google.maps.Geocoder();
    const latlng: google.maps.LatLngLiteral = {
      lat: props.coordinates.latitude,
      lng: props.coordinates.longitude,
    };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        setLocation(results[0].formatted_address);
      }
    });
  }, [props.coordinates]);

  return (
    <>
      <div className={styles.image_and_header}>
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
        </div>
      </div>

      <Form
        className={styles.form}
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
            coordinates: coordinates,
            location: location,
            imageUrl: props.url,
            age: formData.get("age") as EAnimalAge,
            sex: formData.get("sex") as EAnimalSex,
            status: formData.get("status") as EAnimalStatus,
            behavior: formData.get("behavior") as EAnimalBehavior,
            health: formData.get("health") as EAnimalHealth,
            notes: formData.get("notes") as string,
          };
          setLoading(true);
          const res = await handleSightingCreate(sightingCreateRequest);
          if (!res.success) {
            console.log(res.error);
          } else {
            router.push("/home/upload/success");
          }

          setLoading(false);
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

          <Field.Root name="location" className={styles.input_wrapper}>
            <Field.Label className={styles.input_label}>Location</Field.Label>
            <AddressAutocomplete
              className={styles.input}
              name="location"
              defaultValue={location}
              onSelect={(address, coords) => {
                setLocation(address);
                setCoordinates({
                  latitude: coords.lat,
                  longitude: coords.lng,
                });
              }}
            />
            <Field.Description className={styles.input_sublabel}>
              Where did you see the animal?
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
              Be sure to include any additional information! (i.e. this might be
              someone’s lost pet, it has a sibling, it has babies, etc.)
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
