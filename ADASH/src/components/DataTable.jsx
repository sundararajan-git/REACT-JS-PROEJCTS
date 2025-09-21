"use client";

import * as React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  IconDotsVertical,
  IconGripVertical,
  IconCircleCheckFilled,
  IconLoader,
} from "@tabler/icons-react";

const DragHandle = ({ id }) => {
  const { attributes, listeners } = useSortable({ id });
  return (
    <Button {...attributes} {...listeners} variant="ghost" size="icon">
      <IconGripVertical />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
};

const EmployeeDrawer = ({ employee }) => {
  const isMobile = useIsMobile();
  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link">{employee.name}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{employee.name}</DrawerTitle>
          <DrawerDescription>Employee Details</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 px-4">
          <div>
            <b>Role:</b> {employee.role}
          </div>
          <div>
            <b>Email:</b> {employee.email}
          </div>
          <div>
            <b>Contact:</b> {employee.contact}
          </div>
          <div>
            <b>Experience:</b> {employee.experience}
          </div>
          <div>
            <b>Status:</b>{" "}
            <Badge
              variant={employee.status === "Active" ? "default" : "outline"}
            >
              {employee.status}
            </Badge>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const columns = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <EmployeeDrawer employee={row.original} />,
  },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "contact", header: "Contact" },
  { accessorKey: "experience", header: "Experience" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      row.original.status === "Active" ? (
        <Badge variant="default">{row.original.status}</Badge>
      ) : (
        <Badge variant="outline">{row.original.status}</Badge>
      ),
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="icon">
        <IconDotsVertical />
        <span className="sr-only">Actions</span>
      </Button>
    ),
  },
];

const DraggableRow = ({ row, dataIds }) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });
  return (
    <TableRow
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      data-dragging={isDragging}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

export const EmployeeDataTable = ({ data: initialData }) => {
  const [data, setData] = React.useState(initialData);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );
  const dataIds = React.useMemo(() => data.map((d) => d.id), [data]);

  const table = useReactTable({
    data,
    columns,
    state: {},
    getRowId: (row) => row.id.toString(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);
      setData((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
        <Table className="border">
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <DraggableRow key={row.id} row={row} dataIds={dataIds} />
            ))}
          </TableBody>
        </Table>
      </SortableContext>
    </DndContext>
  );
};

export const employeeData = [
  {
    id: 1,
    name: "John Doe",
    role: "Developer",
    email: "john1@example.com",
    contact: "1234567890",
    experience: "3 years",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Designer",
    email: "jane2@example.com",
    contact: "9876543210",
    experience: "2 years",
    status: "On Leave",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Manager",
    email: "mike3@example.com",
    contact: "4567891230",
    experience: "5 years",
    status: "Active",
  },
  {
    id: 4,
    name: "Emily Clark",
    role: "QA",
    email: "emily4@example.com",
    contact: "3216549870",
    experience: "4 years",
    status: "Active",
  },
  {
    id: 5,
    name: "David Lee",
    role: "Developer",
    email: "david5@example.com",
    contact: "1597534862",
    experience: "6 years",
    status: "Inactive",
  },
  {
    id: 6,
    name: "Sophia Brown",
    role: "Designer",
    email: "sophia6@example.com",
    contact: "2583691470",
    experience: "3 years",
    status: "Active",
  },
  {
    id: 7,
    name: "Daniel Wilson",
    role: "Manager",
    email: "daniel7@example.com",
    contact: "7539514568",
    experience: "7 years",
    status: "Active",
  },
  {
    id: 8,
    name: "Olivia Martin",
    role: "QA",
    email: "olivia8@example.com",
    contact: "8521479630",
    experience: "2 years",
    status: "On Leave",
  },
  {
    id: 9,
    name: "James Taylor",
    role: "Developer",
    email: "james9@example.com",
    contact: "9517534862",
    experience: "5 years",
    status: "Active",
  },
  {
    id: 10,
    name: "Ava Anderson",
    role: "Designer",
    email: "ava10@example.com",
    contact: "4561237890",
    experience: "4 years",
    status: "Active",
  },
  {
    id: 11,
    name: "William Thomas",
    role: "Manager",
    email: "william11@example.com",
    contact: "7894561230",
    experience: "8 years",
    status: "Active",
  },
  {
    id: 12,
    name: "Isabella Jackson",
    role: "QA",
    email: "isabella12@example.com",
    contact: "1237894560",
    experience: "3 years",
    status: "Inactive",
  },
  {
    id: 13,
    name: "Alexander White",
    role: "Developer",
    email: "alex13@example.com",
    contact: "3216549871",
    experience: "2 years",
    status: "Active",
  },
  {
    id: 14,
    name: "Mia Harris",
    role: "Designer",
    email: "mia14@example.com",
    contact: "9873216540",
    experience: "5 years",
    status: "Active",
  },
  {
    id: 15,
    name: "Ethan Martin",
    role: "Manager",
    email: "ethan15@example.com",
    contact: "6549873210",
    experience: "6 years",
    status: "On Leave",
  },
  {
    id: 16,
    name: "Charlotte Clark",
    role: "QA",
    email: "charlotte16@example.com",
    contact: "7891234560",
    experience: "4 years",
    status: "Active",
  },
  {
    id: 17,
    name: "Michael Lewis",
    role: "Developer",
    email: "michael17@example.com",
    contact: "8529637410",
    experience: "3 years",
    status: "Active",
  },
];
