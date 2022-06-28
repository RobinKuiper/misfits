import prisma from "../lib/prisma";

export const TABLES = [
  { id: 'characters', table: prisma.character },
  { id: 'items', table: prisma.item },
  { id: 'npcs', table: prisma.npc },
  { id: 'locations', table: prisma.location },
  { id: 'notes', table: prisma.note },
];