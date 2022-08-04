[11:57 AM, 7/19/2022] Harshita: provide link for tokenswap
[12:16 PM, 7/19/2022] Harshita: module.exports = {
  networks: {},

  // Set default mocha options here, use special reporters etc.
  mocha: {
    useColors: false,
    reporter: "mochawesome",
    reporterOptions: {
      reportFilename: process.env.UNIT_TEST_OUTPUT_FILE + ".json",
      json: true,
      html: false,
    },
  },

  // Configure your compilers
 compilers: {
        solc: {
            version: "native",
            settings: {
                optimizer: {
                    enabled: false
                }
            }
        }
    },
};
