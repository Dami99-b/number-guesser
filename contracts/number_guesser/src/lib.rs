#![no_std]
use soroban_sdk::{
    contract, contractimpl, Address, Env, Symbol, BytesN, token, panic_with_error
};

#[derive(Clone)]
pub struct NumberGuesser;

#[contract]
impl NumberGuesser {
    /// Initialize contract with secret number and reward amount
    pub fn init(env: Env, secret_number: u32, reward_amount: i128, admin: Address) {
        env.storage().persistent().set(&Symbol::new(&env, "secret"), &secret_number);
        env.storage().persistent().set(&Symbol::new(&env, "reward"), &reward_amount);
        env.storage().persistent().set(&Symbol::new(&env, "admin"), &admin);
    }

    /// User submits a guess
    pub fn guess(env: Env, player: Address, guess_number: u32, token_id: BytesN<32>) -> &'static str {
        let secret: u32 = env.storage().persistent().get(&Symbol::new(&env, "secret")).unwrap_or(0);
        let reward: i128 = env.storage().persistent().get(&Symbol::new(&env, "reward")).unwrap_or(0);

        if guess_number == secret {
            // Transfer reward using Stellar token standard (e.g. native XLM)
            let token = token::Client::new(&env, &token_id);
            let admin: Address = env.storage().persistent().get(&Symbol::new(&env, "admin")).unwrap();
            token.transfer(&admin, &player, &reward);
            env.storage().persistent().set(&Symbol::new(&env, "winner"), &player);
            "🎉 Correct! You won the reward!"
        } else if guess_number > secret {
            "Too high! Try a smaller number."
        } else {
            "Too low! Try a bigger number."
        }
    }

    pub fn get_winner(env: Env) -> Option<Address> {
        env.storage().persistent().get(&Symbol::new(&env, "winner"))
    }
}
