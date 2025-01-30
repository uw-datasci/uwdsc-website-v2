import { getQrCode } from "@/utils/apiCalls";
import QRCode from "qrcode";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

export default function QR() {
  const [src, setSrc] = useState<string>("");

  // Generate the QR code when the page loads in
  useEffect(() => {
    generateQr();
  }, []);

  const generateQr = async () => {
    try {
      const res = await getQrCode();
      console.log(res);

      QRCode.toDataURL(
        JSON.stringify({ id: res.data.id, eventArray: res.data.eventArray }),
      )
        .then(setSrc)
        .catch((err) => console.error("Failed to generate QR code:", err));
    } catch (error) {
      console.error("Error:", error); // Handle any errors
      throw error;
    }
  };

  return (
    <>
      <section className="mx-container mb-section mt-14 lg:mt-20">
        <h1 className="mb-14 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
          QR Check-in
        </h1>

        <text className="mb-14 flex justify-center text-center text-3xl text-white">
          Show the QR-Code to an exec!
        </text>

        <div className="flex justify-center">
          <Image src={src} alt="QR Code" className="h-64 w-64" />
        </div>
      </section>
    </>
  );
}
