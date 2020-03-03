let mul_factor = 100;
class Population {
  constructor(population_number, target, mutation_rate, x, y) {
    this.population = [];
    this.target = target;
    this.mutation_rate = mutation_rate;
    this.mating = [];
    for (let i = 0; i < population_number; i++) {
      this.population.push(new Chromosome(x, y));
      this.population[i].updatePrecision(this.target);
    }
    this.displayOnHTML();
  }

  naturalSelection() {
    this.mating = [];
    let best_chromosome = this.getBestChromosome();
    let best_precision = best_chromosome.precision;
    for (let i = 0; i < this.population.length; i++) {
      let num_to_add =
        (this.population[i].precision / best_precision) * mul_factor;
      for (let j = 0; j < num_to_add; j++) {
        this.mating.push(this.population[i]);
      }
    }
  }

  crossOver() {
    for (let i = 0; i < this.population.length; i++) {
      let ran_chr_a = this.mating[parseInt(this.mating.length * Math.random())];
      let ran_chr_b = this.mating[parseInt(this.mating.length * Math.random())];
      let ran_split_index = ran_chr_a.toString() * Math.random();
      for (let j = 0; j < this.target.length; j++) {
        this.population[i].updateChromosome(
          ran_chr_a,
          ran_chr_b,
          ran_split_index
        );
        this.population[i].mutate(this.mutation_rate);
        this.population[i].updatePrecision(this.target);
      }
    }
  }

  getBestChromosome() {
    let max = this.population[0].precision;
    let best_chromosome = this.population[0];
    for (let i = 1; i < this.population.length; i++) {
      if (this.population[i].precision > max) {
        max = this.population[i].precision;
        best_chromosome = this.population[i];
      }
    }
    return best_chromosome;
  }

  displayOnHTML(times = []) {
    let bestChromosome = this.getBestChromosome();
    let html = `Currently the best one is ${bestChromosome.toString()} ${
      bestChromosome.precision
    }<br/>`;
    updateParagraph(
      html +
        this.population
          .map(c => `${c.toString()} ${c.precision}`)
          .join("<br/>") +
        "<br>" +
        times.join(",")
    );
  }
}
