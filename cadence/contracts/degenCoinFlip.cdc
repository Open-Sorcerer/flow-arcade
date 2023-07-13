// * Emulator: `0xee82856bf20e2aa6`
// * Testnet: `0x9a0766d93b6608b7`
// * Mainnet: `0xf233dcee88fe0abe`

/// Import the FungibleToken contract
import FungibleToken from "./FungibleToken.cdc"
// import FungibleToken from 0x9a0766d93b6608b7

pub contract CoinFlipBetting {

    /// Defines the Bet 
    pub resource Bet {
        pub var amount: UFix64
        pub var outcome: Bool

        /// Initializes the Bet Resource with the bet amount and sets outcome to false.
        init(amount: UFix64) {
            self.amount = amount
            self.outcome = false
        }

        /// Sets Bet's outcome randomly
        pub fun setOutcome() {
            let timestamp = getCurrentBlock().timestamp
            let random = UInt64(timestamp) % 2
            self.outcome = random == 1
        }
    }

    /// Provides functionality for users to start a new bet
    pub fun startBet(amount: UFix64): @Bet {
        // Withdraw the necessary amount of Flow tokens 
        var vaultRef: &FungibleToken.Vault{FungibleToken.Receiver, FungibleToken.Balance} = 
                borrow<&FungibleToken.Vault{FungibleToken.Receiver, FungibleToken.Balance}>()
                ?? panic("Could not borrow Receiver reference to the Vault")
        vaultRef.withdraw(amount: amount)

        // Create a new Bet resource
        let newBet <- create Bet(amount: amount)
    
        // Calls setOutcome to randomly determine if the bet was successful or not
        newBet.setOutcome()
      
        return <-newBet
    }

    /// Provides functionality for users to claim their winnings
    pub fun claimWinings(bet: @Bet): @FungibleToken.Vault {
      // Verifies if the bet was won or not
      if !bet.outcome {
        // If the bet was lost, destroy it and return nothing
        destroy bet
        return <-create FungibleToken.Vault(balance: 0.0)
      }

      // If the bet was won, calculate the winnings, destroy the bet and return the winnings
      let winnings = bet.amount * 2.0
      destroy bet

      // Returns the winnings
      let vaultRef = borrow<&FungibleToken.Vault{FungibleToken.Receiver, FungibleToken.Balance}>()
                ?? panic("Could not borrow Receiver reference to the Vault")
      return <-vaultRef.deposit(from: <- FungibleToken.mintTokens(amount: winnings))
    }
}
