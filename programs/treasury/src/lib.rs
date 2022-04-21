use anchor_lang::prelude::*;
declare_id!("artzp5sEtdxQrJhE27n4cxPzoTc1q5aMpxWneeAto9F");

#[program]
pub mod treasury {

    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let treasury_seed = b"treas";
        if let Some(program) = Pubkey::try_find_program_address(&[treasury_seed], ctx.program_id) {
            let (pda, bump_seed) = program;
            msg!("PDA {} - bump {}", pda, bump_seed);
            return Ok(());
        }
        Err(error!(Errors::NoPDA))
    }

    // pub fn log(ctx: Context<Initialize>) -> Result<()> {
    //     Ok(())
    // }

    // pub fn deposit(ctx: Context<Deposit>, lamports: u64) -> Result<()> {
    //     Ok(())
    // }

    // pub fn withdraw(ctx: Context<Withdraw>, to: Pubkey, lamports: u64) -> Result<()> {
    //     Ok(())
    // }
}

#[derive(Accounts)]
pub struct Initialize {}

#[error_code]
pub enum Errors {
    #[msg("No PDA")]
    NoPDA,
}
