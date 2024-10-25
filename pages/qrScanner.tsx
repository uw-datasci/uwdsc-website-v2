import { useEffect, useRef, useState } from "react";

import QrScanner from "qr-scanner";
import Button from "@/components/UI/Button";
import GradientBorder from "@/components/UI/GradientBorder";
import { useRouter } from "next/router";
import { checkInById, getUserbyId } from "@/utils/api-calls";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import UserCheckInCard from "@/components/cards/UserCheckInDetails";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import withAuth from "@/components/permissions/authPage";
import { AxiosError, isAxiosError } from "axios";
import React from "react";


interface ScannedResult {
  id: string;
  event: string;
}

const QrScannerPage = () => {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const [scanSuccess, setScanSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [QrError, setQrError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const token = useSelector((state: RootState) => state.loginToken.token);
  const [userInfo, setUserInfo] = useState({
    id: "",
    event: "",
    username: "",
    email: "",
    faculty: "",
    hasPaid: false,
    isCheckedIn: false,
  });

  // Result
  const [scannedResult, setScannedResult] = useState<string | undefined>("");

  // Success
  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    setScanSuccess(true);
    scanner.current?.stop();
    console.log(result);
    setScannedResult(result?.data);
    const data: ScannedResult = JSON.parse(result?.data);
    const id = data.id;
    const event = data.event;
    try {
      setLoading(true);
      const response = await getUserbyId({ id: id, token: token });
      const { username, email, faculty, hasPaid, isCheckedIn } =
        response.data;
      setUserInfo({
        id,
        event,
        username,
        email,
        faculty,
        hasPaid,
        isCheckedIn,
      });
      console.log({ id, username, email, faculty, hasPaid, isCheckedIn });
      setQrError(false);
    } catch (err : any | AxiosError) {
      setErrorMessage("Scan failed, you are not authorized");
      setQrError(true);
    }
    setLoading(false);
  };

  const reScan = () => {
    router.reload();
  };

  const checkIn = async () => {
    // check in user
    const response = await checkInById({
      id: userInfo.id,
      token: token,
      eventName: userInfo.event,
    }).catch((err) => {
      console.log(err);
      alert(err.response.data.message);
    });

    if (response && response.data.success) {
      alert("User is checked in !");
    }
  };

  // Fail
  const onScanFail = (err: string | Error) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,

        preferredCamera: "environment",

        highlightScanRegion: true,
        // This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
      });

      // Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // Clean up on unmount.
    // This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.",
      );
  }, [qrOn]);

  return (
    <>
      <section className="mx-container mb-section mt-14 lg:mt-20">
        <h1 className="mb-14 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
          QR Scanner
        </h1>
        {!scanSuccess && (
          <video ref={videoEl} className="h-full w-full rounded-md" />
        )}

        {scanSuccess && (
          loading ? 
          (
            <LoadingSpinner
              size={100}
              classes="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          ) :
          (
            <div>
              <UserCheckInCard
                username={userInfo.username}
                email={userInfo.email}
                faculty={userInfo.faculty}
                hasPaid={userInfo.hasPaid}
                isCheckedIn={userInfo.isCheckedIn}
                error={QrError}
                errorMessage={errorMessage}
              />
              <div className="flex justify-center gap-6 mt-6">
                <GradientBorder
                  rounded="rounded-lg"
                  classes="w-auto inline-block items-center"
                >
                  <Button
                    type="button"
                    hierarchy="secondary"
                    font="font-bold"
                    text="sm:text-lg 2xl:text-xl"
                    padding="py-3 sm:px-7 sm:py-4"
                    rounded="rounded-[15px]"
                    onClick={() => {
                      reScan();
                    }}
                  >
                    Re Scan
                  </Button>
                </GradientBorder>
                  {userInfo.isCheckedIn || !userInfo.hasPaid? <></> :
                    <GradientBorder
                      rounded="rounded-lg"
                      classes="w-auto inline-block items-center"
                    >
                      <Button
                        type="submit"
                        hierarchy="secondary"
                        font="font-bold"
                        text="sm:text-lg 2xl:text-xl"
                        padding="py-3 sm:px-7 sm:py-4"
                        rounded="rounded-[15px]"
                        onClick={() => {
                          checkIn();
                        }}
                      >
                        Check In
                      </Button>
                    </GradientBorder> 
                  }
              </div>
            </div>
          )
        )}
      </section>
    </>
  );
};

export default withAuth(QrScannerPage, ["admin"]);
