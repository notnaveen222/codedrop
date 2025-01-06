import mongoose from "mongoose";
import { codeDropModel } from "./db.js";

const sampleCode = `
const x = 1;
const y = 2;
console.log(x+y);
function sample(param1, param2){
    let z = 5;
    console.log(5);
}
`;

async function sample() {
  const data = await codeDropModel.create({
    id: 2,
    code: sampleCode,
  });
  console.log(data);
}

sample();
