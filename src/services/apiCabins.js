import { transliterateFilename } from "../utils/helpers";
import supabase from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("Cabins could not be loaded");
  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("Cabin could not be deleted");
  return data;
};

export const createOrUpdateCabin = async (newCabin, id) => {
  const baseApi = import.meta.env.VITE_SUPABASE_API;
  const hasImagePath = newCabin.image?.startsWith?.(baseApi);
  const imageName = `${Math.random()}-${transliterateFilename(
    newCabin.image?.name || ""
  )}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${baseApi}/storage/v1/object/public/cabin-images/${imageName}`;

  let baseQuery = supabase.from("cabins");

  if (!id) {
    baseQuery = baseQuery.insert([{ ...newCabin, image: imagePath }]);
  }

  if (id) {
    baseQuery = baseQuery
      .update({ ...newCabin, image: imagePath })
      .eq("id", id);
  }

  const { data, error } = await baseQuery.select().single();

  if (error) throw new Error("Cabin could not be created");

  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.log(storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created"
      );
    }
  }

  return data;
};
