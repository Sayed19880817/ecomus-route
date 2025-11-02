import { Button } from "@/components/ui";
import { Input } from "@/components/ui/input";
import React, { Dispatch, FormEvent } from "react";

interface NavSearchProps {
  handleSearch: (e: FormEvent) => void;
  searchQuery: string;
  setSearchQuery: Dispatch<React.SetStateAction<string>>;
}

export default function NavSearch({
  handleSearch,
  searchQuery,
  setSearchQuery,
}: NavSearchProps) {
  return (
    <div className="hidden md:block flex-1 max-w-xl mx-8">
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="Search for anything"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pr-10"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full aspect-square"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </Button>
      </form>
    </div>
  );
}
