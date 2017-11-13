/**
 * Store only the price of additional KG.
 *
 * @@@@@
 * @@ Talvez eu devesse ter salvado tudo aqui, sem banco, mas com o pouco tempo
 * @@  ficou inviável fazer uma pesquisa descente e descobrir o que é melhor prática.
 * @@@@@
 */

const economic = {
      'E1': 2.24,
      'E2': 2.34,
      'E3': 2.36,
      'E4': 2.39,
      'N1': 3.27,
      'N2': 3.77,
      'N3': 4.3,
      'N4': 5.32,
      'N5': 6.55,
      'N6': 8.19,
      'I1': 4.07,
      'I2': 4.57,
      'I3': 5.8,
      'I4': 7.32,
      'I5': 8.95,
      'I6': 11.19
};

const express = {
      'L1': 1.58,
      'L2': 1.62,
      'L3': 1.65,
      'L4': 1.68,
      'E1': 2.98,
      'E2': 3.01,
      'E3': 3.04,
      'E4': 3.08,
      'N1': 5.85,
      'N2': 7.9,
      'N3': 11.12,
      'N4': 13.46,
      'N5': 16.97,
      'N6': 21.07,
      'I1': 8.31,
      'I2': 10.4,
      'I3': 13.62,
      'I4': 16,
      'I5': 19.59,
      'I6': 23.77
};

module.exports = [null, express, economic];