import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { QRCodeData } from "@/types/types";

export default function QR () {
  const [imageSourceUrl, setImageSourceUrl] = useState("");
  const data : QRCodeData = {
    id: useSelector((state: RootState) => state.loginToken.id),
    event: "BOT Fall 2024" // ???
  }

  useEffect(() => {
    generateQRCode()
  }, [])

  const generateQRCode = async () => {
    try {
      const response = await axios.post("/api/send/qr-code", data)
      console.log(response.data)
      // const url = URL.createObjectURL(response.data);
      // console.log(url);
      setImageSourceUrl(response.data.dataUrl);
    } catch (error) {
      console.log("Error generating QR Code:", error)
    }
  }

  return (
    <>
      <section className="mx-container mb-section mt-14 lg:mt-20">
        <h1 className="mb-14 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
          QR Check-in
        </h1>
        <img src={ imageSourceUrl } alt="QR Code"/>
        {/* Display QR Code Here */}
      </section>
    </>
  )
}