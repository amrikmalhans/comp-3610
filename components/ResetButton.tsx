import { Patron } from "./PatronForm";
import { Button } from "@/components/ui/button";
export default function ResetButton({
  setPatrons,
}: {
  setPatrons: React.Dispatch<React.SetStateAction<Patron[]>>;
}) {
  const handleReset = () => {
    if (confirm("Are you sure you want to reset all data?")) {
      setPatrons([]);
      localStorage.removeItem("patrons");
    }
  };

  return (
    <Button onClick={handleReset} variant="destructive" className="mt-4">
      Reset Data
    </Button>
  );
}
