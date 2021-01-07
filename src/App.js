import React from "react";
import faker from "faker";
import "./styles.css";

export default function App() {
  const createCustomer = (index) => ({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number(91),
    index,
    group: index % 2 === 0 ? "groupA" : "groupB"
  });

  let customers = [...Array(6).keys()].map((v) => createCustomer(v));

  const reduceCustomer = customers.reduce(
    (previous, current) => {
      let groupNum = current.group;
      if (groupNum === "groupA") {
        return {
          groupA: [...previous.groupB, current],
          groupB: previous.groupB
        };
      } else {
        return {
          groupA: previous.groupA,
          groupB: [...previous.groupB, current]
        };
      }
    },
    { groupA: [], groupB: [] }
  );

  console.log("customer is ", customers);
  console.log("reduceCustomer is ", reduceCustomer);

  const Customer = ({ customer }) => {
    return (
      <div>
        <p>{customer.name}</p>
        <p>{customer.group}</p>
      </div>
    );
  };

  const CusotmerReduce = (props) => {
    const { reduceCustomer } = props;
    console.log("reduceCustomer props", reduceCustomer);
    return (
      <>
        <div>
          <h1>GroupA</h1>
        </div>
        {reduceCustomer.groupA.map((customer, index) => (
          <Customer key={"a" + index} customer={customer} />
        ))}
        <hr />
        <div>
          <h1>GroupB</h1>
        </div>
        {reduceCustomer.groupB.map((customer, index) => (
          <Customer key={"b" + index} customer={customer} />
        ))}
      </>
    );
  };

  return (
    <div className="App">
      <CusotmerReduce reduceCustomer={reduceCustomer} />
    </div>
  );
}
