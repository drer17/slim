import { IconCalendar, IconTable } from "@tabler/icons-react";
import { Level2RowViewProps } from "./level-2-row-view";
import { Level2TableViewProps } from "./level-2-table-view";

export const level2PlaceholderData: Level2TableViewProps = {
  pathToResource: ["Home", "Resources", "Models"],
  title: "Level 2 Models",
  items: [
    {
      icon: <svg width="24" height="24" />, // Placeholder icon
      title: "Model 1",
      secondary: "Additional info for Model 1",
      primary: <p className="text-right w-full font-bold">$1,000,000.00</p>,
      tags: [
        { id: "1", label: "Tag1" },
        { id: "2", label: "Tag2" },
      ], // Example tags
      starred: true,
      color: "#ff0000",
      presetColors: ["#ff0000", "#00ff00", "#0000ff"],
      href: "/models/1",
      children: <div>Extra content for Model 1</div>,
      changeColorCallback: (color: string) =>
        console.log("Changed color:", color),
      changeStarCallback: (star: boolean) => console.log("Star changed:", star),
      archiveCallback: () => console.log("Archived Model 1"),
      type: { label: "Type A", icon: <svg width="16" height="16" /> },
    },
    {
      icon: <svg width="24" height="24" />, // Placeholder icon
      title: "Model 2",
      primary: <p className="text-right w-full font-bold">$1,000,000.00</p>,
      tags: [
        { id: "3", label: "TagA" },
        { id: "4", label: "TagB" },
      ], // Example tags
      starred: false,
      color: "#00ff00",
      presetColors: ["#ff0000", "#00ff00", "#0000ff"],
      changeColorCallback: (color: string) =>
        console.log("Changed color:", color),
      changeStarCallback: (star: boolean) => console.log("Star changed:", star),
      archiveCallback: () => console.log("Archived Model 2"),
      type: { label: "Type B", icon: <svg width="16" height="16" /> },
    },
    {
      icon: <svg width="24" height="24" />, // Placeholder icon
      title: "Model 1",
      secondary: "Additional info for Model 1",
      primary: "Primary content for Model 1",
      tags: [
        { id: "6", label: "Tag1" },
        { id: "7", label: "Tag2" },
      ], // Example tags
      starred: true,
      color: "#ff0000",
      presetColors: ["#ff0000", "#00ff00", "#0000ff"],
      href: "/models/1",
      children: <div>Extra content for Model 1</div>,
      changeColorCallback: (color: string) =>
        console.log("Changed color:", color),
      changeStarCallback: (star: boolean) => console.log("Star changed:", star),
      archiveCallback: () => console.log("Archived Model 1"),
      type: { label: "Type A", icon: <svg width="16" height="16" /> },
    },
    {
      icon: <svg width="24" height="24" />,
      title: "Model 2",
      primary: "Primary content for Model 2",
      tags: [
        { id: "8", label: "Tag1" },
        { id: "9", label: "Tag2" },
      ], // Example tags
      starred: false,
      color: "#00ff00",
      presetColors: ["#ff0000", "#00ff00", "#0000ff"],
      changeColorCallback: (color: string) =>
        console.log("Changed color:", color),
      changeStarCallback: (star: boolean) => console.log("Star changed:", star),
      archiveCallback: () => console.log("Archived Model 2"),
      type: { label: "Type B", icon: <svg width="16" height="16" /> },
    },
    {
      icon: <svg width="24" height="24" />,
      title: "Model 3",
      secondary: "Details for Model 3",
      primary: "Primary content for Model 3",
      tags: [
        { id: "10", label: "Tag1" },
        { id: "11", label: "Tag2" },
      ], // Example tags
      starred: true,
      color: "#0000ff",
      presetColors: ["#ff0000", "#00ff00", "#0000ff"],
      changeColorCallback: (color: string) =>
        console.log("Changed color:", color),
      changeStarCallback: (star: boolean) => console.log("Star changed:", star),
      archiveCallback: () => console.log("Archived Model 3"),
      type: { label: "Type C", icon: <svg width="16" height="16" /> },
    },
    {
      icon: <svg width="24" height="24" />,
      title: "Model 4",
      secondary: "Brief info about Model 4",
      primary: "Primary content for Model 4",
      tags: [
        { id: "12", label: "Tag1" },
        { id: "13", label: "Tag2" },
      ], // Example tags
      starred: false,
      color: "#ffff00",
      presetColors: ["#ff0000", "#00ff00", "#0000ff"],
      changeColorCallback: (color: string) =>
        console.log("Changed color:", color),
      changeStarCallback: (star: boolean) => console.log("Star changed:", star),
      archiveCallback: () => console.log("Archived Model 4"),
      type: { label: "Type D", icon: <svg width="16" height="16" /> },
    },
    {
      icon: <svg width="24" height="24" />,
      title: "Model 5",
      secondary: "Extra details for Model 5",
      primary: "Primary content for Model 5",
      tags: [
        { id: "14", label: "Tag1" },
        { id: "15", label: "Tag2" },
      ], // Example tags
      starred: true,
      color: "#00ffff",
      presetColors: ["#ff0000", "#00ff00", "#0000ff"],
      changeColorCallback: (color: string) =>
        console.log("Changed color:", color),
      changeStarCallback: (star: boolean) => console.log("Star changed:", star),
      archiveCallback: () => console.log("Archived Model 5"),
      type: { label: "Type E", icon: <svg width="16" height="16" /> },
    },
    {
      icon: <svg width="24" height="24" />,
      title: "Model 6",
      secondary: "Information for Model 6",
      primary: "Primary content for Model 6",
      tags: [
        { id: "16", label: "Tag1" },
        { id: "17", label: "Tag2" },
      ], // Example tags
      starred: false,
      color: "#ff00ff",
      presetColors: ["#ff0000", "#00ff00", "#0000ff"],
      changeColorCallback: (color: string) =>
        console.log("Changed color:", color),
      changeStarCallback: (star: boolean) => console.log("Star changed:", star),
      archiveCallback: () => console.log("Archived Model 6"),
      type: { label: "Type F", icon: <svg width="16" height="16" /> },
    },
  ],
};

export const level2RowPlaceholderData: Level2RowViewProps = {
  pathToResource: ["Home", "Resources", "Item1"],
  icon: (
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="gray" />
    </svg>
  ),
  title: "Sample Resource",
  tags: [
    { label: "Urgent", color: "grey", detail: true },
    { label: "Important", color: "grey", detail: true },
  ],
  starred: true,
  primary: "Primary Content",
  description: "This is a description of the resource.",
  attributes: [
    { name: "Attribute 1", value: "Value 1" },
    { name: "Attribute 2", value: "Value 2" },
  ],
  documents: [
    { name: "Document 1", url: "/docs/document1.pdf" },
    { name: "Document 2", url: "/docs/document2.pdf" },
  ],
  notes: [
    { author: "User 1", content: "This is a note", timestamp: new Date() },
    { author: "User 2", content: "Another note", timestamp: new Date() },
  ],
  actionButtons: [
    { icon: <IconTable className="" />, label: "Cash Flow", href: "" },
    { icon: <IconCalendar className="" />, label: "Calendar", href: "" },
  ],
  level2Children: [
    {
      icon: (
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" fill="green" />
        </svg>
      ),
      title: "Level 2 Child 1",
      primary: "Primary info",
      tags: [{ label: "Child Tag", color: "yellow" }],
      presetColors: ["green", "yellow"],
      changeColorCallback: (color) => console.log(`Color changed to ${color}`),
      changeStarCallback: (star) =>
        console.log(`Star status changed to ${star}`),
      archiveCallback: () => console.log("Archived"),
    },
    {
      icon: (
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" fill="blue" />
        </svg>
      ),
      title: "Level 2 Child 2",
      primary: "Secondary info",
      tags: [{ label: "Another Tag", color: "purple" }],
      presetColors: ["blue", "purple"],
      changeColorCallback: (color) => console.log(`Color changed to ${color}`),
      changeStarCallback: (star) =>
        console.log(`Star status changed to ${star}`),
      archiveCallback: () => console.log("Archived"),
    },
  ],
  level3Children: [
    {
      icon: (
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" fill="orange" />
        </svg>
      ),
      title: "Level 3 Child 1",
      primary: "Tertiary info",
      tags: [{ label: "Level 3 Tag", color: "orange" }],
      presetColors: ["orange", "black"],
      changeColorCallback: (color) => console.log(`Color changed to ${color}`),
      changeStarCallback: (star) =>
        console.log(`Star status changed to ${star}`),
      archiveCallback: () => console.log("Archived"),
    },
  ],
  changeStarCallback: (star) => {
    console.log(`Starred status changed to: ${star}`);
  },
  menuOptions: [
    { label: "Edit", callback: () => console.log("Edit clicked") },
    { label: "Delete", callback: () => console.log("Delete clicked") },
  ],
};
