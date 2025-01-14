import { Subteam } from "@/types/types";

import team from "@/public/placeholder/team.png"

import aania from "@/public/teams/Aania-Shah.jpg";
import aaron from "@/public/teams/Aaron-Liang.jpg";
import abigail from "@/public/teams/Abigail-Xu.png";
import adam from "@/public/teams/Adam-Yeo.jpg";
import adeline from "@/public/teams/Adeline-Su.jpeg";
import aiden from "@/public/teams/Aiden-Ramgoolam.jpg";
import alyssa from "@/public/teams/Alyssa-Lam.jpg";
import andrew from "@/public/teams/Andrew-Au.jpg";
// import anvita from "@/public/teams/Anvita-Gupta.jpeg";
// import ashley from "@/public/teams/Ashley-Ferreira.jpg";
// import aung from "@/public/teams/Aung-Khant-Min.jpg";
import bassel from "@/public/teams/Bassel-Al-Omari.jpg";
// import cherry from "@/public/teams/Cherry-Yang.jpeg";
import curits from "@/public/teams/Curits-Sinopoli.jpeg";
// import dania from "@/public/teams/Dania-Laiju.jpg";
import daniel from "@/public/teams/Daniel-Su.jpg";
// import donghwui from "@/public/teams/Donghwui-Kim.jpg";
// import emily from "@/public/teams/Emily.jpeg";
import enoch from "@/public/teams/Enoch-Tin.jpg";
import evelina from "@/public/teams/Evelina-Zheng.png";
// import felix from "@/public/teams/Felix-Yang.jpeg";
// import guo from "@/public/teams/Guo-Chen.jpg";
import isabella from "@/public/teams/Isabella-Rossi.png";
import ishani from "@/public/teams/Ishani-Kurmude.jpeg";
import jacobS from "@/public/teams/Jacob-Schnell.jpeg";
import jacobY from "@/public/teams/Jacob-Yan.png";
import justin from "@/public/teams/Justin-Kim.png";
import kevina from "@/public/teams/Kevina-Li.jpg";
import kim from "@/public/teams/Kim-Hoang.jpg";
// import kriti from "@/public/teams/Kriti-Sodhi.jpg";
import kun from "@/public/teams/Kun-Zhu.jpg";
import leo from "@/public/teams/Leo-Feng.png";
import lucy from "@/public/teams/Lucy-Qi.jpg";
import mariam from "@/public/teams/Mariam-Al-Hulaibi.jpeg";
import michelle from "@/public/teams/Michelle-Lu.jpeg";
import muhammad from "@/public/teams/Bilal-Khan.jpg";
// import nina from "@/public/teams/Nina-Do.jpeg";
// import raiyan from "@/public/teams/Raiyan-Sayeed.jpeg";
import rex from "@/public/teams/Rex-Niu.jpeg";
// import rohan from "@/public/teams/Rohan-Minocha.png";
import roman from "@/public/teams/Roman-Kaharlytskyi.jpeg";
// import sara from "@/public/teams/Sara-Zufishan.jpeg";
import sebastian from "@/public/teams/Sebastian-Valencia.jpg";
import shae from "@/public/teams/Shae.jpg";
// import shamar from "@/public/teams/Shamar-Phillips.jpeg";
// import shashwat from "@/public/teams/Shashwat-Murawala.jpg";
import sheng from "@/public/teams/Sheng-Liang-Chow.jpeg";
// import sherry from "@/public/teams/SherryPic - Sherry.jpg";
// import shruti from "@/public/teams/Shruti-Dua.jpg";
import siddharth from "@/public/teams/Siddharth-Vagavolu.jpg";
import simha from "@/public/teams/Simha-Kalimipalli.png";
import simone from "@/public/teams/Simone-Coutinho.jpg";
import stanley from "@/public/teams/Stanley Lin.png";
// import suhayl from "@/public/teams/Suhayl-Sayed.jpeg";
import teresa from "@/public/teams/Teresa-Zhang Large.jpeg";
import zeaj from "@/public/teams/Zeaj-Zamoranos Large.jpeg";

import meera from "@/public/teams/Meera Mehta.jpeg";
import delin from "@/public/teams/Delin Gu.jpg";
import kelly from "@/public/teams/Kelly Qu.jpg";

import anika from "@/public/teams/Anika Awasti.jpeg"
import rachel from "@/public/teams/Rachel Philipose.jpg"
import aryan from "@/public/teams/Aryan_Vijayan.jpg"

export const TEAM: Subteam[] = [
  {
    id: "presidents",
    name: "President",
    members: [
      {
        id: "president1",
        name: "Kim Hoang",
        position: "President",
        image: kim,
      }
    ],
  },
  {
    id: "internal",
    name: "Internal",
    members: [
      {
        id: "finance1",
        name: "Jacob Yan",
        position: "VP of Finance",
        image: jacobY,
      },
      {
        id: "finance2",
        name: "Enoch Tin",
        position: "Finance Advisor",
        image: enoch,
      },
      {
        id: "internal1",
        name: "Shae-Lynn Stirling",
        position: "Internal Coordinator",
        image: shae,
      },
      {
        id: "internal2",
        name: "Adeline Su",
        position: "Internal Coordinator",
        image: adeline,
      },
      {
        id: "internal3",
        name: "Alyssa Lam",
        position: "Internal Coordinator",
        image: alyssa,
      },
    ],
  },
  {
    id: "events",
    name: "Events",
    members: [
      {
        id: "events1",
        name: "Michelle Lu",
        position: "VP of Events",
        image: michelle,
      },
      {
        id: "events2",
        name: "Curtis Sinopoli",
        position: "VP of Events",
        image: curits,
      },
      {
        id: "events4",
        name: "Joshua Li",
        position: "Event Coordinator",
        image: team,
      },
      {
        id: "events5",
        name: "Andrew Au",
        position: "Event Coordinator",
        image: andrew,
      },
      {
        id: "events6",
        name: "Isabella Rossi",
        position: "Event Coordinator",
        image: isabella,
      },
      {
        id: "events7",
        name: "Leo Feng",
        position: "Event Coordinator",
        image: leo,
      },
      {
        id: "events8",
        name: "Maruhan Selvaratnam",
        position: "Event Coordinator",
        image: team,
      },
      {
        id: "events9",
        name: "Aiden Ramgoolam",
        position: "Event Coordinator",
        image: team,
      },
      {
        id: "events10",
        name: "Mihir Kachroo",
        position: "Event Coordinator",
        image: team,
      },
      {
        id: "events11",
        name: "Ishani Kurmude",
        position: "Event Coordinator",
        image: ishani,
      },
    ],
  },
  {
    id: "outreach",
    name: "Outreach",
    members: [
      {
        id: "outreach1",
        name: "Justin Kim",
        position: "VP of External",
        image: justin,
      },
      {
        id: "outreach2",
        name: "Aaron Liang",
        position: "Outreach Coordinator",
        image: aaron,
      },
      {
        id: "outreach3",
        name: "Adam Yeo",
        position: "Outreach Coordinator",
        image: adam,
      },
      {
        id: "outreach4",
        name: "Kevina Li",
        position: "Outreach Coordinator",
        image: kevina,
      },
      {
        id: "outreach5",
        name: "Simone Coutinho",
        position: "Outreach Coordinator",
        image: simone,
      },
    ],
  },
  {
    id: "education",
    name: "Education",
    members: [
      {
        id: "education1",
        name: "Daniel Bartman",
        position: "VP of Education",
        image: team,
      },
      {
        id: "education2",
        name: "Ammar Siddiqui",
        position: "Education Advisor",
        image: team,
      },
      // reading group
      {
        id: "education3",
        name: "Simha Kalimipalli",
        position: "Reading Group Lead",
        image: simha,
      },
      {
        id: "education4",
        name: "Muhammad Bilal Khan",
        position: "Reading Group Lead",
        image: muhammad,
      },
      {
        id: "education5",
        name: "Jacob Schnell",
        position: "Reading Group Lead",
        image: jacobS,
      },
      // workshop
      {
        id: "education6",
        name: "Bassel Al Omari",
        position: "Workshop Lead",
        image: bassel,
      },
      {
        id: "education7",
        name: "Maisha Thasin",
        position: "Workshop Lead",
        image: team,
      },
      {
        id: "education8",
        name: "Tanvir Deol",
        position: "Workshop Lead",
        image: team,
      },
      {
        id: "education9",
        name: "Roman Kaharlytskyi",
        position: "Workshop Lead",
        image: roman,
      },
      {
        id: "education10",
        name: "Aania Raheem",
        position: "Workshop Lead",
        image: aania,
      },
    ],
  },
  {
    id: "design",
    name: "Design",
    members: [
      {
        id: "design1",
        name: "Stanley Lin",
        position: "VP Design",
        image: stanley,
      },
      {
        id: "design2",
        name: "Meera Mehta",
        position: "Designer",
        image: meera,
      },
      {
        id: "design3",
        name: "Delin Gu",
        position: "Designer",
        image: delin,
      },
      {
        id: "design4",
        name: "Kelly Qu",
        position: "Designer",
        image: kelly,
      },
    ],
  },
  {
    id: "social",
    name: "Social Media",
    members: [
      {
        id: "social1",
        name: "Mick Wang",
        position: "VP of Social Media",
        image: team,
      },
      {
        id: "social2",
        name: "Shae-Lynn Stirling",
        position: "Social Advisor",
        image: shae,
      },
      {
        id: "social3",
        name: "Anika Awasthi",
        position: "Social Media Coordinator",
        image: anika,
      },
      {
        id: "social4",
        name: "Rachel Philipose",
        position: "Social Media Coordinator",
        image: rachel,
      },
      {
        id: "social5",
        name: "Aryan Vijayan",
        position: "Social Media Coordinator",
        image: aryan,
      },
    ],
  },
  {
    id: "development",
    name: "Web Development",
    members: [
      {
        id: "development1",
        name: "Abigail Xu",
        position: "VP of Web Development",
        image: abigail,
      },
      {
        id: "development2",
        name: "Sheng Liang Chow",
        position: "Web Developer",
        image: sheng,
      },
      {
        id: "development3",
        name: "Siddharth Vagavolu",
        position: "Web Developer",
        image: siddharth,
      },
      {
        id: "development4",
        name: "Evelina Zheng",
        position: "Web Developer",
        image: evelina
      },
    ],
  },
  // {
  //   id: "podcast",
  //   name: "Podcast",
  //   members: [
  //     {
  //       id: "podcast1",
  //       name: "Ashley Ferreira",
  //       position: "Podcast Editor and Host",
  //       image: ashley,
  //     },
  //   ],
  // },

];