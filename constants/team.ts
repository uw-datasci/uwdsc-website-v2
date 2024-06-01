import { Subteam } from "@/types/types";

import team from "@/public/placeholder/team.png"

import aaron from "@/public/teams/Aaron-Liang.jpg"
import adam from "@/public/teams/Adam-Yeo.jpg";
import abigail from "@/public/teams/Abigail-Xu.png";
import adeline from "@/public/teams/Adeline-Su.jpeg";
import aiden from "@/public/teams/Aiden-Ramgoolam.jpg";
import alyssa from "@/public/teams/Alyssa-Lam.jpg";
import andrew from "@/public/teams/Andrew-Au.jpg";
import ashley from "@/public/teams/Ashley-Ferreira.jpg";
import bassel from "@/public/teams/Bassel-Al-Omari.jpg";
import cherry from "@/public/teams/Cherry-Yang.jpeg";
import curits from "@/public/teams/Curits-Sinopoli.jpeg";
import dania from "@/public/teams/Dania-Laiju.jpg";
import donghwui from "@/public/teams/Donghwui-Kim.jpg";
import emily from "@/public/teams/Emily.jpeg";
import enoch from "@/public/teams/Enoch-Tin.jpg";
import evelina from "@/public/teams/Evelina-Zheng.png"
import felix from "@/public/teams/Felix-Yang.jpeg";
import guo from "@/public/teams/Guo-Chen.jpg";
import kevina from "@/public/teams/Kevina-Li.jpg";
import lucy from "@/public/teams/Lucy-Qi.jpg";
import mariam from "@/public/teams/Mariam-Al-Hulaibi.jpeg";
import michelle from "@/public/teams/Michelle-Lu.jpeg";
import raiyan from "@/public/teams/Raiyan-Sayeed.jpeg";
import rex from "@/public/teams/Rex-Niu.jpeg";
import sara from "@/public/teams/Sara-Zufishan.jpeg";
import shae from "@/public/teams/Shae.jpg";
import shamar from "@/public/teams/Shamar-Phillips.jpeg";
import sheng from "@/public/teams/Sheng-Liang-Chow.jpeg";
import shruti from "@/public/teams/Shruti-Dua.jpg";
import siddharth from "@/public/teams/Siddharth-Vagavolu.jpg";
import simone from "@/public/teams/Simone-Coutinho.jpg";
import suhayl from "@/public/teams/Suhayl-Sayed.jpeg";
import kim from "@/public/teams/Kim-Hoang.jpg";
import delin from "@/public/teams/Delin Gu.jpg"
import kelly from "@/public/teams/Kelly Qu.jpg"
import meera from "@/public/teams/Meera Mehta.jpeg"
import stanley from "@/public/teams/Stanley Lin.png"

export const TEAM: Subteam[] = [
  {
    id: "presidents",
    name: "Presidents",
    members: [
      {
        id: "president1",
        name: "Bassel Al Omari",
        position: "Co-President",
        image: bassel,
      },
      {
        id: "president2",
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
        name: "Aaron Liang",
        position: "Outreach Coordinator",
        image: aaron,
      },
      {
        id: "outreach2",
        name: "Adam Yeo",
        position: "Outreach Coordinator",
        image: adam,
      },
      {
        id: "outreach3",
        name: "Kevina Li",
        position: "Outreach Coordinator",
        image: kevina,
      },
      {
        id: "outreach4",
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
        name: "Bassel Al Omari",
        position: "Education Lead",
        image: bassel,
      },
      {
        id: "education3",
        name: "Ammar Siddiqui",
        position: "Education Advisor",
        image: team,
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
        name: "Stanley Lin",
        position: "VP Design",
        image: stanley,
      },
      {
        id: "design2",
        name: "Dellin Gu",
        position: "Graphic Designer",
        image: delin,
      },
      {
        id: "design3",
        name: "Kelly Qu",
        position: "Graphic Designer",
        image: kelly,
      },
      {
        id: "design4",
        name: "Meera Mehta",
        position: "Graphic Designer",
        image: meera,
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
  {
    id: "podcast",
    name: "Podcast",
    members: [
      {
        id: "podcast1",
        name: "Ashley Ferreira",
        position: "Podcast Editor and Host",
        image: ashley, 
      },
    ],
  }, 

];