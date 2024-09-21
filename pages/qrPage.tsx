import { getQrCode } from "@/utils/api-calls"
import QRCode from "qrcode"
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"
import { useState } from "react"
import { useEffect } from "react"


export default function QR() {
  const token = useSelector((state: RootState) => state.loginToken.token);
  const [src, setSrc] = useState<string>('')

  // Generate the QR code when the page loads in
  useEffect(() => {
    generateQr();
  }, [])

  const generateQr = async () => {
    console.log("called " + token);
    try {
      const res = await getQrCode({token: token});
      console.log(res);
  
      QRCode.toDataURL(JSON.stringify({ id: res.data.id, event: res.data.event }))
        .then(setSrc)
        .catch(err => console.error('Failed to generate QR code:', err));
    } catch (error) {
      console.error('Error:', error); // Handle any errors
      throw error;
    }

  }

  return (
    <>
      <section className="mx-container mb-section mt-14 lg:mt-20">
        <h1 className="mb-14 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
          QR Check-in
        </h1>

        <text className="mb-14 text-center text-3xl text-white flex justify-center">Show the QR-Code to an exec!</text>

        <div className="flex justify-center">
          <img src={src} alt="QR Code" className="w-64 h-64" />
        </div>
      </section>
    </>
  )
}