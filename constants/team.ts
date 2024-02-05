import { Subteam } from "@/types/types";

import team from "@/public/placeholder/team.png"

import abigail from "@/public/teams/Abigail.jpeg";
import adeline from "@/public/teams/Adeline-Su.jpeg";
import aiden from "@/public/teams/Aiden-Ramgoolam.jpg";
import alyssa from "@/public/teams/Alyssa-Lam.jpg";
import andrew from "@/public/teams/Andrew-Au.jpg";
import andrewqiao from "@/public/teams/Andrew-Qiao.jpg";
import anvita from "@/public/teams/Anvita-Gupta.jpeg";
import ashley from "@/public/teams/Ashley-Ferreira.jpg";
// import aung from "@/public/teams/Aung-Khant-Min.jpg";
import bansari from "@/public/teams/Bansari-Shah.jpeg";
import bassel from "@/public/teams/Bassel-Al-Omari.jpg";
import cherry from "@/public/teams/Cherry-Yang.jpeg";
import cloris from "@/public/teams/Cloris-Zhang.jpeg";
import curits from "@/public/teams/Curits-Sinopoli.jpeg";
import dania from "@/public/teams/Dania-Laiju.jpg";
import daniel from "@/public/teams/Daniel-Su.jpg";
import donghwui from "@/public/teams/Donghwui-Kim.jpg";
import emily from "@/public/teams/Emily.jpeg";
import enoch from "@/public/teams/Enoch-Tin.jpg";
import felix from "@/public/teams/Felix-Yang.jpeg";
import guo from "@/public/teams/Guo-Chen.jpg";
import hadas from "@/public/teams/Hadas-Barabash.jpg";
import hayden from "@/public/teams/Hayden-Azan.jpg";
import jacob from "@/public/teams/Jacob-Yan.png";
import jacobS from "@/public/teams/Jacob-Schnell.jpeg";
import jennifer from "@/public/teams/Jennifer-Peter.jpeg";
import khushi from "@/public/teams/Khushi-Adukia.jpeg";
import kriti from "@/public/teams/Kriti-Sodhi.jpg";
import kun from "@/public/teams/Kun-Zhu.jpg";
import lucy from "@/public/teams/Lucy-Qi.jpg";
import maggie from "@/public/teams/Maggie-Liu.jpeg";
import mariam from "@/public/teams/Mariam-Al-Hulaibi.jpeg";
import michelle from "@/public/teams/Michelle-Lu.jpeg";
import neysa from "@/public/teams/neysa.png";
import nina from "@/public/teams/Nina-Do.jpeg";
import raiyan from "@/public/teams/Raiyan-Sayeed.jpeg";
import rayaq from "@/public/teams/Rayaq-Siddiqui.jpeg";
import rex from "@/public/teams/Rex-Niu.jpeg";
import rohan from "@/public/teams/Rohan-Minocha.png";
import sara from "@/public/teams/Sara-Zufishan.jpeg";
import sebastian from "@/public/teams/Sebastian-Valencia.jpg";
import shae from "@/public/teams/Shae.jpg";
import shamar from "@/public/teams/Shamar-Phillips.jpeg";
import shashwat from "@/public/teams/Shashwat-Murawala.jpg";
import sherry from "@/public/teams/SherryPic - Sherry.jpg";
import shruti from "@/public/teams/Shruti-Dua.jpg";
import stanley from "@/public/teams/stanley_lin - Stanley.png";
import teresa from "@/public/teams/Teresa-Zhang Large.jpeg";
import soyeon from "@/public/teams/Soyeon-Jang.jpg";
import simone from "@/public/teams/Simone-Coutinho.jpg";
import iris from "@/public/teams/Iris-Kim.png";
import suhayl from "@/public/teams/Suhayl-Sayed.jpeg";
import zeaj from "@/public/teams/Zeaj-Zamoranos Large.jpeg";
import kim from "@/public/teams/Kim-Hoang.jpg";


export const TEAM: Subteam[] = [
  {
    id: "presidents",
    name: "Presidents",
    members: [
      {
        id: "president1",
        name: "Maggie Liu",
        position: "Co-President",
        image: maggie,
        email: "contact@uwdatascience.ca",
      },
      {
        id: "president1",
        name: "Dania Laiju",
        position: "Co-President",
        image: dania,
        email: "contact@uwdatascience.ca"
      },
    ],
  },
  {
    id: "internal",
    name: "Internal",
    members: [
      {
        id: "internal1",
        name: "Enoch Tin",
        position: "VP Internal",
        image: enoch, 
      },
      {
        id: "internal2",
        name: "Felix Yang",
        position: "Internal Coordinator",
        image: felix,
      },
      {
        id: "internal3",
        name: "Adeline Su",
        position: "Internal Coordinator",
        image: adeline,
      },
      {
        id: "internal4",
        name: "Alyssa Lam",
        position: "Internal Coordinator",
        image: alyssa,
      },
      {
        id: "internal5",
        name: "Suhayl Sayed",
        position: "Internal Coordinator",
        image: suhayl,
      },
    ],
  },
  {
    id: "events",
    name: "Events",
    members: [
      {
        id: "events2",
        name: "Kim Hoang",
        position: "VP of Events",
        image: kim,
      },
      {
        id: "external1",
        name: "Raiyan Sayeed",
        position: "External Affairs Lead",
        image: raiyan, 
      },
      {
        id: "events4",
        name: "Leo Feng",
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
        name: "Curtis Sinopoli",
        position: "Event Coordinator",
        image: curits,
      },
      {
        id: "events7",
        name: "Donghwui Kim",
        position: "Event Coordinator",
        image: donghwui,
      },
      {
        id: "events8",
        name: "Emily Wang",
        position: "Event Coordinator",
        image: emily,
      },
      {
        id: "events9",
        name: "Guo Chen",
        position: "Event Coordinator",
        image: guo,
      },
      {
        id: "events10",
        name: "Michelle Lu",
        position: "Event Coordinator",
        image: michelle,
      },
    ],
  },
  {
    id: "outreach",
    name: "Outreach",
    members: [
      {
        id: "outreach1",
        name: "Bansari Shah",
        position: "Outreach Coordinator",
        image: bansari,
      },
      {
        id: "outreach2",
        name: "Iris Kim",
        position: "Outreach Coordinator",
        image: iris,
      },
      {
        id: "outreach3",
        name: "Shashwat Murawala",
        position: "Outreach Coordinator",
        image: shashwat,
      },
    ],
  },
  {
    id: "cxc",
    name: "CxC",
    members: [
      {
        id: "cxc1",
        name: "Jacob Yan",
        position: "VP of CxC",
        image: jacob, 
      },
      {
        id: "cxc2",
        name: "Maggie Guo",
        position: "VP of CxC",
        image: team,
      },
      {
        id: "cxc3",
        name: "Cloris Zhang",
        position: "CxC Coordinator",
        image: cloris,
      },
      {
        id: "cxc4",
        name: "Hayden Azan",
        position: "CxC Coordinator",
        image: hayden,
      },
      {
        id: "cxc5",
        name: "Jeff Liu",
        position: "CxC Coordinator",
        image: team,
      },
      {
        id: "cxc6",
        name: "Jennifer Peter",
        position: "CxC Coordinator",
        image: jennifer,
      },
      {
        id: "cxc7",
        name: "Khushi Adukia",
        position: "CxC Coordinator",
        image: khushi,
      },
      {
        id: "cxc8",
        name: "Andrew Qiao",
        position: "CxC Coordinator", // update may be needed
        image: andrewqiao, 
      },
    ],
  },
  {
    id: "education",
    name: "Education",
    members: [
      {
        id: "education1",
        name: "Hadas Barabash",
        position: "VP of Education",
        image: hadas, 
      },
      {
        id: "education2",
        name: "Ashley Ferreira",
        position: "Reading Group Lead",
        image: ashley,
      },
      {
        id: "education3",
        name: "Jacob Schnell",
        position: "Reading Group Lead",
        image: jacobS,
      },
      {
        id: "education4",
        name: "Soyeon Jang",
        position: "Reading Group Lead",
        image: soyeon,
      },
      {
        id: "education5",
        name: "Basse Al Omari",
        position: "Workshop Lead",
        image: bassel,
      },
      {
        id: "education6",
        name: "Neysa Patel",
        position: "Workshop Lead",
        image: neysa,
      },
      {
        id: "education7",
        name: "Rayaq Siddiqui",
        position: "Workshop Lead",
        image: rayaq,
      },
    ],
  },
  {
    id: "tcc",
    name: "TCC",
    members: [
      {
        id: "tcc1",
        name: "Sara Zufishan",
        position: "VP of TCC",
        image: sara, 
      },
      {
        id: "tcc2",
        name: "Shamar Phillips",
        position: "Data Analyst",
        image: shamar,
      },
      {
        id: "tcc3",
        name: "Aiden Ramgoolam",
        position: "Data Analyst",
        image: aiden,
      },
      {
        id: "tcc4",
        name: "Cherry Yang",
        position: "Data Analyst",
        image: cherry,
      },
      {
        id: "tcc5",
        name: "Nhat Quang Bui",
        position: "Data Analyst",
        image: team,
      },
      {
        id: "tcc6",
        name: "Siddharth Viswanath",
        position: "Data Analyst",
        image: team,
      },
      {
        id: "tcc7",
        name: "Shruti Dua",
        position: "Data Analyst",
        image: shruti,
      },
    ],
  },
  {
    id: "design",
    name: "Design",
    members: [
      {
        id: "design1",
        name: "Kun Zhu",
        position: "VP Design",
        image: kun, 
      },
      {
        id: "design4",
        name: "Zeaj Zamoranos",
        position: "Design Advisor",
        image: zeaj,
      },
      {
        id: "design5",
        name: "Malavika Sikka",
        position: "Graphic Designer",
        image: team,
      },
      {
        id: "design6",
        name: "Daniel Su",
        position: "Graphic Designer",
        image: daniel,
      },
      {
        id: "design7",
        name: "Stanley Lin",
        position: "Graphic Designer",
        image: stanley,
      },
      {
        id: "design8",
        name: "Teresa Zhang",
        position: "Graphic Designer",
        image: teresa,
      },
      {
        id: "design9",
        name: "Sebastian Valencia",
        position: "Graphic Designer",
        image: sebastian,
      },
    ],
  },
  {
    id: "social",
    name: "Social Media",
    members: [
      {
        id: "social1",
        name: "Shae-Lynn Stirling",
        position: "VP of Social Media",
        image: shae,
      },
      {
        id: "social2",
        name: "Mariam Al-Hulaibi",
        position: "Social Media Coordinator",
        image: mariam,
      },
      {
        id: "social3",
        name: "Rex Niu",
        position: "Social Media Coordinator",
        image: rex,
      },
      {
        id: "social4",
        name: "Simone Coutinho",
        position: "Social Media Coordinator",
        image: simone,
      },
      {
        id: "design2",
        name: "Marcus Luong",
        position: "Multimedia Coordinator",
        image: team,
      },
      {
        id: "design3",
        name: "Lucy Qi",
        position: "Multimedia Coordinator",
        image: lucy,
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
        id: "development3",
        name: "Rohan Minocha",
        position: "Backend Developer",
        image: rohan,
      },
      {
        id: "development2",
        name: "Nina Do",
        position: "Frontend Developer",
        image: nina,
      },
    ],
  },
  {
    id: "discord",
    name: "Discord Development",
    members: [
      {
        id: "discord1",
        name: "Maisha Thasin",
        position: "VP of Discord Development",
        image: team, 
      },
      {
        id: "discord2",
        name: "Evelina Zheng",
        position: "Discord Developer",
        image: team,
      },
      {
        id: "discord3",
        name: "Hasan Khan",
        position: "Discord Developer",
        image: team,
      },
      {
        id: "discord4",
        name: "Kriti Sodhi",
        position: "Discord Developer",
        image: kriti,
      },
      {
        id: "discord5",
        name: "Sherry Feng",
        position: "Discord Developer",
        image: sherry,
      },
    ],
  },
  {
    id: "podcast",
    name: "Podcast",
    members: [
      {
        id: "podcast1",
        name: "Anvita Gupta",
        position: "Podcast Host",
        image: anvita, 
      },
      {
        id: "podcast2",
        name: "Jaemin Han",
        position: "Podcast Host",
        image: team,
      },
    ],
  }, 

];