// Before user can access registration page, user must be logged in. User will be redirected to login page if not logged in
// Use hooks and useState to check if user is logged in

import { useState } from "react"
import Image from "next/image"

import CxCBackground from "@/components/UI/CxCBackground"
import spacer from "@/public/cxc/asset-spacer.png";

import TextInput from "@/components/UI/Inputs/CxC/TextInput"
import Dropdown from "@/components/UI/Inputs/CxC/Dropdown"
import TextArea from "@/components/UI/Inputs/CxC/TextArea"
import Checkbox from "@/components/UI/Inputs/CxC/Checkbox"
import Submit from "@/components/UI/Inputs/CxC/Submit"

export default function cxcregistrationpage(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [discordUsername, setDiscordUsername] = useState('');
    const [studyTerm, setStudyTerm] = useState('');
    const [programName, setProgramName] = useState('');
    const [resumeLink, setResumeLink] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [linkedinLink, setLinkedinLink] = useState('');
    const [anyLink, setAnyLink] = useState('');
    const [hackathonNum, setHackathonNum] = useState('');
    const [longAnswer1, setLongAnswer1] = useState('');
    const [longAnswer2, setLongAnswer2] = useState('');
    const [consentChecked, setConsentChecked] = useState(false);
    
    const pronounOptions = [
        "He/Him",
        "She/Her",
        "They/Them",
        "He/They",
        "She/They",
        "Other",
        "Prefer not to say",
      ];

    const ethnicityOptions = [
        "Chinese",
        "Japanese",
        "Korean",
        "Filipino",
        "Vietnamese",
        "South Asian",
        "Black or African",
        "Hispanic / Latino / Spanish Origin",
        "Middle Eastern",
        "First Nations",
        "Metis",
        "Inuit",
        "Caucasian",
        "Other Asian (Thai, Cambodian, etc)",
        "Other",
      ];
    
      const facultyOptions = [
        "Mathematics",
        "Engineering",
        "Arts",
        "Environment",
        "Health",
        "Science",
        "Other"
      ];

      const sizeOptions = [
        "XS",
        "S",
        "M",
        "L",
        "XL"
      ];
     
      const yesNoOptions = ["Yes", "No"];
    
    return(
        <div>
            <div
                className="relative z-10 mx-auto my-0 min-h-screen py-10"
                style={{
                background: "linear-gradient(to bottom, #000000, #03137c)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                }}>
                <CxCBackground />
                <div className="relative flex flex-col items-center space-y-8 z-20 min-h-screen">
                    {/* CXC Title */}
                    <div className="relative left-0 top-0 z-[-1] mb-[100px] w-full font-jersey text-white">
                    <div className="mx-auto flex flex-col items-center justify-center">
                        <div className="text-xl leading-none tracking-[0.05em] lg:text-6xl lg:tracking-[0.1em]">
                        UWDSC Presents
                        </div>
                        <div className="leading-1 text-3xl tracking-[0.1em] lg:text-10xl lg:tracking-[0.2em]">
                        A DATA SCIENCE HACKATHON
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4 text-7xl lg:gap-8 lg:text-[120px]">
                        <span>2</span>
                        <span>0</span>
                        <Image
                            src={spacer}
                            alt=""
                            className="inline-block h-full max-h-[1em] w-auto align-middle"
                        />
                        <span>C</span>
                        <span>x</span>
                        <span>C</span>
                        <Image
                            src={spacer}
                            alt=""
                            className="inline-block h-full max-h-[1em] w-auto align-middle"
                        />
                        <span>2</span>
                        <span>5</span>
                        </div>
                    </div>
                    </div>
                    <div className="px-[5%] py-[3%] w-[80%] flex flex-col items-center space-y-8">
                        {/* Application Form */}
                        <div className="mx-auto mb-[200px] w-[60%] rounded-[30px] border-2 border-white bg-gradient-to-b from-[rgba(0,9,255,0.5)] to-[rgba(255,150,214,0.5)] p-4 text-center font-jersey font-thin tracking-wider text-white">
                        <div className="min-h-screen px-5 py-10 text-white">
                            <h1 className="mb-8 text-center text-5xl font-thin tracking-widest md:text-9xl">
                            Application Form
                            </h1>
                            <form className="mx-auto max-w-xl space-y-4">
                            {/* First Name and Last Name */}
                            <p className="text-left text-xl font-thin tracking-widest">
                                Name
                            </p>
                            <div className="flex gap-4">
                                <TextInput id={"First Name"} name={"First Name"} type={"text"} placeholder={"Enter First Name"} value={firstName} onBlur={function emptyFcn(){}} onChange={e => setFirstName(e.target.value)} />
                                <TextInput id={"Last Name"} name={"Last Name"} type={"text"} placeholder={"Enter Last Name"} value={lastName} onBlur={function emptyFcn(){}} onChange={e => setLastName(e.target.value)} />
                            </div>
                            <p className="text-left text-xl font-thin tracking-widest">
                                Pronouns
                            </p>
                            <Dropdown
                                options={pronounOptions}
                                placeholder="Select Pronouns"
                            />
                            <p className="text-left text-xl font-thin tracking-widest">
                                Ethnicities
                            </p>
                            <Dropdown
                                options={ethnicityOptions}
                                placeholder="Select Ethnicities"
                            />
                            <p className="text-left text-xl font-thin tracking-widest">
                                Phone Number
                            </p>
                            <TextInput id={"Phone Number"} name={"Phone Number"} type={"text"} placeholder={"Enter Phone Number"} value={phoneNumber} onBlur={function emptyFcn(){}} onChange={e => setPhoneNumber(e.target.value)} />
                            <p className="text-left text-xl font-thin tracking-widest">
                                Email
                            </p>
                            <TextInput id={"Email"} name={"Email"} type={"text"} placeholder="Enter Email" value={email} onBlur={function emptyFcn(){}} onChange={e => setEmail(e.target.value)} />
                            <p className="text-left text-xl font-thin tracking-widest">
                                Discord Username
                            </p>
                            <TextInput id={"Discord Username"} name={"Discord Username"} type={"text"} placeholder="Enter Discord Username" value={discordUsername} onBlur={function emptyFcn(){}} onChange={e => setDiscordUsername(e.target.value)} />
                            <p className="text-left text-xl font-thin tracking-widest">
                                Current or Most Recent Study Term (e.g. 1B)
                            </p>
                            <TextInput id={"Study Term"} name={"Study Term"} type={"text"} placeholder="Enter Study Term" value={studyTerm} onBlur={function emptyFcn(){}} onChange={e => setStudyTerm(e.target.value)} />
                            <p className="text-left text-xl font-thin tracking-widest">
                                Faculty
                            </p>
                            <Dropdown options={facultyOptions} placeholder="Select Faculty" />
                            <p className="text-left text-xl font-thin tracking-widest">
                                Program
                            </p>
                            <TextInput id={"Program Name"} name={"Program Name"} type={"text"} placeholder="Enter Program Name" value={programName} onBlur={function emptyFcn(){}} onChange={e => setProgramName(e.target.value)} />
                            <p className="text-left text-xl font-thin tracking-widest">
                                T-Shirt Size
                            </p>
                            <Dropdown options={sizeOptions} placeholder="Select T-Shirt Size" />
                            <p className="text-left text-xl font-thin tracking-widest">
                                Resume (Publicly Accessible Link)
                            </p>
                            <TextInput id={"Resume Link"} name={"Resume Link"} type={"text"} placeholder="Enter Resume Link" value={resumeLink} onBlur={function emptyFcn(){}} onChange={e => setResumeLink(e.target.value)} />
                            <p className="text-left text-xl font-thin tracking-widest">
                                GitHub (Profile Link)
                            </p>
                            <TextInput id={"GitHub Link"} name={"GitHub Link"} type={"text"} placeholder="Enter GitHub Link" value={githubLink} onBlur={function emptyFcn(){}} onChange={e => setGithubLink(e.target.value)} />
                            <p className="text-left text-xl font-thin tracking-widest">
                                LinkedIn (Profile Link)
                            </p>
                            <TextInput id={"LinkedIn Link"} name={"LinkedIn Link"} type={"text"} placeholder="Enter LinkedIn Link" value={linkedinLink} onBlur={function emptyFcn(){}} onChange={e => setLinkedinLink(e.target.value)} />
                            <p className="text-left text-xl font-thin tracking-widest">
                                Any Other Link (Portfolio, Personal Website, etc.)
                            </p>
                            <TextInput id={"Any Link"} name={"Any Link"} type={"text"} placeholder="Enter Link" value={anyLink} onBlur={function emptyFcn(){}} onChange={e => setAnyLink(e.target.value)} />
                            <p className="text-left text-xl font-thin tracking-widest">
                                Have You Attended a Hackathon Before?
                            </p>
                            <Dropdown options={yesNoOptions} placeholder="Select Yes/No" />
                            <p className="text-left text-xl font-thin tracking-widest">
                                Number of Hackathons Attended as a Hacker
                            </p>
                            <TextInput id={"Hackathon Num"} name={"Hackathon Num"} type={"text"} placeholder="Enter Number" value={hackathonNum} onBlur={function emptyFcn(){}} onChange={e => setHackathonNum(e.target.value)} />
                            <p className="text-left text-xl font-thin tracking-widest">
                                What do you hope to see and gain from CxC? Specific workshops,
                                games, activities, anything! (500 characters)
                            </p>
                            <TextArea id={"Long Answer 1"} name={"Long Answer 1"} placeholder="Enter Response" value={longAnswer1} onBlur={function emptyFcn(){}} onChange={e => setLongAnswer1(e.target.value)} maxLength={500} />
                            <p className="text-left text-xl font-thin tracking-widest">
                                What are your long-term future ambitions? (500 characters)
                            </p>
                            <TextArea id={"Long Answer 2"} name={"Long Answer 2"} placeholder="Enter Response" value={longAnswer2} onBlur={function emptyFcn(){}} onChange={e => setLongAnswer2(e.target.value)} maxLength={500} />
                            <div className="flex justify-start">
                                <Checkbox
                                id={"Consent"}
                                name={"Consent"}
                                checkboxString={"I Consent to Having my Email Shared with CxC and DSC Sponsors"}
                                value={consentChecked}
                                onChange={e => setConsentChecked(e.target.value)}
                                />
                            </div>
                            <Submit text="Submit" />
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}