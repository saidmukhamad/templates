import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type Option = {
  value: string;
  label: string;
};

interface MultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
  placeholder?: string;
  maxItems?: number;
  disabled?: boolean;
  renderOption?: (option: Option) => React.ReactNode;
  renderBadge?: (option: Option) => React.ReactNode;
}

export function MultiSelect({
  options,
  selectedValues,
  onChange,
  placeholder = "Select items...",
  maxItems,
  disabled = false,
  renderOption,
  renderBadge,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback(
    (value: string) => {
      onChange(selectedValues.filter((v) => v !== value));
    },
    [selectedValues, onChange]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && selectedValues.length > 0) {
            onChange(selectedValues.slice(0, -1));
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [selectedValues, onChange]
  );

  const selectableOptions = options.filter((option) => !selectedValues.includes(option.value));

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div className="group rounded-md border border-input px-3 py-2  ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selectedValues.map((value) => {
            const option = options.find((o) => o.value === value);
            return option ? (
              <Badge key={option.value} variant="secondary">
                {renderBadge ? renderBadge(option) : option.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option.value);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option.value)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ) : null;
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            disabled={disabled || (maxItems !== undefined && selectedValues.length >= maxItems)}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectableOptions.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectableOptions.map((option) => {
                  return (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("");
                        onChange([...selectedValues, option.value]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {renderOption ? renderOption(option) : option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
