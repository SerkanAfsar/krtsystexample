import { useState } from "react";

export default function CustomRadioButtonList({
  values,
  name,
  defaultValue,
}: {
  values: string[];
  name: string;
  defaultValue: string;
}) {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);
  return (
    <fieldset className="mt-4 flex gap-4">
      {/* <legend>Select a maintenance drone:</legend> */}
      {values.map((value, index) => (
        <div key={index}>
          <label
            className="flex cursor-pointer select-none items-center"
            htmlFor={value}
            onClick={(e) => setSelectedValue(value)}
          >
            <input
              type="radio"
              className="sr-only"
              id={value}
              name={name}
              value={value}
              checked
            />
            <div
              className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full border ${
                selectedValue == value && "border-primary"
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                  selectedValue == value && "!bg-primary"
                }`}
              >
                {" "}
              </span>
            </div>
            {value}
          </label>
        </div>
      ))}

      {/* <div>
        <label
          className="flex cursor-pointer select-none items-center"
          htmlFor="dewey"
        >
          <input
            className="sr-only"
            type="radio"
            id="dewey"
            name="drone"
            value="dewey"
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
              isChecked && "border-primary"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                isChecked && "!bg-primary"
              }`}
            >
              {" "}
            </span>
          </div>
        </label>
      </div>

      <div>
        <label
          className="flex cursor-pointer select-none items-center"
          htmlFor="louie"
        >
          <input
            className="sr-only"
            type="radio"
            id="louie"
            name="drone"
            value="louie"
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
              isChecked && "border-primary"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                isChecked && "!bg-primary"
              }`}
            >
              {" "}
            </span>
          </div>
        </label>
      </div> */}
    </fieldset>
  );
}

{
  /* <div>
      <label
        htmlFor="checkboxLabelFour"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabelFour"
            className="sr-only"
            onChange={() => {
              setIsChecked(!isChecked);
            }}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
              isChecked && "border-primary"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                isChecked && "!bg-primary"
              }`}
            >
              {" "}
            </span>
          </div>
        </div>
        Checkbox Text
      </label> */
}
