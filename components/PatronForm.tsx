import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";

export interface Patron {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  modifiedBy: string;
}

interface PatronFormProps {
  patrons: Patron[];
  setPatrons: React.Dispatch<React.SetStateAction<Patron[]>>;
}

export default function PatronForm({ patrons, setPatrons }: PatronFormProps) {
  const form = useForm<Patron>({
    defaultValues: {
      id: 0,
      firstName: "",
      lastName: "",
      dob: "",
      modifiedBy: "",
    },
  });

  const onSubmit = (data: Patron) => {
    const newId =
      patrons.length > 0 ? Math.max(...patrons.map((p) => p.id)) + 1 : 1;
    setPatrons([...patrons, { ...data, id: newId }]);
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Add New Patron</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modifiedBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modified By</FormLabel>
                  <FormControl>
                    <Input placeholder="Modified By" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Add Patron
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
