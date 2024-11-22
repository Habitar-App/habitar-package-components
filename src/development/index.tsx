import { Autocomplete, Button, Label, Select } from "../index";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Switch } from "@/components/Switch";
import { Field, FieldProps, Formik } from "formik";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { useQuery } from "react-query";
import { searchCustomers } from "./data/searchFoods";

export function Development() {
  const [foodSearch, setGithubSearch] = useState("");
  const search = useMemo(() => foodSearch, [foodSearch]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [formValue, setFormValue] = useState({});

  const { data: foods, isLoading } = useQuery(
    ["fetchCustomers", debouncedSearch],
    () => searchCustomers(search)
  );

  const debounceSetSearch = useCallback(
    debounce((value) => {
      setDebouncedSearch(value);
    }, 300),
    []
  );

  useEffect(() => {
    debounceSetSearch(foodSearch);
  }, [foodSearch, debounceSetSearch]);

  return (
    <div>
      <Formik
        initialValues={{
          amount: 11.5,
          isPaid: true,
          option: null,
          select: "",
        }}
        onSubmit={console.log}
      >
        {({ setFieldValue, handleSubmit, values, resetForm }) => {
          setFormValue(values);
          return (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 p-4">
                <Label>Comida</Label>
                <Autocomplete
                  isLoading={isLoading}
                  clearable={true}
                  labelValue="name"
                  value={values.option}
                  options={foods}
                  onValueChange={(value) => setFieldValue("option", value)}
                  onTypedValueChange={setGithubSearch}
                />

                <Label>Valor</Label>
                <CurrencyInput
                  name="amount"
                  value={values.amount}
                  onValueChange={(data) =>
                    setFieldValue("amount", data.floatValue)
                  }
                />

                <div className="flex align-items-center gap-2">
                  <Switch
                    id="is-paid"
                    name="isPaid"
                    checked={values.isPaid}
                    onCheckedChange={(checked) =>
                      setFieldValue("isPaid", checked)
                    }
                  />
                  <div>
                    <Label htmlFor="is-paid" className="text-sm">
                      Pedido pago?
                    </Label>
                  </div>
                </div>

                <Field name="select">
                  {({ field, form }: FieldProps<any>) => (
                    <Select.Root
                      value={field.value}
                      onValueChange={(value) =>
                        form.setFieldValue(field.name, value)
                      }
                    >
                      <Select.Trigger>
                        <Select.Value placeholder="Select a verified email to display" />
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Item value="m@example.com">
                          m@example.com
                        </Select.Item>
                        <Select.Item value="m@google.com">
                          m@google.com
                        </Select.Item>
                        <Select.Item value="m@support.com">
                          m@support.com
                        </Select.Item>
                      </Select.Content>
                    </Select.Root>
                  )}
                </Field>
                

                <div className="flex gap-2">
                  <Button type="submit">Submit</Button>
                  <Button type="button" onClick={() => resetForm()}>
                    Reset
                  </Button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>

      <div className="p-4">
        <CodeBlock
          text={JSON.stringify(formValue, null, 4)}
          theme={dracula}
          language="json"
        />
      </div>
    </div>
  );
}
