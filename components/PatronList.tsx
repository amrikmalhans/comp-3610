import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Patron } from "./PatronForm";

export default function PatronList({
  patrons,
  setPatrons,
}: {
  patrons: Patron[];
  setPatrons: React.Dispatch<React.SetStateAction<Patron[]>>;
}) {
  const [sortColumn, setSortColumn] = useState<keyof Patron | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleDelete = (id: number) => {
    setPatrons((prevPatrons) =>
      prevPatrons.filter((patron) => patron.id !== id)
    );
  };

  const handleEdit = (id: number, field: keyof Patron, value: string) => {
    setPatrons((prevPatrons) =>
      prevPatrons.map((patron) =>
        patron.id === id ? { ...patron, [field]: value } : patron
      )
    );
  };

  const handleSort = (column: keyof Patron) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedPatrons = [...patrons].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Patrons List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {["firstName", "lastName", "dob", "modifiedBy"].map(
                  (column) => (
                    <TableHead
                      key={column}
                      onClick={() => handleSort(column as keyof Patron)}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                      {sortColumn === column &&
                        (sortDirection === "asc" ? " ▲" : " ▼")}
                    </TableHead>
                  )
                )}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPatrons.map((patron) => (
                <TableRow key={patron.id}>
                  {["firstName", "lastName", "dob", "modifiedBy"].map(
                    (field) => (
                      <TableCell key={field}>
                        <Input
                          value={patron[field as keyof Patron]}
                          onChange={(e) =>
                            handleEdit(
                              patron.id,
                              field as keyof Patron,
                              e.target.value
                            )
                          }
                          className="w-full"
                        />
                      </TableCell>
                    )
                  )}
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(patron.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
