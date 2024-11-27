"use client";

import { useState, useEffect } from "react";
import { Plus, Shuffle, Trash2 } from "lucide-react";
import { cn, shuffleArray } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

const themes = [
  { bg: "bg-black", emoji: "🔥", name: "Fire" },
  { bg: "bg-emerald-900", emoji: "🌲", name: "Forest" },
  { bg: "bg-rose-950", emoji: "🎯", name: "Target" },
  { bg: "bg-purple-900", emoji: "🔮", name: "Magic" },
  { bg: "bg-amber-800", emoji: "🍯", name: "Honey" },
  { bg: "bg-cyan-900", emoji: "🌊", name: "Ocean" },
  { bg: "bg-yellow-800", emoji: "🌟", name: "Star" },
  { bg: "bg-indigo-900", emoji: "🌌", name: "Galaxy" },
  { bg: "bg-teal-900", emoji: "🪴", name: "Garden" },
  { bg: "bg-orange-900", emoji: "🎃", name: "Autumn" },
  { bg: "bg-blue-900", emoji: "🌠", name: "Night" },
  { bg: "bg-lime-900", emoji: "🍀", name: "Luck" },
  { bg: "bg-fuchsia-900", emoji: "🎆", name: "Festival" },
];

const NAMES_STORAGE_KEY = "standup-manager-names";
const THEME_STORAGE_KEY = "standup-manager-theme";

export default function StandupManager() {
  const [names, setNames] = useState<string[]>([]);
  const [newName, setNewName] = useState("");
  const [currentTheme, setCurrentTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedNames = localStorage.getItem(NAMES_STORAGE_KEY);
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedNames) {
      setNames(JSON.parse(savedNames));
    }

    if (savedTheme) {
      setCurrentTheme(parseInt(savedTheme));
    }

    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      const updatedNames = [...names, newName.trim()];
      setNames(updatedNames);
      localStorage.setItem(NAMES_STORAGE_KEY, JSON.stringify(updatedNames));
      setNewName("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleShuffle = () => {
    const shuffledNames = shuffleArray([...names]);
    const nextTheme = (currentTheme + 1) % themes.length;

    setNames(shuffledNames);
    setCurrentTheme(nextTheme);

    localStorage.setItem(NAMES_STORAGE_KEY, JSON.stringify(shuffledNames));
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme.toString());
  };

  const handleClear = () => {
    setNames([]);
    localStorage.setItem(NAMES_STORAGE_KEY, JSON.stringify([]));
    setCurrentTheme(0);
    localStorage.setItem(THEME_STORAGE_KEY, "0");
  };

  if (isLoading) {
    return (
      <div
        className={cn(
          "min-h-screen flex flex-col items-center justify-center p-6",
          "text-white transition-colors duration-500",
          themes[currentTheme].bg
        )}
      >
        <div className="w-full max-w-sm flex flex-col items-center space-y-6">
          <Skeleton className="w-16 h-16 rounded-full bg-white/10" />

          <Skeleton className="h-8 w-48 bg-white/10" />

          <div className="w-full flex gap-2">
            <Skeleton className="flex-1 h-12 rounded-full bg-white/10" />
            <Skeleton className="w-12 h-12 rounded-full bg-white/10" />
          </div>

          <Skeleton className="h-6 w-32 bg-white/10" />

          <Skeleton className="w-12 h-12 rounded-full bg-white/10" />

          <div className="w-full flex flex-col items-center space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                className="w-full h-12 rounded-full bg-white/10"
              />
            ))}
          </div>

          <Skeleton className="w-12 h-12 rounded-full bg-white/10" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-center p-6",
        "text-white transition-colors duration-500",
        themes[currentTheme].bg
      )}
    >
      <div className="w-full max-w-sm flex flex-col items-center space-y-6">
        <div className="text-7xl animate-bounce">
          {themes[currentTheme].emoji}
        </div>

        <h1 className="text-3xl font-semibold text-white mb-4 leading-tight whitespace-pre-line">
          {themes[currentTheme].name} Standup
        </h1>

        <div className="w-full flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter team member's name"
            className="flex-1 px-4 py-3 rounded-full bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <button
            onClick={handleSubmit}
            className="aspect-square h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300 flex items-center justify-center"
            aria-label="Add team member"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center space-y-2 text-white/70">
          <div className="flex items-center gap-2">
            <span className="text-sky-400">👥</span>
            <span>Team Size: {names.length}</span>
          </div>
        </div>

        <button
          onClick={handleShuffle}
          className="aspect-square h-12 rounded-full bg-white text-slate-900 hover:bg-white/90 transition-colors duration-300 text-md font-medium flex items-center justify-center gap-2"
        >
          <Shuffle className="w-5 h-5" />
        </button>

        {names.length > 0 && (
          <div className="w-full flex flex-col items-center space-y-2 text-white/90">
            {names.map((name, index) => (
              <div
                key={`${name}-${index}`}
                className="w-full flex items-center gap-2 justify-center text-xl"
              >
                <span className="w-full text-center flex justify-between py-2 px-4 rounded-full bg-white/10">
                  <span className="text-white/50 mr-auto">{index + 1}.</span>
                  <span className="flex-1 w-full">{name}</span>
                </span>
              </div>
            ))}
          </div>
        )}

        {names.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className={cn(
                  "aspect-square h-12 rounded-full transition-colors duration-300 flex items-center justify-center",
                  "bg-red-600/20 hover:bg-red-600/30 text-red-500"
                )}
                aria-label="Clear team members"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear Team Members?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to clear all team members? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClear}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}
