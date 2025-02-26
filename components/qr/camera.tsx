import { useEffect, useRef, useState } from "react";

import QrScanner from "qr-scanner";
import Button from "@/components/UI/Button";
import GradientBorder from "@/components/UI/GradientBorder";
import { useRouter } from "next/router";
import {
  checkInById,
  getEvents,
  getRegistrationByID,
  getUserbyId,
  patchCheckInRegistrantById,
  patchRegistrationByID,
} from "@/utils/apiCalls";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import UserCheckInCard from "@/components/cards/UserCheckInDetails";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import withAuth from "@/components/permissions/authPage";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import React from "react";
import SingleDropdown from "@/components/UI/Inputs/UWDSC/SingleDropdown";
import InputFeedback from "@/components/UI/Inputs/UWDSC/InputFeedback";
import { User } from "@/types/types";

interface ScannedResult {
  id: string;
  eventArray: [
    {
      id: string;
      secret: string;
    },
  ];
}

type QrProps = {
  onCancel: () => void;
  handleQrScan: (data: User) => void;
};

export const QrScannerCamera = ({ onCancel, handleQrScan }: QrProps) => {
  // QR States
  const token = useSelector((state: RootState) => state.loginToken.token);
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const [scannerRunning, setScannerRunning] = useState<boolean>(false);
  const [cameraAllowed, setCameraAllowed] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [QrError, setQrError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [userInfo, setUserInfo] = useState<any>({});
  const [registrationInfo, setRegistrationInfo] = useState<any>({});
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const [events, setEvents] = useState<Array<any>>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [toDisplayBefore, setToDisplayBefore] = useState<any>(null);
  const [toDisplayAfter, setToDisplayAfter] = useState<any>(null);

  const [reqFeedback, setReqFeedback] = useState<string>("");

  // Result
  const [scannedResult, setScannedResult] = useState<
    ScannedResult | undefined
  >();

  const selectedEventRef = useRef<any>(null);

  useEffect(() => {
    selectedEventRef.current = selectedEvent;
  }, [selectedEvent]);

  // Success
  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    const currEvent = selectedEventRef.current;

    // if (!currEvent) {
    //   setErrorMessage("Please select an event to scan for.");
    //   setQrError(true);
    //   setScannerRunning(false);
    //   return;
    // }

    const scannedResult: ScannedResult = await JSON.parse(result?.data);
    setScannedResult(scannedResult);
    // const events = data.eventArray;
    try {
      setLoading(true);
      const values = {
        id: scannedResult.id,
        token: token,
      };
      const user = (await getUserbyId(values)).data;
      handleQrScan(user);
      // setUserInfo(user);
      // setRegistrationInfo(registrant.additionalFields ?? {});
      // setIsCheckedIn(registrant.checkedIn);
      // setIsSelected(registrant.selected);
      // setToDisplayBefore(currEvent.toDisplay.before);
      // setToDisplayAfter(currEvent.toDisplay.after);
      setQrError(false);
    } catch (err: any | AxiosError) {
      console.log(err);
      if (err.status == 404) {
        setErrorMessage("Scan failed, user is not registered for this event.");
      } else {
        setErrorMessage("Scan failed, something went wrong.");
      }
      setQrError(true);
    }
    setScannerRunning(false);
    setLoading(false);
  };

  const checkIn = async () => {
    console.log(scannedResult);
    if (scannedResult) {
      try {
        const eventSecret = scannedResult.eventArray.filter((event) => {
          return event.id == selectedEvent.id;
        })[0].secret;
        console.log(eventSecret);
        await patchCheckInRegistrantById(
          selectedEvent.id,
          scannedResult.id,
          eventSecret,
        )
          .catch((err) => {
            console.log(err);
            alert(err.response.data.message);
          })
          .then((response: any) => {
            const updatedRegistrant =
              response.data.updatedRegistrant.registrant;
            console.log(updatedRegistrant);
            setUserInfo(updatedRegistrant.user);
            setRegistrationInfo(updatedRegistrant.additionalFields ?? {});
            setIsCheckedIn(updatedRegistrant.checkedIn);
            setIsSelected(updatedRegistrant.selected);
            alert("User is checked in!");
          });
      } catch (e) {
        alert(e);
      }
    }
  };

  useEffect(() => {
    const retrieveEvents = async () => {
      const response = (await getEvents(new Date(), new Date(), true)).data
        .events;
      setEvents(response);
      if (!selectedEvent) {
        setSelectedEvent(response && response.length == 1 ? response[0] : null);
      }
    };

    retrieveEvents();
  }, []);

  useEffect(() => {
    if (scannerRunning && videoEl.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: (err: string | Error) => {
          // console.log(err);
        },

        preferredCamera: "environment",

        highlightScanRegion: true,
        // This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
      });

      // Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setCameraAllowed(true))
        .catch((err) => {
          if (err) setCameraAllowed(false);
        });
    } else if (scanner) {
      scanner?.current?.stop();
    }
  }, [scannerRunning]);

  // If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!cameraAllowed)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.",
      );
  }, [cameraAllowed]);

  useEffect(() => {
    setScannerRunning(true);
  }, [selectedEvent]);

  const checkRequirements = (requirements: any, registrant: any) => {
    const userReq = requirements.user;
    const registrantReq = requirements.registrant;
    const needToBeCheckedIn = requirements.checkedIn;
    const needToBeSelected = requirements.selected;

    let errMsg = "";

    if (
      needToBeCheckedIn != undefined &&
      registrant.checkedIn != needToBeCheckedIn
    ) {
      errMsg += "User is already checked in.";
    }

    if (
      needToBeSelected != undefined &&
      registrant.selected != needToBeSelected
    ) {
      errMsg += "User was not selected to participate.";
    }

    if (userReq) {
      Object.keys(userReq).forEach((key) => {
        if (registrant.user[key] != userReq[key]) {
          errMsg += `'${key}' needs to be ${userReq[key]}; `;
        }
      });
    }

    if (registrantReq) {
      Object.keys(registrantReq).forEach((key) => {
        if (registrant.registration[key] != registrantReq[key]) {
          errMsg += `'${key}' needs to be ${registrantReq[key]}; `;
        }
      });
    }

    return errMsg;
  };

  useEffect(() => {
    if (selectedEvent) {
      setReqFeedback(
        checkRequirements(selectedEvent.requirements, {
          user: userInfo,
          registration: registrationInfo,
          checkedIn: isCheckedIn,
          selected: isSelected,
        }),
      );
    }
  }, [userInfo]);

  return (
    <>
      <section className="mx-container mt-14 lg:mt-20">
        <h1 className="mb-3 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
          QR Scanner
        </h1>

        {scannerRunning && (
          <div>
            {/* div needed so that overlay is properly identified by QR Scanner */}
            <video ref={videoEl} className="h-full w-full rounded-md" />
          </div>
        )}
      </section>
      <button
        onClick={() => {
          scanner?.current?.stop();
          onCancel();
        }}
        className="rounded-md bg-grey2 p-2"
      >
        Close
      </button>
    </>
  );
};
