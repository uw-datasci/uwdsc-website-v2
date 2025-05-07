import { Subteam } from "@/types/types";

import team from "@/public/placeholder/team.png";
//W25 team
import aaronLiang from "@/public/teams/Aaron-Liang.jpg";
import aaryanPatel from "@/public/teams/Aaryan-Patel.png";
import adnanNasiree from "@/public/teams/Adnan-Nasiree.jpg";
//import aidenSuh from "@/public/teams/Aiden-Suh";
import akashLakshmanan from "@/public/teams/Akash-Lakshmanan.png";
//import amyBui from "@/public/teams/Amy-Bui";
import amyPeng from "@/public/teams/Amy-Peng.jpg";
import andrewLin from "@/public/teams/Andrew-Lin.jpg";
import annaWang from "@/public/teams/Anna-Wang.jpg";
//import annieGuo from "@/public/teams/Annie-Guo";
import annieWong from "@/public/teams/Annie-Wong.jpg";
import anTran from "@/public/teams/An-Tran.jpg";
import ayushAyush from "@/public/teams/Ayush-Garg.jpg";
import bethanyLiu from "@/public/teams/Bethany-Liu.jpeg";
import chantalZhang from "@/public/teams/Chantal-Zhang.jpg";
import chowShengLiang from "@/public/teams/Sheng-Liang-Chow.jpeg";
import claireLiu from "@/public/teams/Claire-Liu.jpg";
import dakshBanerjee from "@/public/teams/Daksh-Banerjee.jpg";
import danielHu from "@/public/teams/Daniel-Hu.jpg";
import danielSu from "@/public/teams/Daniel-Su.png";
//import davidHe from "@/public/teams/David-He";
import dianaZhao from "@/public/teams/Diana-Zhao.jpg";
import dishitaChawla from "@/public/teams/Dishita-Chawla.jpg";
//import diyaDang from "@/public/teams/Diya-Dang";
import ericHuang from "@/public/teams/Eric-Huang.jpg";
import ethanBencich from "@/public/teams/Ethan-Bencich.jpg";
import frankChen from "@/public/teams/Frank-Chen.jpeg";
import isaacJiang from "@/public/teams/Isaac-Jiang.jpg";
import isabelleLobo from "@/public/teams/Isabelle-Lobo.png";
import ishirLakhani from "@/public/teams/Ishir-Lakhani.png";
import jacobYan from "@/public/teams/Jacob-Yan.png";
import jeffreyKasa from "@/public/teams/Jeffrey-Kasa.jpg";
import jennyYu from "@/public/teams/Jenny-Yu.jpeg";
// import jocelynXu from "@/public/teams/Jocelyn-Xu.jpg";
// jpg issue
import joshuaLi from "@/public/teams/Joshua-Li.jpg";
//import justinBaiyuWang from "@/public/teams/Justin-Wang";
//import karthikKrishnaViriyala from "@/public/teams/Karthik-Viriyala";
import kateColby from "@/public/teams/Kate-Colby.jpeg";
import kaushikChatterjee from "@/public/teams/Kaushik-Chatterjee.jpeg";
import kimGuo from "@/public/teams/Kim-Guo.jpg";
import lukaSpinoti from "@/public/teams/Luka-Spinoti.jpg";
import mahdiKhunt from "@/public/teams/Mahdi-Khunt.png";
import marcusLuong from "@/public/teams/Marcus-Luong.jpg";
import marcusNg from "@/public/teams/Marcus-Ng.jpg";
import meeraMehta from "@/public/teams/Meera-Mehta.jpeg";
import methuliAmarasinghe from "@/public/teams/Methuli-Amarasinghe.jpeg";
import michaelZhang from "@/public/teams/Michael-Zhang.jpg";
//import millyChai from "@/public/teams/Milly-Chai";
import mincyYang from "@/public/teams/Mincy-Yang.png";
import monicaTrinh from  "@/public/teams/Monica-Trinh.jpg";

//import monicaTrinh from "@/public/teams/Monica-Trinh";
import nahalHabibizadeh from "@/public/teams/Nahal-Habibizadeh.jpeg";
import nimishPatri from "@/public/teams/Nimish-Patri.jpg";
import paigeLi from "@/public/teams/Paige-Li.jpg";
import parithySenthamilarasan from "@/public/teams/Parithy-Senthamilarasan.jpg";
import sarahWang from "@/public/teams/Sarah-Wang.jpeg";
import shashwatMurawala from "@/public/teams/Shashwat-Murawala.png";
import shae from "@/public/teams/Shae.jpg";
import simhaKalimipalli from "@/public/teams/Simha-Kalimipalli.jpg";
import simonHampton from "@/public/teams/Simon-Hampton.jpg";
import sophiaLin from "@/public/teams/Sophia-Lin.jpeg";
import stanleyLin from "@/public/teams/Stanley-Lin.png";
import tanayKashyap from "@/public/teams/Tanay-Kashyap.jpg";
import winstonYu from "@/public/teams/Winston-Yu.jpg";
import yiJiaHuang from "@/public/teams/Jia-Huang.jpeg";
import yolandaJian from "@/public/teams/Yolanda-Jian.jpg";
import brianAn from "@/public/teams/Brian-An.png";
export const TEAM: Subteam[] = [
  {
    id: "presidents",
    name: "Presidents",
    members: [
      {
        id: "president1",
        name: "Jacob Yan",
        position: "Co-President",
        image: jacobYan,
      },
      {
        id: "president2",
        name: "Shae-Lynn Stirling",
        position: "Co-President",
        image: shae,
      },
    ],
  },
  {
    id: "developement",
    name: "Web Development",
    members: [
      {
        id: "winston-yu",
        name: "Winston Yu",
        position: "VP of Development",
        image: winstonYu,
      },
      {
        id: "jacob-yan",
        name: "Jacob Yan",
        position: "VP of Development",
        image: jacobYan,
      },
      {
        id: "andrew-lin",
        name: "Andrew Lin",
        position: "Technical Lead",
        image: andrewLin
      },
      {
        id: "brian-an",
        name: "Brian An",
        position: "Developer",
        image: brianAn,
      },
      {
        id: "monica-trinh",
        name: "Monica Trinh",
        position: "Product Designer",
        image: monicaTrinh,
      },
    ],
  },
  {
    id: "events",
    name: "Events",
    members: [
      {
        id: "an-tran",
        name: "An Tran",
        position: "VP of Events",
        image: anTran,
      },
      {
        id: "frank",
        name: "Frank Chen",
        position: "VP of Events",
        image: frankChen,
      },
      {
        id: "ayush-ayush",
        name: "Ayush Ayush",
        position: "Event Coordinator",
        image: ayushAyush,
      },
      {
        id: "joshua-li",
        name: "Joshua Li",
        position: "Event Coordinator",
        image: joshuaLi,
      },
      {
        id: "claire-liu",
        name: "Claire Liu",
        position: "Event Coordinator",
        image: claireLiu,
      },
      {
        id: "fangjing-zhang",
        name: "(Fangjing) Michael Zhang",
        position: "Event Coordinator",
        image: michaelZhang,
      },
      {
        id: "daniel-su",
        name: "Daniel Su",
        position: "Event Coordinator",
        image: danielSu,
      },
      {
        id: "kate-colby",
        name: "Kate Colby",
        position: "Event Coordinator",
        image: kateColby,
      },
    ],
  },
  {
    id: "education",
    name: "Education",
    members: [
      {
        id: "kaushik-chatterjee",
        name: "Kaushik Chatterjee",
        position: "VP of Education",
        image: kaushikChatterjee,
      },
      {
        id: "amy-bui",
        name: "Amy Bui",
        position: "Data Science Mentor",
        image: team,
      },
      {
        id: "akash-lakshmanan",
        name: "Akash Lakshmanan",
        position: "Data Science Mentor",
        image: akashLakshmanan,
      },
      {
        id: "ishir-lakhani",
        name: "Ishir Lakhani",
        position: "Data Science Mentor",
        image: ishirLakhani,
      },
      {
        id: "daniel-hu",
        name: "Daniel Hu",
        position: "Data Science Mentor",
        image: danielHu,
      },
      {
        id: "simha-kalimipalli",
        name: "Simha Kalimipalli",
        position: "Data Science Mentor",
        image: simhaKalimipalli,
      },
      {
        id: "dishita-chawla",
        name: "Dishita Chawla",
        position: "Data Science Mentor",
        image: dishitaChawla,
      },
      {
        id: "jeffrey-kasa",
        name: "Jeffrey Kasa",
        position: "Data Science Mentor",
        image: jeffreyKasa,
      },
      {
        id: "nahal-habibizadeh",
        name: "Nahal Habibizadeh",
        position: "Data Science Mentor",
        image: nahalHabibizadeh,
      },
      {
        id: "tanay-kashyap",
        name: "Tanay Kashyap",
        position: "Data Science Mentor",
        image: tanayKashyap,
      },
      {
        id: "eric-huang",
        name: "Eric Huang",
        position: "ML Reading Groups",
        image: ericHuang,
      },
    ],
  },
  {
    id: "socials",
    name: "Social Media",
    members: [
      {
        id: "sarah-wang",
        name: "Sarah Wang",
        position: "VP of Social Media",
        image: sarahWang,
      },
      {
        id: "isabelle-lobo",
        name: "Isabelle Lobo",
        position: "Multimedia Coordinator",
        image: isabelleLobo,
      },
      {
        id: "sophia-lin",
        name: "Sophia Lin",
        position: "Multimedia Coordinator",
        image: sophiaLin,
      },
      {
        id: "marcus-luong",
        name: "Marcus Luong",
        position: "Multimedia Coordinator",
        image: marcusLuong,
      },
      {
        id: "jenny-yu",
        name: "Jenny Yu",
        position: "Multimedia Coordinator",
        image: jennyYu,
      },
      {
        id: "adnan-nasiree",
        name: "Adnan Quemarz Nasiree",
        position: "Social Media Coordinator",
        image: adnanNasiree,
      },
      {
        id: "diana-zhao",
        name: "Diana Zhao",
        position: "Social Media Coordinator",
        image: dianaZhao,
      },
      {
        id: "mincy-yang",
        name: "Mincy Yang",
        position: "Social Media Coordinator",
        image: mincyYang,
      },
      {
        id: "diya-dang",
        name: "Diya Dang",
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
        id: "monica-trinh",
        name: "Monica Trinh",
        position: "VP of Design",
        image: team,
      },
      {
        id: "stanley-lin",
        name: "Stanley Lin",
        position: "Graphic Designer",
        image: stanleyLin,
      },
      {
        id: "yue-peng",
        name: "Yue (Amy) Peng",
        position: "Graphic Designer",
        image: amyPeng,
      },
      {
        id: "milly-chai",
        name: "Milly Chai",
        position: "Graphic Designer",
        image: team,
      },
      {
        id: "anna-wang",
        name: "Anna Wang",
        position: "Graphic Designer",
        image: annaWang,
      },
      {
        id: "meera-mehta",
        name: "Meera Mehta",
        position: "Graphic Designer",
        image: meeraMehta,
      },
      {
        id: "kim-guo",
        name: "Kim Guo",
        position: "Graphic Designer",
        image: kimGuo,
      },
      {
        id: "parithy-senthamilarasan",
        name: "Parithy Senthamilarasan",
        position: "Graphic Designer",
        image: parithySenthamilarasan,
      },
    ],
  },
  {
    id: "internals",
    name: "Internals",
    members: [
      {
        id: "shashwat-murawala",
        name: "Shashwat Murawala",
        position: "VP of Internals",
        image: shashwatMurawala,
      },
      {
        id: "cathy-zhang",
        name: "Cathy Zhang",
        position: "VP of Internals",
        image: team,
      },
      {
        id: "luka-spinoti",
        name: "Luka Spinoti",
        position: "Internal Coordinator",
        image: lukaSpinoti,
      },
      {
        id: "daksh-banerjee",
        name: "Daksh Banerjee",
        position: "Internal Coordinator",
        image: dakshBanerjee,
      },
      {
        id: "paige-li",
        name: "Paige Li",
        position: "Internals Coordinator",
        image: paigeLi,
      },
      {
        id: "nimish-patri",
        name: "Nimish Patri",
        position: "Internals Coordinator",
        image: nimishPatri,
      },
      {
        id: "methuli-amarasinghe",
        name: "Methuli Amarasinghe",
        position: "Internals Coordinator",
        image: methuliAmarasinghe,
      },
      {
        id: "ethan-bencich",
        name: "Ethan Bencich",
        position: "Internals Coordinator",
        image: ethanBencich,
      },
    ],
  },
];
