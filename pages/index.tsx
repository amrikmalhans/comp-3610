import { useState, useEffect } from "react";
import PatronForm, { Patron } from "../components/PatronForm";
import PatronList from "../components/PatronList";
import ResetButton from "../components/ResetButton";

export default function Home() {
  const [patrons, setPatrons] = useState<Patron[]>([]);

  useEffect(() => {
    const savedPatrons = JSON.parse(localStorage.getItem("patrons") || "[]");
    setPatrons(savedPatrons);
  }, []);

  useEffect(() => {
    localStorage.setItem("patrons", JSON.stringify(patrons));
  }, [patrons]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Patron Management Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <PatronList
              patrons={patrons}
              setPatrons={
                setPatrons as React.Dispatch<React.SetStateAction<Patron[]>>
              }
            />
          </div>
          <div className="lg:col-span-1">
            <PatronForm
              patrons={patrons}
              setPatrons={
                setPatrons as React.Dispatch<React.SetStateAction<Patron[]>>
              }
            />
            <div className="mt-6">
              <ResetButton
                setPatrons={
                  setPatrons as React.Dispatch<React.SetStateAction<Patron[]>>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
