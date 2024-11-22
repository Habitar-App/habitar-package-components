"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  MaskedCommandInput,
} from "@/components/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { cn } from "@/utils/cn";
import { getObjectItem } from "@/utils/getObjectItem";
import { useCallback, useEffect, useMemo, useState } from "react";
import { patternFormatter } from "react-number-format";
import { v4 } from "uuid";
import { isEqual } from "@/utils/isEqual";
import { Loader2Icon, XIcon } from "lucide-react";
import { CommandList } from "cmdk";
import fuzzy from "fuzzy.js";

const autocompleteFieldUid = v4();

interface AutocompleteProps {
  labelValue: string;
  options: { [field: string]: any }[];
  className?: string;
  buttonClassName?: string;
  clearable?: boolean;
  error?: boolean;
  mask?: string;
  value?: { [field: string]: any } | null;
  defaultOption?: { [field: string]: any };
  onValueChange?: (value: { [field: string]: any }) => void;
  onTypedValueChange?: (value: string) => void;
  searchText?: string;
  isLoading?: boolean;
  customOption?: ({
    option,
    label,
  }: {
    option: { [field: string]: any };
    label: string;
  }) => React.ReactElement;
  actions?: {
    CreationComponent: ({
      typedValue,
      maskedValue,
      setOpen,
      setCurrentOption,
      resetAutocomplete,
    }: {
      typedValue: string;
      maskedValue: string;
      setOpen: (value: boolean) => void;
      setCurrentOption: (value: any) => void;
      resetAutocomplete: VoidFunction;
    }) => React.ReactElement;
  };
}

export function Autocomplete({
  options = [],
  mask = "",
  onValueChange,
  onTypedValueChange,
  labelValue,
  clearable = false,
  value,
  defaultOption,
  searchText = "Pesquise as opções",
  actions,
  className,
  error,
  buttonClassName,
  isLoading,
  customOption,
}: AutocompleteProps) {
  const optionsWithIds = useMemo(
    () =>
      options.map((option) => ({ ...option, [autocompleteFieldUid]: v4() })),
    [options]
  );

  const [open, setOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState<
    { [field: string]: any } | null | undefined
  >(defaultOption || null);
  const [typedValue, setTypedValue] = useState("");
  const [maskedValue, setMaskedValue] = useState("");

  useEffect(() => {
    if (onTypedValueChange) onTypedValueChange(typedValue);
  }, [typedValue, onTypedValueChange]);

  const selectedValue = useMemo(
    () => getObjectItem(currentOption, labelValue),
    [currentOption, labelValue]
  );

  useEffect(() => {
    if (value) {
      const option = optionsWithIds.find((option) => {
        const { [autocompleteFieldUid]: field, ...optionRest } = option;
        return isEqual(value, optionRest);
      });
      setCurrentOption(option || null);
    } else {
      setCurrentOption(defaultOption || null);
    }
  }, [value, defaultOption, optionsWithIds]);

  const maskValue = useCallback(
    (value: string) => {
      if (!value) return "";
      return mask ? patternFormatter(value, { format: mask }) : value;
    },
    [mask]
  );

  const resetAutocomplete = useCallback(
    (e?: React.SyntheticEvent) => {
      e?.preventDefault();
      setTypedValue("");
      setMaskedValue("");
      setCurrentOption(defaultOption || null);
      onValueChange && onValueChange(null!);
    },
    [defaultOption, onValueChange]
  );

  return (
    <div className={cn("flex flex-col", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "justify-between",
              buttonClassName,
              error && "border-red-500"
            )}
          >
            {currentOption
              ? maskValue(selectedValue)
              : "Selecione uma opção..."}

            {isLoading ? (
              <div className="ml-2 h-4 w-4 shrink-0 opacity-50">
                <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />
              </div>
            ) : (
              <div className="flex">
                {clearable && currentOption && (
                  <div
                    className="ml-2 h-4 w-4 shrink-0 rounded-full z-20"
                    onClick={resetAutocomplete}
                  >
                    <XIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  </div>
                )}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
          <Command
            filter={(_, searchValue: string) => {
              let score = 0;
              optionsWithIds.forEach((option) => {
                score = fuzzy(JSON.stringify(option), searchValue).score;
                if (score > 0) return;
              });
              return score
            }}
          >
            {!!mask && (
              <MaskedCommandInput
                format={mask}
                onValueChange={({ value, formattedValue }) => {
                  setTypedValue(value);
                  setMaskedValue(formattedValue);
                }}
              />
            )}
            <CommandInput
              className={cn(mask ? "hidden" : "block")}
              placeholder={searchText}
              value={typedValue}
              onValueChange={setTypedValue}
            />
            <CommandEmpty>Nenhum registro encontrado</CommandEmpty>
            <CommandList>
              <CommandGroup
                className="p-1 gap-1"
                value={currentOption ? currentOption[autocompleteFieldUid] : ""}
              >
                {optionsWithIds.map((option, key) => {
                  const label = getObjectItem(option, labelValue);
                  return (
                    <CommandItem
                      key={key}
                      value={option[autocompleteFieldUid]}
                      disabled={option?.disabled || false}
                      className={cn(option?.disabled && `opacity-50`)}
                      onSelect={() => {
                        if (option.disabled) return;
                        const { [autocompleteFieldUid]: field, ...optionRest } =
                          option;
                        onValueChange && onValueChange(optionRest);
                        setCurrentOption(option);
                        setOpen(false);
                      }}
                    >
                      <p className="hidden">{maskValue(label)}</p>
                      <>
                        {customOption
                          ? customOption({
                              option,
                              label: maskValue(label),
                            })
                          : maskValue(label)}
                      </>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          currentOption &&
                            currentOption[autocompleteFieldUid] ===
                              option[autocompleteFieldUid]
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
            {actions?.CreationComponent && (
              <div className={cn("p-1 pt-0")}>
                {actions.CreationComponent({
                  typedValue,
                  maskedValue,
                  setOpen,
                  setCurrentOption,
                  resetAutocomplete,
                })}
              </div>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
