import "@/output.css";
import { Alert, AlertDescription, AlertTitle } from "@/components/Alert";
import { Autocomplete } from "@/components/Autocomplete";
import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { Ping } from "@/components/Ping";
import { Label } from "@/components/Label";
import { RadioGroup, RadioGroupItem } from "@/components/RadioGroup";
import { Checkbox } from "@/components/Checkbox";
import { Switch } from "@/components/Switch";
import { Badge } from "@/components/Badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "@/components/DropdownMenu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/Command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "@/components/Popover";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/Dialog";
import { Textarea } from "@/components/Textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";

const SelectComponents = {
  Root: Select,
  Content: SelectContent,
  Group: SelectGroup,
  Item: SelectItem,
  Label: SelectLabel,
  Separator: SelectSeparator,
  Trigger: SelectTrigger,
  Value: SelectValue,
};

const DropdownComponents = {
  Root: DropdownMenu,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioItem: DropdownMenuRadioItem,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Group: DropdownMenuGroup,
  Portal: DropdownMenuPortal,
  Sub: DropdownMenuSub,
  SubContent: DropdownMenuSubContent,
  SubTrigger: DropdownMenuSubTrigger,
  RadioGroup: DropdownMenuRadioGroup,
};

const TableComponents = {
  Root: Table,
  Body: TableBody,
  Caption: TableCaption,
  Cell: TableCell,
  Footer: TableFooter,
  Head: TableHead,
  Header: TableHeader,
  Row: TableRow,
};

const CommandComponents = {
  Root: Command,
  Dialog: CommandDialog,
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Shortcut: CommandShortcut,
  Separator: CommandSeparator,
};

const PopoverComponents = {
  Root: Popover,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Anchor: PopoverAnchor,
};

const DialogComponents = {
  Root: Dialog,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Trigger: DialogTrigger,
  Close: DialogClose,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
};

const AlertComponents = {
  Root: Alert,
  Title: AlertTitle,
  Description: AlertDescription,
};

const TabsComponents = {
  Root: Tabs,
  Content: TabsContent,
  List: TabsList,
  Trigger: TabsTrigger,
};

export {
  TabsComponents as Tabs,
  AlertComponents as Alert,
  Autocomplete,
  Button,
  CurrencyInput,
  Input,
  Ping,
  Label,
  RadioGroup,
  RadioGroupItem,
  Checkbox,
  Switch,
  Badge,
  Textarea,
  DialogComponents as Dialog,
  SelectComponents as Select,
  DropdownComponents as DropdownMenu,
  TableComponents as Table,
  CommandComponents as Command,
  PopoverComponents as Popover,
};
