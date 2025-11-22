import { Subteam } from "@/types/types";

import team from "@/public/placeholder/team.png";
//F25 team
// Presidents
import monicaTrinh from "@/public/teams/Monica-Trinh.jpg";
import jacobYan from "@/public/teams/Jacob-Yan.jpg";

// Development
import jocelynXu from "@/public/teams/Jocelyn-Xu.jpg";
import aaryanPatel from "@/public/teams/Aaryan-Patel.png";
import aditiJha from "@/public/teams/Aditi-Jha.jpg";
import claireLiu from "@/public/teams/Claire-Liu.jpg";
import shreeyaSantha from "@/public/teams/Shreeya-Santha.jpg";
import karthikViriyala from "@/public/teams/Karthik-Viriyala.jpeg";
import brianAn from "@/public/teams/Brian-An.png";
import andyXu from "@/public/teams/Andy-Xu.jpg";
import sriganSivagnanenthirarajah from "@/public/teams/Srigan-Sivagnanenthirarajah.jpg";
import jerryZhu from "@/public/teams/Jerry-Zhu.png";

// Events
import annieWong from "@/public/teams/Annie-Wong.jpeg";
import nancyZhou from "@/public/teams/Nancy-Zhou.jpg";
import chantalZhang from "@/public/teams/Chantal-Zhang.jpg";
import annaWang from "@/public/teams/Anna-Wang.png";
import michaelLiu from "@/public/teams/Michael-Liu.jpg";
import jonathanShanmuganantham from "@/public/teams/Jonathan-Shanmuganantham.jpeg";
import matthewLi from "@/public/teams/Matthew-Li.jpeg";
import elaineLi from "@/public/teams/Elaine-Li.jpg";
import karenGuan from "@/public/teams/Karen-Guan.jpeg";

// Education
// Workshop
import ishirLakhani from "@/public/teams/Ishir-Lakhani.png";
import nahalHabibizadeh from "@/public/teams/Nahal-Habibizadeh.jpeg";
import stevenGu from "@/public/teams/Steven-Gu.jpg";
// Project
import tanayKashyap from "@/public/teams/Tanay-Kashyap.jpeg";
import lunaNguyen from "@/public/teams/Luna-Nguyen.jpg";
import dishitaChawla from "@/public/teams/Dishita-Chawla.jpg";

// CXC
import michaelZhang from "@/public/teams/Michael-Zhang.jpg";
import davidHe from "@/public/teams/David-He.png";
import adhyaSharma from "@/public/teams/Adhya-Sharma.jpg";
import parithySenthamilarasan from "@/public/teams/Parithy-Senthamilarasan.jpeg";
import simoneCoutinho from "@/public/teams/Simone-Coutinho.jpeg";
import aaronLiang from "@/public/teams/Aaron-Liang.jpg";
import danielPu from "@/public/teams/Daniel-Pu.jpg";
import ianLeung from "@/public/teams/Ian-Leung.jpg";
import parsaAhmadnezhad from "@/public/teams/Parsa-Ahmadnezhad.jpg";

// Socials
// missing diya dang and ansh singh and jia naidu
import adnanNasiree from "@/public/teams/Adnan-Nasiree.jpg";
import ayushGarg from "@/public/teams/Ayush-Garg.jpg";
import harryCheng from "@/public/teams/Harry-Cheng.png";

// Design
import winstonZhao from "@/public/teams/Winston-Zhao.png";
import danyaCheng from "@/public/teams/Danya-Cheng.jpg";
import charleneLee from "@/public/teams/Charlene-Lee.jpg";
import justinLuu from "@/public/teams/Justin-Luu.png";
import lilySong from "@/public/teams/Lily-Song.jpg";

// Internals
import paigeLi from "@/public/teams/Paige-Li.jpeg";
import sophiaLin from "@/public/teams/Sophia-Lin.jpeg";
import jiaHuang from "@/public/teams/Jia-Huang.jpeg";
import aidenSuh from "@/public/teams/Aiden-Suh.jpg";

// Finance
import nimishPatri from "@/public/teams/Nimish-Patri.jpg";
import maxHan from "@/public/teams/Max-Han.jpg";

// Outreach
import mincyYang from "@/public/teams/Mincy-Yang.png";
import kevinKang from "@/public/teams/Kevin-Kang.jpg";
import methuliAmarasinghe from "@/public/teams/Methuli-Amarasinghe.jpeg";
import kapilIyer from "@/public/teams/Kapil-Iyer.jpg";
import mathumaranThavarajah from "@/public/teams/Mathumaran Thavarajah.jpg";
import judahBrill from "@/public/teams/Judah-Brill.jpg";
import mahekPatel from "@/public/teams/Mahek-Patel.jpg";
import cindyYang from "@/public/teams/Cindy-Yang.jpg";

// Advisors
import winstonYu from "@/public/teams/Winston-Yu.jpg";
import kimGuo from "@/public/teams/Kim-Guo.jpg";

export const TEAM: Subteam[] = [
  {
    id: "presidents",
    name: "Presidents",
    members: [
      {
        id: "president1",
        name: "Monica Trinh",
        position: "Co-President",
        image: monicaTrinh,
      },
      {
        id: "president2",
        name: "Jacob Yan",
        position: "Co-President",
        image: jacobYan,
      },
    ],
  },
  {
    id: "developement",
    name: "Development",
    members: [
      {
        id: "aaryan-patel",
        name: "Aaryan Patel",
        position: "VP of Development",
        image: aaryanPatel,
      },
      {
        id: "jocelyn-xu",
        name: "Jocelyn Xu",
        position: "VP of Development",
        image: jocelynXu,
      },
      {
        id: "brian-an",
        name: "Brian An",
        position: "Developer",
        image: brianAn,
      },
      {
        id: "karthik-viriyala",
        name: "Karthik Krishna Viriyala",
        position: "Developer",
        image: karthikViriyala,
      },
      {
        id: "aditi-jha",
        name: "Aditi Jha",
        position: "Developer",
        image: aditiJha,
      },
      {
        id: "srigan-sivagnanenthirarajah",
        name: "Srigan Sivagnanenthirarajah",
        position: "Developer",
        image: sriganSivagnanenthirarajah,
      },
      {
        id: "claire-liu",
        name: "Claire Liu",
        position: "Developer",
        image: claireLiu,
      },
      {
        id: "andy-xu",
        name: "Andy Xu",
        position: "Developer",
        image: andyXu,
      },
      {
        id: "shreeya-santha",
        name: "Shreeya Santha",
        position: "Developer",
        image: shreeyaSantha,
      },
      {
        id: "jerry-zhu",
        name: "Jerry Zhu",
        position: "Developer",
        image: jerryZhu,
      },
    ],
  },
  {
    id: "events",
    name: "Events",
    members: [
      {
        id: "annie-wong",
        name: "Annie Wong",
        position: "VP of Events",
        image: annieWong,
      },
      {
        id: "nancy-zhou",
        name: "Nancy Zhou",
        position: "VP of Events",
        image: nancyZhou,
      },
      {
        id: "chantal-zhang",
        name: "Chantal Zhang",
        position: "Event Coordinator",
        image: chantalZhang,
      },
      {
        id: "anna-wang",
        name: "Anna Wang",
        position: "Event Coordinator",
        image: annaWang,
      },
      {
        id: "michael-liu",
        name: "Michael Liu",
        position: "Event Coordinator",
        image: michaelLiu,
      },
      {
        id: "jonathan-shanmuganantham",
        name: "Jonathan Shanmuganantham",
        position: "Event Coordinator",
        image: jonathanShanmuganantham,
      },
      {
        id: "matthew-li",
        name: "Matthew Li",
        position: "Event Coordinator",
        image: matthewLi,
      },
      {
        id: "elaine-li",
        name: "Elaine Li",
        position: "Event Coordinator",
        image: elaineLi,
      },
      {
        id: "karen-guan",
        name: "Karen Guan",
        position: "Event Coordinator",
        image: karenGuan,
      },
    ],
  },
  {
    id: "education",
    name: "Education",
    members: [
      {
        id: "ishir-lakhani",
        name: "Ishir Lakhani",
        position: "VP of Education",
        image: ishirLakhani,
      },
      {
        id: "tanay-kashyap",
        name: "Tanay Kashyap",
        position: "VP of Education",
        image: tanayKashyap,
      },
      {
        id: "dishita-chawla",
        name: "Dishita Chawla",
        position: "Project Lead",
        image: dishitaChawla,
      },
      {
        id: "luna-nguyen",
        name: "Luna Nguyen",
        position: "Project Lead",
        image: lunaNguyen,
      },
      {
        id: "nahal-habibizadeh",
        name: "Nahal Habibizadeh",
        position: "Workshop Lead",
        image: nahalHabibizadeh,
      },
      {
        id: "steven-gu",
        name: "Steven Gu",
        position: "Workshop Lead",
        image: stevenGu,
      },
    ],
  },
  {
    id: "socials",
    name: "Social Media",
    members: [
      {
        id: "diya-dang",
        name: "Diya Dang",
        position: "VP of Social Media",
        image: team,
      },
      {
        id: "adnan-nasiree",
        name: "Adnan Quemarz Nasiree",
        position: "Social Media Coordinator",
        image: adnanNasiree,
      },
      {
        id: "ayush-garg",
        name: "Ayush Garg",
        position: "Social Media Coordinator",
        image: ayushGarg,
      },
      {
        id: "harry-cheng",
        name: "Harry Cheng",
        position: "Social Media Coordinator",
        image: harryCheng,
      },
      {
        id: "ansh-singh",
        name: "Ansh Singh",
        position: "Social Media Coordinator",
        image: team,
      },
      {
        id: "jia-naidu",
        name: "Jia Naidu",
        position: "Social Media Coordinator",
        image: team,
      },
    ],
  },
  {
    id: "design",
    name: "Design",
    members: [
      {
        id: "winston-zhao",
        name: "Winston Zhao",
        position: "VP of Design",
        image: winstonZhao,
      },
      {
        id: "charlene-lee",
        name: "Charlene Lee",
        position: "VP of Design",
        image: charleneLee,
      },
      {
        id: "danya-cheng",
        name: "Danya Cheng",
        position: "Graphic Designer",
        image: danyaCheng,
      },
      {
        id: "justin-luu",
        name: "Justin Luu",
        position: "Graphic Designer",
        image: justinLuu,
      },
      {
        id: "lily-song",
        name: "Lily Song",
        position: "Graphic Designer",
        image: lilySong,
      },
    ],
  },
  {
    id: "internals",
    name: "Internals",
    members: [
      {
        id: "paige-li",
        name: "Paige Li",
        position: "VP of Internals",
        image: paigeLi,
      },
      {
        id: "sophia-lin",
        name: "Sophia Lin",
        position: "Internals Coordinator",
        image: sophiaLin,
      },
      {
        id: "jia-huang",
        name: "Jia Huang",
        position: "Internals Coordinator",
        image: jiaHuang,
      },
      {
        id: "aiden-suh",
        name: "Aiden Suh",
        position: "Internals Coordinator",
        image: aidenSuh,
      },
    ],
  },
  {
    id: "finance",
    name: "Finance",
    members: [
      {
        id: "nimish-patri",
        name: "Nimish Patri",
        position: "VP of Finance",
        image: nimishPatri,
      },
      {
        id: "max-han",
        name: "Max Han",
        position: "VP of Finance",
        image: maxHan,
      },
    ],
  },
  {
    id: "outreach",
    name: "Outreach",
    members: [
      {
        id: "mincy-yang",
        name: "Mincy Yang",
        position: "VP of Outreach",
        image: mincyYang,
      },
      {
        id: "kevin-kang",
        name: "Kevin Kang",
        position: "VP of Outreach",
        image: kevinKang,
      },
      {
        id: "methuli-amarasinghe",
        name: "Methuli Amarasinghe",
        position: "Outreach Coordinator",
        image: methuliAmarasinghe,
      },
      {
        id: "kapil-iyer",
        name: "Kapil Iyer",
        position: "Outreach Coordinator",
        image: kapilIyer,
      },
      {
        id: "mathumaran-thavarajah",
        name: "Mathumaran Thavarajah",
        position: "Outreach Coordinator",
        image: mathumaranThavarajah,
      },
      {
        id: "judah-brill",
        name: "Judah Brill",
        position: "Outreach Coordinator",
        image: judahBrill,
      },
      {
        id: "mahek-patel",
        name: "Mahek Patel",
        position: "Outreach Coordinator",
        image: mahekPatel,
      },
      {
        id: "cindy-yang",
        name: "Cindy Yang",
        position: "Outreach Coordinator",
        image: cindyYang,
      },
    ],
  },
  {
    id: "cxc",
    name: "CxC",
    members: [
      {
        id: "michael-zhang",
        name: "Michael Zhang",
        position: "VP of CxC",
        image: michaelZhang,
      },
      {
        id: "david-he",
        name: "David He",
        position: "VP of CxC",
        image: davidHe,
      },
      {
        id: "adhya-sharma",
        name: "Adhya Sharma",
        position: "CxC Coordinator",
        image: adhyaSharma,
      },
      {
        id: "parithy-senthamilarasan",
        name: "Parithy Senthamilarasan",
        position: "CxC Coordinator",
        image: parithySenthamilarasan,
      },
      {
        id: "simone-coutinho",
        name: "Simone Coutinho",
        position: "CxC Coordinator",
        image: simoneCoutinho,
      },
      {
        id: "aaron-liang",
        name: "Aaron Liang",
        position: "CxC Coordinator",
        image: aaronLiang,
      },
      {
        id: "daniel-pu",
        name: "Daniel Pu",
        position: "CxC Coordinator",
        image: danielPu,
      },
      {
        id: "ian-leung",
        name: "Ian Leung",
        position: "CxC Coordinator",
        image: ianLeung,
      },
      {
        id: "parsa-ahmadnezhad",
        name: "Parsa Ahmadnezhad",
        position: "CxC Coordinator",
        image: parsaAhmadnezhad,
      },
    ],
  },
  {
    id: "advisors",
    name: "Advisors",
    members: [
      {
        id: "winston-yu",
        name: "Winston Yu",
        position: "Events and CxC Advisor",
        image: winstonYu,
      },
      {
        id: "kim-guo",
        name: "Kim Guo",
        position: "Design Advisor",
        image: kimGuo,
      },
    ],
  },
];
