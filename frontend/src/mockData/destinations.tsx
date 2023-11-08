import DestinationCardProps from "../interfaces/DestinationCardProps";
import hemsedalImage from "./mockImages/hemsedal.jpg";
import chamonixImage from "./mockImages/chamonix.jpg";
import saalbachImage from "./mockImages/saalbach.jpg";
import couchervelImage from "./mockImages/couchervel.jpg";
import davoslImage from "./mockImages/davos.jpg";
import innsbruckImage from "./mockImages/innsbruck.jpg";
import verbierImage from "./mockImages/verbier.jpg";
import zermattImage from "./mockImages/zermatt.jpg";
import stMoritzImage from "./mockImages/stmoritz.jpg";

export const hemsedal: DestinationCardProps = {
  name: "Hemsedal",
  country: "Norway",
  imageSrc: hemsedalImage,
  imageAlt: "Bilde av Hemsedal",
  lowestPoint: 1030,
  highestPoint: 2479,
  beginner: 8,
  intermediate: 24,
  advanced: 9,
  lifts: 15,
};

export const saalbach: DestinationCardProps = {
  name: "Saalbach-Hinterglem",
  country: "Austria",
  imageSrc: saalbachImage,
  imageAlt: "Bilde av Saalbach-Hinterglem",
  lowestPoint: 1030,
  highestPoint: 2479,
  beginner: 130,
  intermediate: 220,
  advanced: 80,
  lifts: 70,
};

export const zermatt: DestinationCardProps = {
  name: "Zermatt",
  country: "Switzerland",
  imageSrc: zermattImage,
  imageAlt: "Bilde av Zermatt",
  lowestPoint: 1620,
  highestPoint: 3883,
  beginner: 25,
  intermediate: 125,
  advanced: 40,
  lifts: 54,
};

export const chamonix: DestinationCardProps = {
  name: "Chamonix",
  country: "France",
  imageSrc: chamonixImage,
  imageAlt: "Bilde av Chamonix",
  lowestPoint: 1035,
  highestPoint: 3842,
  beginner: 20,
  intermediate: 90,
  advanced: 50,
  lifts: 38,
};

// Verbier, Switzerland
export const verbier: DestinationCardProps = {
  name: "Verbier",
  country: "Switzerland",
  imageSrc: verbierImage,
  imageAlt: "Bilde av Verbier",
  lowestPoint: 821,
  highestPoint: 3330,
  beginner: 20,
  intermediate: 100,
  advanced: 40,
  lifts: 37,
};

// Courchevel, France
export const courchevel: DestinationCardProps = {
  name: "Courchevel",
  country: "France",
  imageSrc: couchervelImage,
  imageAlt: "Bilde av Courchevel",
  lowestPoint: 1300,
  highestPoint: 2738,
  beginner: 19,
  intermediate: 35,
  advanced: 26,
  lifts: 58,
};

export const davos: DestinationCardProps = {
  name: "Davos",
  country: "Switzerland",
  imageSrc: davoslImage,
  imageAlt: "Bilde av Davos",
  lowestPoint: 810,
  highestPoint: 2844,
  beginner: 20,
  intermediate: 60,
  advanced: 40,
  lifts: 57,
};

// St. Moritz, Switzerland
export const stMoritz: DestinationCardProps = {
  name: "St. Moritz",
  country: "Switzerland",
  imageSrc: stMoritzImage,
  imageAlt: "Bilde av St. Moritz",
  lowestPoint: 1775,
  highestPoint: 3303,
  beginner: 15,
  intermediate: 88,
  advanced: 42,
  lifts: 58,
};

// Innsbruck, Austria
export const innsbruck: DestinationCardProps = {
  name: "Innsbruck",
  country: "Austria",
  imageSrc: innsbruckImage,
  imageAlt: "Bilde av Innsbruck",
  lowestPoint: 574,
  highestPoint: 2334,
  beginner: 30,
  intermediate: 50,
  advanced: 20,
  lifts: 35,
};
