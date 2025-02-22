"use client";

import { getIcon } from "../global/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";
import { DatePicker } from "../ui/date-picker";
import { fyMonthNames, getFinancialYearStart } from "@/lib/utilities/date";
import React, { useEffect } from "react";
import { getBalanceData } from "@/lib/actions/get";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

export type BalanceSheetProps = Record<
  string,
  {
    icon: string;
    label: string;
    asset: boolean;
    income: Record<string, { label: string; months: Record<string, number> }>;
    expense: Record<string, { label: string; months: Record<string, number> }>;
  }
>;

const BalanceSheet: React.FC<BalanceSheetProps> = () => {
  const [data, setData] = React.useState<BalanceSheetProps | undefined>(
    undefined,
  );
  const [range, setRange] = React.useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: getFinancialYearStart(), to: new Date() });

  useEffect(() => {
    const getData = async () => {
      const newData = await getBalanceData(
        ["portfolio"],
        range.from?.toISOString() || getFinancialYearStart().toISOString(),
        range.to?.toISOString() || new Date().toISOString(),
      );
      setData(newData);
    };
    getData();
  }, [range.to, range.from]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <Label>From</Label>
        <DatePicker
          date={range.from}
          setDate={(date) => setRange((prev) => ({ ...prev, from: date }))}
          placeholder="Select Date From"
        />
        <Label>To</Label>
        <DatePicker
          date={range.to}
          setDate={(date) => setRange((prev) => ({ ...prev, to: date }))}
          placeholder="Select Date To"
        />
      </div>
      <ScrollArea style={{ height: `calc(100vh - 150px)` }}>
        {data &&
          Object.entries(data).map(([id, asset]) => (
            <div key={id} className="flex flex-col gap-3 mt-2">
              <div className="flex gap-2 items-center">
                {getIcon(asset.icon)}
                <h1 className="font-light">{asset.label}</h1>
              </div>
              <div className="flex gap-2 flex-col">
                {Object.keys(asset.income).length > 1 && (
                  <div>
                    <h3 className="text-sm uppercase font-semibold">Income</h3>
                    <Table className="text-sm">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Categories</TableHead>
                          {[...fyMonthNames, "Total"].map((colId) => (
                            <TableHead key={colId}>{colId}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(asset.income)
                          .sort((a, b) =>
                            a[0] === "Total"
                              ? 1
                              : b[0] === "Total"
                                ? -1
                                : a[0] < b[0]
                                  ? 1
                                  : -1,
                          )
                          .map(([category, value]) => (
                            <TableRow
                              key={category}
                              className={cn(
                                value.label === "Total" &&
                                  "font-extrabold text-muted-foreground",
                              )}
                            >
                              <TableCell>{value.label}</TableCell>
                              {[...fyMonthNames, "Total"].map((month, idx) => (
                                <TableCell
                                  key={idx}
                                  className={cn(
                                    month === "Total" &&
                                      "font-extrabold text-muted-foreground",
                                  )}
                                >
                                  {value.months[month].toLocaleString("en-Au", {
                                    style: "currency",
                                    currency: "AUD",
                                  })}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {Object.keys(asset.expense).length > 1 && (
                  <div>
                    <h3 className="uppercase text-sm font-semibold">
                      expenses
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Categories</TableHead>
                          {[...fyMonthNames, "Total"].map((colId) => (
                            <TableHead key={colId}>{colId}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(asset.expense)
                          .sort((a, b) =>
                            a[0] === "Total"
                              ? 1
                              : b[0] === "Total"
                                ? -1
                                : a[0] < b[0]
                                  ? 1
                                  : -1,
                          )
                          .map(([category, value]) => (
                            <TableRow
                              key={category}
                              className={cn(
                                value.label === "Total" &&
                                  "font-extrabold text-muted-foreground",
                              )}
                            >
                              <TableCell>{value.label}</TableCell>
                              {[...fyMonthNames, "Total"].map((month, idx) => (
                                <TableCell
                                  key={idx}
                                  className={cn(
                                    month === "Total" &&
                                      "font-extrabold text-muted-foreground",
                                  )}
                                >
                                  {value.months[month].toLocaleString("en-Au", {
                                    style: "currency",
                                    currency: "AUD",
                                  })}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
              <div className="h-3" />
              <Separator className="w-full" orientation="horizontal" />
              <div className="h-2" />
            </div>
          ))}
      </ScrollArea>
    </div>
  );
};

export default BalanceSheet;
