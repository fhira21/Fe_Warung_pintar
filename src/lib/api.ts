import { supabase } from "./supabase";

/* ================= CATALOG ================= */

export async function getCatalog() {
  const { data, error } = await supabase
    .from("catalog_view")
    .select("*")
    .order("product_id");

  if (error) throw error;
  return data;
}

/* ================= PRODUCTS ================= */

export async function getAllProducts() {
  const { data, error } = await supabase
    .from("catalog_view")
    .select("*")
    .order("product_id");

  if (error) throw error;
  return data;
}

export async function getProductslist() {
  const { data, error } = await supabase
    .from("products")
    .select("id, name")
    .order("id");

  if (error) throw error;
  return data;
}

export async function createProduct(payload: {
  name: string;
}) {
  const { data, error } = await supabase
    .from("products")
    .insert({ name: payload.name })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(id: number, payload: any) {
  const { error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", id);

  if (error) throw error;
}

/* ================= SELL PRICE ================= */

export async function upsertSellPrice(payload: {
  product_id: number;
  price: number;
  unit: string;
}) {
  const { error } = await supabase
    .from("sell_prices")
    .upsert(payload, {
      onConflict: "product_id,unit",
    });

  if (error) throw error;
}

/* ================= SUPPLIERS ================= */

export async function getAllSuppliers() {
  const { data, error } = await supabase
    .from("suppliers")
    .select("id, name, phone, address")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
}

export async function createSupplier(payload: {
  name: string;
  phone?: string | null;
  address?: string | null;
}) {
  const { data, error } = await supabase
    .from("suppliers")
    .insert({
      name: payload.name,
      phone: payload.phone ?? null,
      address: payload.address ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSupplier(
  id: number,
  payload: {
    name: string;
    phone?: string | null;
    address?: string | null;
  }
) {
  const { error } = await supabase
    .from("suppliers")
    .update({
      name: payload.name,
      phone: payload.phone ?? null,
      address: payload.address ?? null,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteSupplier(id: number) {
  const { error } = await supabase
    .from("suppliers")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

/* ================= BASE PRICE ================= */

export async function createBasePrice(payload: {
  product_id: number;
  supplier_id?: number | null;
  price: number;
  unit: string;
}) {
  const { error } = await supabase
    .from("base_prices")
    .insert({
      product_id: payload.product_id,
      supplier_id: payload.supplier_id ?? null,
      price: payload.price,
      unit: payload.unit,
    });

  if (error) throw error;
}

export async function updateBasePrice(id: number, payload: any) {
  const { error } = await supabase
    .from("base_prices")
    .update(payload)
    .eq("id", id);

  if (error) throw error;
}


export async function deleteBasePrice(id: number) {
  const { error } = await supabase
    .from("base_prices")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

/* ================= DROPDOWN DATA ================= */

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("id, name")
    .order("name");

  if (error) throw error;
  return data;
}

export async function getSuppliers() {
  const { data, error } = await supabase
    .from("suppliers")
    .select("id, name")
    .order("name");

  if (error) throw error;
  return data;
}