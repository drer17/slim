"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ToastProps } from "@/components/ui/toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IconCalendar } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Slug, Status } from "@/lib/definitions/response";
import { Calendar } from "../ui/calendar";
import { create } from "@/lib/actions/create";
import { update } from "@/lib/actions/update";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import { Checkbox } from "../ui/checkbox";
import { Record } from "@prisma/client/runtime/library";

const generateZodSchema = <T,>(
  columns: { column: keyof T; type: string; optional?: boolean }[],
) => {
  const schema: Record<string, any> = {};

  columns.forEach((field) => {
    let zodField;

    if (["string", "select", "textarea", "number"].includes(field.type)) {
      zodField = z.string();
      if (!field.optional) {
        zodField = zodField.min(1, `${String(field.column)} is required`);
      }
    } else if (field.type === "date") {
      zodField = z
        .date()
        .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
          message: `${String(field.column)} must be a valid date`,
        });
    } else if (field.type === "boolean") {
      zodField = z.boolean();
    }

    if (field.optional) {
      zodField = zodField?.optional();
    }

    schema[String(field.column)] = zodField;
  });

  return z.object(schema);
};

interface UpsertRowFormProps<T> {
  tableName: string;
  columns: {
    column: keyof T;
    label: string;
    type: string;
    placeholder?: string;
    defaultValue?: any;
    possibleValues?: { label: string; id?: string; value?: string }[];
    optional?: boolean;
    disabled?: boolean;
  }[];
  preCallback?: (data: any) => Slug;
  callback?: (data: any) => void;
  model?: T;
}

const FormRenderer = <T,>({
  tableName,
  columns,
  callback,
  preCallback,
  model,
}: UpsertRowFormProps<T>) => {
  const { toast } = useToast();
  const { formKwargs, setOpenForm } = usePortfolioContext();

  const [loading, setLoading] = React.useState(false);

  const FormSchema = generateZodSchema(columns);
  type FormSchemaType = z.infer<typeof FormSchema>;
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: columns
      .filter((col) => col.defaultValue)
      .reduce(
        (acc, col) => ({
          ...acc,
          [col.column]: col.defaultValue,
        }),
        {},
      ),
  });

  const filterValues = (data: Record<string, any>) => {
    return Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "--undefined"),
    );
  };

  const onSubmit = async (data: FormSchemaType) => {
    setLoading(true);
    const filteredData = filterValues(data);
    const upsertedData = { ...model, ...filteredData };

    const slug = preCallback
      ? preCallback(upsertedData)
      : Object.keys(formKwargs).includes("slug") && formKwargs?.slug
        ? formKwargs?.slug
        : [tableName];

    console.log(slug, upsertedData);

    const response = !Object.keys(upsertedData).includes("id")
      ? await create(slug, upsertedData)
      : await update(slug, upsertedData);

    if (response && response.title === Status.success)
      callback && callback(response.data);

    if (response) toast(response as ToastProps);
    setLoading(false);
    setOpenForm(undefined);
  };

  return (
    <div className="text-xl font-medium dark:text-zinc-400 text-zinc-500 px-1">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.error(errors),
          )}
          className="space-y-4"
        >
          {columns.map((column, index) =>
            ["string"].includes(column.type) ? (
              <FormField
                key={index}
                control={form.control}
                name={String(column.column)}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {column.label}
                      <span className="text-xs">
                        {column.optional && " (optional)"}
                      </span>
                    </FormLabel>
                    <Input
                      id={String(column.column)}
                      placeholder={column.placeholder}
                      disabled={column.disabled}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : ["number"].includes(column.type) ? (
              <FormField
                key={index}
                control={form.control}
                name={String(column.column)}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {column.label}
                      <span className="text-xs">
                        {column.optional && " (optional)"}
                      </span>
                    </FormLabel>
                    <Input
                      id={String(column.column)}
                      placeholder={column.placeholder}
                      disabled={column.disabled}
                      type="number"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : ["date"].includes(column.type) ? (
              <FormField
                key={index}
                control={form.control}
                name={String(column.column)}
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-2">
                    <FormLabel className="mt-2">
                      {String(column.label)}
                      <span className="text-xs">
                        {column.optional && " (optional)"}
                      </span>
                    </FormLabel>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            disabled={column.disabled}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>{column.placeholder}</span>
                            )}
                            <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : column.type === "select" &&
              column.possibleValues?.length &&
              column.possibleValues?.length > 0 ? (
              <FormField
                key={index}
                control={form.control}
                name={String(column.column)}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {column.label}
                      <span className="text-xs">
                        {column.optional && " (optional)"}
                      </span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger disabled={column.disabled}>
                          <SelectValue placeholder={column?.placeholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {column?.optional && (
                          <SelectItem value="--undefined">None</SelectItem>
                        )}
                        {column?.possibleValues?.map((value) => (
                          <SelectItem
                            value={value.id || (value.value as string)}
                            key={value.id || value.value}
                          >
                            {value.label}
                          </SelectItem>
                        ))}
                        {!column?.possibleValues ||
                          (column.possibleValues?.length === 0 && (
                            <p className="text-muted-foreground p-2 text-sm">
                              No items found
                            </p>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : column.type === "boolean" ? (
              <FormField
                key={index}
                control={form.control}
                name={String(column.column)}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="items-center leading-none">
                        <FormLabel>{column.label}</FormLabel>
                        <div className="flex items-center gap-2 leading-none mt-2">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FormDescription>
                            {column.placeholder}
                          </FormDescription>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : (
              <></>
            ),
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            variant="default"
          >
            Submit
          </Button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </Form>
    </div>
  );
};

export default FormRenderer;
