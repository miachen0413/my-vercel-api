export default function handler(req, res) {
  res.status(200).json({
    production: [{
        id: 1,
        name: "A",
        describe: "AAAA",
        price: 200
      },
      {
        id: 2,
        name: "B",
        describe: "BBBB",
        price: 100
      },
      {
        id: 3,
        name: "C",
        describe: "CCCC",
        price: 300
      },
      {
        id: 2,
        name: "B",
        describe: "BBBB",
        price: 100
      },
      {
        id: 3,
        name: "C",
        describe: "CCCC",
        price: 300
      },
      {
        id: 2,
        name: "B",
        describe: "BBBB",
        price: 100
      },
      {
        id: 3,
        name: "C",
        describe: "CCCC",
        price: 300
      },
    ]
  });
}