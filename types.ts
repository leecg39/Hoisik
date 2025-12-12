import React from "react";

export interface PlaceStats {
  mood: number;
  noise: number;
  taste: number;
}

export interface Place {
  id: number;
  name: string;
  engName: string;
  category: string;
  tags: string[];
  desc: string;
  stats: PlaceStats;
  image: string;
  location: string;
}

export interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface VoteState {
  [key: number]: number;
}

export interface LikedState {
  [key: number]: boolean;
}