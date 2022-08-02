// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (num, array) => {
  return {
    specimenNum: num,
    dna: array,
    mutate() {
      let randomBase = Math.round(Math.random() * 14);
      console.log(`${this.dna[randomBase]} will mutate at ${randomBase}`);
      switch (this.dna[randomBase]) {
        case "A":
          this.dna[randomBase] = "T";
          return this.dna;
        case "T":
          this.dna[randomBase] = "A";
          return this.dna;
        case "C":
          this.dna[randomBase] = "G";
          return this.dna;
        case "G":
          this.dna[randomBase] = "C";
          return this.dna;
        default:
          console.log("Invalid base");
          break;
      }
    },
    compareDNA(organismObj) {
      let counter = 0;
      for (let i = 0; i < 15; i++) {
        if (this.dna[i] === organismObj.dna[i]) {
          counter++;
        }
      }
      console.log(counter);
      let percentage = Math.round((counter / 15) * 100);
      console.log(
        `Specimen #${this.specimenNum} and Specimen #${organismObj.specimenNum} share ${percentage}% DNA`
      );
    },
    willLikelySurvive() {
      let counter = 0;
      this.dna.forEach((base) => {
        if (base === "C" || base === "G") {
          counter++;
        }
      });
      let percentage = Math.round((counter / 15) * 100);
      if (percentage >= 60) {
        return true;
      } else {
        return false;
      }
    },
    complementStrand() {
      let complementStrand = [];
      for (let i = 0; i < 15; i++) {
        switch (this.dna[i]) {
          case "A":
            complementStrand[i] = "T";
            break;
          case "T":
            complementStrand[i] = "A";
            break;
          case "C":
            complementStrand[i] = "G";
            break;
          case "G":
            complementStrand[i] = "C";
            break;
          default:
            console.log("Invalid");
            break;
        }
      }
      return complementStrand;
    },
  };
};

const one = pAequorFactory(1, mockUpStrand());
console.log(one.dna);
console.log(one.complementStrand());

const thirtyOrganisms = () => {
  let organismArray = [];
  let counter = 0;
  for (let i = 1; i > counter; i++) {
    const organism = pAequorFactory(i, mockUpStrand());
    if (organism.willLikelySurvive() == true) {
      counter++;
      organismArray.push(organism);
    }
    if (counter == 30) {
      console.log(counter);
      return organismArray;
    }
  }
};
