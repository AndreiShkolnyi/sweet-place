import supabase from "./supabase";

export const fetchCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("Cabins could not be loaded");
  return data;
};
