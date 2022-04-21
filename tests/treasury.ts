import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Treasury } from "../target/types/treasury";
import assert from "node:assert";
import dotenv from "dotenv";

dotenv.config({ path: `${process.cwd()}/programs/treasury/src/.env` });

describe("treasury", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Treasury as Program<Treasury>;


  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    const seed = Buffer.from(anchor.utils.bytes.utf8.encode(process.env.TREASURY));

    console.log("id ", program.programId.toString());
    const [pk, bump] = await anchor.web3.PublicKey.findProgramAddress(
      [seed],
      program.programId
    );
    const newbump = Buffer.from([bump]);
    const newP = await anchor.web3.PublicKey.createProgramAddress(
      [seed, newbump],
      program.programId
    );
    console.log(`pk ${pk.toString()} with bump ${bump}`);
    console.log(`newP ${newP.toString()}`);

    console.log("Your transaction signature", tx);
    assert.equal(pk.toString(), newP.toString());
  });
});
