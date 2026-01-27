"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const PIN_CODE = "1234";

export default function PinInput({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  if (!open) return null;

  const submit = () => {
    if (pin === PIN_CODE) {
      localStorage.setItem("auth", "true");
      router.push("/products");
    } else {
      setError("PIN salah");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-center mb-4">
          Masuk Kasir
        </h2>

        <input
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
            setError("");
          }}
          placeholder="Masukkan PIN"
          className="w-full px-4 py-3 border rounded-xl mb-2"
        />

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 border rounded-xl"
          >
            Batal
          </button>
          <button
            onClick={submit}
            className="flex-1 py-2 bg-blue-600 text-white rounded-xl"
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
}
